"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, Users, CheckCircle, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('productivity');
  const [dateRange, setDateRange] = useState('week');
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { id: 'productivity', name: 'Productivity Report', icon: TrendingUp, color: 'blue' },
    { id: 'tasks', name: 'Tasks Summary', icon: CheckCircle, color: 'green' },
    { id: 'team', name: 'Team Performance', icon: Users, color: 'purple' },
    { id: 'time', name: 'Time Tracking', icon: Calendar, color: 'orange' },
  ];

  const sampleData = {
    productivity: {
      title: 'Weekly Productivity Report',
      stats: [
        { label: 'Total Tasks Completed', value: '47' },
        { label: 'Average Completion Time', value: '2.3 hours' },
        { label: 'Productivity Score', value: '87%' },
        { label: 'On-Time Completion', value: '92%' },
      ],
      insights: [
        'Productivity increased by 12% compared to last week',
        'Peak productivity hours: 10 AM - 12 PM',
        'Most productive day: Thursday',
        'Average 8.5 tasks completed per day',
      ],
    },
    tasks: {
      title: 'Tasks Summary Report',
      stats: [
        { label: 'Total Tasks', value: '215' },
        { label: 'Completed', value: '145' },
        { label: 'In Progress', value: '28' },
        { label: 'Pending', value: '42' },
      ],
      insights: [
        'High priority tasks completed: 95%',
        'Average task duration: 2.5 hours',
        'Most common task category: Development',
        'Task completion rate improved by 8%',
      ],
    },
    team: {
      title: 'Team Performance Report',
      stats: [
        { label: 'Active Members', value: '87' },
        { label: 'Team Productivity', value: '85%' },
        { label: 'Collaboration Score', value: '91%' },
        { label: 'Response Time', value: '< 2 hours' },
      ],
      insights: [
        'Engineering team leads with 92% productivity',
        '15 cross-team collaborations this week',
        'Team communication improved by 18%',
        'Average team size: 6 members per project',
      ],
    },
    time: {
      title: 'Time Tracking Report',
      stats: [
        { label: 'Total Hours Logged', value: '342' },
        { label: 'Billable Hours', value: '287' },
        { label: 'Average Daily Hours', value: '8.2' },
        { label: 'Overtime Hours', value: '12' },
      ],
      insights: [
        'Most time spent on: Development (45%)',
        'Meeting time reduced by 15%',
        'Focus time increased to 6 hours/day',
        'Break time compliance: 98%',
      ],
    },
  };

  const handleGenerateReport = () => {
    setGenerating(true);
    
    setTimeout(() => {
      setGenerating(false);
      toast.success('Report generated successfully!');
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast.success('Report downloaded as PDF!');
    // In production, this would generate and download actual PDF
  };

  const currentReport = sampleData[reportType as keyof typeof sampleData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Reports Generator
        </motion.h1>

        {/* Report Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Report Type</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {reportTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setReportType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reportType === type.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                      : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-8 h-8 mx-auto mb-2 ${
                    reportType === type.id ? 'text-white' : `text-${type.color}-600`
                  }`} />
                  <p className="text-sm font-semibold text-center">{type.name}</p>
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div className="flex items-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerateReport}
                  disabled={generating}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadReport}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-colors text-sm">
                Email Report
              </button>
              <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors text-sm">
                Schedule Report
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-colors text-sm">
                Share Report
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentReport.title}</h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold text-sm">
              {dateRange === 'week' ? 'Oct 12 - Oct 18, 2025' : 'Preview'}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {currentReport.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
              >
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Insights */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
            <div className="space-y-3">
              {currentReport.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{insight}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="text-center text-gray-600">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Visual Charts & Graphs</p>
              <p className="text-sm">Interactive visualizations will be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
