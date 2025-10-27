"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
  delay?: number;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color,
  delay = 0 
}: StatsCardProps) => {
  const [count, setCount] = useState(0);

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  // Animated counter
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <motion.div
            className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          {count.toLocaleString()}
        </motion.div>

        {trend !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.5 }}
            className={`flex items-center text-sm ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
