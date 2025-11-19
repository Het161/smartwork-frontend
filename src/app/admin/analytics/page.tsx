// src/app/(dashboard)/admin/analytics/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { toast } from 'react-hot-toast';

// TypeScript Interfaces
interface AnalyticsData {
  totalEmployees: number;
  activeTasks: number;
  productivity: number;
  avgDelay: number;
  departmentPerformance: Array<{
    department: string;
    performance: number;
    tasks: number;
    completed: number;
  }>;
  productivityTrend: Array<{
    month: string;
    productivity: number;
    target: number;
  }>;
  taskDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sih-backend-xiz8.onrender.com';
      const response = await fetch(`${API_URL}/api/v1/analytics/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Analytics data:', result);
        
        // Ensure all required fields exist
        const completeData = {
          ...result,
          taskDistribution: result.taskDistribution || [
            { name: 'Completed', value: 65, color: '#10B981' },
            { name: 'In Progress', value: 25, color: '#3B82F6' },
            { name: 'Pending', value: 10, color: '#F59E0B' }
          ]
        };
        
        setData(completeData);
        toast.success('Analytics loaded');
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('Using sample data');
      setData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  const getMockData = (): AnalyticsData => ({
    totalEmployees: 87,
    activeTasks: 289,
    productivity: 76.6,
    avgDelay: 2.3,
    departmentPerformance: [
      { department: 'IT', performance: 92, tasks: 45, completed: 41 },
      { department: 'HR', performance: 88, tasks: 32, completed: 28 },
      { department: 'Sales', performance: 85, tasks: 38, completed: 32 },
      { department: 'Marketing', performance: 90, tasks: 28, completed: 25 },
    ],
    productivityTrend: [
      { month: 'Jan', productivity: 75, target: 80 },
      { month: 'Feb', productivity: 78, target: 80 },
      { month: 'Mar', productivity: 82, target: 85 },
      { month: 'Apr', productivity: 85, target: 85 },
      { month: 'May', productivity: 88, target: 85 },
      { month: 'Jun', productivity: 87, target: 90 },
    ],
    taskDistribution: [
      { name: 'Completed', value: 65, color: '#10B981' },
      { name: 'In Progress', value: 25, color: '#3B82F6' },
      { name: 'Pending', value: 10, color: '#F59E0B' },
    ]
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6 md:p-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchAnalyticsData}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Tasks', value: 1234, icon: TrendingUp, color: 'bg-blue-500' },
          { title: 'Active Users', value: data?.totalEmployees || 87, icon: Users, color: 'bg-green-500' },
          { title: 'Completed', value: 945, icon: CheckCircle, color: 'bg-purple-500' },
          { title: 'Pending', value: data?.activeTasks || 289, icon: Clock, color: 'bg-orange-500' }
        ].map((card, index) => (
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
            <h2 className="text-4xl font-bold text-gray-900">{card.value.toLocaleString()}</h2>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Productivity Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Productivity Trend</h2>
          <p className="text-sm text-gray-600 mb-4">Monthly performance over time</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.productivityTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: 12 }} />
              <YAxis stroke="#6b7280" style={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
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
                name="Productivity %"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#60a5fa" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#60a5fa', r: 4 }}
                name="Target %"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Performance Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Department Performance</h2>
          <p className="text-sm text-gray-600 mb-4">Completion rate by department</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.departmentPerformance || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="department" stroke="#6b7280" style={{ fontSize: 12 }} />
              <YAxis stroke="#6b7280" style={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="performance" 
                fill="#8b5cf6" 
                radius={[8, 8, 0, 0]}
                name="Completion %"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Task Distribution Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Task Distribution</h2>
        <p className="text-sm text-gray-600 mb-4">Current task status breakdown</p>
        
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data?.taskDistribution || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {(data?.taskDistribution || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

