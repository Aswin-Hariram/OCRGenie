import os
import base64
import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

app = FastAPI()

# CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your Google API Key
os.environ["GOOGLE_API_KEY"] = "AIzaSyC_VZfdiNXsNXr8kVxz8U4mtTTRG11K9Fs"

class ImageData(BaseModel):
    image_base64: str
    image_format: str = "jpeg"

class TranslationRequest(BaseModel):
    text: str
    target_language: str = "en"  # Default to English

async def process_ocr(image_base64: str, image_format: str = "jpeg"):
    try:
        # Create Gemini Vision model
        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp")

        # Construct message for OCR
        message = HumanMessage(content=[
            {"type": "text", "text": "Extract all text from this image exactly as it appears."},
            {"type": "image_url", "image_url": {"url": f"data:image/{image_format};base64,{image_base64}"}}
        ])
        
        # Process the OCR
        response = await asyncio.to_thread(llm.invoke, [message])
        
        return {"status": "success", "data": response.content}
        
    except Exception as e:
        return {"status": "error", "message": f"Error during OCR processing: {str(e)}"}

@app.post("/api/translate")
async def translate_text(translation_request: TranslationRequest):
    """
    Translate text to the target language using Gemini
    """
    try:
        # Create Gemini model for translation
        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp")
        
        # Construct prompt for translation
        prompt = f"Translate the following text to {translation_request.target_language}. Only return the translated text, nothing else.\n\n{translation_request.text}"
        
        # Get translation
        response = await asyncio.to_thread(llm.invoke, prompt)
        
        return {
            "status": "success",
            "translated_text": response.content,
            "target_language": translation_request.target_language
        }
        
    except Exception as e:
        return {"status": "error", "message": f"Error during translation: {str(e)}"}

@app.post("/api/ocr")
async def ocr_endpoint(image_data: ImageData):
    """
    Endpoint to process OCR on an image.
    The client should send a POST request with a JSON body containing 'image_base64' and 'image_format'.
    """
    result = await process_ocr(image_data.image_base64, image_data.image_format)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
