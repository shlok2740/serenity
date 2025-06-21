import React from 'react';
import { Mic, Video, Heart } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  reversed?: boolean;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, imageUrl, reversed = false }) => {
  return (
    <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12 py-12`}>
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative group">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-2xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-pink-100 rounded-full">
            {icon}
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Mic className="h-6 w-6 text-pink-500" />,
      title: "Voice-Guided Breathing",
      description: "Experience personalized breathing exercises with AI-powered voice guidance that adapts to your stress levels and breathing patterns for optimal relaxation.",
      imageUrl: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: <Video className="h-6 w-6 text-pink-500" />,
      title: "AI Video Therapist",
      description: "Connect with our empathetic AI therapist through video sessions. Get personalized support, coping strategies, and emotional guidance available 24/7.",
      imageUrl: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      title: "Daily Mental Reset",
      description: "Start each day with guided meditation and mindfulness practices designed to clear mental clutter and set positive intentions for mental wellness.",
      imageUrl: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Mental Wellness Tools Designed for{' '}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover a suite of AI-powered tools crafted to support your mental health journey and emotional wellness.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;