import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { Category, TransactionType } from '../../types';

const TransactionFilters: React.FC = () => {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const toggleSort = (field: 'date' | 'amount') => {
    if (filters.sortField === field) {
      dispatch({ type: 'SET_SORT', payload: { field, order: filters.sortOrder === 'asc' ? 'desc' : 'asc' } });
    } else {
      dispatch({ type: 'SET_SORT', payload: { field, order: 'desc' } });
    }
  };

  const SortBtn = ({ field, label }: { field: 'date' | 'amount'; label: string }) => (
    <button
      className={`sort-btn ${filters.sortField === field ? 'sort-btn--active' : ''}`}
      onClick={() => toggleSort(field)}
    >
      {label}
      {filters.sortField === field && <span>{filters.sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>}
    </button>
  );

  return (
    <div className="filters-bar">
      <div className="filters-left">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch({ type: 'SET_FILTER_SEARCH', payload: e.target.value })}
          />
          {filters.search && (
            <button className="search-clear" onClick={() => dispatch({ type: 'SET_FILTER_SEARCH', payload: '' })}>✕</button>
          )}
        </div>

        <select
          className="filter-select"
          value={filters.type}
          onChange={e => dispatch({ type: 'SET_FILTER_TYPE', payload: e.target.value as TransactionType | 'All' })}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="filter-select"
          value={filters.category}
          onChange={e => dispatch({ type: 'SET_FILTER_CATEGORY', payload: e.target.value as Category | 'All' })}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="filters-right">
        <span className="sort-label">Sort:</span>
        <SortBtn field="date" label="Date" />
        <SortBtn field="amount" label="Amount" />
        {(filters.search || filters.category !== 'All' || filters.type !== 'All') && (
          <button className="btn btn--ghost btn--sm" onClick={() => dispatch({ type: 'RESET_FILTERS' })}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;
