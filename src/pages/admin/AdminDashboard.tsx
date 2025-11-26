// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import {
  Shield, Package, Users, TrendingUp, DollarSign, Clock,
  Activity, ArrowRight, BarChart3, FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCollectibles: 0,
    verifiedItems: 0,
    pendingReview: 18,
    activeUsers: 892,
    totalRevenue: '127.4 ETH',
    platformFees: '8.9 ETH',
    newUsersToday: 23,
  });

  const recentActivity = [
    { id: 1, action: 'New collectible submitted', item: '1963 Ferrari 250 GTO', time: 'Just now', type: 'pending' },
    { id: 2, action: 'Fractional sale completed', item: 'Beeple – EVERDAYS', value: '4.2 ETH', time: '5 min ago', type: 'sale' },
    { id: 3, action: 'Item verified', item: 'Gibson Les Paul 1959', time: '1 hour ago', type: 'verified' },
  ];

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
    { title: 'Users', icon: Users, href: '/admin/users', color: 'from-purple-500 to-pink-500', count: 5 },
    { title: 'Reports', icon: FileText, href: '/admin/reports', color: 'from-green-500 to-emerald-500', count: 0 },
    { title: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'from-orange-500 to-red-500', count: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="pt-16 min-h-screen bg-gray-900">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-6xl font-bold text-white flex items-center gap-6">
                    <Shield className="h-16 w-16 text-red-500" />
                    Admin Dashboard
                  </h1>
                  <p className="text-2xl text-gray-400 mt-4">Welcome back, Founder.</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-white">Capital Realm</div>
                  <div className="text-xl text-gray-400">Live Control Center</div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { label: 'Total Collectibles', value: stats.totalCollectibles, icon: Package, color: 'from-blue-500 to-cyan-500' },
                { label: 'Pending Review', value: stats.pendingReview, icon: Clock, color: 'from-yellow-500 to-orange-500', alert: true },
                { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'from-purple-500 to-pink-500' },
                { label: 'Revenue', value: stats.totalRevenue, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-3xl bg-gray-800 border ${stat.alert ? 'border-yellow-500/50' : 'border-gray-700'} p-8 hover:shadow-2xl transition-shadow`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-lg">{stat.label}</p>
                      <p className="text-5xl font-bold text-white mt-4">{stat.value}</p>
                    </div>
                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  {stat.alert && <div className="absolute top-6 right-6 animate-pulse"><div className="h-4 w-4 bg-yellow-500 rounded-full" /></div>}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                    <Activity className="h-10 w-10 text-blue-400" />
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickLinks.map((link, i) => (
                      <Link key={i} to={link.href} className="block">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative overflow-hidden rounded-3xl bg-gray-800 border border-gray-700 p-8 hover:border-gray-600 transition-all group"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-30 transition`} />
                          <link.icon className="h-14 w-14 text-gray-400 group-hover:text-white transition" />
                          <h3 className="text-2xl font-bold text-white mt-6">{link.title}</h3>
                          {link.count > 0 && (
                            <div className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse">
                              {link.count} pending
                            </div>
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-3xl border border-gray-700 overflow-hidden">
                  <div className="p-8 border-b border-gray-700">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                      <Activity className="h-10 w-10 text-green-400" />
                      Recent Activity
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {recentActivity.map((a) => (
                      <div key={a.id} className="p-8 hover:bg-gray-700/50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xl text-white font-medium">{a.action}</p>
                            {a.item && <p className="text-gray-400 text-lg mt-2">{a.item}</p>}
                            {a.value && <p className="text-green-400 text-2xl font-bold mt-2">{a.value}</p>}
                          </div>
                          <p className="text-gray-500">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl p-10 text-white h-full">
                  <TrendingUp className="h-16 w-16 mb-8" />
                  <div className="text-6xl font-bold mb-4">{stats.platformFees}</div>
                  <p className="text-2xl opacity-90">Platform Earnings</p>
                  <div className="mt-12 space-y-6">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="flex justify-between text-xl">
                        <span>New Users Today</span>
                        <span className="font-bold">+{stats.newUsersToday}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="flex justify-between text-xl">
                        <span>Verified Items</span>
                        <span className="font-bold">{stats.verifiedItems}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}