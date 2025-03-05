import { useState, useCallback } from 'react';
import { translationService } from '../services/api/translationService';

export const useTranslation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [translatedText, setTranslatedText] = useState('');

    const translate = useCallback(async (text, targetLanguage) => {
        setLoading(true);
        setError(null);
        try {
            const result = await translationService.translate(text, targetLanguage);
            setTranslatedText(result.translated_text);
            return result.translated_text;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        translatedText,
        translate
    };
};