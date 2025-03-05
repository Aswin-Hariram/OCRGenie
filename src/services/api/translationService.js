import axios from 'axios';
import { API_BASE_URL } from '../../config/constants';

class TranslationService {
    async translate(text, targetLanguage) {
        try {
            const response = await axios.post(`${API_BASE_URL}/translate`, {
                text,
                target_language: targetLanguage
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            return new Error(error.response.data.error || 'Translation failed');
        }
        if (error.request) {
            return new Error('No response received from server');
        }
        return new Error('Translation service error');
    }
}

export const translationService = new TranslationService();