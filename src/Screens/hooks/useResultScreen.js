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
    }, [textBoxValues]);

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
    }, [textBoxValues]);

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
    }, [textBoxValues]);

    const handleTranslate = useCallback(() => {
        if (!selectedText) {
            showSnackbar("Please select text to translate", "warning");
            return;
        }
        setTranslateDialogOpen(true);
    }, [selectedText]);

    const handleTranslateConfirm = useCallback((translatedText) => {
        if (!selectedText || !translatedText) return;

        // Find the index of the text box containing the selected text
        const index = Object.entries(textBoxValues).find(([_, value]) => 
            value.includes(selectedText)
        )?.[0];

        if (index !== undefined) {
            // Replace the selected text with the translated text
            setTextBoxValues(prevValues => ({
                ...prevValues,
                [index]: prevValues[index].replace(selectedText, translatedText)
            }));
            showSnackbar("Text translated successfully!", "success");
        }

        setTranslateDialogOpen(false);
        setSelectedText("");
    }, [selectedText, textBoxValues]);

    const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }, []);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

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
        handleCloseSnackbar,
        setSearchQuery,
        setFontSize,
        setTranslateDialogOpen,
        setSelectedText,
        toggleExpanded,
        showSnackbar
    };
} 