export type AppMode = 'Single' | 'Couple' | 'Family';

export type Category = 'Food' | 'Bills' | 'Transport' | 'Entertainment' | 'Others';

export interface Expense {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: Category;
  notes?: string;
}