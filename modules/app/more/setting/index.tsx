'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Heart } from 'lucide-react';

import { settingsMenu } from './helper';

const SettingsScreen: React.FC = () => {
  return (
    <>
      {/* Content */}
      <div className="px-6 py-6 space-y-4 mt-20">
        {/* Primary Settings Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
          {settingsMenu
            .filter(item => item.type === 'primary')
            .map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
        </div>

        {/* Relationship Mode Card */}
        <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />
          <button
            className="relative w-full flex items-start gap-3 text-left"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-500 font-semibold mb-1">Relationship Mode</h3>
              <p className="text-gray-700 text-sm">
                Choose the mode that best fits your needs
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400 flex-shrink-0 mt-3" />
          </button>
        </div>

        {/* Normal Settings Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
          {settingsMenu
            .filter(item => item.type !== 'primary')
            .map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  {item.type === 'normal' && (
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">{item.label}</span>
                  </div>
                  )}
                  {item.type === 'danger' && (
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">{item.label}</span>
                  </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SettingsScreen;
