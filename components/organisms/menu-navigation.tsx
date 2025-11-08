'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LucideHome, DollarSignIcon, Plus, RefreshCcw, Menu } from 'lucide-react';

import { useAppIntro } from '@/lib/hooks/use-intro';

import IntroCarousel from '@/components/organisms/intro-carousel';

interface NavItem {
  id: string
  url: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}

const MenuNavigation: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { hasSeenIntro } = useAppIntro();

  const [activeTab, setActiveTab] = useState('home');

  const noNavbarRoutes = ['/app/more/pricing', '/app/more/subscription'];

  const navItems: NavItem[] = [
    { id: 'home', url: '/app', icon: LucideHome, label: 'Home' },
    { id: 'expenses', url: '/app/expenses', icon: DollarSignIcon, label: 'Expenses' },
    { id: 'add', url: '#', icon: Plus, label: 'Add' },
    { id: 'recurring', url: '/app/recurring', icon: RefreshCcw, label: 'Recurring' },
    { id: 'more', url: '/app/more', icon: Menu, label: 'More' },
  ];

  const handleNavClick = (data: NavItem) => {
    if (data.id === 'add') {
      // !TODO: Implement add expense action with context
    } else {
      setActiveTab(data.id);
      router.push(data.url);
    }
  };

  if (!hasSeenIntro || noNavbarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isAddButton = item.id === 'add';

          if (isAddButton) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center justify-center -mt-12"
              >
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full p-4 shadow-lg">
                  <Icon size={24} className="text-white" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                isActive ? 'text-[#0047BB] font-semibold' : 'text-gray-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuNavigation;
