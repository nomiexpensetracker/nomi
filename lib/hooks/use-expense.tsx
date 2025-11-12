'use client';

import { startOfMonth } from 'date-fns'
import { useCallback, useEffect, useState } from "react";

import { toast } from '@/lib/hooks/use-toast';
import { useStore } from "@/lib/stores";
import {
  onGetUserExpenseList,
  onGetCoupleExpenseList,
  onGetUserExpensesCount,
  onGetFamilyExpenseList,
  onGetFamilyExpensesCount,
  onGetCoupleExpensesCount,
} from '@/lib/services/expense';

import { Expense } from '@/types/expenses';
import { RelationshipMode } from '@/types/common';

const useExpense = () => {
  const user = useStore((state) => state.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [expenseCount, setExpenseCount] = useState<number>(0);

  const fetchExpensesData = useCallback(async () => {
    if (!user.data) return;

    setIsLoading(true);
    try {
      if (user.data) {
        const month = startOfMonth(new Date()).toISOString();

        if (user.data.mode === RelationshipMode.Single) {
          const userExpenseList = await onGetUserExpenseList();
          const userExpensesCount = await onGetUserExpensesCount({ month });

          if (!userExpenseList.status || !userExpensesCount.status) {
            throw new Error(userExpenseList.message || userExpensesCount.message);
          }

          if (!userExpenseList.data || !userExpensesCount.data) {
            throw new Error('Failed to fetch user expenses data');
          }

          setExpenseList(userExpenseList.data || []);
          setExpenseCount(userExpensesCount.data.total_amount || 0);
        }

        if (user.data.mode === RelationshipMode.Couple) {
          const coupleExpenseList = await onGetCoupleExpenseList();
          const coupleExpensesCount = await onGetCoupleExpensesCount({ month });

          if (!coupleExpenseList.status || !coupleExpensesCount.status) {
            throw new Error(coupleExpenseList.message || coupleExpensesCount.message);
          }

          if (!coupleExpenseList.data || !coupleExpensesCount.data) {
            throw new Error('Failed to fetch couple expenses data');
          }

          setExpenseList(coupleExpenseList.data || []);
          setExpenseCount(coupleExpensesCount.data.total_amount || 0);
        }

        if (user.data.mode === RelationshipMode.Family) {
          const familyExpenseList = await onGetFamilyExpenseList();
          const familyExpensesCount = await onGetFamilyExpensesCount({ month });

          if (!familyExpenseList.status || !familyExpensesCount.status) {
            throw new Error(familyExpenseList.message || familyExpensesCount.message);
          }

          if (!familyExpenseList.data || !familyExpensesCount.data) {
            throw new Error('Failed to fetch family expenses data');
          }
          
          setExpenseList(familyExpenseList.data || []);
          setExpenseCount(familyExpensesCount.data.total_amount || 0);
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: (error as Error).message || 'An error occurred while fetching expenses data.',
      })
    } finally {
      setIsLoading(false);
    }
  }, [user.data]);

  useEffect(() => {
    let isMounted = true
    if (isMounted) fetchExpensesData()
    return () => {
      isMounted = false
    }
  }, [fetchExpensesData]);

  return {
    isLoading,
    expenseList,
    expenseCount,
    refetchData: fetchExpensesData,
  };
};

export default useExpense;