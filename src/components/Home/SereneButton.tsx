"use client";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Utility function for className merging (simple version)
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
}

const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <div
        className={cn(
          "absolute aspect-square animate-border-beam",
          "bg-gradient-to-r from-transparent via-current to-transparent",
          className,
        )}
        style={
          {
            width: size,
            height: size,
            color: colorFrom,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            animationDirection: reverse ? "reverse" : "normal",
            transform: `rotate(${initialOffset}deg)`,
            ...style,
          } as React.CSSProperties & { [key: string]: any }
        }
      />
    </div>
  );
};

interface SereneButtonWithBeamProps {
  user: any; // Replace with your user type
  handleGoSerene: () => void;
}

export const SereneButton = ({ user, handleGoSerene }: SereneButtonWithBeamProps) => {
  const buttonClasses = "relative inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden";
  
  const buttonContent = (
    <>
      <span>Go Serene</span>
      <ArrowRight className="h-5 w-5" />
      
      {/* First Border Beam */}
      <BorderBeam
        duration={3}
        size={100}
        colorFrom="#ffffff"
        colorTo="#fbbf24"
        className="opacity-75"
      />
      
      {/* Second Border Beam */}
      <BorderBeam
        duration={3}
        delay={1.5}
        size={100}
        colorFrom="#fbbf24"
        colorTo="#ffffff"
        className="opacity-75"
        reverse={true}
      />
    </>
  );

  return (
    <>
      {user ? (
        <Link to="/serene" className={buttonClasses}>
          {buttonContent}
        </Link>
      ) : (
        <button onClick={handleGoSerene} className={buttonClasses}>
          {buttonContent}
        </button>
      )}
      
      <style jsx>{`
        @keyframes border-beam {
          0% {
            transform: translateX(0%) translateY(-50%) rotate(0deg);
            left: -2px;
            top: 50%;
          }
          25% {
            transform: translateX(-50%) translateY(0%) rotate(90deg);
            left: 50%;
            top: -2px;
          }
          50% {
            transform: translateX(-100%) translateY(-50%) rotate(180deg);
            left: calc(100% + 2px);
            top: 50%;
          }
          75% {
            transform: translateX(-50%) translateY(-100%) rotate(270deg);
            left: 50%;
            top: calc(100% + 2px);
          }
          100% {
            transform: translateX(0%) translateY(-50%) rotate(360deg);
            left: -2px;
            top: 50%;
          }
        }
        
        .animate-border-beam {
          position: absolute;
          animation: border-beam linear infinite;
          border-radius: 50%;
          filter: blur(1px);
        }
      `}</style>
    </>
  );
};

export default SereneButton;