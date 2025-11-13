// "use client";

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Users, ClipboardList, TrendingUp, Clock } from 'lucide-react';
// import { StatsCard } from '../../../components/dashboard/StatsCard';
// import { ProductivityChart } from '../../../components/charts/ProductivityChart';
// // Update the import path to the correct relative location if needed
// import { FloatingCard } from '../../../components/animations/FloatingCard';
// import { analyticsAPI } from '../../../lib/api';

// export default function AdminDashboard() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await analyticsAPI.getAdminDashboard();
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <motion.div
//           className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//         <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
//       </motion.div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatsCard
//           title="Total Employees"
//           value={data?.total_employees || 0}
//           icon={Users}
//           trend={5.2}
//           color="blue"
//           delay={0.1}
//         />
//         <StatsCard
//           title="Active Tasks"
//           value={data?.active_tasks || 0}
//           icon={ClipboardList}
//           trend={-2.4}
//           color="green"
//           delay={0.2}
//         />
//         <StatsCard
//           title="Productivity"
//           value={data?.productivity_percentage || 0}
//           icon={TrendingUp}
//           trend={8.1}
//           color="purple"
//           delay={0.3}
//         />
//         <StatsCard
//           title="Avg Delay (hrs)"
//           value={data?.avg_delay_hours || 0}
//           icon={Clock}
//           trend={-3.2}
//           color="orange"
//           delay={0.4}
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <ProductivityChart data={data?.organization_trend || []} />
        
//         <FloatingCard delay={0.5}>
//           <h3 className="text-xl font-bold text-gray-900 mb-4">Department Performance</h3>
//           <div className="space-y-4">
//             {data?.department_scores?.map((dept: any, index: number) => (
//               <motion.div
//                 key={dept.name}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.6 + index * 0.1 }}
//                 className="flex items-center justify-between"
//               >
//                 <span className="font-medium text-gray-700">{dept.name}</span>
//                 <div className="flex items-center gap-3">
//                   <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <motion.div
//                       className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
//                       initial={{ width: 0 }}
//                       animate={{ width: `${dept.score}%` }}
//                       transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
//                     />
//                   </div>
//                   <span className="font-bold text-gray-900 w-12 text-right">
//                     {dept.score}%
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </FloatingCard>
//       </div>

//     </div>
//   );
// }







// src/app/(dashboard)/admin/page.tsx

/**
 * Admin Dashboard Page
 * 
 * Main dashboard for administrators showing:
 * - Key performance metrics (employees, tasks, productivity, delays)
 * - Productivity trend chart (last 12 months)
 * - Department performance comparison
 * 
 * Features:
 * - Real-time data from backend API
 * - Beautiful animations with Framer Motion
 * - Responsive design for all screen sizes
 * - Interactive charts with Recharts
 */

// src/app/(dashboard)/admin/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// ============================================
// TYPESCRIPT INTERFACES
// ============================================

interface DepartmentPerformance {
  department: string;
  performance: number;
  tasks: number;
  completed: number;
}

interface ProductivityTrend {
  month: string;
  productivity: number;
  target: number;
}

interface DashboardData {
  totalEmployees: number;
  activeTasks: number;
  productivity: number;
  avgDelay: number;
  departmentPerformance: DepartmentPerformance[];
  productivityTrend: ProductivityTrend[];
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/v1/analytics/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log('✅ Dashboard data loaded:', result);
      } else {
        throw new Error('Failed to load dashboard data');
      }
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message);
      toast.error('Failed to load dashboard');
      
      // Set fallback data
      setData({
        totalEmployees: 0,
        activeTasks: 0,
        productivity: 0,
        avgDelay: 0,
        departmentPerformance: [],
        productivityTrend: []
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOADING STATE
  // ============================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md"
        >
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 text-center mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // ============================================
  // STATS CARDS DATA
  // ============================================

  const statCards = [
    {
      title: 'Total Employees',
      value: data?.totalEmployees || 0,
      change: '+5.2%',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Tasks',
      value: data?.activeTasks || 0,
      change: '-2.4%',
      isPositive: false,
      icon: ClipboardList,
      color: 'bg-green-500',
    },
    {
      title: 'Productivity',
      value: `${data?.productivity || 0}%`,
      change: '+8.1%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Avg Delay (hrs)',
      value: data?.avgDelay || 0,
      change: '-3.2%',
      isPositive: true,
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium text-sm">{card.title}</h3>
              <div className={`${card.color} p-3 rounded-xl`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-4xl font-bold text-gray-900">{card.value}</h2>
              <span className={`text-sm font-semibold ${
                card.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.isPositive ? '↑' : '↓'} {card.change}
              </span>
            </div>

            <p className="text-xs text-gray-500">vs last month</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Productivity Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Productivity Trend</h2>
            <p className="text-sm text-gray-600">Monthly performance over the last year</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.productivityTrend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="productivity" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Productivity %"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#60a5fa" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target %"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Department Performance</h2>
            <p className="text-sm text-gray-600">Completion rate by department</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.departmentPerformance || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="performance" fill="#8b5cf6" name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Refresh Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={fetchDashboardData}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </motion.button>
    </div>
  );
}
