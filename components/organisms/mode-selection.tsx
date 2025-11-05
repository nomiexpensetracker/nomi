
import React from 'react';
import { User, Users, UsersRound } from 'lucide-react';

import { AppMode } from '@/types/common';

const ModeSelection: React.FC = () => {
  const modes = [
    {
      type: 'Single' as AppMode,
      icon: User,
      title: 'Single',
      description: 'Track your personal expenses',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      type: 'Couple' as AppMode,
      icon: Users,
      title: 'Couple',
      description: 'Manage expenses together',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      type: 'Family' as AppMode,
      icon: UsersRound,
      title: 'Family',
      description: 'Track family expenses',
      gradient: 'from-green-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Choose your tracking mode</p>
        </div>
        
        <div className="space-y-4">
          {modes.map((mode) => (
            <button
              key={mode.type}
              className="w-full p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${mode.gradient} text-white group-hover:scale-110 transition-transform duration-200`}>
                  <mode.icon size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{mode.title}</h3>
                  <p className="text-gray-600 text-sm">{mode.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;
