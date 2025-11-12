export interface GetExpenseCountRequest {
  month: string;
}

export interface Expense {
  id: string
  amount: number
  user_id: string
  category: string
  user_name: string
  created_at: string
  updated_at: string
  description: string
  currency_code: string
  is_recurring: boolean
  transaction_date: string
}

interface ExpenseCountBase {
  month: string
  total_amount: number
}

export interface UserExpenseCount extends ExpenseCountBase {
  user_id: string
}

export interface CoupleExpenseCount extends ExpenseCountBase {
  family_id: string
}

export interface FamilyExpenseCount extends ExpenseCountBase {
  scope_id: string
}