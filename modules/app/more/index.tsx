'use client';

import Link from 'next/link';
import React from 'react';
import {
  Gem,
  Info,
  Phone,
  Wallet,
  UserPlus,
  LifeBuoy,
  MessageSquareMore,
  Settings as SettingsIcon,
} from 'lucide-react';

import { useStore } from '@/lib/stores';

const Settings: React.FC = () => {
  const { user: { data } } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with User Info */}
      <div className="bg-gradient-to-br from-[#0047BB] to-[#00A3E0] px-6 pt-12 pb-8 relative overflow-hidden min-h-40">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-white/10 rounded-full translate-y-1/2" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-semibold">
              {data && data.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">{data?.name}</h2>
              <p className="text-white/80 text-sm">{data?.email}</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">Free Plan</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4">
        {/* Referral Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm -mt-8 z-10 relative">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
              <UserPlus className="w-6 h-6 text-cyan-500" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-1">
                Earn $5 for every new people join you refer. <span className="text-cyan-500 font-medium">Learn more</span>
              </p>
            </div>
          </div>
        </div>

        {/* My Wallet */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-900 font-medium">My Wallet</span>
            <Wallet className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Setting */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link href='/app/more/setting' className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-900 font-medium">Setting</span>
            <SettingsIcon className="w-5 h-5 text-gray-400" />
          </Link>
        </div>

        {/* Subscription Card */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Gem className="w-6 h-6 text-cyan-500" />
            </div>
            <Link href="/app/more/pricing" className="flex-1">
              <h3 className="text-cyan-500 font-semibold mb-1">Subscription</h3>
              <p className="text-gray-700 text-sm">
                Choose our best plan that fit with your need
              </p>
            </Link>
          </div>
        </div>

        {/* Help and support section */}
        <div className="pt-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider px-2 mb-3">
            Help and support
          </p>
          
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-gray-900 font-medium">Help center</span>
              <LifeBuoy className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-gray-900 font-medium">Feedback</span>
              <MessageSquareMore className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-gray-900 font-medium">Contact us</span>
              <Phone className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-gray-900 font-medium">About</span>
              <Info className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
