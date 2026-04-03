import { Transaction, Category } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const MOCK_TRANSACTIONS: Transaction[] = [
  // January
  { id: generateId(), date: '2024-01-03', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: generateId(), date: '2024-01-05', description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense' },
  { id: generateId(), date: '2024-01-07', description: 'Grocery Store', amount: 180, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-01-10', description: 'Netflix Subscription', amount: 18, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2024-01-12', description: 'Freelance Project - WebApp', amount: 1200, category: 'Freelance', type: 'income' },
  { id: generateId(), date: '2024-01-14', description: 'Electricity Bill', amount: 95, category: 'Utilities', type: 'expense' },
  { id: generateId(), date: '2024-01-16', description: 'Uber Rides', amount: 65, category: 'Transport', type: 'expense' },
  { id: generateId(), date: '2024-01-18', description: 'Restaurant Dinner', amount: 120, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-01-20', description: 'Dividend Income', amount: 340, category: 'Investment', type: 'income' },
  { id: generateId(), date: '2024-01-22', description: 'Online Course', amount: 199, category: 'Education', type: 'expense' },
  { id: generateId(), date: '2024-01-25', description: 'Amazon Shopping', amount: 245, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: '2024-01-28', description: 'Doctor Visit', amount: 150, category: 'Healthcare', type: 'expense' },

  // February
  { id: generateId(), date: '2024-02-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: generateId(), date: '2024-02-03', description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense' },
  { id: generateId(), date: '2024-02-06', description: 'Grocery Store', amount: 210, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-02-08', description: 'Freelance - Logo Design', amount: 600, category: 'Freelance', type: 'income' },
  { id: generateId(), date: '2024-02-10', description: 'Valentine\'s Dinner', amount: 195, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-02-12', description: 'Spotify + Apple Music', amount: 28, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2024-02-15', description: 'Internet Bill', amount: 80, category: 'Utilities', type: 'expense' },
  { id: generateId(), date: '2024-02-18', description: 'Gas Station', amount: 75, category: 'Transport', type: 'expense' },
  { id: generateId(), date: '2024-02-20', description: 'Stock Dividend', amount: 420, category: 'Investment', type: 'income' },
  { id: generateId(), date: '2024-02-22', description: 'New Shoes', amount: 165, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: '2024-02-25', description: 'Pharmacy', amount: 55, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: '2024-02-27', description: 'Weekend Trip', amount: 380, category: 'Travel', type: 'expense' },

  // March
  { id: generateId(), date: '2024-03-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: generateId(), date: '2024-03-03', description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense' },
  { id: generateId(), date: '2024-03-05', description: 'Grocery Store', amount: 195, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-03-08', description: 'Freelance - React App', amount: 2400, category: 'Freelance', type: 'income' },
  { id: generateId(), date: '2024-03-10', description: 'Gym Membership', amount: 60, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: '2024-03-12', description: 'Concert Tickets', amount: 230, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2024-03-15', description: 'Electricity Bill', amount: 88, category: 'Utilities', type: 'expense' },
  { id: generateId(), date: '2024-03-18', description: 'Taxi & Rideshare', amount: 90, category: 'Transport', type: 'expense' },
  { id: generateId(), date: '2024-03-20', description: 'ETF Dividend', amount: 510, category: 'Investment', type: 'income' },
  { id: generateId(), date: '2024-03-22', description: 'Laptop Accessories', amount: 320, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: '2024-03-25', description: 'Language Learning App', amount: 79, category: 'Education', type: 'expense' },
  { id: generateId(), date: '2024-03-28', description: 'Business Lunch', amount: 85, category: 'Food & Dining', type: 'expense' },

  // April
  { id: generateId(), date: '2024-04-01', description: 'Monthly Salary', amount: 9000, category: 'Salary', type: 'income' },
  { id: generateId(), date: '2024-04-03', description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense' },
  { id: generateId(), date: '2024-04-06', description: 'Grocery Store', amount: 220, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-04-09', description: 'Freelance - Consulting', amount: 1800, category: 'Freelance', type: 'income' },
  { id: generateId(), date: '2024-04-12', description: 'Spring Clothing', amount: 450, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: '2024-04-14', description: 'Movie Streaming', amount: 22, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2024-04-17', description: 'Water & Gas Bill', amount: 110, category: 'Utilities', type: 'expense' },
  { id: generateId(), date: '2024-04-19', description: 'Train Tickets', amount: 145, category: 'Transport', type: 'expense' },
  { id: generateId(), date: '2024-04-21', description: 'Portfolio Dividend', amount: 380, category: 'Investment', type: 'income' },
  { id: generateId(), date: '2024-04-24', description: 'Dentist Appointment', amount: 220, category: 'Healthcare', type: 'expense' },
  { id: generateId(), date: '2024-04-27', description: 'Easter Weekend Travel', amount: 620, category: 'Travel', type: 'expense' },

  // May
  { id: generateId(), date: '2024-05-01', description: 'Monthly Salary', amount: 9000, category: 'Salary', type: 'income' },
  { id: generateId(), date: '2024-05-03', description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense' },
  { id: generateId(), date: '2024-05-06', description: 'Grocery Store', amount: 175, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-05-08', description: 'Freelance - API Project', amount: 3200, category: 'Freelance', type: 'income' },
  { id: generateId(), date: '2024-05-11', description: 'Gaming Subscription', amount: 15, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2024-05-14', description: 'Electricity Bill', amount: 72, category: 'Utilities', type: 'expense' },
  { id: generateId(), date: '2024-05-16', description: 'Metro Card Top-up', amount: 60, category: 'Transport', type: 'expense' },
  { id: generateId(), date: '2024-05-18', description: 'Stock Dividend', amount: 495, category: 'Investment', type: 'income' },
  { id: generateId(), date: '2024-05-20', description: 'Restaurant Week', amount: 280, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-05-22', description: 'Tech Books & Courses', amount: 135, category: 'Education', type: 'expense' },
  { id: generateId(), date: '2024-05-25', description: 'Home Decor', amount: 195, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: '2024-05-28', description: 'Annual Health Checkup', amount: 340, category: 'Healthcare', type: 'expense' },

  // June
  { id: generateId(), date: '2024-06-01', description: 'Monthly Salary', amount: 9000, category: 'Salary', type: 'income' },
  { id: generateId(), date: '2024-06-03', description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense' },
  { id: generateId(), date: '2024-06-06', description: 'Grocery Store', amount: 205, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2024-06-10', description: 'Freelance - Dashboard UI', amount: 2800, category: 'Freelance', type: 'income' },
  { id: generateId(), date: '2024-06-13', description: 'Summer Festival', amount: 185, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2024-06-15', description: 'AC & Utilities', amount: 130, category: 'Utilities', type: 'expense' },
  { id: generateId(), date: '2024-06-18', description: 'Rideshare', amount: 88, category: 'Transport', type: 'expense' },
  { id: generateId(), date: '2024-06-20', description: 'Quarterly Dividend', amount: 720, category: 'Investment', type: 'income' },
  { id: generateId(), date: '2024-06-22', description: 'Summer Wardrobe', amount: 520, category: 'Shopping', type: 'expense' },
  { id: generateId(), date: '2024-06-25', description: 'European Vacation', amount: 2400, category: 'Travel', type: 'expense' },
  { id: generateId(), date: '2024-06-28', description: 'Coffee Shops', amount: 95, category: 'Food & Dining', type: 'expense' },
];

export const CATEGORIES: Category[] = [
  'Salary', 'Freelance', 'Investment',
  'Food & Dining', 'Housing', 'Transport',
  'Entertainment', 'Healthcare', 'Shopping',
  'Utilities', 'Education', 'Travel', 'Other'
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Salary': '#f59e0b',
  'Freelance': '#10b981',
  'Investment': '#6366f1',
  'Food & Dining': '#ef4444',
  'Housing': '#8b5cf6',
  'Transport': '#3b82f6',
  'Entertainment': '#ec4899',
  'Healthcare': '#14b8a6',
  'Shopping': '#f97316',
  'Utilities': '#64748b',
  'Education': '#06b6d4',
  'Travel': '#84cc16',
  'Other': '#a8a29e',
};
