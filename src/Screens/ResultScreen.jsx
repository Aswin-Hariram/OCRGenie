import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";
import ResultHeader from './components/ResultHeader';
import ResultList from './components/ResultList';
import TranslationDialog from './components/TranslationDialog';
import { useResultScreen } from './hooks/useResultScreen';

function ResultScreen() {
    const { state } = useLocation();
    const { fileData = [] } = state || {};
    const navigate = useNavigate();
    
    const {
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
    } = useResultScreen(fileData);

    // Filter files based on search query
    const filteredFiles = fileData.filter((fileObj, index) => 
        textBoxValues[index]?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleSave]);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: 40, padding: "20px" }}>
            <Box
                sx={{
                    background: "#1E1E1E",
                    padding: 3,
                    width: "100%",
                    maxWidth: 1200,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 3,
                    alignSelf: "center",
                    transition: "transform 0.3s ease-in-out",
                    '&:hover': {
                        transform: "scale(1.02)",
                    },
                }}
            >
                <ResultHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    onTranslate={handleTranslate}
                    onShare={handleShare}
                    onSave={handleSave}
                    onNavigateHome={() => navigate("/")}
                />

                <ResultList
                    filteredFiles={filteredFiles}
                    textBoxValues={textBoxValues}
                    expanded={expanded}
                    fontSize={fontSize}
                    onTextBoxChange={handleTextBoxChange}
                    onCopy={handleCopy}
                    onToggleExpanded={toggleExpanded}
                    onTextSelect={setSelectedText}
                />
            </Box>

            <TranslationDialog
                open={translateDialogOpen}
                onClose={() => setTranslateDialogOpen(false)}
                onConfirm={handleTranslateConfirm}
                selectedText={selectedText}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ResultScreen;
