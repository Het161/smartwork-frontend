"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Edit,
  Trash2,
  CheckCircle2,
  MessageSquare,
  Paperclip,
  MoreVertical
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id;

  const [task] = useState({
    id: taskId,
    title: "Complete Q4 Financial Report",
    description: "Prepare and finalize the quarterly financial report including all departmental data, budget analysis, and projections for the next quarter. This report will be presented to the board of directors.",
    priority: "high",
    status: "in-progress",
    deadline: "Oct 18, 2025 5:00 PM",
    createdAt: "Oct 15, 2025",
    assignee: {
      name: "John Smith",
      role: "Financial Analyst",
      avatar: "JS"
    },
    creator: {
      name: "Manager Sarah",
      role: "Department Head"
    },
    attachments: [
      { id: 1, name: "Q3_Report.pdf", size: "2.4 MB" },
      { id: 2, name: "Budget_Analysis.xlsx", size: "1.8 MB" }
    ],
    comments: [
      {
        id: 1,
        author: "Manager Sarah",
        text: "Please prioritize the budget analysis section",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        author: "John Smith",
        text: "Working on it, will complete by EOD",
        timestamp: "1 hour ago"
      }
    ],
    progress: 65
  });

  const [newComment, setNewComment] = useState('');

  const handleStatusChange = (newStatus: string) => {
    console.log('Status changed to:', newStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Tasks</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Task Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'completed' ? 'bg-green-100 text-green-700' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
                <p className="text-gray-600">{task.description}</p>
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="font-bold text-blue-600">{task.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStatusChange('completed')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Mark Complete</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Attachments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Paperclip className="w-5 h-5" />
              Attachments ({task.attachments.length})
            </h3>
            <div className="space-y-3">
              {task.attachments.map((file) => (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Paperclip className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Comments ({task.comments.length})
            </h3>
            
            <div className="space-y-4 mb-6">
              {task.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-1">{comment.author}</p>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-4">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
              >
                Post
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Task Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Task Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Assigned To</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {task.assignee.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{task.assignee.name}</p>
                    <p className="text-sm text-gray-500">{task.assignee.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Created By</p>
                <div>
                  <p className="font-medium text-gray-900">{task.creator.name}</p>
                  <p className="text-sm text-gray-500">{task.creator.role}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Deadline
                </p>
                <p className="font-medium text-gray-900">{task.deadline}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Created
                </p>
                <p className="font-medium text-gray-900">{task.createdAt}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
