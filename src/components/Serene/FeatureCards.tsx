import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, MessageCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link, gradient }) => {
  return (
    <>
      <Link to={link} className="group block">
        <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${gradient} text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-2xl overflow-hidden h-full`}>
          {/* Background decoration with bounce animation */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 animate-bounce-slow group-hover:animate-none"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 animate-bounce-delayed group-hover:animate-none"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="p-3 bg-white/20 rounded-full w-fit">
              {icon}
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {description}
            </p>
            <div className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-colors duration-300">
              <span className="font-medium">Get started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) translateX(12px) translateY(-48px);
          }
          50% {
            transform: translateY(-20px) translateX(12px) translateY(-48px);
          }
        }

        @keyframes bounce-delayed {
          0%, 100% {
            transform: translateY(32px) translateX(-32px);
          }
          50% {
            transform: translateY(12px) translateX(-32px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .animate-bounce-delayed {
          animation: bounce-delayed 2.5s infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </>
  );
};

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <Wind className="h-8 w-8" />,
      title: "Breath With Me",
      description: "Guided breathing exercises with AI-powered voice coaching to help you find calm and reduce stress instantly.",
      link: "/serene/breathe",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Talk to My AI Coach",
      description: "Have a conversation with your personal AI therapist who understands your emotions and provides support.",
      link: "/serene/coach",
      gradient: "from-blue-400 to-pink-500"
    },
    {
      icon: <RotateCcw className="h-8 w-8" />,
      title: "Daily Reset",
      description: "A comprehensive daily routine combining meditation, reflection, and goal-setting for mental clarity.",
      link: "/serene/reset",
      gradient: "from-green-400 to-pink-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          link={feature.link}
          gradient={feature.gradient}
        />
      ))}
    </div>
  );
};

export default FeatureCards;