import React from 'react';
import { useApp } from '../../context/AppContext';
import { applyFilters, exportToCSV, exportToJSON } from '../../utils';
import TransactionFilters from '../transactions/TransactionFilters';
import TransactionList from '../transactions/TransactionList';

const TransactionsPage: React.FC = () => {
  const { state } = useApp();
  const filtered = applyFilters(state.transactions, state.filters);

  return (
    <div className="page-layout">
      <div className="page-actions">
        <TransactionFilters />
        <div className="export-row">
          <button className="btn btn--ghost btn--sm" onClick={() => exportToCSV(filtered)}>↓ CSV</button>
          <button className="btn btn--ghost btn--sm" onClick={() => exportToJSON(filtered)}>↓ JSON</button>
        </div>
      </div>
      <TransactionList transactions={filtered} />
    </div>
  );
};

export default TransactionsPage;
