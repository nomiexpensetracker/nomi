import React from 'react';
import { Home, Target, Plus, RefreshCcw, Menu } from 'lucide-react';

interface BottomNavigationProps {
  onAddExpense: () => void;
}

const MenuNavigation: React.FC<BottomNavigationProps> = ({ onAddExpense }) => {
  const [activeTab, setActiveTab] = React.useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'add', icon: Plus, label: 'Add' },
    { id: 'recurring', icon: RefreshCcw, label: 'Recurring' },
    { id: 'more', icon: Menu, label: 'More' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'add') {
      onAddExpense();
    } else {
      setActiveTab(id);
    }
  };

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
                onClick={() => handleNavClick(item.id)}
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
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                isActive ? 'text-[#0047BB]' : 'text-gray-400'
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
