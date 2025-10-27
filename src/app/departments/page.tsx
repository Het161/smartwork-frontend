"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Calendar } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  headCount: number;
  productivity: number;
  tasksCompleted: number;
  tasksTotal: number;
}

export default function DepartmentsPage() {
  const [departments] = useState<Department[]>([
    {
      id: '1',
      name: 'Engineering',
      headCount: 45,
      productivity: 87,
      tasksCompleted: 234,
      tasksTotal: 280,
    },
    {
      id: '2',
      name: 'Sales',
      headCount: 32,
      productivity: 92,
      tasksCompleted: 187,
      tasksTotal: 200,
    },
    {
      id: '3',
      name: 'Marketing',
      headCount: 28,
      productivity: 78,
      tasksCompleted: 145,
      tasksTotal: 190,
    },
    {
      id: '4',
      name: 'HR',
      headCount: 15,
      productivity: 85,
      tasksCompleted: 98,
      tasksTotal: 120,
    },
    {
      id: '5',
      name: 'Finance',
      headCount: 20,
      productivity: 90,
      tasksCompleted: 156,
      tasksTotal: 175,
    },
  ]);

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
            Departments
          </h1>
          <p className="text-gray-600">
            Overview of all departments and their performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-500">Department</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                {/* Head Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Employees</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {dept.headCount}
                  </span>
                </div>

                {/* Productivity */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Productivity</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {dept.productivity}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.productivity}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={`h-2 rounded-full ${
                        dept.productivity >= 85
                          ? 'bg-green-500'
                          : dept.productivity >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Tasks</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {dept.tasksCompleted}/{dept.tasksTotal}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
