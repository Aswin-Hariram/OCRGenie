# OCRGenie Frontend

A modern, responsive web application for OCR (Optical Character Recognition) built with React, TypeScript, and Chakra UI.

## 🚀 Features

- **Modern UI/UX** built with Chakra UI and Material-UI
- **Responsive Design** that works on all devices
- **Interactive Elements** with smooth animations using React Spring
- **Particle Effects** for an engaging user experience
- **Social Login** integration
- **Type Safety** with TypeScript

## 🛠 Technologies Used

- **Frontend Framework**: React 18
- **Styling**: Chakra UI, Material-UI, Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animation**: React Spring, Typewriter Effect
- **Build Tool**: Vite
- **Linting**: ESLint

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OCRGenie/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your environment variables (refer to `.env.example` if available)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:5173`

## 🏗 Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🧹 Linting

```bash
npm run lint
# or
yarn lint
```

## 🐳 Docker Support

Build the Docker image:
```bash
docker build -t ocrgenie-frontend .
```

Run the container:
```bash
docker run -p 3000:80 ocrgenie-frontend
```

## 📂 Project Structure

```
Frontend/
├── public/          # Static files
├── src/             # Source code
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── styles/      # Global styles
│   ├── utils/       # Utility functions
│   ├── App.tsx      # Main App component
│   └── main.tsx     # Entry point
├── .env             # Environment variables
├── .eslintrc.js     # ESLint config
├── package.json     # Dependencies and scripts
└── vite.config.js   # Vite config
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.