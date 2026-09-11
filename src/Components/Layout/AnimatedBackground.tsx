'use client';

import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.12] animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.12] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.10] animate-blob animation-delay-4000" />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020617]/40 to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
