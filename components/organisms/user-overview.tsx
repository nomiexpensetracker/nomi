import React from 'react';
import { Bell, Wallet, LogOut } from 'lucide-react';

import { Button } from '@/components/atoms/button';

interface UserOverviewProps {
  userName: string;
  totalAmount: number;
  onLogout: () => void;
  onViewDetail: () => void;
}

const UserOverview: React.FC<UserOverviewProps> = ({ userName, totalAmount, onLogout, onViewDetail }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-br from-[#0047BB] to-[#0066FF] text-white px-6 py-8 rounded-b-3xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Hi, {userName}</h1>
          <p className="text-white/70 text-sm">{getGreeting()}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={onLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-cyan-400 p-3 rounded-xl">
            <Wallet size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Total Amount</p>
            <p className="text-3xl font-bold">${totalAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
        </div>
        <Button 
          onClick={onViewDetail}
          variant="secondary"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          View detail
        </Button>
      </div>
    </div>
  );
};

export default UserOverview;
