// src/pages/admin/AdminUserDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  Shield,
  ArrowLeft,
  User,
  Mail,
  Wallet,
  Calendar,
  AlertTriangle,
  Ban,
  UserCheck,
  Clock,
  DollarSign,
  Package,
  Star,
  Flag,
  MessageSquare,
  Activity,
  TrendingUp,
  XCircle,
  CheckCircle2,
} from 'lucide-react';

interface UserDetail {
  id: string;
  name: string;
  email: string;
  wallet: string;
  avatar?: string;
  bio: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'suspended' | 'banned';
  role: 'user' | 'verified' | 'collector' | 'admin';
  totalSpent: string;
  itemsOwned: number;
  itemsListed: number;
  reportsReceived: number;
  reportsMade: number;
  flagged: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  transactions: { date: string; type: string; amount: string; item?: string }[];
  activity: { date: string; action: string; details: string }[];
}

const AdminUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'transactions'>('overview');
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (!currentAdmin?.isAdmin) {
      navigate('/admin');
    }
  }, [currentAdmin, navigate]);

  // Mock data — replace with real API call
  useEffect(() => {
    const mockUser: UserDetail = {
      id: id || '2',
      name: 'Sarah Miller',
      email: 'sarah.m@gmail.com',
      wallet: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      bio: 'Passionate art collector and investor in fractional ownership. Love Monet and vintage watches.',
      joinDate: '2024-01-20',
      lastActive: '2 hours ago',
      status: 'active',
      role: 'collector',
      totalSpent: '8.9 ETH',
      itemsOwned: 12,
      itemsListed: 3,
      reportsReceived: 4,
      reportsMade: 1,
      flagged: true,
      kycStatus: 'verified',
      transactions: [
        { date: '2024-02-10', type: 'bought', amount: '2.1 ETH', item: 'Monet Water Lilies Study' },
        { date: '2024-02-08', type: 'sold', amount: '0.8 ETH', item: 'Vintage Rolex Share' },
        { date: '2024-01-30', type: 'bought', amount: '1.5 ETH', item: 'Gibson Les Paul 1959' },
      ],
      activity: [
        { date: '2024-02-11 14:22', action: 'Flagged Item', details: 'Reported authenticity concern on #124' },
        { date: '2024-02-10 09:15', action: 'Purchased Shares', details: 'Bought 50 shares of Monet painting' },
        { date: '2024-02-05 18:30', action: 'Left Review', details: '5 stars on Vintage Watch' },
      ],
    };
    setUser(mockUser);
  }, [id]);

  const handleSuspend = () => {
    if (window.confirm('Suspend this user for 30 days?')) {
      alert('User suspended.');
      setUser(prev => prev ? { ...prev, status: 'suspended' } : null);
    }
  };

  const handleBan = () => {
    if (window.confirm('PERMANENTLY BAN this user? This cannot be undone.')) {
      alert('User banned permanently.');
      setUser(prev => prev ? { ...prev, status: 'banned' } : null);
    }
  };

  const handleUnban = () => {
    setUser(prev => prev ? { ...prev, status: 'active' } : null);
    alert('User unbanned.');
  };

  if (!user) return null;

  const getStatusBadge = () => {
    const styles: Record<string, any> = {
      active: { color: 'text-green-400 bg-green-500/10', icon: UserCheck },
      suspended: { color: 'text-yellow-400 bg-yellow-500/10', icon: Clock },
      banned: { color: 'text-red-400 bg-red-500/10', icon: Ban },
    };
    const { color, icon: Icon } = styles[user.status];
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${color}`}>
        <Icon className="h-4 w-4" />
        {user.status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Users
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              {user.flagged && (
                <div className="absolute -top-2 -right-2">
                  <Flag className="h-10 w-10 text-red-500 animate-pulse" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">{user.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                {getStatusBadge()}
                <span className="text-gray-400">•</span>
                <span className="text-purple-400 font-medium">{user.role.toUpperCase()}</span>
              </div>
              <p className="text-gray-400 mt-3 max-w-2xl">{user.bio}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {user.status === 'active' && (
              <>
                <button
                  onClick={handleSuspend}
                  className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold flex items-center gap-2"
                >
                  <Clock className="h-5 w-5" />
                  Suspend User
                </button>
                <button
                  onClick={handleBan}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center gap-2"
                >
                  <Ban className="h-5 w-5" />
                  Ban Permanently
                </button>
              </>
            )}
            {user.status === 'suspended' && (
              <button
                onClick={handleUnban}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center gap-2"
              >
                <UserCheck className="h-5 w-5" />
                Lift Suspension
              </button>
            )}
            {user.status === 'banned' && (
              <button
                onClick={handleUnban}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold flex items-center gap-2"
              >
                <UserCheck className="h-5 w-5" />
                Unban User
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-10">
          <div className="flex gap-10">
            {(['overview', 'activity', 'transactions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-blue-500'
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'activity' && 'Activity Log'}
                {tab === 'transactions' && 'Transactions'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-5">Account Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Wallet Address</p>
                    <p className="text-white font-mono text-sm flex items-center gap-2">
                      <Wallet className="h-4 w-4" /> {user.wallet}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Joined</p>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Active</p>
                    <p className="text-white flex items-center gap-2">
                      <Activity className="h-4 w-4" /> {user.lastActive}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-5">KYC Status</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">Verified</span>
                  <CheckCircle2 className="h-10 w-10 text-green-400" />
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
                <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-4xl font-bold text-white">{user.totalSpent}</p>
                <p className="text-gray-400 mt-2">Total Spent</p>
              </div>
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
                <Package className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-4xl font-bold text-white">{user.itemsOwned}</p>
                <p className="text-gray-400 mt-2">Items Owned</p>
              </div>
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
                <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-4xl font-bold text-white">{user.itemsListed}</p>
                <p className="text-gray-400 mt-2">Items Listed</p>
              </div>
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-4xl font-bold text-white">{user.reportsReceived}</p>
                <p className="text-gray-400 mt-2">Reports Received</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Activity className="h-7 w-7" />
                Recent Activity
              </h3>
            </div>
            <div className="divide-y divide-gray-700">
              {user.activity.map((log, i) => (
                <div key={i} className="p-6 hover:bg-gray-700/30 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{log.action}</p>
                        <p className="text-gray-400 text-sm">{log.details}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">Transaction History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {user.transactions.map((tx, i) => (
                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/30">
                      <td className="px-6 py-4 text-white">{tx.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'bought' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {tx.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-bold">{tx.amount}</td>
                      <td className="px-6 py-4 text-gray-300">{tx.item || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetail;