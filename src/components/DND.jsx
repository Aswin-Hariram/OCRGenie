import { useState, useRef, useCallback, useEffect } from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { IoCloudUpload } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { LuScanText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GEM_KEY } from "../Config/GemKey";

function DND() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0); // Track OCR progress

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const acceptedFileExtensions = ["jpg", "png", "jpeg","webp"];
  const acceptedFileTypesString = acceptedFileExtensions
    .map((ext) => `.${ext}`)
    .join(",");

  const GEMINI_KEY = GEM_KEY // Replace with your actual key

  const handleFileChange = (event) => {
    const newFilesArray = Array.from(event.target.files);
    processFiles(newFilesArray);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (filesArray) => {
    const newSelectedFiles = [...selectedFiles];
    let hasError = false;

    if (newSelectedFiles.length + filesArray.length > 5) {
      setError("You can only upload up to 5 files.");
      hasError = true;
    }

    filesArray.forEach((file) => {
      try {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        const isAcceptedType = acceptedFileExtensions.includes(fileExtension);
        const isDuplicate = newSelectedFiles.some((f) => f.file.name === file.name);

        if (isDuplicate) {
          throw new Error("File names must be unique");
        }
        if (!isAcceptedType) {
          throw new Error(`Only ${acceptedFileExtensions.join(", ")} file types are allowed`);
        }

        newSelectedFiles.push({ file, Percentage: 0, extractedText: "" });
      } catch (error) {
        setError(error.message);
        hasError = true;
      }
    });

    if (!hasError) {
      setError("");
      setSelectedFiles(newSelectedFiles);
    }
  };

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileDelete = useCallback((index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const fixData = async (text) => {
    try {
      const promptMsg = `${text}\n\nFix my OCR detected text without adding any new data.`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
      const payload = {
        contents: [
          {
            parts: [{ text: promptMsg }],
          },
        ],
      };

      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";
    } catch (err) {
      console.error("Error while processing text with Gemini:", err);
      throw new Error("Failed to process text with Gemini.");
    }
  };

  const getOcr = async (formData, fileIndex) => {
    try {
      // Update progress to 0 when starting
      setSelectedFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndex] = {
          ...updatedFiles[fileIndex],
          Percentage: 0
        };
        return updatedFiles;
      });

      const response = await fetch("http://127.0.0.1:5001/detect-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Something went wrong with OCR detection!");
      }

      const data = await response.json();
      const fixedText = await fixData(data.detected_text);

      // Update progress to 100 and set extracted text
      setSelectedFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndex] = {
          ...updatedFiles[fileIndex],
          Percentage: 100,
          extractedText: fixedText
        };
        return updatedFiles;
      });

      // Calculate overall progress
      const completedFiles = selectedFiles.filter(file => file.Percentage === 100).length;
      const progress = (completedFiles / selectedFiles.length) * 100;
      setOcrProgress(progress);

      return fixedText; // Return the fixed text

    } catch (err) {
      console.error("OCR Error:", err.message);
      setError(err.message || "An error occurred during OCR processing.");
      
      // Reset progress on error
      setSelectedFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndex] = {
          ...updatedFiles[fileIndex],
          Percentage: 0
        };
        return updatedFiles;
      });
      throw err; // Rethrow the error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFiles.length) {
      setError("Please select a file before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    setDisabled(true);

    try {
      // Process files sequentially and collect results
      const processedFiles = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append("image", selectedFiles[i].file);
        const extractedText = await getOcr(formData, i);
        
        processedFiles.push({
          file: selectedFiles[i].file,
          Percentage: 100,
          extractedText: extractedText
        });
      }

      // Update the state with processed files
      setSelectedFiles(processedFiles);

      // Navigate with the processed files
      navigate("/result-screen", { state: { fileData: processedFiles } });
    } catch (err) {
      setError(err.message || "An error occurred during processing");
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    // Trigger OCR processing when files are selected
    if (selectedFiles.length > 0) {
      setOcrProgress(0); // Reset progress when files are selected
    }
  }, [selectedFiles]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", marginTop: 40, alignSelf: 'center', justifySelf: 'center', width: '60%' }}>
      <div
        className="w-full max-w-5xl p-8 rounded-lg shadow-lg"
        style={{
          backgroundColor: "#1f1f1f",
          opacity: 0.9,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-3xl py-5 font-semibold text-center mb-4 text-white">
          Extract Text from Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
          <div
            className="min-h-[16rem] border-3 border-dashed border-gray-500 rounded-3xl p-4 flex flex-col justify-center items-center space-y-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            role="button"
            aria-label="Drop files here"
          >
            <IoCloudUpload className="text-8xl text-gray-400" />
            <p className="text-lg font-semibold text-gray-300">
              Drag and Drop files here
            </p>
            <p className="text-lg font-bold text-gray-300">or</p>
            <button
              type="button"
              onClick={handleCustomButtonClick}
              className="px-4 py-2 bg-violet-500 text-white rounded-lg"
            >
              Upload Files
            </button>
            <input
              type="file"
              multiple
              accept={acceptedFileTypesString}
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {selectedFiles.length > 0 && (
            <Box mt={2} sx={{ backgroundColor: "gray-700", borderRadius: 2 }}>
              <List>
                {selectedFiles.map((fileObj, index) => (
                  <Card key={fileObj.file.name} sx={{ marginBottom: 2, backgroundColor: "#2A2A2A", borderRadius: 4 }}>
                    <CardContent>
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          color: "white",
                        }}
                      >
                        {fileObj.file.type.startsWith("image/") && (
                          <Box
                            sx={{
                              width: 75,
                              height: 75,
                              overflow: "hidden",
                              border: "1px solid gray",
                            }}
                          >
                            <img
                              src={URL.createObjectURL(fileObj.file)}
                              alt={fileObj.file.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        )}
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ color: "white" }}>
                            {fileObj.file.name}
                          </Typography>
                          <Box sx={{ width: "100%", mt: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={fileObj.Percentage}
                              sx={{
                                height: 6,
                                borderRadius: 1,
                                backgroundColor: "gray-500",
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#7C3AED', // Purple color to match your theme
                                }
                              }}
                            />
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => handleFileDelete(index)}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            color: "white",
                          }}
                        >
                          <IoMdCloseCircle />
                        </IconButton>
                      </ListItem>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Box>
          )}
        </div>

        {error && (
          <Typography color="error" className="text-red-500 text-center mt-4">
            {error}
          </Typography>
        )}

        {selectedFiles.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              type="button"
              onClick={handleSubmit}
              startIcon={<LuScanText />}
              style={{
                backgroundColor: "#7C3AED",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
              className="px-6 py-2 text-white rounded-lg"
            >
              {loading ? "Processing..." : "Extract Text"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DND;
