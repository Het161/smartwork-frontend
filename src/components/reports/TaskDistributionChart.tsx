// src/components/reports/TaskDistributionChart.tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Development', value: 40 },
  { name: 'Design', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Testing', value: 15 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

export function TaskDistributionChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${((Number(percent) || 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
