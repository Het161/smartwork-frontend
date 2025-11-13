// src/app/reports/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  FileText,
  Download,
  Mail,
  Calendar,
  Share2,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { EmailReportModal } from '@/components/reports/EmailReportModal';
import { ScheduleReportModal } from '@/components/reports/ScheduleReportModal';
import { ShareReportModal } from '@/components/reports/ShareReportModal';
import { TaskCompletionChart } from '@/components/reports/TaskCompletionChart';
import { ProductivityTrendChart } from '@/components/reports/ProductivityTrendChart';
import { TaskDistributionChart } from '@/components/reports/TaskDistributionChart';

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasReport, setHasReport] = useState(false);

  // Generate Report
  const handleGenerate = () => {
    setIsGenerating(true);
    toast.loading('Generating report...', { id: 'generate' });

    setTimeout(() => {
      setHasReport(true);
      setIsGenerating(false);
      toast.success('Report generated successfully!', { id: 'generate' });
    }, 2000);
  };

  // Download Report
  const handleDownload = () => {
    if (!hasReport) {
      toast.error('Please generate a report first');
      return;
    }

    toast.loading('Preparing download...', { id: 'download' });

    setTimeout(() => {
      const blob = new Blob(['Mock Report Content'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SmartWork360-Report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Report downloaded!', { id: 'download' });
    }, 1000);
  };

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
            Reports Generator
          </h1>
          <p className="text-gray-600">
            Generate, download, and share productivity reports
          </p>
        </motion.div>

        {/* Main Chart Area */}
        {!hasReport ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-6"
          >
            <div className="flex flex-col items-center justify-center py-12">
              <TrendingUp className="w-16 h-16 text-blue-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Visual Charts & Graphs
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Interactive visualizations will be displayed here
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6 mb-6">
            {/* Task Completion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Task Completion Rate
                </h2>
              </div>
              <TaskCompletionChart />
            </motion.div>

            {/* Productivity Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <LineChartIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Productivity Trend
                </h2>
              </div>
              <ProductivityTrendChart />
            </motion.div>

            {/* Task Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <PieChartIcon className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Task Distribution
                </h2>
              </div>
              <TaskDistributionChart />
            </motion.div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
            }`}
          >
            <FileText className="w-6 h-6" />
            {isGenerating ? 'Generating...' : 'Generate'}
          </motion.button>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all"
          >
            <Download className="w-6 h-6" />
            Download
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>

          <div className="space-y-4">
            {/* Email Report */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => hasReport ? setShowEmailModal(true) : toast.error('Generate a report first')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-2xl font-semibold hover:shadow-md transition-all"
            >
              <Mail className="w-5 h-5" />
              Email Report
            </motion.button>

            {/* Schedule Report */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowScheduleModal(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-2xl font-semibold hover:shadow-md transition-all"
            >
              <Calendar className="w-5 h-5" />
              Schedule Report
            </motion.button>

            {/* Share Report */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => hasReport ? setShowShareModal(true) : toast.error('Generate a report first')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-2xl font-semibold hover:shadow-md transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Report
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EmailReportModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />

      <ScheduleReportModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />

      <ShareReportModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}


