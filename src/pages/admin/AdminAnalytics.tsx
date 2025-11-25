// src/pages/admin/AdminAnalytics.tsx – FULLY INTERACTIVE & STUNNING
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Activity,
  Calendar,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Zap,
  Target,
  Award,
} from 'lucide-react';
import { format } from 'date-fns';

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [realtimeUsers, setRealtimeUsers] = useState(284);

  // Simulate real-time users
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeUsers(prev => prev + Math.floor(Math.random() * 20 - 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = {
    totalUsers: '12,847',
    activeUsers: '3,291',
    newUsers: '892',
    revenue: '127.4 ETH',
    avgSession: '8m 42s',
    bounceRate: '32.1%',
    conversionRate: '8.4%',
    topCountry: 'United States',
    topPage: '/marketplace',
  };

  const growthData = [
    { month: 'Jul', users: 4200, revenue: 38 },
    { month: 'Aug', users: 5800, revenue: 52 },
    { month: 'Sep', users: 7900, revenue: 71 },
    { month: 'Oct', users: 10200, revenue: 98 },
    { month: 'Nov', users: 12847, revenue: 127.4 },
  ];

  const deviceData = [
    { device: 'Desktop', value: 58, color: 'from-blue-500 to-cyan-500' },
    { device: 'Mobile', value: 36, color: 'from-purple-500 to-pink-500' },
    { device: 'Tablet', value: 6, color: 'from-green-500 to-emerald-500' },
  ];

  const topPages = [
    { path: '/marketplace', visits: 48720, change: '+28%' },
    { path: '/collectible/:id', visits: 38210, change: '+41%' },
    { path: '/portfolio', visits: 29180, change: '+19%' },
    { path: '/mint', visits: 18740, change: '+67%' },
    { path: '/', visits: 15290, change: '-12%' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        <div className="pt-16 min-h-screen bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-bold text-white flex items-center gap-5">
                    <Shield className="h-14 w-14 text-cyan-500" />
                    Analytics Dashboard
                  </h1>
                  <p className="text-xl text-gray-400 mt-3">Real-time insights into user behavior and platform performance</p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Last updated</div>
                    <div className="text-white font-medium">{format(new Date(), 'h:mm:ss a')}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Real-time Users */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-8 mb-10 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                      <div className="relative bg-white/30 rounded-full p-4">
                        <Activity className="h-10 w-10" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold opacity-90">Users Online Now</p>
                      <p className="text-6xl font-bold mt-2">{realtimeUsers.toLocaleString()}</p>
                      <p className="text-xl mt-2 opacity-90">Across 47 countries</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-8xl font-bold opacity-20">LIVE</div>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Total Users', value: metrics.totalUsers, icon: Users, color: 'from-purple-500 to-pink-500', change: '+18.4%' },
                { label: 'Active Users', value: metrics.activeUsers, icon: Zap, color: 'from-green-500 to-emerald-500', change: '+12.7%' },
                { label: 'Revenue', value: metrics.revenue, icon: DollarSign, color: 'from-blue-500 to-cyan-500', change: '+28.9%' },
                { label: 'Conversion Rate', value: metrics.conversionRate, icon: Target, color: 'from-orange-500 to-red-500', change: '+4.2%' },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 rounded-2xl border border-gray-700 p-6 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                      <metric.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                      <ArrowUpRight className="h-4 w-4" />
                      {metric.change}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                  <p className="text-4xl font-bold text-white mt-2">{metric.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Growth Chart + Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Growth Chart */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BarChart3 className="h-8 w-8 text-cyan-400" />
                        Growth Overview
                      </h3>
                      <div className="text-cyan-400 font-bold">+184% YoY</div>
                    </div>
                    <div className="h-96 bg-gray-700/30 rounded-xl p-6 flex items-end justify-between gap-4">
                      {growthData.map((data, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full mb-4">
                            <div
                              className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg hover:from-cyan-400 hover:to-cyan-300 transition-all"
                              style={{ height: `${(data.users / 13000) * 100}%` }}
                            />
                            <div
                              className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg opacity-60"
                              style={{ height: `${(data.revenue / 130) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400">{data.month}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-8 mt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                        <span className="text-gray-400">Users</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-gray-400">Revenue (ETH)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Device Breakdown */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="h-8 w-8 text-blue-400" />
                    Device Breakdown
                  </h3>
                  <div className="space-y-6">
                    {deviceData.map((device) => (
                      <div key={device.device}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white font-medium">{device.device}</span>
                          <span className="text-gray-400">{device.value}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${device.color} transition-all`}
                            style={{ width: `${device.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Top Pages + Engagement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Pages */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-gray-800 rounded-2xl border border-gray-700">
                  <div className="p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Award className="h-8 w-8 text-yellow-400" />
                      Top Pages
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {topPages.map((page, i) => (
                      <div key={i} className="p-6 hover:bg-gray-700/50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{page.path}</p>
                            <p className="text-gray-400 text-sm mt-1">{page.visits.toLocaleString()} visits</p>
                          </div>
                          <div className="text-green-400 font-bold flex items-center gap-1">
                            <ArrowUpRight className="h-5 w-5" />
                            {page.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Engagement Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                    <Clock className="h-12 w-12 mb-4" />
                    <div className="text-4xl font-bold mb-2">{metrics.avgSession}</div>
                    <p className="opacity-90">Avg Session Duration</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                    <Target className="h-12 w-12 mb-4" />
                    <div className="text-4xl font-bold mb-2">{metrics.bounceRate}</div>
                    <p className="opacity-90">Bounce Rate</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white col-span-2">
                    <Globe className="h-12 w-12 mb-4" />
                    <div className="text-3xl font-bold mb-2">{metrics.topCountry}</div>
                    <p className="opacity-90">Top Country • 41.2% of traffic</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;