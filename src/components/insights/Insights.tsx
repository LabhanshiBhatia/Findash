import React from 'react';
import { Transaction } from '../../types';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency, computeMonthlyData, computeCategoryExpenses, getMonthKey } from '../../utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InsightsProps {
  transactions: Transaction[];
}

const InsightCard: React.FC<{
  title: string;
  value: string;
  description: string;
  accent?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
}> = ({ title, value, description, accent = '#f59e0b', trend, trendLabel }) => (
  <div className="insight-card">
    <div className="insight-accent" style={{ background: accent }} />
    <div className="insight-label">{title}</div>
    <div className="insight-value" style={{ color: accent }}>{value}</div>
    <div className="insight-desc">{description}</div>
    {trend && trendLabel && (
      <div className={`insight-trend insight-trend--${trend}`}>
        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendLabel}
      </div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="chart-tooltip-row" style={{ color: p.fill }}>
          <span>{p.name}:</span><span>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  const monthly = computeMonthlyData(transactions);
  const categories = computeCategoryExpenses(transactions);
  const topCategory = categories[0];

  // Month-over-month comparison
  const lastTwo = monthly.slice(-2);
  const prevMonth = lastTwo[0];
  const currMonth = lastTwo[1];
  const expenseChange = prevMonth && currMonth
    ? ((currMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
    : 0;
  const incomeChange = prevMonth && currMonth
    ? ((currMonth.income - prevMonth.income) / prevMonth.income) * 100
    : 0;

  // Biggest single transaction
  const biggestExpense = [...transactions].filter(t => t.type === 'expense').sort((a, b) => b.amount - a.amount)[0];

  // Average monthly spend
  const avgMonthlyExpense = monthly.length > 0
    ? monthly.reduce((s, m) => s + m.expenses, 0) / monthly.length
    : 0;

  // Best savings month
  const bestMonth = [...monthly].sort((a, b) => (b.income - b.expenses) - (a.income - a.expenses))[0];

  return (
    <div className="insights-layout">
      <div className="insights-grid">
        <InsightCard
          title="Top Spending Category"
          value={topCategory?.category || '—'}
          description={topCategory ? `${formatCurrency(topCategory.amount)} · ${topCategory.percentage.toFixed(1)}% of total spend` : 'No data'}
          accent={CATEGORY_COLORS[topCategory?.category] || '#f59e0b'}
        />
        <InsightCard
          title="Month-over-Month Expenses"
          value={currMonth ? formatCurrency(currMonth.expenses) : '—'}
          description={`vs ${prevMonth ? formatCurrency(prevMonth.expenses) : '—'} last month`}
          accent={expenseChange > 0 ? '#ef4444' : '#10b981'}
          trend={expenseChange > 0 ? 'up' : 'down'}
          trendLabel={`${Math.abs(expenseChange).toFixed(1)}% ${expenseChange > 0 ? 'increase' : 'decrease'}`}
        />
        <InsightCard
          title="Average Monthly Expense"
          value={formatCurrency(avgMonthlyExpense)}
          description="Across all tracked months"
          accent="#6366f1"
        />
        <InsightCard
          title="Best Savings Month"
          value={bestMonth?.month || '—'}
          description={bestMonth ? `Saved ${formatCurrency(bestMonth.income - bestMonth.expenses)}` : 'No data'}
          accent="#10b981"
          trend="up"
          trendLabel="highest net gain"
        />
        <InsightCard
          title="Largest Single Expense"
          value={biggestExpense ? formatCurrency(biggestExpense.amount) : '—'}
          description={biggestExpense ? `${biggestExpense.description} · ${biggestExpense.category}` : 'No data'}
          accent="#ef4444"
        />
        <InsightCard
          title="Income This Month"
          value={currMonth ? formatCurrency(currMonth.income) : '—'}
          description={`vs ${prevMonth ? formatCurrency(prevMonth.income) : '—'} last month`}
          accent="#f59e0b"
          trend={incomeChange >= 0 ? 'up' : 'down'}
          trendLabel={`${Math.abs(incomeChange).toFixed(1)}% ${incomeChange >= 0 ? 'increase' : 'decrease'}`}
        />
      </div>

      <div className="insights-charts">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Monthly Income vs Expenses</h3>
            <span className="chart-badge">comparison</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Category Breakdown</h3>
            <span className="chart-badge">all time</span>
          </div>
          <div className="category-bars">
            {categories.slice(0, 8).map(c => (
              <div key={c.category} className="category-bar-row">
                <span className="category-bar-name">{c.category}</span>
                <div className="category-bar-track">
                  <div
                    className="category-bar-fill"
                    style={{ width: `${c.percentage}%`, background: CATEGORY_COLORS[c.category] }}
                  />
                </div>
                <span className="category-bar-pct">{c.percentage.toFixed(1)}%</span>
                <span className="category-bar-amt">{formatCurrency(c.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
