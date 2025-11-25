// src/components/admin/AdminSidebar.tsx – EXIT DASHBOARD WITHOUT LOGOUT
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Package,
  Users,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Home,
  UserCog,
  ArrowLeft,
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/admin' },
    { label: 'Collectibles', icon: Package, path: '/admin/collectibles' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Team', icon: UserCog, path: '/admin/team' },
    { label: 'Reports', icon: FileText, path: '/admin/reports' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleExitDashboard = () => {
    navigate('/', { replace: true });
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

      {/* Exit Dashboard Button */}
      <div className="px-6 mb-6">
        <button
          onClick={handleExitDashboard}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-cyan-400 hover:bg-gray-800 hover:border-cyan-600 transition-all group"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="font-medium">Back to Platform</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition">
            <span className="text-xs text-cyan-300">Exit Admin</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-6 flex-1">
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
      <div className="px-6 pb-8">
        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all group border border-red-800/30">
          <LogOut className="h-6 w-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;