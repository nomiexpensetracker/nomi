export type AppMode = 'Single' | 'Couple' | 'Family';
export type Category = 'Food' | 'Bills' | 'Transport' | 'Entertainment' | 'Others';
export type RecurringType = 'subscription' | 'bill';

export interface Expense {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: Category;
  notes?: string;
}

export interface RecurringItem {
  id: string;
  name: string;
  amount: number;
  type: RecurringType;
  date: string;
  icon?: string;
  iconBg?: string;
  iconText?: string;
}

export interface CommonResponse {
  message: string
  success: boolean
}