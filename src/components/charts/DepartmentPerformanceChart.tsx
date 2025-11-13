// src/components/charts/DepartmentPerformanceChart.tsx

// 'use client';

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// // Sample data - replace with real data from your API
// const departmentData = [
//   { department: 'Sales', performance: 88, tasks: 145 },
//   { department: 'IT', performance: 92, tasks: 167 },
//   { department: 'HR', performance: 78, tasks: 98 },
//   { department: 'Marketing', performance: 85, tasks: 132 },
//   { department: 'Finance', performance: 90, tasks: 112 },
//   { department: 'Operations', performance: 82, tasks: 156 },
// ];

// const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

// export function DepartmentPerformanceChart() {
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart
//         data={departmentData}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//         <XAxis 
//           dataKey="department" 
//           stroke="#6b7280"
//           style={{ fontSize: '12px' }}
//         />
//         <YAxis 
//           stroke="#6b7280"
//           style={{ fontSize: '12px' }}
//           label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }}
//         />
//         <Tooltip 
//           contentStyle={{
//             backgroundColor: '#fff',
//             border: '1px solid #e5e7eb',
//             borderRadius: '8px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//           }}
//           cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
//         />
//         <Legend />
//         <Bar 
//           dataKey="performance" 
//           name="Performance Score"
//           radius={[8, 8, 0, 0]}
//         >
//           {departmentData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }




// src/components/charts/DepartmentPerformanceChart.tsx

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DepartmentPerformanceChartProps {
  data: Array<{
    department: string;
    performance: number;
    tasks: number;
  }>;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export function DepartmentPerformanceChart({ data }: DepartmentPerformanceChartProps) {
  const chartData = data && data.length > 0 ? data : [];

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] text-gray-500">
        No department data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="department" 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
        />
        <Legend />
        <Bar 
          dataKey="performance" 
          name="Performance Score"
          radius={[8, 8, 0, 0]}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
