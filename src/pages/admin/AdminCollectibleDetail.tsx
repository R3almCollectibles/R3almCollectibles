// src/pages/admin/AdminCollectibleDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  XCircle,
  User,
  Shield,
  Clock,
  DollarSign,
  AlertTriangle,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Users,
  Ban,
} from 'lucide-react';

// Mock data — replace with real API later
const mockData: Record<number, any> = {
  1: {
    id: 1,
    name: 'Vintage Gibson Les Paul 1959',
    owner: '0x742d35Cc6634C0532925a3b8D46DE3C4',
    creator: '0x1234567890abcdef1234567890abcdef',
    price: '2.5 ETH',
    totalShares: 100,
    availableShares: 47,
    status: 'verified' as const,
    category: 'Music Instruments',
    createdAt: '2024-01-28T10:30:00Z',
    verifiedAt: '2024-01-29T14:22:00Z',
    description:
      'Extremely rare 1959 Gibson Les Paul Standard in original Sunburst finish. All original parts, including PAF pickups. Comes with original hardshell case and certificate of authenticity from Gibson.',
    imageUrl: 'https://images.unsplash.com/photo-1516924962500-260149b803a7?w=800&q=80',
    flagged: false,
    metadata: {
      serialNumber: '9 1723',
      condition: 'Excellent',
      authenticity: 'Verified by Gibson Expert',
      location: 'Nashville, TN',
      year: 1959,
    },
    provenance: [
      { date: '2024-01-28', event: 'Minted', user: '0x1234...cdef', tx: '0xabc123...' },
      { date: '2024-01-29', event: 'Verified by Admin', user: 'admin@r3alm.com', tx: null },
      { date: '2024-02-01', event: '53 Shares Sold', user: 'Marketplace', tx: '0xdef456...' },
    ],
  },
  2: {
    id: 2,
    name: 'Monet Water Lilies Study',
    owner: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
    creator: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
    price: '5.2 ETH',
    totalShares: 250,
    availableShares: 89,
    status: 'pending' as const,
    category: 'Art & Paintings',
    createdAt: '2024-01-29T08:15:00Z',
    description: 'Original oil study for Claude Monet’s famous Water Lilies series. Provenance from private European collection.',
    imageUrl: 'https://images.unsplash.com/photo-1577720640295-6d5e9db28775?w=800&q=80',
    flagged: true,
    metadata: {
      medium: 'Oil on canvas',
      dimensions: '65 × 81 cm',
      year: '1918',
      authenticity: 'Under review',
    },
    provenance: [
      { date: '2024-01-29', event: 'Minted', user: '0x891a...n5o', tx: '0xghi789...' },
    ],
  },
};

const AdminCollectibleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numId = Number(id);
    setTimeout(() => {
      setItem(mockData[numId] || null);
      setLoading(false);
    }, 600);
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <Package className="h-16 w-16 text-gray-600 mb-4" />
        <h1 className="text-3xl font-bold">Collectible Not Found</h1>
        <button
          onClick={() => navigate('/admin')}
          className="mt-6 flex items-center gap-2 text-blue-400 hover:underline"
        >
          <ArrowLeft className="h-5 w-5" /> Back to Dashboard
        </button>
      </div>
    );
  }

  const statusConfig = {
    pending: { color: 'yellow', label: 'Pending Review', icon: Clock },
    verified: { color: 'green', label: 'Verified & Listed', icon: CheckCircle2 },
    rejected: { color: 'red', label: 'Rejected', icon: XCircle },
  };

  const StatusIcon = statusConfig[item.status].icon;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/admin')}
              className="p-3 hover:bg-gray-800 rounded-xl transition"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Package className="h-9 w-9 text-blue-500" />
                {item.name}
              </h1>
              <p className="text-gray-400 mt-1">Collectible ID: #{item.id}</p>
            </div>
          </div>

          {item.status === 'pending' && (
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition">
                <CheckCircle2 className="h-5 w-5" />
                Verify & List
              </button>
              <button className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition">
                <XCircle className="h-5 w-5" />
                Reject
              </button>
            </div>
          )}
          {item.flagged && (
            <button className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition">
              <Ban className="h-5 w-5" />
              Ban User
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image + Status */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700"
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full h-96 object-cover" />
              ) : (
                <div className="h-96 bg-gray-700 flex items-center justify-center">
                  <ImageIcon className="h-24 w-24 text-gray-600" />
                </div>
              )}
            </motion.div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Status</h3>
                <StatusIcon className={`h-8 w-8 text-${statusConfig[item.status].color}-400`} />
              </div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${statusConfig[item.status].color}-500/10 text-${statusConfig[item.status].color}-400 font-semibold`}
              >
                <statusConfig[item.status].icon className="h-5 w-5" />
                {statusConfig[item.status].label}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <DollarSign className="h-6 w-6 text-green-400 mb-2" />
                <p className="text-2xl font-bold">{item.price}</p>
                <p className="text-gray-400 text-sm">Total Value</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <Users className="h-6 w-6 text-blue-400 mb-2" />
                <p className="text-2xl font-bold">{item.totalShares - item.availableShares}</p>
                <p className="text-gray-400 text-sm">Shares Sold</p>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-400" />
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-400" />
                    Current Owner
                  </h3>
                  <button onClick={() => copyToClipboard(item.owner)} className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-mono text-sm break-all">{item.owner}</p>
              </div>

              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Creator
                  </h3>
                  <button onClick={() => copyToClipboard(item.creator)} className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-mono text-sm break-all">{item.creator}</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold mb-4">Metadata</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-white font-medium mt-1">{value as string}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold mb-4">Provenance History</h3>
              <div className="space-y-4">
                {item.provenance.map((event: any, i: number) => (
                  <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-700 last:border-0">
                    <div className="bg-gray-700 rounded-full p-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(event.date).toLocaleString()} by {event.user}
                      </p>
                      {event.tx && (
                        <a
                          href={`https://etherscan.io/tx/${event.tx}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline mt-2"
                        >
                          View Transaction <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCollectibleDetail;