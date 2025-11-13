// src/components/layout/UserProfileCompact.tsx

'use client';

import { useState, useEffect } from 'react';
import { Mail, Building2 } from 'lucide-react';

interface UserData {
  full_name: string;
  email: string;
  role: string;
  department?: string;
}

export function UserProfileCompact() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return null;

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'manager': return 'bg-blue-100 text-blue-700';
      case 'employee': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl border-2 border-gray-200">
      {/* Avatar & Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {user.full_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">
            {user.full_name}
          </h3>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
            {user.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
          <span className="truncate">{user.email}</span>
        </div>

        {user.department && (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">{user.department}</span>
          </div>
        )}
      </div>
    </div>
  );
}
