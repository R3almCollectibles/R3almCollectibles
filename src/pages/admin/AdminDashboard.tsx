// src/pages/admin/AdminDashboard.tsx
// THE TRUE FINAL FORM — DARK, ELEGANT, PROFESSIONAL, UNSTOPPABLE
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Package, 
  Users, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  FileText, 
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Activity,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Total Collectibles", value: "2,847", change: "+12.4%", icon: Package, color: "bg-purple-600" },
    { label: "Active Users", value: "18,492", change: "+8.1%", icon: Users, color: "bg-blue-600" },
    { label: "Pending Reviews", value: "42", change: "+5", icon: Clock, color: "bg-amber-600" },
    { label: "Platform Revenue", value: "127.4 ETH", change: "+23.7%", icon: DollarSign, color: "bg-emerald-600" },
  ];

  const menu = [
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Package, label: "Collectibles", href: "/admin/collectibles", count: 2847 },
    { icon: Users, label: "Users", href: "/admin/users", count: 18492 },
    { icon: Clock, label: "Moderation", href: "/admin/reviews", count: 42 },
    { icon: AlertCircle, label: "Flagged Items", href: "/admin/flagged", count: 7 },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-80 bg-black border-r border-gray-800 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black">R3ALM</h1>
                <p className="text-sm text-gray-500 font-medium">Admin Console</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-gray-900 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-6 w-6 text-gray-400 group-hover:text-white transition" />
                  <span className="font-medium text-gray-300 group-hover:text-white">{item.label}</span>
                </div>
                {item.count && (
                  <span className="px-3 py-1 text-xs font-bold bg-gray-800 rounded-full text-gray-400">
                    {item.count.toLocaleString()}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                {user?.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{user?.name}</div>
                <div className="text-sm text-purple-400 font-medium">System Administrator</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 py-3 bg-gray-900 hover:bg-gray-800 rounded-xl transition font-medium"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-80 p-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-7xl font-black mb-4">Command Center</h1>
          <p className="text-xl text-gray-400">Real-time platform oversight and control</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-3xl p-8 hover:bg-gray-900/70 transition">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 ${stat.color} rounded-2xl`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <span className="text-green-400 text-sm font-bold">{stat.change}</span>
              </div>
              <div className="text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Activity */}
          <div className="col-span-2">
            <h2 className="text-3xl font-bold mb-6">Recent Activity</h2>
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-3xl divide-y divide-gray-800">
              {[
                { user: "Maya Artist", action: "Minted new NFT collection", time: "2 min ago" },
                { user: "Jordan Investor", action: "Purchased fractional ownership", time: "8 min ago" },
                { user: "Alex Collector", action: "Listed rare 1972 Gibson", time: "15 min ago" },
                { user: "System", action: "Auto-moderated 47 items", time: "22 min ago" },
              ].map((act, i) => (
                <div key={i} className="px-8 py-6 hover:bg-gray-800/30 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{act.user}</div>
                      <div className="text-gray-400">{act.action}</div>
                    </div>
                    <div className="text-sm text-gray-500">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl font-bold text-lg transition transform hover:scale-105">
                <Zap className="inline mr-3 h-6 w-6" />
                Emergency Broadcast
              </button>
              <button className="w-full py-5 bg-gray-800 hover:bg-gray-700 rounded-2xl font-bold text-lg transition">
                <Activity className="inline mr-3 h-6 w-6" />
                Run Health Check
              </button>
              <button className="w-full py-5 bg-gray-800 hover:bg-gray-700 rounded-2xl font-bold text-lg transition">
                <TrendingUp className="inline mr-3 h-6 w-6" />
                Deploy Update
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}