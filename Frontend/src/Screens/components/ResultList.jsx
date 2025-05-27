import { 
    List, ListItem, Card, CardContent, Box, Typography, 
    IconButton, Tooltip, Chip, Divider, TextField, CardMedia
} from "@mui/material";
import { FileUpload } from '@mui/icons-material';
import { IoCopy } from "react-icons/io5";
import { RiExpandDiagonalLine } from "react-icons/ri";

function ResultList({
    filteredFiles,
    textBoxValues,
    expanded,
    fontSize,
    onTextBoxChange,
    onCopy,
    onToggleExpanded,
    onTextSelect
}) {

    return (
        <List sx={{ width: "100%" }}>
            {filteredFiles.map((fileObj, index) => (
                <ListItem key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                    <Card
                        sx={{
                            backgroundColor: "#2A2A2A",
                            borderRadius: 2,
                            transition: "transform 0.2s",
                            '&:hover': {
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                {fileObj.file?.type?.startsWith("image/") ? (
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 75,
                                            height: 75,
                                            objectFit: "cover",
                                            borderRadius: 1,
                                        }}
                                        image={URL.createObjectURL(fileObj.file)}
                                        alt={fileObj.file?.name}
                                    />
                                ) : (
                                    <FileUpload sx={{ fontSize: 40, color: "#888" }} />
                                )}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "bold" }}>
                                        {fileObj.file?.name || "Untitled File"}
                                    </Typography>
                                    <Chip
                                        label={`${fileObj.file?.size ? (fileObj.file.size / 1024).toFixed(2) + ' KB' : 'Unknown size'}`}
                                        size="small"
                                        sx={{ backgroundColor: "#3B3B3B", color: "white", mt: 1 }}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Tooltip title="Copy text">
                                        <IconButton
                                            onClick={() => onCopy(index)}
                                            sx={{ color: "white" }}
                                        >
                                            <IoCopy />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={expanded[index] ? "Collapse" : "Expand"}>
                                        <IconButton
                                            onClick={() => onToggleExpanded(index)}
                                            sx={{ color: "white" }}
                                        >
                                            <RiExpandDiagonalLine />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2, backgroundColor: "#444" }} />
                            <TextField
                                label="Extracted Text"
                                variant="outlined"
                                multiline
                                rows={expanded[index] ? undefined : 4}
                                fullWidth
                                value={textBoxValues[index] || ""}
                                onChange={(e) => onTextBoxChange(index, e)}
                                onSelect={(e) => onTextSelect(e.target.value.substring(e.target.selectionStart, e.target.selectionEnd))}
                                sx={{
                                    backgroundColor: "#2A2A2A",
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        fontSize: fontSize,
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#444',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#666',
                                    },
                                }}
                            />
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

export default ResultList; 