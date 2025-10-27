"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle, TrendingUp, Calendar, Award, Users } from 'lucide-react';

export default function EmployeeDashboard() {
  const [stats] = useState({
    myTasks: 8,
    inProgress: 3,
    completed: 45,
    thisWeek: 5,
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
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Track your tasks and productivity
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: ClipboardList, label: 'My Tasks', value: stats.myTasks, color: 'blue' },
            { icon: Clock, label: 'In Progress', value: stats.inProgress, color: 'orange' },
            { icon: CheckCircle, label: 'Completed', value: stats.completed, color: 'green' },
            { icon: Calendar, label: 'This Week', value: stats.thisWeek, color: 'purple' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
            >
              <div className={`w-12 h-12 bg-${stat.color}-500 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Tasks</h2>
            <div className="space-y-3">
              {[
                { title: 'Complete project report', priority: 'high', status: 'in-progress', time: '2h' },
                { title: 'Review code changes', priority: 'medium', status: 'pending', time: '1h' },
                { title: 'Team meeting at 3 PM', priority: 'high', status: 'pending', time: '30m' },
                { title: 'Update documentation', priority: 'low', status: 'pending', time: '1.5h' },
                { title: 'Client call follow-up', priority: 'medium', status: 'completed', time: 'Done' },
              ].map((task, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      className="w-5 h-5 rounded"
                      readOnly
                    />
                    <div>
                      <p className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500">{task.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-4">
              {[
                { title: 'Early Bird', desc: 'Completed 10 tasks before deadline', icon: Award, color: 'yellow' },
                { title: 'Team Player', desc: 'Helped 5 team members', icon: Users, color: 'blue' },
                { title: 'Productive Week', desc: 'Completed 15 tasks this week', icon: TrendingUp, color: 'green' },
              ].map((achievement, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-${achievement.color}-500 rounded-full flex items-center justify-center`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
