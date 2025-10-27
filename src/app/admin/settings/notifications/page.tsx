"use client";

import { motion } from 'framer-motion';
import { Bell, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskUpdates: true,
    teamMessages: false,
    weeklyReport: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Settings
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Notification Preferences
        </motion.h1>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="space-y-6">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
              { key: 'taskUpdates', label: 'Task Updates', desc: 'Get notified when tasks are updated' },
              { key: 'teamMessages', label: 'Team Messages', desc: 'Notifications for team messages' },
              { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly productivity reports' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
