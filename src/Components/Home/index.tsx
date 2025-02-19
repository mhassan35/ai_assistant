'use client'
import React from 'react';
import Features from './Features';
import AIChatDemo from './AIChatDemo';
import HeroSection from './HeroSection';

const Home = () => {
  return (
    <div> 
      <HeroSection />
      {/* AI Chat Demo Section */}
      <div className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-12">
            See AI in Action
          </h2>
          <AIChatDemo />
        </div>
      </div>
      <div className='py-16'>
      <Features />
      </div>
    </div>
  );
};

export default Home;
