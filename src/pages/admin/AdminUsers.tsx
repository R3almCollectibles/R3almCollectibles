// src/pages/admin/AdminUsers.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Shield,
  Users,
  Search,
  Filter,
  MoreVertical,
  Ban,
  UserCheck,
  UserX,
  AlertTriangle,
  Clock,
  DollarSign,
  Package,
  Eye,
  Mail,
  Calendar,
  TrendingUp,
  Star,
  ChevronDown,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  wallet: string;
  avatar?: string;
  joinDate: string;
  status: 'active' | 'suspended' | 'banned';
  role: 'user' | 'verified' | 'collector' | 'admin';
  totalSpent: string;
  itemsOwned: number;
  itemsListed: number;
  flagged: boolean;
  reports: number;
  lastActive: string;
}

const AdminUsers = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('joinDate');

  useEffect(() => {
    if (!isAuthenticated || !currentUser?.isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || !currentUser?.isAdmin) return null;

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'Alex Chen',
      email: 'alex@collector.com',
      wallet: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      joinDate: '2023-06-15',
      status: 'active',
      role: 'verified',
      totalSpent: '12.4 ETH',
      itemsOwned: 28,
      itemsListed: 5,
      flagged: false,
      reports: 0,
      lastActive: '2024-02-10',
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah.m@gmail.com',
      wallet: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      joinDate: '2024-01-20',
      status: 'active',
      role: 'collector',
      totalSpent: '8.9 ETH',
      itemsOwned: 12,
      itemsListed: 3,
      flagged: true,
      reports: 4,
      lastActive: '2024-02-11',
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john@spam.com',
      wallet: '0x999888777666555444333222111000999',
      joinDate: '2024-01-05',
      status: 'suspended',
      role: 'user',
      totalSpent: '0.1 ETH',
      itemsOwned: 0,
      itemsListed: 0,
      flagged: true,
      reports: 12,
      lastActive: '2024-01-25',
    },
    {
      id: '4',
      name: 'Platform Admin',
      email: 'admin@demo.com',
      wallet: '0x111222333444555666777888999000111',
      joinDate: '2023-01-01',
      status: 'active',
      role: 'admin',
      totalSpent: '0 ETH',
      itemsOwned: 0,
      itemsListed: 0,
      flagged: false,
      reports: 0,
      lastActive: '2024-02-11',
    },
  ];

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    flagged: users.filter(u => u.flagged).length,
  };

  const filteredUsers = users
    .filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.wallet.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || u.role === filterRole;
      const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'joinDate') return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      if (sortBy === 'totalSpent') return parseFloat(b.totalSpent) - parseFloat(a.totalSpent);
      if (sortBy === 'reports') return b.reports - a.reports;
      return 0;
    });

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
      verified: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
      collector: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
      user: 'bg-gray-500/20 text-gray-400 border border-gray-500/50',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[role]}`}>{role.toUpperCase()}</span>;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-500/10 text-green-400',
      suspended: 'bg-yellow-500/10 text-yellow-400',
      banned: 'bg-red-500/10 text-red-400',
    };
    const Icon = status === 'active' ? UserCheck : status === 'suspended' ? Clock : UserX;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        <Icon className="h-3.5 w-3.5" />
        {status}
      </span>
    );
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-4">
                <Users className="h-12 w-12 text-purple-500" />
                User Management
              </h1>
              <p className="text-gray-400 mt-2">Manage platform users • Total: {users.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
              ADMIN MODE
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Users', value: stats.total, icon: Users, color: 'from-blue-500 to-cyan-500' },
            { label: 'Active Users', value: stats.active, icon: UserCheck, color: 'from-green-500 to-emerald-500' },
            { label: 'Suspended', value: stats.suspended, icon: AlertTriangle, color: 'from-yellow-500 to-orange-500', alert: true },
            { label: 'Flagged Accounts', value: stats.flagged, icon: AlertTriangle, color: 'from-red-500 to-pink-500', alert: true },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl bg-gray-800 border ${stat.alert ? 'border-red-500/50' : 'border-gray-700'} p-6 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              {stat.alert && <div className="absolute top-3 right-3 animate-pulse"><div className="h-3 w-3 bg-red-500 rounded-full" /></div>}
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="verified">Verified</option>
              <option value="collector">Collector</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="joinDate">Join Date</option>
              <option value="totalSpent">Total Spent</option>
              <option value="reports">Reports</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">All Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Activity</th>
                    <th className="px-6 py-4">Reports</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-gray-400 text-sm font-mono">
                              {user.wallet.slice(0, 8)}...{user.wallet.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-5">{getStatusBadge(user.status)}</td>
                      <td className="px-6 py-5">
                        <div className="text-sm">
                          <div className="text-white font-medium">{user.totalSpent} spent</div>
                          <div className="text-gray-400">
                            {user.itemsOwned} owned • {user.itemsListed} listed
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${user.reports > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                            {user.reports}
                          </span>
                          {user.flagged && <AlertTriangle className="h-5 w-5 text-red-400" />}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/user/${user.id}`)}
                            className="p-2.5 hover:bg-blue-600/20 rounded-lg transition"
                            title="View Profile"
                          >
                            <Eye className="h-4.5 w-4.5 text-blue-400" />
                          </button>
                          <button
                            className="p-2.5 hover:bg-yellow-600/20 rounded-lg transition"
                            title="Suspend"
                          >
                            <Clock className="h-4.5 w-4.5 text-yellow-400" />
                          </button>
                          <button
                            className="p-2.5 hover:bg-red-600/20 rounded-lg transition"
                            title="Ban User"
                          >
                            <Ban className="h-4.5 w-4.5 text-red-400" />
                          </button>
                          <button className="p-2.5 hover:bg-gray-600 rounded-lg transition">
                            <MoreVertical className="h-4.5 w-4.5 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;