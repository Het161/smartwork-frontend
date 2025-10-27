"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, TrendingUp, AlertCircle, Calendar, CheckCircle } from 'lucide-react';

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    teamMembers: 12,
    activeTasks: 28,
    completedTasks: 145,
    pendingApprovals: 5,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Manager Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your team and track performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Team Members', value: stats.teamMembers, color: 'blue', change: '+2' },
            { icon: ClipboardList, label: 'Active Tasks', value: stats.activeTasks, color: 'purple', change: '+5' },
            { icon: CheckCircle, label: 'Completed', value: stats.completedTasks, color: 'green', change: '+12' },
            { icon: AlertCircle, label: 'Pending Approvals', value: stats.pendingApprovals, color: 'orange', change: '-1' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-500 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Performance</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', tasks: 12, completed: 10, progress: 83 },
                { name: 'Jane Smith', tasks: 15, completed: 14, progress: 93 },
                { name: 'Mike Johnson', tasks: 8, completed: 6, progress: 75 },
                { name: 'Sarah Williams', tasks: 11, completed: 9, progress: 82 },
              ].map((member, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{member.name}</span>
                    <span className="text-sm text-gray-600">{member.completed}/{member.tasks} tasks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{member.progress}% complete</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'Task completed', user: 'Jane Smith', time: '2 hours ago', icon: CheckCircle, color: 'green' },
                { action: 'New task assigned', user: 'John Doe', time: '4 hours ago', icon: ClipboardList, color: 'blue' },
                { action: 'Approval pending', user: 'Mike Johnson', time: '5 hours ago', icon: AlertCircle, color: 'orange' },
                { action: 'Task completed', user: 'Sarah Williams', time: '6 hours ago', icon: CheckCircle, color: 'green' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                    <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
