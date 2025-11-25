// src/pages/collectible/CollectibleDetail.tsx – FIXED + SHOW DETAILS BUTTONS
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
  Eye,
  ExternalLink,
  Calendar,
  ArrowRight,
  X,
  FileText,
  Download,
  Globe,
  Lock,
} from 'lucide-react';

const CollectibleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [shareAmount, setShareAmount] = useState(1);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  // Full mock data — unchanged
  const collectibles = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      description: 'An exceptional example of the legendary 1959 Gibson Les Paul Standard in stunning sunburst finish. This guitar represents the pinnacle of Gibson\'s craftsmanship and is highly sought after by collectors and musicians alike.',
      fullDescription: `This 1959 Gibson Les Paul Standard is a true holy grail of electric guitars...`,
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
      provenance: [/* ... */],
      attributes: [/* ... */],
      storage: {
        location: 'Climate-Controlled Private Vault',
        facility: 'SecureVault Manhattan',
        address: 'New York, NY, USA',
        securityLevel: 'Level 5 - Maximum Security',
        climateControl: 'Temperature: 68-72°F, Humidity: 45-55%',
        accessProtocol: '24/7 Biometric Access Control'
      },
      insurance: {
        provider: 'Lloyd\'s of London',
        policyNumber: 'LLO-2024-MUS-001847',
        coverage: '$150,000 USD',
        type: 'Fine Arts & Collectibles Policy',
        validUntil: '2025-01-15',
        deductible: '$2,500 USD'
      }
    },
    // ... your other collectibles (2, 3, etc.) remain exactly the same
    // I'll keep them collapsed for brevity — they are unchanged
    {
      id: 2,
      name: 'Monet Water Lilies Study',
      // ... all fields identical to your original
      blockchain: 'Ethereum',
      tokenStandard: 'ERC-721',
      storage: { /* ... */ },
      insurance: { /* ... */ }
    },
    {
      id: 3,
      name: 'Jordan Game-Worn Jersey 1996',
      // ... all fields identical
      blockchain: 'Ethereum',
      tokenStandard: 'ERC-721',
      storage: { /* ... */ },
      insurance: { /* ... */ }
    }
  ];

  // SAFELY find the collectible — with fallback
  const collectible = collectibles.find(item => item.id === Number(id)) ?? collectibles[0];

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'attributes', label: 'Attributes' },
    { id: 'activity', label: 'Activity' }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/marketplace" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800">
              <img src={collectible.image} alt={collectible.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex space-x-2">
                {collectible.trending && (
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Trending
                  </div>
                )}
                {collectible.verified && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-900/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="bg-gray-900/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors">
                  <Share2 className="h-5 w-5" />
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

          {/* Right Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-400 text-sm font-medium">{collectible.category}</span>
                {collectible.verified && <CheckCircle className="h-4 w-4 text-green-400" />}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{collectible.name}</h1>
              <p className="text-gray-300 leading-relaxed">{collectible.description}</p>
            </div>

            {/* Pricing Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              {/* ... your existing pricing & buy logic ... */}
            </div>

            {/* Blockchain Details Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-3">
                  <Globe className="h-6 w-6 text-purple-400" />
                  Blockchain Details
                </h3>
                <Link
                  to="/storage-security"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  Show Details
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Blockchain</span><span className="text-white font-medium">{collectible.blockchain}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Token Standard</span><span className="text-white font-medium">{collectible.tokenStandard}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Mint Date</span><span className="text-white">{collectible.mintDate}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Creator Royalties</span><span className="text-white">{collectible.royalties}</span></div>
              </div>
            </div>

            {/* Storage & Security Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-3">
                  <Lock className="h-6 w-6 text-cyan-400" />
                  Storage & Security
                </h3>
                <Link
                  to="/storage-security"
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  Show Details
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Storage Type</span><span className="text-white font-medium">{collectible.storage.location}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Facility</span><span className="text-white">{collectible.storage.facility}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Location</span><span className="text-white">{collectible.storage.address}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Security Level</span><span className="text-green-400 font-medium">{collectible.storage.securityLevel}</span></div>
              </div>
            </div>

            {/* Insurance Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Insurance Coverage</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-400">Provider</span><span className="text-white">{collectible.insurance.provider}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Coverage Amount</span><span className="text-green-400 font-semibold">{collectible.insurance.coverage}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Valid Until</span><span className="text-white">{collectible.insurance.validUntil}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowInsuranceModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  View Full Insurance Policy
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs + Insurance Modal — unchanged */}
        {/* ... rest of your original code (tabs, modal, etc.) stays exactly as you had it ... */}
      </div>
    </div>
  );
};

export default CollectibleDetail;