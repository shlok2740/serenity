"use client";
import React from "react";

export default function AuroraText() {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, #FF0080, #7928CA, #0070F3, #38bdf8, #FF0080)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animationDuration: "10s",
  };

  return (
    <h1 className="tracking-tight text-4xl sm:text-5xl lg:text-6xl font-bold">
      <span className="relative inline-block">
        <span className="sr-only">Inner Peace</span>
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          Inner Peace
        </span>
      </span>
    </h1>
  );
}