'use client';

import React from 'react';

import { Card } from '@/components/atoms/card';
import { RecurringItem } from '@/types/common';

interface RecurringScreenProps {
  recurringItems?: RecurringItem[];
}

// Mock data for now
const mockRecurringItems: RecurringItem[] = [
  {
    id: '1',
    name: 'Spotify',
    amount: 5.00,
    type: 'subscription',
    date: 'Nov 2, 2022',
    iconBg: 'bg-green-500',
    iconText: '🎵'
  },
  {
    id: '2',
    name: 'Netflix',
    amount: 11.00,
    type: 'subscription',
    date: 'Oct 25',
    iconBg: 'bg-red-600',
    iconText: 'N'
  },
  {
    id: '3',
    name: 'Apple Arcade',
    amount: 8.50,
    type: 'subscription',
    date: 'Nov 2, 2022',
    iconBg: 'bg-orange-400',
    iconText: '🎮'
  },
  {
    id: '4',
    name: 'Youtube Premium',
    amount: 7.30,
    type: 'subscription',
    date: 'Nov 2, 2022',
    iconBg: 'bg-red-500',
    iconText: '▶'
  },
  {
    id: '5',
    name: 'Home Rent',
    amount: 10.00,
    type: 'bill',
    date: 'Nov 2, 2022',
    iconBg: 'bg-indigo-500',
    iconText: 'Ho'
  },
  {
    id: '6',
    name: 'School',
    amount: 10.00,
    type: 'bill',
    date: 'Oct 25',
    iconBg: 'bg-yellow-500',
    iconText: 'Sc'
  },
];

const Recurring: React.FC<RecurringScreenProps> = ({ 
  recurringItems = mockRecurringItems 
}) => {
  const bills = recurringItems.filter(item => item.type === 'bill');
  const subscriptions = recurringItems.filter(item => item.type === 'subscription');
  
  const totalRecurring = recurringItems.reduce((sum, item) => sum + item.amount, 0);
  const totalSubscriptions = subscriptions.reduce((sum, item) => sum + item.amount, 0);
  const totalBills = bills.reduce((sum, item) => sum + item.amount, 0);

  const renderRecurringItem = (item: RecurringItem) => (
    <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center text-white font-semibold text-lg`}>
          {item.iconText}
        </div>
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">{item.date}</p>
        </div>
      </div>
      <p className="font-semibold text-gray-900 text-lg">${item.amount.toFixed(2)}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-[#0047BB] to-[#0066FF] text-white px-6 pt-12 pb-8 rounded-b-[32px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-400/30 to-transparent rounded-full blur-3xl" />
        
        <div className="relative">
          <h1 className="text-xl font-medium text-center mb-8">Recurring</h1>
          
          <div className="mb-2">
            <p className="text-white/70 text-sm font-medium mb-1">TOTAL RECURRING</p>
            <p className="text-5xl font-bold">${totalRecurring.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-900 font-medium">
            {subscriptions.length} TOTAL SUBSCRIPTIONS
          </p>
          <p className="text-sm text-gray-900 font-medium">
            ${totalSubscriptions.toFixed(2)}
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="divide-y">
            {subscriptions.map(renderRecurringItem)}
          </div>
        </Card>
      </div>

      {/* Bills Section */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-900 font-medium">
            {bills.length} TOTAL BILLS
          </p>
          <p className="text-sm text-gray-900 font-medium">
            ${totalBills.toFixed(2)}
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="divide-y">
            {bills.map(renderRecurringItem)}
          </div>
        </Card>
      </div>

      {/* Last sync info */}
      <p className="text-center text-sm text-gray-400 mt-6">
        Last sync 3 mins ago
      </p>
    </div>
  );
};

export default Recurring;
