// src/components/admin/AdminSidebar.tsx – TEAM MENU RESTORED & PERFECT
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Package,
  Users,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Home,
  UserCog, // Beautiful icon for Team
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/admin' },
    { label: 'Collectibles', icon: Package, path: '/admin/collectibles' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Team', icon: UserCog, path: '/admin/team' }, // BACK & BETTER
    { label: 'Reports', icon: FileText, path: '/admin/reports' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
      {/* Logo */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <Shield className="h-10 w-10 text-purple-500" />
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500">Capital Realm</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all group ${
                active
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="font-medium">{item.label}</span>
              {active && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-6 right-6">
        <button className="flex items-center gap-4 px-5 py-4 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-all w-full group">
          <LogOut className="h-6 w-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;