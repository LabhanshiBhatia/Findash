export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Food & Dining'
  | 'Housing'
  | 'Transport'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Utilities'
  | 'Education'
  | 'Travel'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type Role = 'viewer' | 'admin';

export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  category: Category | 'All';
  type: TransactionType | 'All';
  sortField: SortField;
  sortOrder: SortOrder;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

export interface Insight {
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
