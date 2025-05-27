import { useState, useCallback } from 'react';

export function useResultScreen(fileData) {
    const [expanded, setExpanded] = useState([]);
    const [textBoxValues, setTextBoxValues] = useState(
        fileData.reduce((acc, file, index) => {
            acc[index] = file.extractedText || "";
            return acc;
        }, {})
    );
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [searchQuery, setSearchQuery] = useState("");
    const [fontSize, setFontSize] = useState(14);
    const [translateDialogOpen, setTranslateDialogOpen] = useState(false);
    const [selectedText, setSelectedText] = useState("");

    // Define showSnackbar first since it's used by other functions
    const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }, []);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    const toggleExpanded = useCallback((index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    }, []);

    const handleTextBoxChange = useCallback((index, event) => {
        setTextBoxValues((prevValues) => ({
            ...prevValues,
            [index]: event.target.value,
        }));
    }, []);

    const handleCopy = useCallback(async (index) => {
        try {
            const textToCopy = textBoxValues[index];
            if (textToCopy) {
                await navigator.clipboard.writeText(textToCopy);
                showSnackbar("Text copied to clipboard!", "success");
            }
        } catch (err) {
            showSnackbar("Failed to copy text. Please try again.", "error");
        }
    }, [textBoxValues, showSnackbar]);

    const handleSave = useCallback(async () => {
        setLoading(true);
        try {
            const text = Object.values(textBoxValues).join('\n\n');
            const blob = new Blob([text], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'extracted_text.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showSnackbar("Results saved successfully!", "success");
        } catch (error) {
            showSnackbar("Failed to save results. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    }, [textBoxValues, showSnackbar]);

    const handleShare = useCallback(async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'OCR Results',
                    text: Object.values(textBoxValues).join('\n\n'),
                });
            } else {
                showSnackbar("Sharing is not supported on this browser", "info");
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }, [textBoxValues, showSnackbar]);

    const handleTranslate = useCallback(() => {
        if (!selectedText) {
            showSnackbar("Please select text to translate", "warning");
            return;
        }
        setTranslateDialogOpen(true);
    }, [selectedText, showSnackbar]);

    const handleTranslateConfirm = useCallback(async (targetLanguage) => {
        if (!selectedText) return;
        
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: selectedText,
                    target_language: targetLanguage
                }),
            });
            
            if (!response.ok) {
                throw new Error('Translation failed');
            }
            
            const data = await response.json();
            
            if (data.status === 'success') {
                // Find the index of the text box containing the selected text
                const index = Object.entries(textBoxValues).find(([_, value]) => 
                    value.includes(selectedText)
                )?.[0];

                if (index !== undefined) {
                    // Replace the selected text with the translated text
                    setTextBoxValues(prevValues => ({
                        ...prevValues,
                        [index]: prevValues[index].replace(selectedText, data.translated_text)
                    }));
                    showSnackbar(`Text translated to ${targetLanguage} successfully!`, "success");
                }
            } else {
                throw new Error(data.message || 'Translation failed');
            }
        } catch (error) {
            console.error('Translation error:', error);
            showSnackbar(`Translation failed: ${error.message}`, "error");
        } finally {
            setLoading(false);
            setTranslateDialogOpen(false);
            setSelectedText("");
        }
    }, [selectedText, textBoxValues, showSnackbar]);

    const translateAll = useCallback(async (targetLanguage) => {
        setLoading(true);
        const results = [];
        
        try {
            // Process translations one by one to avoid rate limiting
            for (const [index, text] of Object.entries(textBoxValues)) {
                if (!text) continue;
                
                try {
                    const response = await fetch('http://localhost:8000/api/translate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            text, 
                            target_language: targetLanguage 
                        }),
                    });
                    
                    if (!response.ok) throw new Error('Translation failed');
                    const data = await response.json();
                    
                    if (data.status !== 'success' || !data.translated_text) {
                        throw new Error(data.message || 'Translation failed');
                    }
                    
                    // Update the text box immediately for this result
                    setTextBoxValues(prevValues => ({
                        ...prevValues,
                        [index]: data.translated_text
                    }));
                    
                    results.push({ index: parseInt(index), success: true });
                    
                    // Small delay between translations to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                } catch (error) {
                    console.error(`Error translating text at index ${index}:`, error);
                    results.push({ 
                        index: parseInt(index), 
                        success: false, 
                        error: error.message 
                    });
                }
            }
            
            // Show summary of translations
            const successCount = results.filter(r => r.success).length;
            const errorCount = results.length - successCount;
            
            if (errorCount === 0) {
                showSnackbar(`Successfully translated all ${successCount} texts.`, "success");
            } else if (successCount === 0) {
                showSnackbar(`Failed to translate all texts. Please try again.`, "error");
            } else {
                showSnackbar(
                    `Translated ${successCount} texts. ${errorCount} failed.`,
                    successCount > 0 ? "success" : "error"
                );
            }
        } catch (error) {
            console.error('Translation error:', error);
            showSnackbar("Translation failed. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    }, [textBoxValues, showSnackbar]);

    return {
        textBoxValues,
        expanded,
        loading,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        searchQuery,
        fontSize,
        translateDialogOpen,
        selectedText,
        handleTextBoxChange,
        handleCopy,
        handleSave,
        handleShare,
        handleTranslate,
        handleTranslateConfirm,
        translateAll,
        handleCloseSnackbar,
        setSearchQuery,
        setFontSize,
        setTranslateDialogOpen,
        setSelectedText,
        toggleExpanded,
        showSnackbar
    };
}