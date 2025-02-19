import React from 'react';

const features = [
  {
    icon: '🤖',
    title: 'Advanced AI Chat',
    description: 'Engage in natural conversations with our AI assistant for instant help and solutions.'
  },
  {
    icon: '💻',
    title: 'Code Assistance',
    description: 'Get expert help with coding problems, debugging, and best practices.'
  },
  {
    icon: '🚀',
    title: 'Fast Response',
    description: 'Experience lightning-fast responses powered by cutting-edge AI technology.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your conversations and data are encrypted and kept private.'
  },
  {
    icon: '🎯',
    title: 'Accurate Results',
    description: 'Get precise and relevant answers to your questions every time.'
  },
  {
    icon: '🔄',
    title: 'Continuous Learning',
    description: 'Our AI constantly learns and improves to serve you better.'
  }
];

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 hover:border-blue-500/40 transition-all">
    <div className="text-blue-400 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-12">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;