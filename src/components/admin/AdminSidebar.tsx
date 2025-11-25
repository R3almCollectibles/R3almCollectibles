// src/components/admin/AdminSidebar.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Shield,
  Package,
  Users,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Shield },
  { name: 'Collectibles', href: '/admin/collectibles', icon: Package },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 pt-20 lg:pt-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-8 py-8 border-b border-gray-800">
        <Shield className="h-10 w-10 text-red-500" />
        <div>
          <h1 className="text-2xl font-bold text-white">Admin</h1>
          <p className="text-xs text-gray-500">Control Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/20 to-pink-600/20 text-white border border-red-500/30 shadow-lg shadow-red-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && <div className="ml-auto h-2 w-2 bg-red-500 rounded-full animate-pulse" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <button className="flex items-center gap-4 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-800/50 rounded-xl transition">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;