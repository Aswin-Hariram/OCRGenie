import React, { useState } from 'react';
import "./Home/App.css";
import { GiMagicLamp } from "react-icons/gi";
import { Menu, Close } from '@mui/icons-material';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar flex items-center justify-between p-6 text-white">
            <div className="flex items-center space-x-3">
                <GiMagicLamp className="text-yellow-400 text-4xl" />
                <h1 className="navbar-title text-4xl font-semibold">OCRGenie</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
                <a href="/" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2 transition-colors duration-300">Home</a>
                <a href="#tutorials" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2 transition-colors duration-300">Tutorials</a>
                <a href="/contact" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2 transition-colors duration-300">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <Close /> : <Menu />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-gray-900 p-4 md:hidden">
                    <div className="flex flex-col space-y-4">
                        <a href="/" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Home</a>
                        <a href="#tutorials" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Tutorials</a>
                        <a href="/contact" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Contact</a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;