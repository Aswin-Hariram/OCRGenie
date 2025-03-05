import React, { useState } from 'react';
import './App.css';
import SplashCursor from '../../components/SplashCursor';
import ParticlesComponent from '../../components/ParticlesComponent';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GiMagicLamp } from "react-icons/gi";
import { Input, Typography } from '@mui/material';
import DND from '../../components/DND';
import { Navigate, useNavigate } from 'react-router-dom';


const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [h1Completed, setH1Completed] = useState(false);
  const [showLinkBox, setShowLinkBox] = useState(false);
  
  return (
    <div className="app-container">
    
    
      <MainContainer />

    </div>
  )
};

export default App;

function NavBar() {
  return (
    <nav className="navbar flex items-center justify-between p-6 text-white">
      <div className="flex items-center space-x-3">
        <GiMagicLamp className="text-yellow-400 text-4xl" />
        <h1 className="navbar-title text-4xl font-semibold">OCRGenie</h1>
      </div>
      <div className="flex space-x-6">
        <a href="#home" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Home</a>
        <a href="#tutorials" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Tutorials</a>
        <a href="#contact" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Contact</a>
      </div>
    </nav>
  );
}

function MainContainer() {
  const navigate = useNavigate();
  return (
    <section className="hero min-h-screen flex items-center justify-center text-white">
      <div className="content">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="container mx-auto flex flex-col items-center px-1 py-10 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-9xl">
            <h1 className="text-6xl font-bold leading-none sm:text-6xl">
              Transform Images into Words, Instantly
              <span className="dark:text-violet-600 mt-5 block">
                Extract, Edit, Empower
              </span>
            </h1>
            <p className="px-8 mt-8 mb-12 text-2xl">
              Seamlessly transform images and PDFs into editable text in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="ripple-btn px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50 hover:bg-violet-700 transition-colors duration-300 flex items-center"
                onClick={() => navigate("/DND")}
              >
                <span className="mr-2">Get started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button 
                className="flex items-center px-8 py-3 m-2 text-lg border rounded light:text-gray-900 dark:border-gray-300 hover:bg-gray-800 transition-colors duration-300"
                onClick={() => window.open('https://github.com/aswin-hariram', '_blank')}
              >
                <GitHubIcon className="mr-2" /> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
