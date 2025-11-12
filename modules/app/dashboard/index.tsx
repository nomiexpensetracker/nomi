'use client'

import { useRouter } from 'next/navigation';

import { useStore } from '@/lib/stores';
import { createClient } from '@/lib/supabase/client';
import { useAppContext } from '@/lib/contexts/app-provider';

import ExpensesTabs from '@/components/organisms/expense-tabs';
import UserOverview from '@/components/organisms/user-overview';
import ExpenseChart from '@/components/organisms/expense-chart';
import LoadingScreen from '@/components/organisms/loading-screen';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const { isAppLoading } = useAppContext();
  const { user: { data } } = useStore();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push('/')
  };

  if (isAppLoading) {
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