
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/atoms/button';

const FreePlanOverview: React.FC = () => {
  const features = [
    {
      icon: Check,
      text: 'Track expenses as an individual or couple',
      type: 'included' as const,
    },
    {
      icon: AlertTriangle,
      text: 'Limited to 10 new expenses per day',
      type: 'limited' as const,
    },
    {
      icon: AlertTriangle,
      text: 'No recurring transaction automation',
      type: 'limited' as const,
    },
    {
      icon: AlertTriangle,
      text: 'No e-statement reports or monthly summaries',
      type: 'limited' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              You're on the Free Plan 🎉
            </h1>
            <p className="text-gray-600">
              Here's what you get with your current plan:
            </p>
          </div>

          {/* Features List */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    feature.type === 'included' 
                      ? 'bg-green-100' 
                      : 'bg-orange-100'
                  }`}>
                    <feature.icon 
                      size={16} 
                      className={
                        feature.type === 'included' 
                          ? 'text-green-600' 
                          : 'text-orange-600'
                      } 
                    />
                  </div>
                  <span className="text-gray-700 flex-1">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl"
            >
              Got it, take me in
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700 hover:text-purple-700 font-semibold rounded-2xl"
            >
              See Premium Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreePlanOverview;
