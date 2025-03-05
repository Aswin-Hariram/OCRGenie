# OCRGenie 🔮

<div align="center">

![OCRGenie Logo](https://img.shields.io/badge/OCRGenie-Smart%20Text%20Recognition-blue?style=for-the-badge)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

Transform images into actionable text with the power of AI! 🚀

[Getting Started](#getting-started) •
[Features](#features) •
[Configuration](#configuration) •
[Troubleshooting](#troubleshooting)

</div>

## ✨ Features

- 📷 Advanced OCR powered by Google Cloud Vision API
- 🤖 Smart text processing with Google's Gemini AI
- 📱 SMS notifications via Twilio
- ⚡ Lightning-fast React frontend
- 🎨 Beautiful and intuitive user interface
- 🔒 Secure credential management

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Git
- Access to Google Cloud Console
- Twilio Account
- Google AI Studio Account

### Quick Start 🏃‍♂️

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/OCRGenie.git
cd OCRGenie
```

2. **Install Dependencies**
```bash
# Frontend Dependencies
npm install

# Backend Dependencies
pip install -r requirements.txt
```

## 🔐 Configuration Files Setup

### 1. 🔑 Google Cloud Vision API (`ocrKey.json`)

The magic behind our powerful OCR capabilities! 

<details>
<summary>📝 Setup Instructions</summary>

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/Select a project
3. Enable Cloud Vision API
4. Create service account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Grant "Cloud Vision API User" role
   - Download JSON key
5. Save as `Backend/ocrKey.json`

</details>

Example `ocrKey.json`:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "your-private-key",
  "client_email": "your-service-account-email",
  "client_id": "your-client-id",
  ...
}
```

### 2. 📱 Backend Configuration (`config.py`)

Power up your backend with Twilio and Gemini! 

<details>
<summary>🔧 Setup Instructions</summary>

#### Twilio Setup
1. Create [Twilio account](https://www.twilio.com/try-twilio)
2. Get Account SID & Auth Token
3. Purchase/Select phone number

#### Gemini Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate API key

</details>

Create `Backend/config/config.py`:
```python
# Twilio Magic ✨
account_sid_key = 'your_account_sid'
auth_token_key = 'your_auth_token'
twilio_number_key = 'your_twilio_phone_number'

# Gemini Power 🤖
GEMINI_API_KEY = "your-gemini-api-key-here"
```

### 3. 🎨 Frontend Configuration (`GemKey.js`)

Enable AI-powered features in your frontend!

Create `src/Config/GemKey.js`:
```javascript
export const GEM_KEY = "your-gemini-api-key-here";
```

## 🛡️ Security Best Practices

⚠️ **Keep Your Magic Safe!**

- 🚫 Never commit credentials to version control
- 📝 Add to `.gitignore`:
  ```bash
  Backend/ocrKey.json
  Backend/config/config.py
  src/Config/GemKey.js
  ```
- 🔄 Rotate keys periodically
- 👮‍♂️ Use principle of least privilege
- 📊 Monitor API usage
- 🌍 Use environment variables in production

## 🔧 Environment Setup

### Directory Structure
```
OCRGenie/
├── Backend/
│   ├── config/
│   │   └── config.py
│   └── ocrKey.json
└── src/
    └── Config/
        └── GemKey.js
```

### Quick Setup Commands
```bash
# Create directories 📁
mkdir -p Backend/config src/Config

# Setup configuration files 📝
cp path/to/your/downloaded/key.json Backend/ocrKey.json
touch Backend/config/config.py
touch src/Config/GemKey.js

# Protect your secrets 🔒
echo "Backend/ocrKey.json" >> .gitignore
echo "Backend/config/config.py" >> .gitignore
echo "src/Config/GemKey.js" >> .gitignore
```

## ✅ Verification Checklist

- [ ] All configuration files exist in correct locations
- [ ] File permissions are set correctly
- [ ] `ocrKey.json` structure is valid
- [ ] `config.py` contains all credentials
- [ ] `GemKey.js` exports correctly
- [ ] `.gitignore` is properly configured

## 🔍 Troubleshooting Guide

### Common Issues & Solutions

#### 🚨 File Not Found
- Verify directory structure
- Check file names and paths
- Ensure proper file creation

#### 🔒 Permission Issues
- Check file permissions
- Verify user access rights

#### 🌐 API Errors
- Validate API keys
- Check service status
- Verify account activation

#### 📦 Import Issues
- Confirm Python path
- Check ES6 import syntax
- Verify module installation

#### 📱 Twilio Setup
- Check phone number format
- Verify account status
- Monitor credit balance

## 🤝 Need Help?

- 📖 Check our [Documentation](docs/README.md)
- 🐛 [Report a bug](../../issues)
- 💡 [Request a feature](../../issues)
- 💬 [Ask a question](../../discussions)

---

<div align="center">

Made with ❤️ by the OCRGenie Team

[⬆ Back to top](#ocrgenie-)

</div>
