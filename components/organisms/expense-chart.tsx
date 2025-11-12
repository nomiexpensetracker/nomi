import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

import { Card } from '@/components/atoms/card';
import { Expense } from '@/types/common';

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Get last 6 months of data
  const getLast6MonthsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const last6Months = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push(months[monthIndex]);
    }

    return last6Months.map(month => {
      const monthExpenses = expenses.filter(exp => {
        const expMonth = new Date(exp.date).toLocaleDateString('en-US', { month: 'short' });
        return expMonth === month;
      });

      const total = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      
      return {
        month,
        total,
        formatted: total
      };
    });
  };

  const data = getLast6MonthsData();

  return (
    <Card className="mx-6 my-6 p-6 shadow-sm border-0">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={8}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Bar dataKey="total" radius={[8, 8, 8, 8]} maxBarSize={40}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={`url(#colorGradient${index})`}
              />
            ))}
          </Bar>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0047BB" stopOpacity={1} />
                <stop offset="100%" stopColor="#00BCD4" stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ExpenseChart;
