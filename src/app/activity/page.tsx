"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, CheckCircle, Clock, FileText, Users, TrendingUp } from 'lucide-react';

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: Date;
  type: 'task' | 'user' | 'team' | 'system';
}

export default function ActivityFeedPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      user: 'John Doe',
      action: 'completed',
      target: 'Deploy to production',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'task',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'created',
      target: 'Review code changes',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: 'task',
    },
    {
      id: 3,
      user: 'Admin User',
      action: 'added',
      target: 'Mike Johnson to Engineering team',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'team',
    },
    {
      id: 4,
      user: 'Sarah Williams',
      action: 'updated',
      target: 'Write documentation',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      type: 'task',
    },
    {
      id: 5,
      user: 'System',
      action: 'generated',
      target: 'Weekly productivity report',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      type: 'system',
    },
    {
      id: 6,
      user: 'John Doe',
      action: 'commented on',
      target: 'API Integration task',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      type: 'task',
    },
  ]);

  const [filter, setFilter] = useState<string>('all');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'user':
        return <User className="w-5 h-5 text-green-600" />;
      case 'team':
        return <Users className="w-5 h-5 text-purple-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: activities.length + 1,
        user: ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)],
        action: ['completed', 'created', 'updated'][Math.floor(Math.random() * 3)],
        target: 'New Task #' + Math.floor(Math.random() * 100),
        timestamp: new Date(),
        type: ['task', 'user', 'team'][Math.floor(Math.random() * 3)] as any,
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Keep last 20
    }, 15000); // Add new activity every 15 seconds

    return () => clearInterval(interval);
  }, [activities.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Activity Feed</h1>
              <p className="text-gray-600">Real-time updates from your team</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600 font-semibold">Live</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['all', 'task', 'user', 'team', 'system'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl font-semibold capitalize whitespace-nowrap transition-all ${
                filter === type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'task' ? 'bg-blue-100' :
                  activity.type === 'user' ? 'bg-green-100' :
                  activity.type === 'team' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {getIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-900">
                    <span className="font-bold">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-semibold text-blue-600">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-gray-500">{getTimeAgo(activity.timestamp)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      activity.type === 'task' ? 'bg-blue-100 text-blue-700' :
                      activity.type === 'user' ? 'bg-green-100 text-green-700' :
                      activity.type === 'team' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
