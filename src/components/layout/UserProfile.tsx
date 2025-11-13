// src/components/layout/UserProfile.tsx

'use client';

import { useState, useEffect } from 'react';
import { Mail, Briefcase, Building2 } from 'lucide-react';

interface UserData {
  id: number;
  full_name: string;
  email: string;
  role: string;
  department?: string;
}

export function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user from localStorage (stored during login)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        <div>
          <p className="font-semibold text-gray-900">Loading...</p>
          <p className="text-sm text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

  // Get role badge color
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'employee':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.full_name.charAt(0).toUpperCase()}
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      </div>

      {/* User Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-lg">
            {user.full_name}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
            {user.role.toUpperCase()}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{user.email}</span>
          </div>

          {/* Department */}
          {user.department && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span>{user.department}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
