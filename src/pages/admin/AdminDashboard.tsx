// src/pages/admin/AdminDashboard.tsx
// THE FINAL FORM — DARK EMPIRE ADMIN CONSOLE
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Package, 
  Users, 
  Clock, 
  AlertTriangle, 
  BarChart3, 
  FileText, 
  Settings,
  LogOut,
  Zap,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Total Collectibles", value: "2,847", change: "+12%", icon: Package, color: "from-purple-600 to-pink-600" },
    { label: "Active Users", value: "18,492", change: "+8%", icon: Users, color: "from-blue-600 to-cyan-600" },
    { label: "Pending Reviews", value: "42", change: "+5", icon: Clock, color: "from-orange-600 to-red-600" },
    { label: "Platform Revenue", value: "127.4 ETH", change: "+23%", icon: DollarSign, color: "from-emerald-600 to-teal-600" },
  ];

  const menuItems = [
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics", badge: null },
    { icon: Package, label: "All Collectibles", href: "/admin/collectibles", badge: 2847 },
    { icon: Users, label: "User Management", href: "/admin/users", badge: 18492 },
    { icon: Clock, label: "Pending Reviews", href: "/admin/reviews", badge: 42 },
    { icon: AlertTriangle, label: "Flagged Content", href: "/admin/flagged", badge: 7 },
    { icon: FileText, label: "Reports & Logs", href: "/admin/reports", badge: null },
    { icon: Settings, label: "Platform Settings", href: "/admin/settings", badge: null },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* FIXED SIDEBAR — UNKILLABLE */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-gray-950 via-black to-gray-950 border-r border-red-900/50 z-50">
        <div className="p-8 border-b border-red-900/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-50 animate-pulse" />
              <Shield className="h-16 w-16 text-red-500 relative z-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                R3ALM
              </h1>
              <p className="text-red-500 font-bold text-sm tracking-widest">ADMINISTRATIVE CORE</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group relative flex items-center justify-between px-6 py-5 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20"
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-xl group-hover:scale-110 transition-transform">
                  <item.icon className="h-7 w-7 text-red-400" />
                </div>
                <span className="text-lg font-bold text-gray-200 group-hover:text-white transition">
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <span className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full animate-pulse ring-4 ring-black">
                  {item.badge.toLocaleString()}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-red-900/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center ring-4 ring-red-900/50">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">{user?.name || "Administrator"}</div>
              <div className="text-red-400 text-sm font-bold">Supreme Access</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-red-900 to-pink-900 hover:from-red-800 hover:to-pink-800 rounded-xl font-bold text-white transition-all hover:scale-105"
          >
            <LogOut className="h-5 w-5" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 min-h-screen bg-gradient-to-br from-gray-950 via-black to-purple-950/20">
        <div className="p-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-8xl font-black bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              COMMAND CENTER
            </h1>
            <p className="text-2xl text-gray-400 mt-4 font-medium">
              Total control. Zero compromise.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-black border border-gray-800 backdrop-blur-xl hover:scale-105 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }} />
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <stat.icon className={`h-12 w-12 bg-gradient-to-br ${stat.color} p-3 rounded-2xl text-white shadow-2xl`} />
                    <span className="text-green-400 font-bold text-lg">{stat.change}</span>
                  </div>
                  <div className="text-5xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-400 mt-2 text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <h2 className="text-4xl font-black mb-8 text-white">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { user: "Maya Artist", action: "minted new NFT collection", time: "2 min ago", type: "success" },
                  { user: "System", action: "flagged item for review", time: "5 min ago", type: "warning" },
                  { user: "Jordan Investor", action: "purchased fractional share", time: "12 min ago", type: "info" },
                  { user: "Alex Collector", action: "listed rare guitar", time: "18 min ago", type: "info" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:bg-gray-900/80 transition">
                    <div className={`w-3 h-3 rounded-full ${activity.type === 'success' ? 'bg-green-500' : activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'} animate-pulse`} />
                    <div className="flex-1">
                      <div className="font-bold text-white">{activity.user}</div>
                      <div className="text-gray-400">{activity.action}</div>
                    </div>
                    <div className="text-gray-500 text-sm">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black mb-8 text-white">Quick Actions</h2>
              <div className="space-y-4">
                {[
                  { label: "Emergency Shutdown", color: "from-red-600 to-pink-600", icon: Zap },
                  { label: "Purge Cache", color: "from-orange-600 to-red-600", icon: Activity },
                  { label: "Deploy Update", color: "from-blue-600 to-purple-600", icon: TrendingUp },
                ].map((action) => (
                  <button
                    key={action.label}
                    className={`w-full py-6 rounded-2xl bg-gradient-to-r ${action.color} font-black text-white text-xl hover:scale-105 transition-all shadow-2xl`}
                  >
                    <action.icon className="inline mr-3 h-8 w-8" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}