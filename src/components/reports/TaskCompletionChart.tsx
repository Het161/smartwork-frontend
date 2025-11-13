// src/components/reports/TaskCompletionChart.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', completed: 85, pending: 15 },
  { month: 'Feb', completed: 78, pending: 22 },
  { month: 'Mar', completed: 92, pending: 8 },
  { month: 'Apr', completed: 88, pending: 12 },
  { month: 'May', completed: 95, pending: 5 },
  { month: 'Jun', completed: 90, pending: 10 },
];

export function TaskCompletionChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
          <Bar dataKey="pending" fill="#ef4444" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
