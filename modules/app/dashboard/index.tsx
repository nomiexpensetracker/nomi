'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useStore } from '@/lib/stores';
import { createClient } from '@/lib/supabase/client';

import ExpensesTabs from '@/components/organisms/expense-tabs';
import UserOverview from '@/components/organisms/user-overview';
import ExpenseChart from '@/components/organisms/expense-chart';
import LoadingScreen from '@/components/organisms/loading-screen';
import AddExpenseModal from '@/components/organisms/add-expense-modal';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const { user: { data } } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push('/')
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* User Overview Section */}
      <UserOverview
        userName={data?.name || 'User'}
        totalAmount={9999.99}
        onLogout={handleLogout}
        onViewDetail={() => {/* TODO: Implement view detail */}}
      />

      {/* Expense Chart Section */}
      <ExpenseChart expenses={[]} />

      {/* Expenses List with Tabs Section */}
      <ExpensesTabs expenses={[]} onDeleteExpense={() => {}} />
    </div>
  );
}

export default Dashboard;