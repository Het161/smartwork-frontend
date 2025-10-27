"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, Square, Calendar, TrendingUp, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TimeEntry {
  id: number;
  task: string;
  duration: number; // in seconds
  date: Date;
  status: 'completed' | 'ongoing';
}

export default function TimeTrackerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      task: 'Code Review',
      duration: 3600,
      date: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'completed',
    },
    {
      id: 2,
      task: 'Bug Fixing',
      duration: 5400,
      date: new Date(Date.now() - 1000 * 60 * 60 * 4),
      status: 'completed',
    },
    {
      id: 3,
      task: 'Documentation',
      duration: 7200,
      date: new Date(Date.now() - 1000 * 60 * 60 * 6),
      status: 'completed',
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!currentTask.trim()) {
      toast.error('Please enter a task name');
      return;
    }
    setIsRunning(true);
    toast.success('Timer started!');
  };

  const handlePause = () => {
    setIsRunning(false);
    toast.success('Timer paused');
  };

  const handleStop = () => {
    if (currentTime === 0) return;
    
    const newEntry: TimeEntry = {
      id: entries.length + 1,
      task: currentTask,
      duration: currentTime,
      date: new Date(),
      status: 'completed',
    };
    
    setEntries([newEntry, ...entries]);
    setIsRunning(false);
    setCurrentTime(0);
    setCurrentTask('');
    toast.success(`Logged ${formatTime(newEntry.duration)} for "${newEntry.task}"`);
  };

  const totalToday = entries
    .filter(e => e.date.toDateString() === new Date().toDateString())
    .reduce((sum, e) => sum + e.duration, 0);

  const totalWeek = entries.reduce((sum, e) => sum + e.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Time Tracker
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          {[
            { icon: Clock, label: 'Today', value: formatTime(totalToday), color: 'blue' },
            { icon: Calendar, label: 'This Week', value: formatTime(totalWeek), color: 'purple' },
            { icon: Award, label: 'Avg/Day', value: formatTime(Math.floor(totalWeek / 7)), color: 'green' },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Timer</h2>
            
            {/* Timer Display */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
                transition={{ repeat: isRunning ? Infinity : 0, duration: 1 }}
                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
              >
                {formatTime(currentTime)}
              </motion.div>
              {isRunning && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 font-semibold">Recording...</span>
                </div>
              )}
            </div>

            {/* Task Input */}
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="What are you working on?"
              disabled={isRunning}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none mb-6 disabled:bg-gray-100"
            />

            {/* Controls */}
            <div className="flex gap-3">
              {!isRunning ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Play className="w-5 h-5" />
                  Start
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePause}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStop}
                disabled={currentTime === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Square className="w-5 h-5" />
                Stop
              </motion.button>
            </div>
          </motion.div>

          {/* Time Entries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Entries</h2>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{entry.task}</h3>
                    <span className="text-sm font-bold text-blue-600">{formatTime(entry.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{entry.date.toLocaleDateString()}</span>
                    <span>{entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
