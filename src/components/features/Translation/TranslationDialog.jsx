import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Select from '../../common/Input/Select';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTranslationContext } from '../../../store/TranslationContext';
import { LANGUAGES } from '../../../constants/languages';

function TranslationDialog({ onConfirm }) {
    const { selectedText, isDialogOpen, setIsDialogOpen } = useTranslationContext();
    const { loading, error, translatedText, translate } = useTranslation();
    const [targetLanguage, setTargetLanguage] = useState('es');

    const handleTranslate = async () => {
        try {
            await translate(selectedText, targetLanguage);
        } catch (err) {
            console.error('Translation failed:', err);
        }
    };

    const handleConfirm = () => {
        onConfirm(translatedText);
        setIsDialogOpen(false);
    };

    return (
        <Dialog 
            open={isDialogOpen} 
            onClose={() => setIsDialogOpen(false)}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Translate Text</DialogTitle>
            <DialogContent>
                <Input
                    label="Original Text"
                    multiline
                    rows={3}
                    value={selectedText}
                    disabled
                />
                
                <Select
                    label="Target Language"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    options={LANGUAGES}
                />

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : translatedText ? (
                    <Input
                        label="Translated Text"
                        multiline
                        rows={3}
                        value={translatedText}
                        disabled
                    />
                ) : (
                    <Button 
                        onClick={handleTranslate}
                        disabled={!selectedText}
                    >
                        Translate
                    </Button>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsDialogOpen(false)}>
                    Cancel
                </Button>
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