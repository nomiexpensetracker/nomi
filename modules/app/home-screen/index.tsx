'use client'

import { useState } from 'react';
import { useAppIntro } from '@/lib/hooks/use-intro';

import IntroCarousel from '@/components/organisms/intro-carousel';
import LoadingScreen from '@/components/organisms/loading-screen';
import AddExpenseModal from '@/components/organisms/add-expense-modal';
import UserOverview from '@/components/organisms/user-overview';
import ExpenseChart from '@/components/organisms/expense-chart';
import ExpensesTabs from '@/components/organisms/expense-tabs';
import BottomNavigation from '@/components/organisms/menu-navigation';

const HomeScreen: React.FC = () => {
  const { hasSeenIntro, markIntroAsSeen, isLoading } = useAppIntro();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!hasSeenIntro) {
    return <IntroCarousel onComplete={markIntroAsSeen} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* User Overview Section */}
      <UserOverview
        userName="John Doe"
        totalAmount={9999.99}
        onViewDetail={() => {/* TODO: Implement view detail */}}
      />

      {/* Expense Chart Section */}
      <ExpenseChart expenses={[]} />

      {/* Expenses List with Tabs Section */}
      <ExpensesTabs expenses={[]} onDeleteExpense={() => {}} />

      {/* Bottom Navigation */}
      <BottomNavigation onAddExpense={() => setIsAddModalOpen(true)} />

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExpense={(expense) => {
          console.log(expense);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}

export default HomeScreen;