// src/components/reports/ProductivityTrendChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', productivity: 65 },
  { week: 'Week 2', productivity: 72 },
  { week: 'Week 3', productivity: 68 },
  { week: 'Week 4', productivity: 85 },
  { week: 'Week 5', productivity: 90 },
  { week: 'Week 6', productivity: 88 },
  { week: 'Week 7', productivity: 95 },
];

export function ProductivityTrendChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="productivity" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            name="Productivity Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
