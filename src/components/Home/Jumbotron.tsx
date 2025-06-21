import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../Auth/AuthModal';
import AuroraText from "./AuroraText";
import SereneButton from './SereneButton';

const Jumbotron: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGoSerene = () => {
    if (!user) {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with gradient and floating elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50">
          {/* Floating sakura petals effect */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-rose-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-pink-200 rounded-full opacity-50 animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-rose-400 rounded-full opacity-30 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Decorative element */}
            <div className="flex justify-center">
              <Sparkles className="h-12 w-12 text-pink-400 animate-pulse" />
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Find your{' '}
              <span className="bg-clip-text text-transparent">
                <AuroraText/>
              </span>
            </h1>

            {/* CTA Button */}
            <div>
              <SereneButton user={user} handleGoSerene={handleGoSerene} />
            </div>

            {/* Supporting text */}
            <p className="text-sm text-gray-500 max-w-2xl mx-auto pt-4">
              {user 
                ? `Welcome back! Continue your wellness journey.`
                : 'Join thousands who have found peace and clarity through our AI-powered wellness tools.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Jumbotron;