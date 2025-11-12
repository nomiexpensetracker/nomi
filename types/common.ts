export enum RelationshipMode {
  Single = 'single',
  Couple = 'couple',
  Family = 'family',
}
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

export interface GetDataResultPagination<T> {
  data: T;
  status: boolean;
  message: string;
  totalData: number;
  totalPages: number;
}

export interface GetDataResult<T> {
  data: T;
  status: boolean;
  message: string;
}

export interface GetDataResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'in'
  | 'is'
  | 'or'
  | 'not'
  | 'contains';

export interface FilterOption {
  value: string[] | number[] | string | number | null | undefined | boolean;
  column: string;
  operator: FilterOperator;
  referencedTable?: string;
}

export interface FilterEqOption {
  value: string[] | number[] | string | number | null | undefined;
  column: string;
}
