import React from 'react';
const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-[url('/noise.png')]" />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl -top-96 -left-48 animate-slow-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl top-1/2 -right-48 animate-slow-pulse delay-1000" />
        <div className="absolute w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-3xl -bottom-96 -left-48 animate-slow-pulse delay-2000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? 'h-1 w-1 bg-blue-400/30'
                : i % 3 === 1
                ? 'h-2 w-2 bg-indigo-400/20'
                : 'h-3 w-3 bg-purple-400/15'
            }`}
            style={{
              top: `${(i * 5) % 100}%`,
              left: `${(i * 7) % 100}%`,
              animation: `float ${4 + (i % 4)}s infinite ${i * 0.2}s`,
              transform: `scale(${0.8 + (i % 3) * 0.4})`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
            style={{
              top: `${(i * 15) % 90}%`,
              left: `${(i * 20) % 90}%`,
              animation: `shooting-star 4s infinite ${i * 1.5}s linear`,
              transform: `rotate(${45 + (i * 25)}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground; 