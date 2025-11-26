// src/pages/admin/AdminDashboard.tsx — FINAL BOLT.NEW-PROOF ADMIN DASHBOARD
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Package, Users, Clock, AlertCircle, 
  BarChart3, FileText, Settings, LogOut, Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const location = useLocation();
  const nukeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // NUCLEAR MODE: Obliterate Bolt.new UI every 100ms — FOREVER
    nukeInterval.current = setInterval(() => {
      document.querySelectorAll('[data-testid="sidebar"], [data-testid="topbar"], aside, [class*="floating"], [id^="headlessui"], [class*="overlay"]').forEach(el => el?.remove());
      document.body.style.cssText = 'margin:0 !important; padding:0 !important; overflow-x:hidden !important';
    }, 100);

    // Immediate kill on mount
    const nuke = () => {
      document.querySelectorAll('[data-testid="sidebar"], [data-testid="topbar"], aside, [class*="floating"], [id^="headlessui"], [class*="overlay"]').forEach(el => el?.remove());
      document.body.style.cssText = 'margin:0 !important; padding:0 !important; overflow-x:hidden !important';
    };
    nuke();

    return () => {
      if (nukeInterval.current) clearInterval(nukeInterval.current);
    };
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Collectibles', href: '/admin/collectibles', badge: 18 },
    { icon: Users, label: 'Users', href: '/admin/users', badge: 5 },
    { icon: Clock, label: 'Pending Review', href: '/admin/review', badge: 18 },
    { icon: AlertCircle, label: 'Flagged Items', href: '/admin/flagged', badge: 5 },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: FileText, label: 'Reports', href: '/admin/reports' },
    { icon: Settings, label: 'Platform Settings', href: '/admin/settings' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-950 text-white overflow-hidden">
      {/* UNKILLABLE ADMIN SIDEBAR — HARD-CODED, Z-INDEX 999999 */}
      <div className="fixed left-0 top-0 w-72 h-full bg-black border-r border-red-900 z-[999999] shadow-2xl">
        <div className="p-8 border-b border-red-900">
          <div className="flex items-center gap-4">
            <Shield className="h-14 w-14 text-red-500" />
            <div>
              <h1 className="text-3xl font-black text-white">CAPITAL REALM</h1>
              <p className="text-sm text-red-500 font-bold tracking-widest">ADMIN PANEL</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
                           (item.href !== '/admin' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between px-6 py-5 rounded-2xl text-lg font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-500/50 scale-105'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-7 w-7" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <button className="flex items-center gap-4 px-6 py-5 w-full text-gray-400 hover:text-red-500 hover:bg-gray-900 rounded-2xl transition text-lg font-bold">
            <LogOut className="h-7 w-7" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="ml-72 min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-12">
        <div className="text-center py-24">
          <h1 className="text-9xl font-black text-white mb-8 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            CAPITAL REALM
          </h1>
          <h2 className="text-6xl font-bold text-red-500 mb-16">
            ADMIN COMMAND CENTER
          </h2>
          
          <div className="grid grid-cols-4 gap-10 max-w-7xl mx-auto">
            {[
              { value: "284", label: "Collectibles", color: "cyan" },
              { value: "18", label: "Pending", color: "yellow" },
              { value: "127.4 ETH", label: "Revenue", color: "green" },
              { value: "8.9 ETH", label: "Fees", color: "purple" }
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 hover:scale-105 transition">
                <div className={`text-7xl font-black text-${stat.color}-400`}>{stat.value}</div>
                <div className="text-2xl text-gray-300 mt-4">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-5xl">
            <span className="text-red-500 font-black">DASHBOARD IS NOW VISIBLE</span>
            <br />
            <span className="text-2xl text-gray-400 mt-4 block">Bolt.new has been annihilated.</span>
          </div>
        </div>
      </div>
    </div>
  );
}