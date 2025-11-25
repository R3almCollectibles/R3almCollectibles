import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Share2,
  Shield,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Globe,
  Lock,
  FileText,
  Download,
  X,
} from 'lucide-react';

const CollectibleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [shareAmount, setShareAmount] = useState(1);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  // ──────────────────────────────────────────────────────────────
  // Mock data (unchanged – only first item shown)
  // ──────────────────────────────────────────────────────────────
  const collectibles = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      description: 'An exceptional example of the legendary 1959 Gibson Les Paul Standard…',
      fullDescription: `This 1959 Gibson Les Paul Standard is a true holy grail…`,
      price: '2.5 ETH',
      fractionalPrice: '0.025 ETH',
      fractional: '1/100',
      totalShares: 100,
      availableShares: 47,
      category: 'Music Instruments',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: true,
      trending: true,
      likes: 147,
      views: '2.1k',
      owner: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      mintDate: '2024-01-15',
      blockchain: 'Ethereum',
      tokenStandard: 'ERC-721',
      royalties: '2.5%',
      provenance: [],
      attributes: [],
      storage: {
        location: 'Climate-Controlled Private Vault',
        facility: 'SecureVault Manhattan',
        address: 'New York, NY, USA',
        securityLevel: 'Level 5 - Maximum Security',
        climateControl: 'Temperature: 68-72°F, Humidity: 45-55%',
        accessProtocol: '24/7 Biometric Access Control',
      },
      insurance: {
        provider: "Lloyd's of London",
        policyNumber: 'LLO-2024-MUS-001847',
        coverage: '$150,000 USD',
        type: 'Fine Arts & Collectibles Policy',
        validUntil: '2025-01-15',
        deductible: '$2,500 USD',
      },
    },
  ];

  const collectible = collectibles.find((c) => c.id === Number(id)) ?? collectibles[0];

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'attributes', label: 'Attributes' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Marketplace
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN – IMAGE + STATS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800">
              <img
                src={collectible.image}
                alt={collectible.name}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {collectible.trending && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </span>
                )}
                {collectible.verified && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Verified
                  </span>
                )}
              </div>
              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-gray-900/80 hover:bg-red-600 p-2 rounded-full transition">
                  <Heart className="h-5 w-5 text-white" />
                </button>
                <button className="bg-gray-900/80 hover:bg-gray-600 p-2 rounded-full transition">
                  <Share2 className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="text-2xl font-bold text-white">{collectible.likes}</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="text-2xl font-bold text-white">{collectible.views}</div>
                <div className="text-gray-400 text-sm">Views</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="text-2xl font-bold text-white">{collectible.availableShares}</div>
                <div className="text-gray-400 text-sm">Available</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN – DETAILS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            {/* Title & Description */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-400 text-sm font-medium">{collectible.category}</span>
                {collectible.verified && <CheckCircle className="h-5 w-5 text-green-400" />}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{collectible.name}</h1>
              <p className="text-gray-300 leading-relaxed">{collectible.description}</p>
            </div>

            {/* Pricing Card – placeholder (your original code goes here) */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              {/* Your pricing / share selector code */}
            </div>

            {/* Blockchain Details */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-5">
                <Globe className="h-7 w-7 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Blockchain Details</h3>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <dt className="text-gray-400">Blockchain</dt>
                  <dd className="text-white font-medium">{collectible.blockchain}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Token Standard</dt>
                  <dd className="text-white font-medium">{collectible.tokenStandard}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Mint Date</dt>
                  <dd className="text-white">{collectible.mintDate}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Royalties</dt>
                  <dd className="text-white">{collectible.royalties}</dd>
                </div>
              </dl>
              <Link
                to="/blockchain-details"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Show Blockchain Details
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {/* Storage & Security */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-5">
                <Lock className="h-7 w-7 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Storage & Security</h3>
              </div>
              <dl className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Storage Type</dt>
                  <dd className="text-white font-medium">{collectible.storage.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Facility</dt>
                  <dd className="text-white font-medium">{collectible.storage.facility}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Location</dt>
                  <dd className="text-white">{collectible.storage.address}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Security Level</dt>
                  <dd className="text-green-400 font-medium">{collectible.storage.securityLevel}</dd>
                </div>
              </dl>
              <Link
                to="/storage-security"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Show Storage & Security Details
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {/* INSURANCE COVERAGE – NOW FIXED & CONSISTENT */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="h-7 w-7 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">Insurance Coverage</h3>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <dt className="text-gray-400">Provider</dt>
                  <dd className="text-white font-medium">{collectible.insurance.provider}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Coverage</dt>
                  <dd className="text-green-400 font-bold">{collectible.insurance.coverage}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Valid Until</dt>
                  <dd className="text-white">{collectible.insurance.validUntil}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Policy #</dt>
                  <dd className="text-blue-300 font-mono text-xs">{collectible.insurance.policyNumber}</dd>
                </div>
              </dl>

              {/* RESTORED & IMPROVED: Button at bottom, full width, perfect match */}
              <button
                onClick={() => setShowInsuranceModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                View Full Insurance Policy
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Rest of your tabs and modal code remains unchanged */}
        {/* ... */}
      </div>
    </div>
  );
};

export default CollectibleDetail;