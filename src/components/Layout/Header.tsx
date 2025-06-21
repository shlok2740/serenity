import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower2, User, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../Auth/AuthModal';
import { ProfileModal } from '../Profile/ProfileModal';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <Flower2 className="h-8 w-8 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" />
              <span className="text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-200">
                Serenity
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a 
                  href="#about" 
                  className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium"
                >
                  About
                </a>
                <a 
                  href="https://x.com/sk2740" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium"
                >
                  Contact
                </a>
              </nav>

              {/* Auth/Profile Section */}
              {user ? (
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full hover:from-pink-500 hover:to-rose-500 transition-all duration-200 font-medium transform hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full hover:from-pink-500 hover:to-rose-500 transition-all duration-200 font-medium transform hover:scale-105"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </>
  );
};

export default Header;