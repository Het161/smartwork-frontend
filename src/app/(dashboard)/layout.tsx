// "use client";

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter, usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   Users, 
//   ClipboardList, 
//   Building2, 
//   BarChart3,
//   Settings,
//   Calendar,
//   Clock,
//   FileText,
//   Bell,
//   Activity,
//   UserCircle,
//   HelpCircle,
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // ✅ ALL 13 MENU ITEMS NOW INCLUDED
//   const menuItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
//     { icon: Users, label: 'Users', path: '/admin/users' },
//     { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
//     { icon: Calendar, label: 'Calendar', path: '/calendar' },
//     { icon: Clock, label: 'Time Tracker', path: '/timetracker' },
//     { icon: Building2, label: 'Departments', path: '/departments' },
//     { icon: UserCircle, label: 'Team', path: '/team' },
//     { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
//     { icon: FileText, label: 'Reports', path: '/reports' },
//     { icon: Activity, label: 'Activity', path: '/activity' },
//     { icon: Bell, label: 'Notifications', path: '/notifications' },
//     { icon: Settings, label: 'Settings', path: '/admin/settings' },
//     { icon: HelpCircle, label: 'Support', path: '/support' },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
      
//       {/* Sidebar */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.aside
//             initial={{ x: -300 }}
//             animate={{ x: 0 }}
//             exit={{ x: -300 }}
//             transition={{ type: "spring", damping: 25 }}
//             className="w-64 bg-white shadow-xl flex flex-col"
//           >
//             {/* Logo */}
//             <div className="p-6 border-b border-gray-100 flex-shrink-0">
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 SmartWork 360
//               </h2>
//             </div>

//             {/* Menu Items - NOW SCROLLABLE */}
//             <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//               {menuItems.map((item) => {
//                 const isActive = pathname === item.path;
//                 return (
//                   <motion.button
//                     key={item.path}
//                     onClick={() => router.push(item.path)}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                       isActive
//                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <item.icon className="w-5 h-5 flex-shrink-0" />
//                     <span className="font-medium">{item.label}</span>
//                   </motion.button>
//                 );
//               })}
//             </nav>

//             {/* Logout Button */}
//             <div className="p-4 border-t border-gray-100 flex-shrink-0">
//               <motion.button
//                 onClick={handleLogout}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span className="font-medium">Logout</span>
//               </motion.button>
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
        
//         {/* Top Bar */}
//         <header className="bg-white shadow-sm p-4 flex items-center justify-between">
//           <motion.button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </motion.button>

//           <div className="flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm font-medium text-gray-900">Admin User</p>
//               <p className="text-xs text-gray-500">admin@smartwork.gov</p>
//             </div>
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full" />
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

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
  X
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

  // Load user data
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role || 'employee');
        setUserName(user.name || 'User');
        setUserEmail(user.email || 'user@example.com');
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  // ✅ ROLE-BASED MENU ITEMS
  const getMenuItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/${userRole}` },
      { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
      { icon: Calendar, label: 'Calendar', path: '/calendar' },
      { icon: Clock, label: 'Time Tracker', path: '/timetracker' },
      { icon: Bell, label: 'Notifications', path: '/notifications' },
      { icon: Settings, label: 'Settings', path: '/settings' },
      { icon: HelpCircle, label: 'Support', path: '/support' },
    ];

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
      // Employee menu
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

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-64 bg-white shadow-xl flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartWork 360
              </h2>
              <p className="text-xs text-gray-500 mt-1 capitalize">{userRole} Portal</p>
            </div>

            {/* Menu Items - Scrollable */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole} • {userEmail}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
