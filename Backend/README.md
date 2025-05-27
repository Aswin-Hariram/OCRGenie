# OCRGenie Backend

A FastAPI-based backend service for extracting text from images using Google's Gemini 2.0 model with LangChain integration. The service supports multiple image formats and provides real-time updates via Server-Sent Events (SSE).

## Features

- Extract text from multiple images in one request
- Support for both image URLs and base64-encoded images
- Real-time progress updates using Server-Sent Events (SSE)
- File upload endpoint for processing local images
- CORS enabled for frontend integration
- Health check endpoint for monitoring

## Prerequisites

- Python 3.8+
- Google API key with access to Gemini 2.0
- pip (Python package manager)

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
3. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file in the Backend directory with your Google API key:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

## Running the Server

Start the FastAPI server with Uvicorn:

```bash
uvicorn ocr:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at `http://localhost:8000`

## API Endpoints

### 1. Health Check

```
GET /health
```

Check if the API is running and the Gemini model is accessible.

### 2. Process OCR on Images

```
POST /api/ocr
```

Process one or more images for text extraction. Supports both image URLs and base64-encoded images.

**Request Body:**

```json
{
  "images": [
    {
      "url": "https://example.com/image1.jpg"
    },
    {
      "base64": "data:image/png;base64,..."
    }
  ],
  "prompt": "Extract all text from this image. Format the output in a structured way."
}
```

**Response:**

Server-Sent Events stream with the following event types:
- `processing`: Sent when an image starts processing
- `result`: Contains the extracted text for an image
- `error`: Sent if there was an error processing an image

### 3. Upload Images

```
POST /api/upload
```

Upload one or more image files for processing.

**Request:**

```
Content-Type: multipart/form-data
```

**Form Data:**
- `files`: One or more image files

**Response:**

```json
{
  "files": [
    {
      "filename": "example.jpg",
      "content_type": "image/jpeg",
      "size": 12345,
      "dimensions": {
        "width": 800,
        "height": 600
      }
    }
  ]
}
```

## Example Usage with cURL

### Process an image from URL

```bash
curl -X POST http://localhost:8000/api/ocr \
  -H "Content-Type: application/json" \
  -d '{
    "images": [
      {
        "url": "https://example.com/your-image.jpg"
      }
    ]
  }'
```

### Upload and process local images

```bash
curl -X POST http://localhost:8000/api/upload \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "files=@/path/to/your/image1.jpg" \
  -F "files=@/path/to/your/image2.png"
```

## Frontend Integration

Here's an example of how to use the OCR API from a web application:

```javascript
async function processImages(images) {
  const response = await fetch('http://localhost:8000/api/ocr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images: images,
      prompt: 'Extract all text from this image in a structured format.'
    })
  });

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    
    // Process each event
    const events = value.trim().split('\n\n');
    for (const eventData of events) {
      if (!eventData.trim()) continue;
      
      try {
        const event = JSON.parse(eventData);
        console.log('Event:', event);
        
        if (event.event === 'processing') {
          console.log(`Processing image ${event.data.image_index + 1}`);
        } else if (event.event === 'result') {
          console.log('Extracted text:', event.data.text);
        } else if (event.event === 'error') {
          console.error('Error:', event.data.error);
        }
      } catch (e) {
        console.error('Error parsing event:', e);
      }
    }
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the response body when something goes wrong. Common error responses include:

- `400 Bad Request`: Invalid request format or missing required fields
- `401 Unauthorized`: Missing or invalid API key
- `500 Internal Server Error`: Server-side error during processing

## Rate Limiting

Consider implementing rate limiting in production to prevent abuse of the API. This can be done using FastAPI's middleware or a third-party package like `slowapi`.

## Deployment

For production deployment, consider using:

1. **Gunicorn** as the production server
2. **Nginx** as a reverse proxy
3. **Docker** for containerization
4. **Kubernetes** for orchestration (if needed)

Example Dockerfile:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "ocr:app", "--host", "0.0.0.0", "--port", "8000"]
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
