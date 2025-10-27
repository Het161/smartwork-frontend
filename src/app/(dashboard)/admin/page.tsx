"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, TrendingUp, Clock } from 'lucide-react';
import { StatsCard } from '../../../components/dashboard/StatsCard';
import { ProductivityChart } from '../../../components/charts/ProductivityChart';
// Update the import path to the correct relative location if needed
import { FloatingCard } from '../../../components/animations/FloatingCard';
import { analyticsAPI } from '../../../lib/api';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticsAPI.getAdminDashboard();
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value={data?.total_employees || 0}
          icon={Users}
          trend={5.2}
          color="blue"
          delay={0.1}
        />
        <StatsCard
          title="Active Tasks"
          value={data?.active_tasks || 0}
          icon={ClipboardList}
          trend={-2.4}
          color="green"
          delay={0.2}
        />
        <StatsCard
          title="Productivity"
          value={data?.productivity_percentage || 0}
          icon={TrendingUp}
          trend={8.1}
          color="purple"
          delay={0.3}
        />
        <StatsCard
          title="Avg Delay (hrs)"
          value={data?.avg_delay_hours || 0}
          icon={Clock}
          trend={-3.2}
          color="orange"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProductivityChart data={data?.organization_trend || []} />
        
        <FloatingCard delay={0.5}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Department Performance</h3>
          <div className="space-y-4">
            {data?.department_scores?.map((dept: any, index: number) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="font-medium text-gray-700">{dept.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.score}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                  <span className="font-bold text-gray-900 w-12 text-right">
                    {dept.score}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </FloatingCard>
      </div>

    </div>
  );
}
