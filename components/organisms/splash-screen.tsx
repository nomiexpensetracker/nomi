'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0047BB] relative overflow-hidden flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white z-10">Nomi</h1>
      
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

export default SplashScreen;
