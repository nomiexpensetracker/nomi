'use client'

import { Smartphone, Monitor } from 'lucide-react';

import { useIsDesktop } from '@/lib/contexts/viewport-provider';

const MobileOnlyScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDesktop, isLoading } = useIsDesktop();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isDesktop) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-2xl p-8 text-center space-y-6">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Monitor className="w-12 h-12 text-muted-foreground/50" />
          <div className="text-4xl text-muted-foreground/50">→</div>
          <Smartphone className="w-12 h-12 text-primary animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-muted-foreground">
            Mobile Only 📱
          </h1>
          <p className="text-lg text-muted-foreground">
            This app is optimized for mobile devices
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            For the best experience, please access this app on:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>📱 Your smartphone</li>
            <li>📲 Your tablet</li>
            <li>💻 Or resize your browser to mobile view</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Current screen width is too large. Please switch to a mobile device or reduce your browser width below 1024px.
          </p>
        </div>
      </div>
    </div>
    );
  }

  return <>{children}</>;
}

export default MobileOnlyScreen;