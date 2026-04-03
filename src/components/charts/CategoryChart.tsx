import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CategoryData } from '../../types';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency } from '../../utils';

interface CategoryChartProps {
  data: CategoryData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{d.category}</div>
      <div className="chart-tooltip-row">
        <span>Amount:</span><span>{formatCurrency(d.amount)}</span>
      </div>
      <div className="chart-tooltip-row">
        <span>Share:</span><span>{d.percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const top = data.slice(0, 7);
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Expenses by Category</h3>
        <span className="chart-badge">breakdown</span>
      </div>
      <div className="category-chart-layout">
        <ResponsiveContainer width="50%" height={220}>
          <PieChart>
            <Pie
              data={top}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="amount"
            >
              {top.map((entry, i) => (
                <Cell
                  key={entry.category}
                  fill={CATEGORY_COLORS[entry.category] || '#64748b'}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="category-legend">
          {top.map(d => (
            <div key={d.category} className="category-legend-row">
              <span className="category-legend-dot" style={{ background: CATEGORY_COLORS[d.category] || '#64748b' }} />
              <span className="category-legend-name">{d.category}</span>
              <span className="category-legend-pct">{d.percentage.toFixed(1)}%</span>
              <span className="category-legend-amount">{formatCurrency(d.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
