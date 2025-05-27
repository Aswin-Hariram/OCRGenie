import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [selectedText, setSelectedText] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const value = {
        selectedText,
        setSelectedText,
        isDialogOpen,
        setIsDialogOpen
    };

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
};

TranslationProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useTranslationContext = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslationContext must be used within a TranslationProvider');
    }
    return context;
};