# 🧞‍♂️ OCRGenie

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  </p>
</div>

OCRGenie is a powerful document processing application that extracts text from images using Google's Gemini AI. It provides a user-friendly interface for uploading documents and receiving accurate text extraction results in real-time.

## 🚀 Features

- **Image to Text Extraction** - Extract text from various image formats
- **Multi-language Support** - Supports multiple languages for text extraction
- **Real-time Processing** - Get instant results with progress updates
- **Responsive Design** - Works on desktop and mobile devices
- **Docker Support** - Easy deployment with Docker

## 📦 Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v16+ for frontend development)
- [Python](https://www.python.org/) (3.8+ for backend development)
- [Google API Key](https://ai.google.dev/) with Gemini API access

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/OCRGenie.git
cd OCRGenie
```

### 2. Environment Setup

#### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Create a `.env` file with the following content:
   ```env
   # Google Gemini API Key
   GOOGLE_API_KEY=your_google_api_key_here
   ```

#### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd ../Frontend
   ```

2. Create a `.env` file with the following content:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:8000
   
   # Environment
   NODE_ENV=development
   ```

## 🐳 Docker Setup (Recommended)

The easiest way to run OCRGenie is using Docker Compose:

1. Make sure Docker and Docker Compose are installed and running

2. Create a `.env` file in the project root with your environment variables:
   ```env
   # Google Gemini API Key (required)
   GOOGLE_API_KEY=your_google_api_key_here
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. From the project root, you can run the application in different ways:

   - Using the default `.env` file:
     ```bash
     docker-compose up --build
     ```
   
   - Using a custom environment file (e.g., `production.env`):
     ```bash
     docker-compose --env-file ./path/to/custom.env up --build
     ```

   This will:
   - Build and start both frontend and backend services
   - Mount your local code for development
   - Use the environment variables from your specified `.env` file

4. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Docker Environment Variables

All environment variables from the root `.env` file are automatically loaded into the backend container. The frontend can access these variables during build time if they are prefixed with `VITE_`.

To add new environment variables:
1. Add them to your `.env` file
2. Reference them in your application code using `os.getenv('VARIABLE_NAME')` (Python) or `import.meta.env.VITE_VARIABLE_NAME` (JavaScript/React)
3. Rebuild your containers with `docker-compose up --build`

## 🚀 Manual Setup (Development)

### Backend

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at http://localhost:3000

## 🌐 Environment Variables Reference

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_API_KEY` | Your Google Gemini API key | Yes | - |
| `PORT` | Port to run the backend server | No | 8000 |
| `HOST` | Host to bind the server | No | 0.0.0.0 |
| `DEBUG` | Enable debug mode | No | False |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | No | http://localhost:3000 |

### Frontend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Base URL for API requests | No | http://localhost:8000 |
| `NODE_ENV` | Node environment | No | development |

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - For the powerful AI models
- [FastAPI](https://fastapi.tiangolo.com/) - For the amazing Python web framework
- [React](https://reactjs.org/) - For the frontend library
- [Docker](https://www.docker.com/) - For containerization

---

<div align="center">
  Made with ❤️ by Your Name
</div>
