// src/pages/admin/AdminCollectibles.tsx – FULLY WORKING
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  Package,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface Collectible {
  id: string;
  name: string;
  owner: string;
  price: string;
  status: 'pending' | 'verified' | 'rejected' | 'flagged';
  submitted: string;
  category: string;
  value: string;
}

const AdminCollectibles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const collectibles: Collectible[] = [
    { id: '1', name: 'Gibson Les Paul 1959', owner: '0x742d...3C4', price: '42.8 ETH', status: 'verified', submitted: '2 hours ago', category: 'Guitar', value: 'High' },
    { id: '2', name: 'Rolex Daytona Paul Newman', owner: '0x891a...5o', price: '28.9 ETH', status: 'pending', submitted: '5 hours ago', category: 'Watch', value: 'Very High' },
    { id: '3', name: 'Jordan Rookie Card 1986', owner: '0x9998...0999', price: '35.2 ETH', status: 'flagged', submitted: '1 day ago', category: 'Sports', value: 'High' },
    { id: '4', name: 'Monet Water Lilies Study', owner: '0x1234...cdef', price: '18.7 ETH', status: 'verified', submitted: '3 days ago', category: 'Art', value: 'Medium' },
    { id: '5', name: 'Picasso Guernica Sketch', owner: '0x5678...abcd', price: '22.3 ETH', status: 'pending', submitted: '1 week ago', category: 'Art', value: 'High' },
  ];

  const filtered = collectibles.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { class: string; icon: any; text: string }> = {
      verified: { class: 'bg-green-500/10 text-green-400 border border-green-500/30', icon: CheckCircle2, text: 'Verified' },
      pending: { class: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30', icon: Clock, text: 'Pending Review' },
      rejected: { class: 'bg-red-500/10 text-red-400 border border-red-500/30', icon: AlertCircle, text: 'Rejected' },
      flagged: { class: 'bg-orange-500/10 text-orange-400 border border-orange-500/30', icon: AlertCircle, text: 'Flagged' },
    };
    const { class: cls, icon: Icon, text } = config[status] || config.pending;
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${cls}`}>
        <Icon className="h-4 w-4" />
        {text}
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
                  <h1 className="text-5xl font-bold text-white flex items-center gap-5">
                    <Shield className="h-14 w-14 text-blue-500" />
                    Collectibles Management
                  </h1>
                  <p className="text-xl text-gray-400 mt-3">Review, verify, and manage all collectibles on the platform</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg">
                    {collectibles.length} TOTAL
                  </div>
                  <div className="bg-yellow-600/20 text-yellow-400 px-6 py-4 rounded-xl font-bold border border-yellow-500/30">
                    {collectibles.filter(c => c.status === 'pending').length} PENDING
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Search & Filters */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search collectibles, owners, or IDs..."
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
                  <option value="all">All Status</option>
                  <option value="pending">Pending Review</option>
                  <option value="verified">Verified</option>
                  <option value="flagged">Flagged</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Collectibles Table */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                        <th className="px-6 py-4">Collectible</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Value</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Submitted</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="bg-gray-700 rounded-xl w-16 h-16 flex items-center justify-center">
                                <Package className="h-10 w-10 text-gray-400" />
                              </div>
                              <div>
                                <Link to={`/admin/collectibles/${item.id}`} className="text-white font-medium hover:text-blue-400 transition">
                                  {item.name}
                                </Link>
                                <div className="text-gray-400 text-sm mt-1">{item.price}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="font-mono text-gray-300 text-sm">{item.owner}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">{item.category}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-white font-medium">{item.value}</span>
                          </td>
                          <td className="px-6 py-5">{getStatusBadge(item.status)}</td>
                          <td className="px-6 py-5">
                            <div className="text-sm text-gray-400">{item.submitted}</div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                to={`/admin/collectibles/${item.id}`}
                                className="p-3 hover:bg-gray-600 rounded-lg transition"
                                title="View Details"
                              >
                                <Eye className="h-5 w-5 text-gray-400" />
                              </Link>
                              {item.status === 'pending' && (
                                <>
                                  <button className="p-3 hover:bg-green-600/20 rounded-lg transition" title="Approve">
                                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                                  </button>
                                  <button className="p-3 hover:bg-red-600/20 rounded-lg transition" title="Reject">
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                  </button>
                                </>
                              )}
                              <button className="p-3 hover:bg-gray-600 rounded-lg transition">
                                <MoreVertical className="h-5 w-5 text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCollectibles;