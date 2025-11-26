// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import {
  Shield, Package, Users, TrendingUp, DollarSign, AlertCircle,
  Clock, CheckCircle2, Activity, ArrowRight, BarChart3, FileText
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCollectibles: 0,
    pendingReview: 18,
    flaggedUsers: 5,
    totalRevenue: '127.4 ETH',
    activeUsers: 892,
    newUsersToday: 23,
    platformFees: '8.9 ETH',
    verifiedItems: 0,
  });

  const [recentActivity] = useState([
    { id: 1, action: 'New collectible submitted', item: 'Rolex Daytona 1968', user: '0x742d...3C4', time: '2 min ago', type: 'pending' },
    { id: 2, action: 'User flagged for spam', user: '0x9998...0999', time: '15 min ago', type: 'flagged' },
    { id: 3, action: 'Collectible verified', item: 'Gibson Les Paul 1959', user: 'admin@realm.io', time: '1 hour ago', type: 'verified' },
    { id: 4, action: 'Bulk shares purchased', item: 'Jordan Rookie Card', value: '12.5 ETH', time: '2 hours ago', type: 'sale' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase.from('collectibles').select('*', { count: 'exact', head: true });
      const { count: verified } = await supabase.from('collectibles').select('*', { count: 'exact', head: true }).eq('verified', true);
      
      setStats(prev => ({
        ...prev,
        totalCollectibles: count || 0,
        verifiedItems: verified || 0,
      }));
    };
    fetchStats();
  }, []);

  const quickLinks = [
    { title: 'Collectibles', icon: Package, href: '/admin/collectibles', color: 'from-blue-500 to-cyan-500', count: stats.pendingReview },
    { title: 'Users', icon: Users, href: '/admin/users', color: 'from-purple-500 to-pink-500', count: stats.flaggedUsers },
    { title: 'Reports', icon: FileText, href: '/admin/reports', color: 'from-green-500 to-emerald-500', count: 0 },
    { title: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'from-orange-500 to-red-500', count: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="pt-16 min-h-screen bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-bold text-white flex items-center gap-5">
                    <Shield className="h-14 w-14 text-red-500" />
                    Admin Dashboard
                  </h1>
                  <p className="text-xl text-gray-400 mt-3">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">Capital Realm</div>
                  <div className="text-gray-400">Platform Control Center</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Total Collectibles', value: stats.totalCollectibles, icon: Package, color: 'from-blue-500 to-cyan-500' },
                { label: 'Pending Review', value: stats.pendingReview, icon: Clock, color: 'from-yellow-500 to-orange-500', alert: true },
                { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'from-purple-500 to-pink-500' },
                { label: 'Total Revenue', value: stats.totalRevenue, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl bg-gray-800 border ${stat.alert ? 'border-yellow-500/50' : 'border-gray-700'} p-6 hover:shadow-2xl transition-shadow`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-4xl font-bold text-white mt-3">{stat.value}</p>
                      {stat.alert && <p className="text-yellow-400 text-xs mt-2">Requires attention</p>}
                    </div>
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  {stat.alert && <div className="absolute top-4 right-4 animate-pulse"><div className="h-3 w-3 bg-yellow-500 rounded-full" /></div>}
                </motion.div>
              ))}
            </div>

            {/* Quick Actions + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Activity className="h-8 w-8 text-blue-400" />
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickLinks.map((link, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                        <Link to={link.href} className="block relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 p-6 hover:border-gray-600 transition-all group">
                          <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-20 transition`} />
                          <div className="relative flex items-center justify-between">
                            <div>
                              <link.icon className="h-12 w-12 text-gray-400 group-hover:text-white transition" />
                              <h3 className="text-xl font-bold text-white mt-4">{link.title}</h3>
                              {link.count > 0 && <p className="text-3xl font-bold text-white mt-2">{link.count}</p>}
                            </div>
                            <ArrowRight className="h-8 w-8 text-gray-500 group-hover:text-white group-hover:translate-x-2 transition" />
                          </div>
                          {link.count > 0 && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                {link.count} pending
                              </div>
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl border border-gray-700">
                  <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Activity className="h-8 w-8 text-green-400" />
                      Recent Activity
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="p-6 hover:bg-gray-700/50 transition">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.action}</p>
                            {activity.item && <p className="text-gray-400 text-sm mt-1">{activity.item}</p>}
                            {activity.user && <p className="text-gray-500 text-sm">by <span className="font-mono">{activity.user}</span></p>}
                            {activity.value && <p className="text-green-400 font-bold mt-1">{activity.value}</p>}
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-gray-500 text-xs">{activity.time}</p>
                            {activity.type === 'pending' && <Clock className="h-5 w-5 text-yellow-400 mt-2" />}
                            {activity.type === 'verified' && <CheckCircle2 className="h-5 w-5 text-green-400 mt-2" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <TrendingUp className="h-12 w-12" />
                    <div className="text-right">
                      <div className="text-4xl font-bold">{stats.platformFees}</div>
                      <div className="text-sm opacity-90">Platform Earnings</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <div className="flex justify-between">
                        <span>New Users Today</span>
                        <span className="font-bold">+{stats.newUsersToday}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <div className="flex justify-between">
                        <span>Verified Items</span>
                        <span className="font-bold">{stats.verifiedItems}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <Link to="/admin/analytics" className="inline-flex items-center gap-2 text-white hover:underline font-medium">
                      View Full Analytics <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;