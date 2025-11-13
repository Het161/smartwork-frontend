// src/components/charts/ProductivityTrendChart.tsx

// 'use client';

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Sample data - replace with real data from your API
// const productivityData = [
//   { month: 'Jan', productivity: 65, target: 70 },
//   { month: 'Feb', productivity: 70, target: 75 },
//   { month: 'Mar', productivity: 75, target: 75 },
//   { month: 'Apr', productivity: 72, target: 80 },
//   { month: 'May', productivity: 78, target: 80 },
//   { month: 'Jun', productivity: 85, target: 85 },
//   { month: 'Jul', productivity: 88, target: 85 },
//   { month: 'Aug', productivity: 82, target: 90 },
//   { month: 'Sep', productivity: 87, target: 90 },
//   { month: 'Oct', productivity: 92, target: 90 },
//   { month: 'Nov', productivity: 90, target: 95 },
//   { month: 'Dec', productivity: 95, target: 95 },
// ];

// export function ProductivityTrendChart() {
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <LineChart
//         data={productivityData}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//         <XAxis 
//           dataKey="month" 
//           stroke="#6b7280"
//           style={{ fontSize: '12px' }}
//         />
//         <YAxis 
//           stroke="#6b7280"
//           style={{ fontSize: '12px' }}
//           label={{ value: 'Productivity %', angle: -90, position: 'insideLeft' }}
//         />
//         <Tooltip 
//           contentStyle={{
//             backgroundColor: '#fff',
//             border: '1px solid #e5e7eb',
//             borderRadius: '8px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//           }}
//         />
//         <Legend />
//         <Line 
//           type="monotone" 
//           dataKey="productivity" 
//           stroke="#8b5cf6" 
//           strokeWidth={3}
//           dot={{ fill: '#8b5cf6', r: 5 }}
//           activeDot={{ r: 7 }}
//           name="Actual Productivity"
//         />
//         <Line 
//           type="monotone" 
//           dataKey="target" 
//           stroke="#3b82f6" 
//           strokeWidth={2}
//           strokeDasharray="5 5"
//           dot={{ fill: '#3b82f6', r: 4 }}
//           name="Target"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }




// src/components/charts/ProductivityTrendChart.tsx

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProductivityTrendChartProps {
  data: Array<{
    month: string;
    productivity: number;
    target: number;
  }>;
}

export function ProductivityTrendChart({ data }: ProductivityTrendChartProps) {
  // Use provided data or fallback to empty array
  const chartData = data && data.length > 0 ? data : [];

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] text-gray-500">
        No productivity data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="month" 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          label={{ value: 'Productivity %', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="productivity" 
          stroke="#8b5cf6" 
          strokeWidth={3}
          dot={{ fill: '#8b5cf6', r: 5 }}
          activeDot={{ r: 7 }}
          name="Actual Productivity"
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#3b82f6" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#3b82f6', r: 4 }}
          name="Target"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

