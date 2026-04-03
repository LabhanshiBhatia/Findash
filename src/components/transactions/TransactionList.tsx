import React, { useState } from 'react';
import { Transaction } from '../../types';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils';
import { useApp } from '../../context/AppContext';
import TransactionModal from './TransactionModal';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const { state, dispatch } = useApp();
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const isAdmin = state.role === 'admin';

  const handleSave = (t: Transaction) => {
    if (editTx) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: t });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: t });
    }
    setShowModal(false);
    setEditTx(null);
  };

  const handleEdit = (t: Transaction) => {
    setEditTx(t);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditTx(null);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  return (
    <>
      <div className="tx-list-header">
        <span className="tx-count">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
        {isAdmin && (
          <button className="btn btn--primary" onClick={handleAdd}>
            + Add Transaction
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◎</div>
          <div className="empty-title">No transactions found</div>
          <div className="empty-sub">Try adjusting your filters</div>
        </div>
      ) : (
        <div className="tx-table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th className="align-right">Amount</th>
                {isAdmin && <th className="align-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="tx-row">
                  <td className="tx-date">{formatDate(t.date)}</td>
                  <td className="tx-desc">{t.description}</td>
                  <td>
                    <span
                      className="tx-category-badge"
                      style={{ background: `${CATEGORY_COLORS[t.category]}22`, color: CATEGORY_COLORS[t.category] }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`tx-type-badge tx-type-badge--${t.type}`}>
                      {t.type === 'income' ? '↑' : '↓'} {t.type}
                    </span>
                  </td>
                  <td className={`tx-amount tx-amount--${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  {isAdmin && (
                    <td className="tx-actions">
                      <button className="action-btn action-btn--edit" onClick={() => handleEdit(t)}>✎</button>
                      <button className="action-btn action-btn--delete" onClick={() => handleDelete(t.id)}>✕</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <TransactionModal
          transaction={editTx}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTx(null); }}
        />
      )}
    </>
  );
};

export default TransactionList;
