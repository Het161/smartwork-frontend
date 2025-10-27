"use client";

import { motion } from 'framer-motion';
import { User, Mail, Shield } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@test.com', role: 'admin' },
    { id: 2, name: 'John Manager', email: 'john@test.com', role: 'manager' },
    { id: 3, name: 'Jane Employee', email: 'jane@test.com', role: 'employee' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Users Management
        </motion.h1>

        <div className="grid gap-4">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    {user.role}
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
