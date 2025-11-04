'use client';

import React, { useEffect, useState } from 'react';

import { Progress } from '@/components/atoms/progress';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0047BB] relative overflow-hidden flex flex-col items-center justify-center px-8">
      <div className="z-10 flex flex-col items-center gap-4 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white z-10">Nomi</h1>
        
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-2 bg-white" />
          <p className="text-white/80 text-center text-sm">{message}</p>
        </div>
      </div>
      
      {/* Curved bottom shape */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px]">
        <svg
          viewBox="0 0 500 200"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,100 Q250,0 500,100 L500,200 L0,200 Z"
            fill="#00BCD4"
          />
        </svg>
      </div>
      <p className="absolute bottom-4 text-white z-10 text-xs font-medium">
        App Version: {process.env.NEXT_PUBLIC_APP_VERSION}
      </p>
    </div>
  );
};

export default LoadingScreen;
