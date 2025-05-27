import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './Screens/Home/App';
import ResultScreen from './Screens/ResultScreen';
import NavBar from './Screens/NavBar';
import ParticlesComponent from './components/ParticlesComponent';
import SplashCursor from './components/SplashCursor';
import DND from './components/DND';
import Contact from './Screens/Home/Contact';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <NavBar />
  <ParticlesComponent/>
  <SplashCursor />
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<App />} /> {/* Home Page */}
        <Route path="/result-screen" element={<ResultScreen />} />
        <Route path="/DND" element={<DND />} /> {/* Another Page */}
        <Route path="/Contact" element={<Contact />} /> {/* Another Page */}
      </Routes>

    </Router>
  </StrictMode>
);
