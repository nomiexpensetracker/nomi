'use client'

import { useRouter } from 'next/navigation';
import { useAppIntro } from '@/lib/hooks/use-intro';

import useExpense from '@/lib/hooks/use-expense';
import { useStore } from '@/lib/stores';
import { createClient } from '@/lib/supabase/client';

import ExpensesTabs from '@/components/organisms/expense-tabs';
import UserOverview from '@/components/organisms/user-overview';
import ExpenseChart from '@/components/organisms/expense-chart';
import IntroCarousel from '@/components/organisms/intro-carousel';
import LoadingScreen from '@/components/organisms/loading-screen';

const HomeScreen: React.FC = () => {
  const router = useRouter()

  const user = useStore((state) => state.user);

  const { hasSeenIntro, markIntroAsSeen, isLoading } = useAppIntro();

  const { isLoading: isExpenseLoading, expenseCount } = useExpense();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push('/')
  };

  if (isLoading || isExpenseLoading) {
    return <LoadingScreen />
  }

  if (!hasSeenIntro) {
    return <IntroCarousel onComplete={markIntroAsSeen} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* User Overview Section */}
      <UserOverview
        userName={user.data?.name || 'User'}
        onLogout={handleLogout}
        totalAmount={expenseCount}
        onViewDetail={() => {/* TODO: Implement view detail */}}
      />

      {/* Expense Chart Section */}
      <ExpenseChart expenses={[]} />

      {/* Expenses List with Tabs Section */}
      <ExpensesTabs expenses={[]} onDeleteExpense={() => {}} />
    </div>
  );
}

export default HomeScreen;