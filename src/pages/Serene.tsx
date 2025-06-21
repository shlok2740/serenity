import React from 'react';
import { Sparkles } from 'lucide-react';
import FeatureCards from '../components/Serene/FeatureCards';

const Serene: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center">
            <Sparkles className="h-16 w-16 text-pink-400 animate-pulse" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
            What would you like to{' '}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              do today?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose your path to serenity. Each experience is crafted to meet you where you are and guide you toward inner peace.
          </p>
        </div>

        {/* Feature cards */}
        <FeatureCards />

        {/* Bottom section */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600">
            Take your time. Your wellness journey is unique to you.
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Serene;