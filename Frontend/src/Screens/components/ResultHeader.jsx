import { Box, Typography, TextField, Select, MenuItem, IconButton, Button, Tooltip, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { Save, Share, Translate, Search, Language } from '@mui/icons-material';
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { useState } from 'react';
import { LANGUAGES } from '../../utils/constants';

function ResultHeader({
    searchQuery,
    setSearchQuery,
    fontSize,
    setFontSize,
    onTranslate = () => {},
    onShare = () => {},
    onSave = () => {},
    onNavigateHome = () => {},
    onTranslateAll = () => {}
}) {
    const [translating, setTranslating] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState('');

    const handleLanguageChange = async (e) => {
        const lang = e.target.value;
        if (!lang) return;
        
        setTargetLanguage(lang);
        setTranslating(true);
        
        try {
            await onTranslateAll(lang);
        } catch (error) {
            console.error('Translation error:', error);
        } finally {
            setTranslating(false);
            setTargetLanguage('');
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#333",
                borderRadius: "8px",
                padding: 2,
                marginBottom: 2,
            }}
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                OCR Results
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Search in results">
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            backgroundColor: "#2A2A2A",
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                        }}
                    />
                </Tooltip>
                <Tooltip title="Font Size">
                    <Select
                        size="small"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        sx={{
                            backgroundColor: "#2A2A2A",
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                        }}
                    >
                        <MenuItem value={12}>Small</MenuItem>
                        <MenuItem value={14}>Medium</MenuItem>
                        <MenuItem value={16}>Large</MenuItem>
                    </Select>
                </Tooltip>
               
                <Tooltip title="Share">
                    <IconButton onClick={onShare} sx={{ color: 'white' }}>
                        <Share />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton onClick={onSave} sx={{ color: 'white' }}>
                        <Save />
                    </IconButton>
                </Tooltip>
                <Button
                    variant="contained"
                    onClick={onNavigateHome}
                    startIcon={<HiOutlineArrowUturnLeft />}
                    sx={{
                        backgroundColor: "#7C3AED",
                        '&:hover': {
                            backgroundColor: "#6D28D9",
                        },
                    }}
                >
                    Start Over
                </Button>
            </Box>
        </Box>
    );
}

export default ResultHeader; 