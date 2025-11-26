// src/components/admin/AdminSidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Package, Users, Clock, AlertCircle, 
  BarChart3, FileText, Settings, LogOut, Shield
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const adminMenu = [
    { icon: Home, label: 'Dashboard', href: '/admin', badge: 0 },
    { icon: Package, label: 'Collectibles', href: '/admin/collectibles', badge: 18 },
    { icon: Users, label: 'Users', href: '/admin/users', badge: 5 },
    { icon: Clock, label: 'Pending Review', href: '/admin/review', badge: 18 },
    { icon: AlertCircle, label: 'Flagged Items', href: '/admin/flagged', badge: 5 },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', badge: 0 },
    { icon: FileText, label: 'Reports', href: '/admin/reports', badge: 0 },
    { icon: Settings, label: 'Platform Settings', href: '/admin/settings', badge: 0 },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-72 bg-gray-950 border-r border-gray-800 z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-8 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">CAPITAL REALM</h1>
              <p className="text-sm text-red-400 font-bold">ADMIN CONTROL CENTER</p>
            </div>
          </div>
        </div>

        {/* Full Admin Menu */}
        <nav className="flex-1 px-6 py-6 space-y-2">
          {adminMenu.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-500/30'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-6 w-6" />
                  <span className="font-semibold text-lg">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-800">
          <button className="flex items-center gap-4 px-6 py-4 w-full text-gray-400 hover:text-red-500 hover:bg-gray-900 rounded-2xl transition">
            <LogOut className="h-6 w-6" />
            <span className="font-semibold text-lg">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}