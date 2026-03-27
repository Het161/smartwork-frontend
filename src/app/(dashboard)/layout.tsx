"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Building2, 
  BarChart3,
  Settings,
  Calendar,
  Clock,
  FileText,
  Bell,
  Activity,
  UserCircle,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('User');
  const [userEmail, setUserEmail] = useState<string>('user@example.com');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ AUTH GUARD — redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setUserRole(user.role || 'employee');
      setUserName(user.full_name || user.name || 'User');
      setUserEmail(user.email || 'user@example.com');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Role-based menu items
  const getMenuItems = () => {
    if (userRole === 'admin') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Clock, label: 'Time Tracker', path: '/timetracker' },
        { icon: Building2, label: 'Departments', path: '/departments' },
        { icon: UserCircle, label: 'Team', path: '/team' },
        { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Activity, label: 'Activity', path: '/activity' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
        { icon: HelpCircle, label: 'Support', path: '/support' },
      ];
    } else if (userRole === 'manager') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/manager' },
        { icon: Users, label: 'My Team', path: '/team' },
        { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Clock, label: 'Time Tracker', path: '/timetracker' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: HelpCircle, label: 'Support', path: '/support' },
      ];
    } else {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/employee' },
        { icon: ClipboardList, label: 'My Tasks', path: '/tasks' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Clock, label: 'Time Tracker', path: '/timetracker' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: HelpCircle, label: 'Support', path: '/support' },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  // Loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Not authenticated — will redirect
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-slate-50">
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="w-[280px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col shadow-2xl z-30 relative"
          >
            {/* Sidebar gradient accent */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent" />

            {/* Logo */}
            <div className="p-6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">SmartWork 360</h2>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">{userRole} Portal</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            {/* Menu Items */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} />
                    <span className="font-medium text-[13px]">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* User Card + Logout */}
            <div className="p-4 flex-shrink-0">
              {/* User info card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{userName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="w-[18px] h-[18px]" />
                <span className="font-medium text-[13px]">Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
            </motion.button>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold text-slate-800 capitalize">
                {pathname?.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/notifications')}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </motion.button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">{userName}</p>
                <p className="text-[11px] text-slate-500 capitalize">{userRole}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
