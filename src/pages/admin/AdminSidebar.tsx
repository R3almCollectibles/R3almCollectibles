// src/components/admin/AdminSidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Package, Users, BarChart3, FileText, Settings, LogOut,
  Home, Clock, AlertCircle
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin', badge: null },
    { icon: Package, label: 'Collectibles', href: '/admin/collectibles', badge: 18 },
    { icon: Users, label: 'Users', href: '/admin/users', badge: 5 },
    { icon: Clock, label: 'Pending Review', href: '/admin/review', badge: 18 },
    { icon: AlertCircle, label: 'Flagged', href: '/admin/flagged', badge: 5 },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', badge: null },
    { icon: FileText, label: 'Reports', href: '/admin/reports', badge: null },
    { icon: Settings, label: 'Settings', href: '/admin/settings', badge: null },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-950 border-r border-gray-800 z-50 overflow-y-auto">
      {/* Header */}
      <div className="p-8 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Shield className="h-12 w-12 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-white">Capital Realm</h1>
            <p className="text-xs text-red-400 font-bold tracking-wider">ADMIN PANEL</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href === '/admin' && location.pathname === '/admin');

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-500/20'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`h-6 w-6 ${isActive ? 'text-white' : ''}`} />
                <span className="font-semibold text-lg">{item.label}</span>
              </div>

              {item.badge !== null && item.badge > 0 && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold animate-pulse ${
                  isActive ? 'bg-white text-red-600' : 'bg-red-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-6 right-6">
        <button className="flex items-center gap-4 px-5 py-4 text-gray-400 hover:text-red-500 transition w-full rounded-2xl hover:bg-gray-900">
          <LogOut className="h-6 w-6" />
          <span className="font-semibold text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
}