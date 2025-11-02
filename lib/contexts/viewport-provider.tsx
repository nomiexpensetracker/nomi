'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const DESKTOP_BREAKPOINT = 1024;

interface DesktopContextType {
  isDesktop: boolean;
  isLoading: boolean;
}

const ViewportContext = createContext<DesktopContextType | undefined>(undefined);

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set initial value
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    setIsLoading(false);

    const handleResize = () => {
      const currentIsDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktop(prev => prev !== currentIsDesktop ? currentIsDesktop : prev);
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ isDesktop, isLoading }}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useIsDesktop() {
  const context = useContext(ViewportContext);
  
  if (context === undefined) {
    throw new Error('useIsDesktop must be used within a DesktopProvider');
  }
  
  return context;
}