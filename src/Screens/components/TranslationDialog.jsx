import { useState } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    TextField,
    Box,
    CircularProgress,
    Typography
} from "@mui/material";
import axios from 'axios';

const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
];

function TranslationDialog({ open, onClose, onConfirm, selectedText }) {
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTranslate = async () => {
        if (!selectedText) return;
        
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://127.0.0.1:5001/translate', {
                text: selectedText,
                target_language: targetLanguage
            });

            if (response.data && response.data.translated_text) {
                setTranslatedText(response.data.translated_text);
            } else {
                throw new Error('Translation failed');
            }
        } catch (err) {
            setError(err.message || 'Translation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        onConfirm(translatedText);
        setTranslatedText('');
        setError('');
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Translate Text</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Original Text"
                        multiline
                        rows={3}
                        value={selectedText}
                        disabled
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f5f5f5',
                            }
                        }}
                    />
                    
                    <FormControl fullWidth>
                        <InputLabel>Target Language</InputLabel>
                        <Select
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            label="Target Language"
                        >
                            {languages.map((lang) => (
                                <MenuItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : translatedText ? (
                        <TextField
                            label="Translated Text"
                            multiline
                            rows={3}
                            value={translatedText}
                            disabled
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f5f5f5',
                                }
                            }}
                        />
                    ) : (
                        <Button 
                            variant="contained" 
                            onClick={handleTranslate}
                            sx={{ mt: 2 }}
                        >
                            Translate
                        </Button>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {translatedText && (
                    <Button onClick={handleConfirm} variant="contained">
                        Use Translation
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default TranslationDialog; 