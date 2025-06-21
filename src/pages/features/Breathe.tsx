import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wind, Clock } from 'lucide-react';
import { BreathingSession } from '../../components/Breathe/BreathingSession';

const Breathe: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [sessionActive, setSessionActive] = useState(false);

  const durations = [
    { label: '1 Minute', value: 60, description: 'Quick reset' },
    { label: '2 Minutes', value: 120, description: 'Short break' },
    { label: '3 Minutes', value: 180, description: 'Mindful pause' },
    { label: '5 Minutes', value: 300, description: 'Deep relaxation' }
  ];

  const handleStartSession = (duration: number) => {
    setSelectedDuration(duration);
    setSessionActive(true);
  };

  const handleSessionEnd = () => {
    setSessionActive(false);
    setSelectedDuration(null);
  };

  if (sessionActive && selectedDuration) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            to="/serene" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Go Back</span>
          </Link>

          <BreathingSession 
            duration={selectedDuration} 
            onSessionEnd={handleSessionEnd}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          to="/serene" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Go Back</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full">
              <Wind className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
            Breathe With Me
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your session length and let our AI guide you through a personalized breathing experience designed to calm your mind and center your thoughts.
          </p>
        </div>

        {/* Duration Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl mb-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center justify-center space-x-2">
                <Clock className="h-6 w-6 text-pink-500" />
                <span>Choose Your Session Length</span>
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Select the perfect duration for your current needs. Each session includes AI-guided breathing instructions.
              </p>
            </div>

            {/* Duration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {durations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => handleStartSession(duration.value)}
                  className="group p-6 bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 rounded-2xl border border-pink-200 hover:border-pink-300 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-pink-600 group-hover:text-pink-700">
                      {duration.label}
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-700">
                      {duration.description}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-pink-500 group-hover:text-pink-600">
                      <Wind className="h-4 w-4" />
                      <span className="text-xs font-medium">AI Guided</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-pink-200">
              <div className="text-center space-y-2">
                <div className="p-3 bg-pink-100 rounded-full w-fit mx-auto">
                  <Wind className="h-6 w-6 text-pink-600" />
                </div>
                <h4 className="font-semibold text-gray-800">AI Voice Guide</h4>
                <p className="text-sm text-gray-600">Personalized breathing instructions from your AI coach</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 bg-rose-100 rounded-full w-fit mx-auto">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Perfect Timing</h4>
                <p className="text-sm text-gray-600">Scientifically-designed breathing rhythms for optimal relaxation</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 bg-pink-100 rounded-full w-fit mx-auto">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-800">Visual Guide</h4>
                <p className="text-sm text-gray-600">Follow the breathing circle for perfect synchronization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h4 className="font-semibold text-gray-800 mb-4 text-center">Benefits of Guided Breathing</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li>• Reduces stress and anxiety</li>
              <li>• Improves focus and clarity</li>
              <li>• Lowers blood pressure</li>
            </ul>
            <ul className="space-y-2">
              <li>• Enhances emotional regulation</li>
              <li>• Promotes better sleep</li>
              <li>• Increases mindfulness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breathe;