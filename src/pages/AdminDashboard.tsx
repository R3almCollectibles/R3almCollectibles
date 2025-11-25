// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Package,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  Clock,
  DollarSign,
  TrendingUp,
  UserX,
  Star,
  Trash2,
} from 'lucide-react';

interface Collectible {
  id: number;
  name: string;
  owner: string;
  price: string;
  shares: number;
  availableShares: number;
  status: 'pending' | 'verified' | 'listed' | 'sold' | 'rejected';
  category: string;
  createdAt: string;
  flagged: boolean;
}

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect non-admins
  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  // Mock data (replace with real API later)
  const collectibles: Collectible[] = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      owner: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      price: '2.5 ETH',
      shares: 100,
      availableShares: 47,
      status: 'verified',
      category: 'Music Instruments',
      createdAt: '2024-01-28',
      flagged: false,
    },
    {
      id: 2,
      name: 'Monet Water Lilies Study',
      owner: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      price: '5.2 ETH',
      shares: 250,
      availableShares: 89,
      status: 'pending',
      category: 'Art & Paintings',
      createdAt: '2024-01-29',
      flagged: true,
    },
    {
      id: 3,
      name: 'Jordan Game-Worn Jersey 1996',
      owner: '0x234b5c6d7e8f9g0h1i2j3k4l5m6n7o8p',
      price: '1.8 ETH',
      shares: 50,
      availableShares: 0,
      status: 'sold',
      category: 'Sports Memorabilia',
      createdAt: '2024-01-15',
      flagged: false,
    },
    {
      id: 4,
      name: 'Counterfeit Rolex Submariner',
      owner: '0x999888777666555444333222111000999',
      price: '0.8 ETH',
      shares: 100,
      availableShares: 100,
      status: 'rejected',
      category: 'Watches',
      createdAt: '2024-01-27',
      flagged: true,
    },
  ];

  const stats = {
    total: collectibles.length,
    pending: collectibles.filter(c => c.status === 'pending').length,
    flagged: collectibles.filter(c => c.flagged).length,
    platformFees: '0.46 ETH',
  };

  const filtered = collectibles.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleVerify = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Collectible #${id} has been VERIFIED and listed!`);
      setIsLoading(false);
      // TODO: Call API to update status
    }, 800);
  };

  const handleReject = (id: number) => {
    if (window.confirm('Reject this collectible? User will be notified.')) {
      alert(`Collectible #${id} rejected.`);
      // TODO: API call
    }
  };

  const handleBanUser = (owner: string) => {
    if (window.confirm('Ban this user from the platform? This is permanent.')) {
      alert(`User ${owner.slice(0, 8)}... banned.`);
      // TODO: API call
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      verified: 'bg-green-500/10 text-green-400',
      pending: 'bg-yellow-500/10 text-yellow-400',
      rejected: 'bg-red-500/10 text-red-400',
      sold: 'bg-blue-500/10 text-blue-400',
      listed: 'bg-purple-500/10 text-purple-400',
    };

    const Icon = {
      verified: CheckCircle,
      pending: Clock,
      rejected: XCircle,
      sold: DollarSign,
      listed: TrendingUp,
    }[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        <Icon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
                <Shield className="h-12 w-12 text-red-500" />
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Welcome back, <span className="font-semibold text-white">{user.name}</span></p>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
              ADMIN MODE
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Collectibles', value: stats.total, icon: Package, color: 'from-blue-500 to-cyan-500' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'from-yellow-500 to-orange-500', alert: stats.pending > 0 },
            { label: 'Flagged Items', value: stats.flagged, icon: AlertCircle, color: 'from-red-500 to-pink-500', alert: true },
            { label: 'Platform Earnings', value: stats.platformFees, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-gray-800 border ${stat.alert ? 'border-red-500/50' : 'border-gray-700'} p-6`}
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
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or wallet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
            >
              <option value="all">All Items</option>
              <option value="pending">Pending Review</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="sold">Sold Out</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Collectible Management</h2>
            </div>

            {filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>No collectibles found matching your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                      <th className="px-6 py-4">Collectible</th>
                      <th className="px-6 py-4">Owner</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Shares</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="bg-gray-700 rounded-xl w-12 h-12 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{item.name}</div>
                              <div className="text-gray-400 text-sm">{item.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-mono text-gray-300 text-sm">
                            {item.owner.slice(0, 8)}...{item.owner.slice(-6)}
                          </span>
                          {item.flagged && <span className="ml-2 text-red-400 text-xs">⚠ Flagged</span>}
                        </td>
                        <td className="px-6 py-5 text-white font-semibold">{item.price}</td>
                        <td className="px-6 py-5">
                          <div className="text-white">
                            {item.availableShares} / {item.shares}
                            {item.availableShares === 0 && <span className="ml-2 text-blue-400 text-xs font-medium">SOLD OUT</span>}
                          </div>
                        </td>
                        <td className="px-6 py-5">{getStatusBadge(item.status)}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => navigate(`/collectible/${item.id}`)}
                              className="p-2.5 hover:bg-gray-600 rounded-lg transition tooltip"
                              title="View Details"
                            >
                              <Eye className="h-4.5 w-4.5 text-gray-400" />
                            </button>

                            {item.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleVerify(item.id)}
                                  disabled={isLoading}
                                  className="p-2.5 hover:bg-green-600/20 rounded-lg transition tooltip"
                                  title="Verify & List"
                                >
                                  <CheckCircle2 className="h-4.5 w-4.5 text-green-400" />
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  className="p-2.5 hover:bg-red-600/20 rounded-lg transition tooltip"
                                  title="Reject"
                                >
                                  <XCircle className="h-4.5 w-4.5 text-red-400" />
                                </button>
                              </>
                            )}

                            {item.flagged && (
                              <button
                                onClick={() => handleBanUser(item.owner)}
                                className="p-2.5 hover:bg-red-600/30 rounded-lg transition tooltip"
                                title="Ban User"
                              >
                                <UserX className="h-4.5 w-4.5 text-red-400" />
                              </button>
                            )}

                            <button className="p-2.5 hover:bg-gray-600 rounded-lg transition tooltip" title="More">
                              <MoreVertical className="h-4.5 w-4.5 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;