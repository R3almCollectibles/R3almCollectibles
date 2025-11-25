// src/pages/admin/AdminReports.tsx – COMPLETE & BEAUTIFUL
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';
import { format } from 'date-fns';

interface RevenueData {
  date: string;
  revenue: number;
  fees: number;
  sales: number;
}

interface TopCollectible {
  id: number;
  name: string;
  sales: number;
  volume: string;
  growth: number;
}

const AdminReports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30days');

  // Mock data - replace with real API later
  const revenueData: RevenueData[] = [
    { date: '2024-11-01', revenue: 12.4, fees: 1.8, sales: 42 },
    { date: '2024-11-05', revenue: 18.7, fees: 2.9, sales: 68 },
    { date: '2024-11-10', revenue: 22.3, fees: 3.5, sales: 89 },
    { date: '2024-11-15', revenue: 28.9, fees: 4.7, sales: 112 },
    { date: '2024-11-20', revenue: 35.2, fees: 5.8, sales: 138 },
    { date: '2024-11-25', revenue: 42.8, fees: 7.2, sales: 176 },
  ];

  const topCollectibles: TopCollectible[] = [
    { id: 1, name: 'Gibson Les Paul 1959', sales: 176, volume: '42.8 ETH', growth: 28 },
    { id: 2, name: 'Jordan Rookie Card 1986', sales: 138, volume: '35.2 ETH', growth: 45 },
    { id: 3, name: 'Monet Water Lilies Study', sales: 112, volume: '28.9 ETH', growth: -12 },
    { id: 4, name: 'Rolex Daytona Paul Newman', sales: 89, volume: '22.3 ETH', growth: 67 },
    { id: 5, name: 'Picasso Guernica Sketch', sales: 68, volume: '18.7 ETH', growth: 23 },
  ];

  const stats = {
    totalRevenue: '127.4 ETH',
    platformFees: '21.9 ETH',
    totalSales: 743,
    avgOrderValue: '0.17 ETH',
    newUsers: 284,
    conversionRate: '8.4%',
  };

  const exportReport = () => {
    alert('Report exported as CSV! (Real export coming soon)');
  };

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
                    <Shield className="h-14 w-14 text-green-500" />
                    Reports & Analytics
                  </h1>
                  <p className="text-xl text-gray-400 mt-3">Platform performance, revenue, and growth metrics</p>
                </div>
                <button
                  onClick={exportReport}
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-2xl transition"
                >
                  <Download className="h-6 w-6" />
                  Export Report
                </button>
              </div>
            </motion.div>

            {/* Date Range Selector */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="h-6 w-6 text-gray-400" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-6 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-green-500 transition"
                  >
                    <option value="last7days">Last 7 Days</option>
                    <option value="last30days">Last 30 Days</option>
                    <option value="last90days">Last 90 Days</option>
                    <option value="thisyear">This Year</option>
                  </select>
                </div>
                <div className="text-gray-400">
                  Updated {format(new Date(), 'MMM d, yyyy • h:mm a')}
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Total Revenue', value: stats.totalRevenue, icon: DollarSign, color: 'from-green-500 to-emerald-500', change: '+28.4%', positive: true },
                { label: 'Platform Fees', value: stats.platformFees, icon: TrendingUp, color: 'from-blue-500 to-cyan-500', change: '+18.7%', positive: true },
                { label: 'Total Sales', value: stats.totalSales, icon: Package, color: 'from-purple-500 to-pink-500', change: '+42.1%', positive: true },
                { label: 'New Users', value: stats.newUsers, icon: Users, color: 'from-orange-500 to-red-500', change: '+12.3%', positive: true },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 p-6 hover:shadow-2xl transition-shadow"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                        <metric.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.positive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className="text-4xl font-bold text-white mt-2">{metric.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Revenue Chart */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <BarChart3 className="h-8 w-8 text-green-400" />
                      Revenue Trend
                    </h3>
                    <div className="text-green-400 font-bold">+42.8% ↑</div>
                  </div>
                  <div className="h-80 bg-gray-700/50 rounded-xl flex items-end justify-between px-6 pb-6 gap-4">
                    {revenueData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:from-green-400 hover:to-green-300"
                          style={{ height: `${(data.revenue / 45) * 100}%` }}
                          title={`${data.revenue} ETH`}
                        />
                        <p className="text-xs text-gray-400">{format(new Date(data.date), 'MMM d')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Top Collectibles */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <div className="bg-gray-800 rounded-2xl border border-gray-700">
                  <div className="p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-purple-400" />
                      Top Performing Collectibles
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {topCollectibles.map((item, i) => (
                      <div key={item.id} className="p-6 hover:bg-gray-700/50 transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold text-gray-500">#{i + 1}</div>
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">{item.sales} sales • {item.volume}</p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 font-bold ${item.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.growth > 0 ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                            {Math.abs(item.growth)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <PieChart className="h-12 w-12 mb-4" />
                <div className="text-4xl font-bold mb-2">{stats.conversionRate}</div>
                <p className="text-blue-100">Conversion Rate</p>
                <p className="text-sm opacity-90 mt-2">12.3% better than last month</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                <Activity className="h-12 w-12 mb-4" />
                <div className="text-4xl font-bold mb-2">{stats.avgOrderValue}</div>
                <p className="text-orange-100">Avg Order Value</p>
                <p className="text-sm opacity-90 mt-2">Highest in platform history</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
                <DollarSign className="h-12 w-12 mb-4" />
                <div className="text-4xl font-bold mb-2">98.2%</div>
                <p className="text-emerald-100">Uptime This Month</p>
                <p className="text-sm opacity-90 mt-2">Zero critical incidents</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;