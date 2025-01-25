import { useState, useRef } from "react";
import tool from "../assets/tool.png";
import { Box, IconButton, LinearProgress, List, ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoCloudUpload } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { LuScanText } from "react-icons/lu";

function DND() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const acceptedFileExtensions = ["jpg", "png", "jpeg"];

  const acceptedFileTypesString = acceptedFileExtensions
    .map((ext) => `.${ext}`)
    .join(",");

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

    filesArray.forEach((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isAcceptedType = acceptedFileExtensions.includes(fileExtension);
      const isDuplicate = newSelectedFiles.some((f) => f.name === file.name);

      if (isDuplicate) {
        setError("File names must be unique");
        hasError = true;
      } else if (!isAcceptedType) {
        setError(
          `Only ${acceptedFileExtensions.join(", ")} file types are allowed`
        );
        hasError = true;
      } else {
        newSelectedFiles.push(file);
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

  const handleFileDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      setError("Please upload at least one file.");
    } else {
      alert("Files successfully submitted!");
      setSelectedFiles([]);
      setError("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg bg-opacity-6" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
        <h2 className="text-3xl py-5 font-semibold text-center mb-4 font-sans" >
          Extract Text from Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
          <div
            className="min-h-[23rem] border-3 border-dashed border-gray-300 rounded-3xl p-4 flex flex-col justify-center items-center space-y-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            role="button"
            aria-label="Drop files here"
          >
            <IoCloudUpload className="text-8xl" />
            <p className="text-lg font-semibold">Drag and Drop files here</p>
            <p className="text-lg font-bold">or</p>
            <button
              type="button"
              onClick={handleCustomButtonClick}

              className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 focus:outline-none"
            >
              Upload Files
            </button>
            <input
              type="file"
              id="files"
              name="files"
              multiple
              accept={acceptedFileTypesString}
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {
            selectedFiles.length > 0 && (
              <Box
                mt={2}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: 2,
                  p: 2,
                }}
              >
                {selectedFiles.length > 0 ? (
                  <List>
                    {selectedFiles.map((file, index) => (
                      <ListItem
                        key={file.name}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        {/* Image Preview */}
                        {file.type.startsWith('image/') && (
                          <Box
                            sx={{
                              width: 75,
                              height: 75,
                              overflow: 'hidden',
                              border: '1px solid lightgray',
                            }}
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Box>
                        )}

                        {/* File Details */}
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" style={{ color: 'black', fontFamily: 'arial' }}>
                            {file.name}
                          </Typography>
                          {/* Upload Progress Bar */}
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={file.uploadProgress || 0}
                              sx={{ height: 6, borderRadius: 1, color: 'violet' }}
                            />
                          </Box>


                        </Box>

                        {/* Remove Button */}
                        <IconButton
                          edge="end"
                          aria-label={`Delete ${file.name}`}
                          onClick={() => handleFileDelete(index)}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(39,73,245,0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(39,73,245,0.2)',
                            },
                          }}
                        >
                          <IoMdCloseCircle />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" align="center" style={{ color: 'black' }}>
                    No Files Uploaded Yet
                  </Typography>
                )}
              </Box>
            )
          }


        </div>
        {error && (
          <Typography
            variant="body2"
            align="center"
            color="error"
            className="mt-4"
          >
            {error}
          </Typography>
        )}

        {
          selectedFiles.length > 0 &&
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-violet-500 text-white rounded-lg flex items-center justify-center hover:bg-violet-600 focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <LuScanText />
                <p>Extract Text</p>
              </div>
            </button>

          </div>
        }
      </div>

    </div>
  );
}

export default DND;
