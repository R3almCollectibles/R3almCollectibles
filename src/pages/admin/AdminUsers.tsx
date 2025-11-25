// src/pages/admin/AdminUsers.tsx – COMPLETE & READY
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  AlertCircle,
  Ban,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  wallet: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'suspended' | 'banned';
  joinedDate: string;
  collectiblesOwned: number;
  totalSpent: string;
  flagged: boolean;
}

const AdminUsers: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const users: User[] = [
    {
      id: '1',
      name: 'Alex Chen',
      email: 'alex@realm.com',
      wallet: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      role: 'user',
      status: 'active',
      joinedDate: '2024-01-15',
      collectiblesOwned: 12,
      totalSpent: '8.4 ETH',
      flagged: false,
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah.miller@gmail.com',
      wallet: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      role: 'user',
      status: 'active',
      joinedDate: '2024-02-20',
      collectiblesOwned: 28,
      totalSpent: '42.1 ETH',
      flagged: false,
    },
    {
      id: '3',
      name: 'John Doe (Suspicious)',
      email: 'john.doe@spam.co',
      wallet: '0x999888777666555444333222111000999',
      role: 'user',
      status: 'suspended',
      joinedDate: '2024-03-10',
      collectiblesOwned: 3,
      totalSpent: '0.8 ETH',
      flagged: true,
    },
    {
      id: '4',
      name: 'Admin Team',
      email: 'admin@capitalrealm.io',
      wallet: '0x1234567890abcdef1234567890abcdef',
      role: 'admin',
      status: 'active',
      joinedDate: '2023-12-01',
      collectiblesOwned: 0,
      totalSpent: '0 ETH',
      flagged: false,
    },
  ];

  const filtered = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.wallet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSuspend = (id: string) => {
    if (window.confirm('Suspend this user? They will lose access temporarily.')) {
      alert(`User ${id} suspended.`);
    }
  };

  const handleBan = (id: string) => {
    if (window.confirm('PERMANENTLY ban this user? This cannot be undone.')) {
      alert(`User ${id} banned permanently.`);
    }
  };

  const handleMakeAdmin = (id: string) => {
    if (window.confirm('Grant admin privileges to this user?')) {
      alert(`User ${id} is now an admin.`);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
      moderator: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      user: 'bg-gray-500/10 text-gray-400',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[role] || styles.user}`}>{role.toUpperCase()}</span>;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { class: string; icon: any }> = {
      active: { class: 'bg-green-500/10 text-green-400', icon: CheckCircle2 },
      suspended: { class: 'bg-yellow-500/10 text-yellow-400', icon: Clock },
      banned: { class: 'bg-red-500/10 text-red-400', icon: Ban },
    };
    const { class: cls, icon: Icon } = config[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
        <Icon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
                  <h1 className="text-4xl font-bold text-white flex items-center gap-4">
                    <Shield className="h-12 w-12 text-purple-500" />
                    User Management
                  </h1>
                  <p className="text-gray-400 mt-2">Manage platform users, roles, and access</p>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                  {users.length} USERS
                </div>
              </div>
            </motion.div>

            {/* Search & Filters */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or wallet..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="admin">Admins</option>
                  <option value="moderator">Moderators</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold text-white">All Users</h2>
                </div>

                {filtered.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">
                    <UserX className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p>No users found matching your filters.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Wallet</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Activity</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((user) => (
                          <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/80 transition">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                <div className="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
                                  <UserCheck className="h-7 w-7 text-gray-400" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-sm flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" />
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="font-mono text-gray-300 text-sm">
                                {user.wallet.slice(0, 8)}...{user.wallet.slice(-6)}
                              </span>
                              {user.flagged && <AlertCircle className="inline-block ml-2 h-4 w-4 text-red-400" title="Flagged for review" />}
                            </td>
                            <td className="px-6 py-5">{getRoleBadge(user.role)}</td>
                            <td className="px-6 py-5">{getStatusBadge(user.status)}</td>
                            <td className="px-6 py-5">
                              <div className="text-sm">
                                <div className="text-white">{user.collectiblesOwned} owned</div>
                                <div className="text-gray-400">Spent {user.totalSpent}</div>
                                <div className="text-gray-500 text-xs mt-1">
                                  <Calendar className="inline h-3