import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Transaction, Role, FilterState, Category, TransactionType, SortField, SortOrder } from '../types';
import { MOCK_TRANSACTIONS } from '../data/mockData';

interface AppState {
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
  activeTab: 'dashboard' | 'transactions' | 'insights';
  filters: FilterState;
}

type Action =
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_TAB'; payload: AppState['activeTab'] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTER_SEARCH'; payload: string }
  | { type: 'SET_FILTER_CATEGORY'; payload: Category | 'All' }
  | { type: 'SET_FILTER_TYPE'; payload: TransactionType | 'All' }
  | { type: 'SET_SORT'; payload: { field: SortField; order: SortOrder } }
  | { type: 'RESET_FILTERS' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'All',
  type: 'All',
  sortField: 'date',
  sortOrder: 'desc',
};

const INITIAL_STATE: AppState = {
  transactions: MOCK_TRANSACTIONS,
  role: 'admin',
  darkMode: true,
  activeTab: 'dashboard',
  filters: DEFAULT_FILTERS,
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOAD_STATE': return { ...state, ...action.payload };
    case 'SET_ROLE': return { ...state, role: action.payload };
    case 'TOGGLE_DARK_MODE': return { ...state, darkMode: !state.darkMode };
    case 'SET_TAB': return { ...state, activeTab: action.payload };
    case 'ADD_TRANSACTION': return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION': return {
      ...state,
      transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t),
    };
    case 'DELETE_TRANSACTION': return {
      ...state,
      transactions: state.transactions.filter(t => t.id !== action.payload),
    };
    case 'SET_FILTER_SEARCH': return { ...state, filters: { ...state.filters, search: action.payload } };
    case 'SET_FILTER_CATEGORY': return { ...state, filters: { ...state.filters, category: action.payload } };
    case 'SET_FILTER_TYPE': return { ...state, filters: { ...state.filters, type: action.payload } };
    case 'SET_SORT': return { ...state, filters: { ...state.filters, sortField: action.payload.field, sortOrder: action.payload.order } };
    case 'RESET_FILTERS': return { ...state, filters: DEFAULT_FILTERS };
    default: return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('findash-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: { transactions: parsed.transactions, role: parsed.role, darkMode: parsed.darkMode } });
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('findash-state', JSON.stringify({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
      }));
    } catch {}
  }, [state.transactions, state.role, state.darkMode]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
