'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, ClipboardList, Building2, BarChart3,
  Settings, Calendar, Clock, FileText, Bell, Activity,
  UserCircle, LogOut, HelpCircle
} from 'lucide-react';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Tasks', icon: ClipboardList, path: '/tasks' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Time Tracker', icon: Clock, path: '/timetracker' },
    { name: 'Departments', icon: Building2, path: '/departments' },
    { name: 'Team', icon: UserCircle, path: '/team' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Activity', icon: Activity, path: '/activity' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Support', icon: HelpCircle, path: '/support' }
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SmartWork 360
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <motion.button
            key={item.name}
            whileHover={{ x: 4 }}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === item.path || pathname.startsWith(item.path + '/')
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t">
        <motion.button
          onClick={() => { localStorage.clear(); router.push('/login'); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </aside>
  );
}


