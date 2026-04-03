import { Transaction, MonthlyData, CategoryData, FilterState } from '../types';

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const formatShortDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const getMonthKey = (dateStr: string): string => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthLabel = (key: string): string => {
  const [year, month] = key.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

export const computeMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const map: Record<string, { income: number; expenses: number }> = {};
  transactions.forEach(t => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { income: 0, expenses: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });

  let runningBalance = 0;
  return Object.keys(map).sort().map(key => {
    runningBalance += map[key].income - map[key].expenses;
    return {
      month: getMonthLabel(key),
      income: map[key].income,
      expenses: map[key].expenses,
      balance: runningBalance,
    };
  });
};

export const computeCategoryExpenses = (transactions: Transaction[]): CategoryData[] => {
  const map: Record<string, number> = {};
  const total = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount, percentage: total > 0 ? (amount / total) * 100 : 0 }))
    .sort((a, b) => b.amount - a.amount);
};

export const getTotalBalance = (transactions: Transaction[]): number =>
  transactions.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);

export const getTotalIncome = (transactions: Transaction[]): number =>
  transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

export const getTotalExpenses = (transactions: Transaction[]): number =>
  transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

export const applyFilters = (transactions: Transaction[], filters: FilterState): Transaction[] => {
  return transactions
    .filter(t => {
      const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === 'All' || t.category === filters.category;
      const matchType = filters.type === 'All' || t.type === filters.type;
      return matchSearch && matchCategory && matchType;
    })
    .sort((a, b) => {
      const mult = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortField === 'date') return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mult * (a.amount - b.amount);
    });
};

export const exportToCSV = (transactions: Transaction[]): void => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t => [t.date, t.description, t.category, t.type, t.amount.toString()]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'transactions.csv'; a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions: Transaction[]): void => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'transactions.json'; a.click();
  URL.revokeObjectURL(url);
};
