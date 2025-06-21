import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { CVIMeeting } from '../../components/Coach/CVIMeeting';

const Coach: React.FC = () => {
  const apiToken = import.meta.env.VITE_TAVUS_API_KEY;
  const personaId = import.meta.env.VITE_TAVUS_PERSONA_ID;

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          to="/serene" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Go Back</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-blue-400 to-pink-500 rounded-full">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
            Talk to My AI Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with your personal AI therapist who understands your emotions and provides compassionate support whenever you need it.
          </p>
        </div>

        {/* CVI Meeting Interface */}
        <div className="flex justify-center">
          {apiToken ? (
            <CVIMeeting 
              apiToken={apiToken} 
              personaId={personaId} 
            />
          ) : (
            <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center">
              <div className="space-y-4">
                <div className="p-4 bg-red-100 rounded-full w-fit mx-auto">
                  <MessageCircle className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">API Configuration Required</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Please add your Tavus API key to the environment variables to start your therapy session.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-left max-w-md mx-auto">
                  <p className="text-sm font-medium text-gray-700 mb-2">Add to your .env file:</p>
                  <code className="text-xs text-gray-600 block">
                    VITE_TAVUS_API_KEY=your_api_key_here<br/>
                    VITE_TAVUS_PERSONA_ID=your_persona_id
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-2">24/7 Availability</h3>
            <p className="text-gray-600 text-sm">Your AI coach is always here when you need support</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Confidential & Safe</h3>
            <p className="text-gray-600 text-sm">All conversations are private and secure</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Personalized Support</h3>
            <p className="text-gray-600 text-sm">AI adapts to your unique needs and communication style</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;