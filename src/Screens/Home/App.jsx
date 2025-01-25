import React, { useState } from 'react';
import './App.css';
import SplashCursor from '../../components/SplashCursor';
import ParticlesComponent from '../../components/ParticlesComponent';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GiMagicLamp } from "react-icons/gi";
import { Input, Typography } from '@mui/material';
import DND from '../../components/DND';


const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [h1Completed, setH1Completed] = useState(false);
  const [showLinkBox, setShowLinkBox] = useState(false);

  return (
    <div className="app-container">
      <ParticlesComponent />
      {/* Add ParticlesComponent for global background */}
      <SplashCursor />
      <NavBar />
      <MainContainer />

      {/* Features Section with Particles Background */}
      <DND />


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
            <div className="flex flex-wrap justify-center">
              <button className="ripple-btn px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
                Get started
              </button>

              <button className="flex items-center px-8 py-3 m-2 text-lg border rounded light:text-gray-900 dark:border-gray-300">
                <GitHubIcon className="mr-2" /> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
