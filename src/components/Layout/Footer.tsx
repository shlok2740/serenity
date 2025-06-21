import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-pink-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Flower2 className="h-8 w-8 text-pink-400" />
              <span className="text-2xl font-bold text-gray-800">Serenity</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your personal AI-powered companion for mental clarity, better sleep, and emotional wellness.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4 justify-center">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/serene" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                  Get Started
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="https://x.com/sk2740" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-center">
            <img 
              src="/black_circle_360x360.svg" 
              alt="Serenity Logo" 
              className="w-24 h-24 opacity-60 hover:opacity-80 transition-opacity duration-200"
            />
          </div>
        </div>

        <div className="border-t border-pink-100 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Serenity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;