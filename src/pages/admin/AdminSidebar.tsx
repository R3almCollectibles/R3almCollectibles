// src/components/admin/AdminSidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Package, Users, BarChart3, FileText, Settings, LogOut,
  Home, TrendingUp, Clock, AlertCircle
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Collectibles', href: '/admin/collectibles', badge: 18 },
    { icon: Users, label: 'Users', href: '/admin/users', badge: 5 },
    { icon: Clock, label: 'Pending Review', href: '/admin/review', badge: 18 },
    { icon: AlertCircle, label: 'Flagged', href: '/admin/flagged', badge: 5 },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: FileText, label: 'Reports', href: '/admin/reports' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-950 border-r border-gray-800 z-50 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <Shield className="h-10 w-10 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-white">Capital Realm</h1>
            <p className="text-xs text-gray-500">ADMIN PANEL</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-32">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl mb-2 transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-8 left-8 right-8">
        <button className="flex items-center gap-4 text-gray-400 hover:text-red-500 transition w-full">
          <LogOut className="h-6 w-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}