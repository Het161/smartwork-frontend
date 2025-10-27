"use client";

import { motion } from 'framer-motion';
import { User, Lock, Bell, Palette, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const settings = [
    {
      icon: User,
      title: 'Profile Settings',
      desc: 'Manage your account information',
      path: '/admin/settings/profile',
    },
    {
      icon: Lock,
      title: 'Security',
      desc: 'Password and authentication settings',
      path: '/admin/settings/security',
    },
    {
      icon: Bell,
      title: 'Notifications',
      desc: 'Configure notification preferences',
      path: '/admin/settings/notifications',
    },
    {
      icon: Palette,
      title: 'Appearance',
      desc: 'Customize your dashboard theme',
      path: '/admin/settings/appearance',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Settings
        </motion.h1>

        <div className="space-y-4">
          {settings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(item.path)}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 flex items-center gap-4 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
