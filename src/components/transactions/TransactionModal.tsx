import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../../types';
import { CATEGORIES } from '../../data/mockData';

interface TransactionModalProps {
  transaction?: Transaction | null;
  onSave: (t: Transaction) => void;
  onClose: () => void;
}

const empty = (): Omit<Transaction, 'id'> => ({
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: 0,
  category: 'Food & Dining',
  type: 'expense',
});

const TransactionModal: React.FC<TransactionModalProps> = ({ transaction, onSave, onClose }) => {
  const [form, setForm] = useState<Omit<Transaction, 'id'>>(empty());

  useEffect(() => {
    if (transaction) {
      const { id, ...rest } = transaction;
      setForm(rest);
    } else {
      setForm(empty());
    }
  }, [transaction]);

  const set = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.description || form.amount <= 0) return;
    onSave({
      ...form,
      id: transaction?.id ?? Math.random().toString(36).substr(2, 9),
      amount: Number(form.amount),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{transaction ? 'Edit Transaction' : 'New Transaction'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-toggle">
              {(['expense', 'income'] as TransactionType[]).map(t => (
                <button
                  key={t}
                  className={`type-btn type-btn--${t} ${form.type === t ? 'type-btn--active' : ''}`}
                  onClick={() => set('type', t)}
                >
                  {t === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              className="form-input"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="e.g. Monthly Salary"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount ($)</label>
              <input
                className="form-input"
                type="number"
                min="0"
                value={form.amount || ''}
                onChange={e => set('amount', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                className="form-input"
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.category} onChange={e => set('category', e.target.value as Category)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSubmit}>
            {transaction ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
