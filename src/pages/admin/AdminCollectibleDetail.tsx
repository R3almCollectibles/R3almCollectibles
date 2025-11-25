// src/pages/admin/AdminCollectibleDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  Shield,
  ArrowLeft,
  Package,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit3,
  Save,
  Ban,
  Trash2,
  Clock,
  DollarSign,
  Image,
  FileText,
  Tag,
  Activity,
  History,
  ChevronRight,
  Star,
  Flag,
} from 'lucide-react';

interface CollectibleDetail {
  id: number;
  name: string;
  description: string;
  owner: string;
  ownerName: string;
  price: string;
  totalShares: number;
  availableShares: number;
  status: 'pending' | 'verified' | 'listed' | 'sold' | 'rejected';
  category: string;
  createdAt: string;
  verifiedAt?: string;
  rejectedAt?: string;
  flagged: boolean;
  flaggedReason?: string;
  images: string[];
  documents: { name: string; url: string }[];
  attributes: { trait_type: string; value: string }[];
  provenance: {
    date: string;
    event: string;
    from: string;
    to: string;
    txHash: string;
  }[];
  activity: {
    date: string;
    action: string;
    user: string;
    details: string;
  }[];
}

const AdminCollectibleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'details' | 'provenance' | 'attributes' | 'activity'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [collectible, setCollectible] = useState<CollectibleDetail | null>(null);
  const [editedData, setEditedData] = useState<Partial<CollectibleDetail>>({});

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, user, navigate]);

  // Mock data – replace with real API later
  useEffect(() => {
    const mockData: CollectibleDetail = {
      id: parseInt(id || '2'),
      name: 'Monet Water Lilies Study',
      description: 'Original oil on canvas study for Claude Monet\'s famous Water Lilies series, created circa 1918. Acquired from a private collection in Paris.',
      owner: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      ownerName: 'ArtLover2024',
      price: '5.2 ETH',
      totalShares: 250,
      availableShares: 89,
      status: 'pending',
      category: 'Art & Paintings',
      createdAt: '2024-01-29',
      flagged: true,
      flaggedReason: 'Multiple users reported potential authenticity concerns',
      images: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
        'https://images.unsplash.com/photo-1544966613-9b9a6116d7de?w=800',
        'https://images.unsplash.com/photo-1577720580479-7c5e4c8e3e84?w=800',
      ],
      documents: [
        { name: 'Certificate of Authenticity.pdf', url: '#' },
        { name: 'Provenance Letter - Galerie Durand-Ruel.pdf', url: '#' },
        { name: 'Conservation Report 2023.pdf', url: '#' },
      ],
      attributes: [
        { trait_type: 'Artist', value: 'Claude Monet' },
        { trait_type: 'Year', value: '1918' },
        { trait_type: 'Medium', value: 'Oil on Canvas' },
        { trait_type: 'Dimensions', value: '73 × 100 cm' },
        { trait_type: 'Rarity', value: 'One of One' },
        { trait_type: 'Condition', value: 'Excellent' },
      ],
      provenance: [
        { date: '2024-01-29', event: 'Minted', from: 'System', to: 'ArtLover2024', txHash: '0xabc123...' },
        { date: '2024-01-15', event: 'Acquired', from: 'Private Collector', to: 'ArtLover2024', txHash: '0xdef456...' },
        { date: '1998-06-20', event: 'Sold at Auction', from: 'Galerie Durand-Ruel', to: 'Private Collector', txHash: '-' },
      ],
      activity: [
        { date: '2024-01-30 14:32', action: 'Flagged', user: 'User#4421', details: 'Reported as potentially inauthentic' },
        { date: '2024-01-30 12:15', action: 'Flagged', user: 'ArtExpert88', details: 'Questionable brushwork in lower right' },
        { date: '2024-01-29 09:00', action: 'Submitted for Review', user: 'ArtLover2024', details: 'Collectible submitted' },
      ],
    };
    setCollectible(mockData);
    setEditedData(mockData);
  }, [id]);

  const handleSave = () => {
    alert('Collectible updated successfully!');
    setIsEditing(false);
    setCollectible(prev => prev ? { ...prev, ...editedData } : null);
  };

  const handleVerify = () => {
    if (window.confirm('Verify and list this collectible?')) {
      setCollectible(prev => prev ? { ...prev, status: 'verified', verifiedAt: new Date().toISOString() } : null);
      alert('Collectible verified and listed!');
    }
  };

  const handleReject = () => {
    if (window.confirm('Reject this collectible? User will be notified.')) {
      setCollectible(prev => prev ? { ...prev, status: 'rejected', rejectedAt: new Date().toISOString() } : null);
      alert('Collectible rejected.');
    }
  };

  const getStatusBadge = (status: string) => {
    const map = {
      pending: { color: 'bg-yellow-500/10 text-yellow-400', icon: Clock },
      verified: { color: 'bg-green-500/10 text-green-400', icon: CheckCircle2 },
      rejected: { color: 'bg-red-500/10 text-red-400', icon: XCircle },
      sold: { color: 'bg-blue-500/10 text-blue-400', icon: DollarSign },
    }[status] || { color: 'bg-gray-500/10 text-gray-400', icon: Package };

    const Icon = map.icon;
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${map.color}`}>
        <Icon className="h-4 w-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (!collectible) return null;

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Back */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        {/* Title + Actions */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
              <Package className="h-16 w-16 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-4">
                {collectible.name}
                {collectible.flagged && <Flag className="h-8 w-8 text-red-500 animate-pulse" />}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                {getStatusBadge(collectible.status)}
                <span className="text-gray-400">ID #{collectible.id}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {collectible.status === 'pending' && (
              <>
                <button
                  onClick={handleVerify}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center gap-2 transition"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Verify & List
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center gap-2 transition"
                >
                  <XCircle className="h-5 w-5" />
                  Reject
                </button>
              </>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
            >
              {isEditing ? <Save className="h-5 w-5 text-green-400" /> : <Edit3 className="h-5 w-5 text-blue-400" />}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex gap-8">
            {(['details', 'provenance', 'attributes', 'activity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-blue-500'
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab === 'details' && 'Details'}
                {tab === 'provenance' && 'Provenance'}
                {tab === 'attributes' && 'Attributes'}
                {tab === 'activity' && 'Activity Log'}
              </button>
            ))}
          </div>
        </div>

        {/* TAB: Details */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left – Media + Description */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Media
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {collectible.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="rounded-xl w-full h-64 object-cover" />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                {isEditing ? (
                  <textarea
                    value={editedData.description || collectible.description}
                    onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white resize-none h-32"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">{collectible.description}</p>
                )}
              </div>

              {/* Documents */}
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Supporting Documents
                </h3>
                <div className="space-y-3">
                  {collectible.documents.map((doc, i) => (
                    <a
                      key={i}
                      href={doc.url}
                      className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                    >
                      <span className="text-white">{doc.name}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Owner */}
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Owner
                </h3>
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="text-white font-medium">{collectible.ownerName}</p>
                  <p className="text-gray-400 mt-3">Wallet</p>
                  <p className="text-sm font-mono text-gray-300">{collectible.owner}</p>
                  <button className="mt-4 w-full py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition flex items-center justify-center gap-2">
                    <Ban className="h-4 w-4" />
                    Ban User
                  </button>
                </div>
              </div>

              {/* Flagged warning */}
              {collectible.flagged && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-red-400 mb-4">
                    <AlertCircle className="h-6 w-6" />
                    <h3 className="text-lg font-semibold">Flagged for Review</h3>
                  </div>
                  <p className="text-red-300 text-sm">{collectible.flaggedReason}</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Price</p>
                    <p className="text-2xl font-bold text-white">{collectible.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Shares</p>
                    <p className="text-xl font-bold text-white">
                      {collectible.availableShares} / {collectible.totalShares} available
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Submitted</p>
                    <p className="text-white">{new Date(collectible.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Provenance */}
        {activeTab === 'provenance' && (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Provenance History</h3>
            <div className="space-y-6">
              {collectible.provenance.map((entry, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-gray-600'}`} />
                    {i < collectible.provenance.length - 1 && <div className="w-0.5 h-24 bg-gray-700 mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-700 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-white">{entry.event}</span>
                        <span className="text-sm text-gray-400">{entry.date}</span>
                      </div>
                      <p className="text-gray-300">
                        <span className="text-gray-500">From:</span> {entry.from}
                        <ChevronRight className="inline h-4 w-4 mx-2 text-gray-500" />
                        <span className="text-white">{entry.to}</span>
                      </p>
                      {entry.txHash !== '-' && (
                        <p className="text-xs text-gray-500 mt-2 font-mono">
                          Tx: {entry.txHash}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Attributes */}
        {activeTab === 'attributes' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collectible.attributes.map((attr, i) => (
              <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-5 text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wider">{attr.trait_type}</p>
                <p className="text-white font-bold mt-2 text-lg">{attr.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Activity – THIS WAS THE BROKEN PART */}
        {activeTab === 'activity' && (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Log
              </h3>
            </div>
            <div className="divide-y divide-gray-700">
              {collectible.activity.map((log, i) => (
                <div key={i} className="p-6 hover:bg-gray-700/30 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <History className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{log.action}</p>
                        <p className="text-sm text-gray-400">by {log.user}</p>
                      </div>
                    </div>
                    {/* Fixed: closed <span> correctly and removed stray </p> */}
                    <span className="text-sm text-gray-500">{log.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-3 ml-13">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCollectibleDetail;