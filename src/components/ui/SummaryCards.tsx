import React from 'react';
import { formatCurrency } from '../../utils';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

interface CardProps {
  label: string;
  value: string;
  sub?: string;
  accent: 'gold' | 'green' | 'red' | 'blue';
  icon: string;
}

const Card: React.FC<CardProps> = ({ label, value, sub, accent, icon }) => (
  <div className={`summary-card summary-card--${accent}`}>
    <div className="summary-card-top">
      <span className="summary-card-icon">{icon}</span>
      <span className="summary-card-label">{label}</span>
    </div>
    <div className="summary-card-value">{value}</div>
    {sub && <div className="summary-card-sub">{sub}</div>}
    <div className="summary-card-glow" />
  </div>
);

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalBalance, totalIncome, totalExpenses, savingsRate }) => (
  <div className="summary-grid">
    <Card
      label="Total Balance"
      value={formatCurrency(totalBalance)}
      sub="All-time net worth"
      accent="gold"
      icon="◈"
    />
    <Card
      label="Total Income"
      value={formatCurrency(totalIncome)}
      sub={`${savingsRate.toFixed(1)}% savings rate`}
      accent="green"
      icon="↑"
    />
    <Card
      label="Total Expenses"
      value={formatCurrency(totalExpenses)}
      sub={`${(100 - savingsRate).toFixed(1)}% of income`}
      accent="red"
      icon="↓"
    />
  </div>
);

export default SummaryCards;
