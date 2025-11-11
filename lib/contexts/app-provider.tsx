'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

import { useInitializeUser } from '@/lib/hooks/use-user'
import AddExpenseModal from '@/components/organisms/add-expense-modal';

interface AppContextType {
  isAppLoading: boolean;
  isOpenAddExpense: boolean;
  toggleAppLoading: (loading: boolean) => void;
  toggleAddExpenseModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // initializes hydration of user state
  useInitializeUser();

  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isOpenAddExpense, setIsOpenAddExpense] = useState(false);
  
  const toggleAddExpenseModal = useCallback(() => {
    setIsOpenAddExpense(prev => !prev);
  }, []);

  const toggleAppLoading = useCallback((loading: boolean) => {
    setIsAppLoading(loading);
  }, []);

  return (
    <AppContext.Provider value={{ isAppLoading, isOpenAddExpense, toggleAddExpenseModal, toggleAppLoading }}>
      {children}

      <AddExpenseModal
        isOpen={isOpenAddExpense}
        onClose={toggleAddExpenseModal}
      />
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}
