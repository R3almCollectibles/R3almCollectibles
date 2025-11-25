// src/pages/collectible/CollectibleDetail.tsx – SHOW DETAILS BUTTONS ADDED
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

const CollectibleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [shareAmount, setShareAmount] = useState(1);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  // Your full collectibles data (unchanged)
  const collectibles = [ /* ... your full array remains exactly the same ... */ ];

  const collectible = collectibles.find(item => item.id === parseInt(id || '1')) || collectibles[0];

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
          {/* Image Section - unchanged */}
          {/* ... your existing image + stats section ... */}

          {/* Details Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            {/* Header & Pricing - unchanged */}
            {/* ... */}

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
                <div className="flex justify-between">
                  <span className="text-gray-400">Blockchain</span>
                  <span className="text-white font-medium">{collectible.blockchain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Standard</span>
                  <span className="text-white font-medium">{collectible.tokenStandard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mint Date</span>
                  <span className="text-white">{collectible.mintDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Creator Royalties</span>
                  <span className="text-white">{collectible.royalties}</span>
                </div>
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
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage Type</span>
                  <span className="text-white font-medium">{collectible.storage.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Facility</span>
                  <span className="text-white">{collectible.storage.facility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{collectible.storage.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Level</span>
                  <span className="text-green-400 font-medium">{collectible.storage.securityLevel}</span>
                </div>
              </div>
            </div>

            {/* Insurance Card - unchanged except enhanced button */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Insurance Coverage</h3>
              <div className="space-y-3">
                {/* ... your existing insurance fields ... */}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowInsuranceModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Full Insurance Policy</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section - unchanged */}
        {/* ... your full tabs + modal code remains 100% intact ... */}
      </div>
    </div>
  );
};

export default CollectibleDetail;