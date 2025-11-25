// src/pages/admin/AdminDashboard.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Shield,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Clock,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user?.isAdmin) return null;

  const quickActions = [
    {
      title: 'Collectible Management',
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      link: '/admin',
      desc: 'Review, verify, and manage collectibles',
      alert: 12,
    },
    {
      title: 'User Management',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      link: '/admin/users',
      desc: 'View users, suspend, or ban accounts',
      alert: 4,
    },
    {
      title: 'Revenue & Analytics',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      link: '/admin/revenue',
      desc: 'Platform earnings and growth',
    },
    {
      title: 'Disputes & Reports',
      icon: AlertCircle,
      color: 'from-red-500 to-rose-500',
      link: '/admin/disputes',
      desc: 'Handle flags and user reports',
      alert: 8,
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white flex items-center gap-5">
                <Shield className="h-14 w-14 text-red-500" />
                Admin Control Center
              </h1>
              <p className="text-xl text-gray-400 mt-3">
                Welcome back, <span className="font-bold text-white">{user.name}</span>
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              ADMIN MODE ACTIVE
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={action.link}
                className="group block relative overflow-hidden rounded-3xl bg-gray-800 border border-gray-700 p-8 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition`} />
                
                <div className="relative">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} w-fit mb-5`}>
                    <action.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.desc}</p>

                  {action.alert && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-400 font-semibold">{action.alert} pending</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-blue-400 group-hover:translate-x-2 transition-transform">
                  Manage →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Collectibles Pending Review */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-3xl border border-gray-700 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-4">
              <Clock className="h-10 w-10 text-yellow-400" />
              Pending Collectible Review
            </h2>
            <Link to="/admin" className="text-blue-400 hover:text-blue-300 font-medium">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600 hover:border-yellow-500/50 transition">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-yellow-400 font-medium">Pending Verification</span>
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-white">Rare Collectible #{i}</h4>
                <p className="text-gray-400 text-sm mt-1">Submitted 2 hours ago</p>
                <button className="mt-4 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition">
                  Review Now
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-gray-500">
          <p>You are operating in full administrator mode. All actions are logged.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;