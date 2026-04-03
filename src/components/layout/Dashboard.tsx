import React from 'react';
import { useApp } from '../../context/AppContext';
import SummaryCards from '../ui/SummaryCards';
import BalanceChart from '../charts/BalanceChart';
import CategoryChart from '../charts/CategoryChart';
import {
  computeMonthlyData,
  computeCategoryExpenses,
  getTotalBalance,
  getTotalIncome,
  getTotalExpenses,
  exportToCSV,
  exportToJSON,
  formatCurrency,
  formatShortDate,
} from '../../utils';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useApp();
  const { transactions } = state;

  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const totalBalance = getTotalBalance(transactions);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const monthlyData = computeMonthlyData(transactions);
  const categoryData = computeCategoryExpenses(transactions);

  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="dashboard-layout">
      <SummaryCards
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        savingsRate={savingsRate}
      />

      <div className="charts-row">
        <BalanceChart data={monthlyData} />
        <CategoryChart data={categoryData} />
      </div>

      <div className="dashboard-bottom">
        <div className="recent-tx-card">
          <div className="chart-header">
            <h3 className="chart-title">Recent Transactions</h3>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => dispatch({ type: 'SET_TAB', payload: 'transactions' })}
            >
              View all →
            </button>
          </div>
          <div className="recent-tx-list">
            {recentTx.map(t => (
              <div key={t.id} className="recent-tx-row">
                <div className="recent-tx-info">
                  <span className="recent-tx-desc">{t.description}</span>
                  <span className="recent-tx-cat">{t.category}</span>
                </div>
                <span className={`recent-tx-amount recent-tx-amount--${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="export-card">
          <div className="chart-header">
            <h3 className="chart-title">Export Data</h3>
          </div>
          <p className="export-desc">Download your transaction history for offline analysis or reporting.</p>
          <div className="export-btns">
            <button className="btn btn--export" onClick={() => exportToCSV(transactions)}>
              ↓ Export CSV
            </button>
            <button className="btn btn--export" onClick={() => exportToJSON(transactions)}>
              ↓ Export JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
