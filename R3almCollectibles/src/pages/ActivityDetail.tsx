import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  DollarSign, 
  Clock,
  ExternalLink,
  Shield,
  TrendingUp,
  CheckCircle,
  FileText,
  Zap,
  Award,
  X,
  Download
} from 'lucide-react';

const ActivityDetail = () => {
  const { id, activityId } = useParams();
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Mock activity data - in real app, fetch based on activityId
  const activities = [
    {
      id: 0,
      collectibleId: id,
      collectibleName: 'Vintage Gibson Les Paul 1959',
      collectibleImage: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
      event: 'Listed for Sale',
      eventType: 'listing',
      price: '2.5 ETH',
      user: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      userName: 'Alex Collector',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '2 hours ago',
      timestamp: '2024-01-28T14:32:18Z',
      transactionHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      blockNumber: '18,945,672',
      gasUsed: '184,592',
      gasFee: '0.0032 ETH',
      description: 'The collectible has been listed for sale on the R3alm Collectibles marketplace. This listing makes the item available for fractional ownership purchases by verified users.',
      details: {
        listingType: 'Fractional Ownership',
        totalShares: 100,
        sharePrice: '0.025 ETH',
        minimumPurchase: 1,
        maximumPurchase: 10,
        listingDuration: '30 days',
        autoRelist: true,
        royaltyPercentage: '2.5%'
      }
    },
    {
      id: 1,
      collectibleId: id,
      collectibleName: 'Vintage Gibson Les Paul 1959',
      collectibleImage: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
      event: 'Share Purchase',
      eventType: 'purchase',
      price: '0.025 ETH',
      user: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      userName: 'Maya Artist',
      userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '1 day ago',
      timestamp: '2024-01-27T10:15:42Z',
      transactionHash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1',
      blockNumber: '18,943,891',
      gasUsed: '124,783',
      gasFee: '0.0028 ETH',
      description: 'A fractional share of this collectible was purchased by a verified user. This transaction represents partial ownership transfer on the blockchain.',
      details: {
        sharesPurchased: 1,
        totalSharesOwned: 3,
        purchaseMethod: 'Direct Purchase',
        paymentToken: 'ETH',
        priceAtPurchase: '0.025 ETH',
        marketValue: '0.025 ETH',
        ownershipPercentage: '3%'
      }
    },
    {
      id: 2,
      collectibleId: id,
      collectibleName: 'Vintage Gibson Les Paul 1959',
      collectibleImage: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
      event: 'Share Purchase',
      eventType: 'purchase',
      price: '0.025 ETH',
      user: '0x234b5c6d7e8f9g0h1i2j3k4l5m6n7o8p',
      userName: 'Jordan Investor',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '3 days ago',
      timestamp: '2024-01-25T16:45:33Z',
      transactionHash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1b2',
      blockNumber: '18,941,234',
      gasUsed: '134,892',
      gasFee: '0.0031 ETH',
      description: 'Multiple fractional shares were purchased in a single transaction, demonstrating the platform\'s efficiency for bulk share acquisitions.',
      details: {
        sharesPurchased: 5,
        totalSharesOwned: 5,
        purchaseMethod: 'Bulk Purchase',
        paymentToken: 'ETH',
        priceAtPurchase: '0.025 ETH',
        marketValue: '0.025 ETH',
        ownershipPercentage: '5%'
      }
    },
    {
      id: 3,
      collectibleId: id,
      collectibleName: 'Vintage Gibson Les Paul 1959',
      collectibleImage: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
      event: 'Minted',
      eventType: 'mint',
      price: '—',
      user: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      userName: 'Alex Collector',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '1 week ago',
      timestamp: '2024-01-21T09:22:15Z',
      transactionHash: '0xd4e5f6789012345678901234567890abcdef1234567890abcdef123456a1b2c3',
      blockNumber: '18,938,567',
      gasUsed: '284,592',
      gasFee: '0.0045 ETH',
      description: 'The collectible was minted as an NFT on the Ethereum blockchain, creating the digital certificate of authenticity and establishing the initial ownership record.',
      details: {
        tokenStandard: 'ERC-721',
        totalSupply: 1,
        fractionalShares: 100,
        initialPrice: '2.5 ETH',
        mintingFee: '0.0045 ETH',
        royaltyRecipient: '0x742d35Cc6634C0532925a3b8D46DE3C4',
        metadataURI: 'ipfs://QmX7Y8Z9...'
      }
    }
  ];

  const activity = activities[parseInt(activityId || '0')] || activities[0];

  // Mock provenance event data for certificate modal
  const provenanceEvent = {
    collectibleName: 'Vintage Gibson Les Paul 1959',
    date: '2024-01-21',
    verificationMethod: 'Physical Inspection & Documentation',
    certificationBody: 'Gibson Authentication Services',
    transactionHash: '0xd4e5f6789012345678901234567890abcdef1234567890abcdef123456a1b2c3',
    blockNumber: '18,938,567',
    address: '0x742d35Cc6634C0532925a3b8D46DE3C4',
    time: '2024-01-21T09:22:15Z',
    additionalDetails: {
      authenticator: 'Dr. Sarah Mitchell',
      appraisalValue: '$125,000',
      condition: 'Excellent'
    },
    verificationSteps: [
      { step: 'Physical Inspection', date: '2024-01-20' },
      { step: 'Serial Number Verification', date: '2024-01-20' },
      { step: 'Expert Authentication', date: '2024-01-21' },
      { step: 'Blockchain Registration', date: '2024-01-21' }
    ]
  };

  const getActivityIcon = (eventType: string) => {
    switch (eventType) {
      case 'listing': return <TrendingUp className="h-6 w-6 text-blue-400" />;
      case 'purchase': return <DollarSign className="h-6 w-6 text-green-400" />;
      case 'mint': return <Zap className="h-6 w-6 text-purple-400" />;
      case 'transfer': return <User className="h-6 w-6 text-orange-400" />;
      default: return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getActivityColor = (eventType: string) => {
    switch (eventType) {
      case 'listing': return 'from-blue-600/10 to-cyan-600/10 border-blue-600/20';
      case 'purchase': return 'from-green-600/10 to-emerald-600/10 border-green-600/20';
      case 'mint': return 'from-purple-600/10 to-pink-600/10 border-purple-600/20';
      case 'transfer': return 'from-orange-600/10 to-red-600/10 border-orange-600/20';
      default: return 'from-gray-600/10 to-gray-600/10 border-gray-600/20';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to={`/collectible/${id}`}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Collectible</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start space-x-6">
            <img
              src={activity.collectibleImage}
              alt={activity.collectibleName}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">Activity Details</h1>
              <p className="text-gray-400 text-lg mb-4">{activity.collectibleName}</p>
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${getActivityColor(activity.eventType)} rounded-lg p-3 border`}>
                  {getActivityIcon(activity.eventType)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{activity.event}</h2>
                  <p className="text-gray-400">{activity.time} • {activity.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Activity Description</h3>
              <p className="text-gray-300 leading-relaxed">{activity.description}</p>
            </motion.div>

            {/* Transaction Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Blockchain Transaction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Transaction Hash</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-blue-300 font-mono text-sm break-all">
                        {activity.transactionHash}
                      </code>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Block Number</label>
                    <div className="text-white font-medium mt-1">{activity.blockNumber}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Timestamp</label>
                    <div className="text-white font-medium mt-1">{activity.timestamp}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Gas Used</label>
                    <div className="text-white font-medium mt-1">{activity.gasUsed}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Gas Fee</label>
                    <div className="text-white font-medium mt-1">{activity.gasFee}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Transaction Value</label>
                    <div className="text-green-400 font-semibold mt-1">{activity.price}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity-Specific Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Activity Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(activity.details).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-gray-400 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="text-white font-medium mt-1">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* User Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">User Information</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={activity.userAvatar}
                  alt={activity.userName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg">{activity.userName}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="text-blue-300 font-mono text-sm">{activity.user}</code>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm">Verified User</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Activity Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white capitalize">{activity.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Value</span>
                  <span className="text-white font-semibold">{activity.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white">{activity.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">Confirmed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Related Documents</h3>
              <div className="space-y-3">
                <div 
                  onClick={() => setShowReceiptModal(true)}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <div>
                      <div className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">Transaction Receipt</div>
                      <div className="text-gray-400 text-xs">PDF</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowReceiptModal(true)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
                <div 
                  onClick={() => setShowCertificateModal(true)}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-green-400" />
                    <div>
                      <div className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">Verification Certificate</div>
                      <div className="text-gray-400 text-xs">PDF</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowCertificateModal(true)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Blockchain Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Blockchain Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="text-white">Ethereum Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Confirmations</span>
                  <span className="text-green-400">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Block Time</span>
                  <span className="text-white">12.3s</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      {/* Transaction Receipt Modal */}
      <AnimatePresence>
        {showReceiptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowReceiptModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600/20 rounded-lg p-2">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Transaction Receipt</h2>
                    <p className="text-gray-400">{activity.collectibleName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-8">
                  {/* Receipt Header */}
                  <div className="text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-600/20">
                    <div className="bg-blue-600/20 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Official Transaction Receipt</h3>
                    <p className="text-blue-400 text-lg font-semibold">BLOCKCHAIN VERIFIED</p>
                    <p className="text-gray-400 mt-2">R3alm Collectibles Platform</p>
                  </div>

                  {/* Transaction Summary */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Transaction Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-400 text-sm">Transaction Type</label>
                          <div className="text-white font-semibold text-lg capitalize">{activity.eventType}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Transaction Date</label>
                          <div className="text-white">{new Date(activity.timestamp).toLocaleString()}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Transaction Value</label>
                          <div className="text-green-400 font-bold text-2xl">{activity.price}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Receipt Number</label>
                          <div className="text-blue-300 font-mono">RCP-{activity.blockNumber.replace(',', '')}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-400 text-sm">Collectible</label>
                          <div className="text-white font-semibold">{activity.collectibleName}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">User</label>
                          <div className="text-white">{activity.userName}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Wallet Address</label>
                          <div className="text-blue-300 font-mono text-sm">{activity.user}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Status</label>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <span className="text-green-400 font-semibold">CONFIRMED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain Details */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Blockchain Transaction Details</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-gray-400 text-sm">Transaction Hash</label>
                          <div className="text-blue-300 font-mono text-sm break-all bg-gray-700/50 p-3 rounded-lg">
                            {activity.transactionHash}
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Block Number</label>
                          <div className="text-white font-semibold text-lg">{activity.blockNumber}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Gas Used</label>
                          <div className="text-white">{activity.gasUsed}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Gas Fee</label>
                          <div className="text-orange-400 font-semibold">{activity.gasFee}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Network</label>
                          <div className="text-white">Ethereum Mainnet</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Confirmations</label>
                          <div className="text-green-400 font-semibold">2,847+</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Transaction Breakdown</h4>
                    <div className="space-y-4">
                      {activity.eventType === 'purchase' && (
                        <>
                          <div className="flex justify-between items-center py-2 border-b border-gray-700">
                            <span className="text-gray-400">Shares Purchased</span>
                            <span className="text-white font-semibold">{activity.details.sharesPurchased}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-700">
                            <span className="text-gray-400">Price per Share</span>
                            <span className="text-white">{activity.details.priceAtPurchase}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-700">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">{activity.price}</span>
                          </div>
                        </>
                      )}
                      {activity.eventType === 'mint' && (
                        <>
                          <div className="flex justify-between items-center py-2 border-b border-gray-700">
                            <span className="text-gray-400">Total Shares Created</span>
                            <span className="text-white font-semibold">{activity.details.fractionalShares}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-700">
                            <span className="text-gray-400">Initial Valuation</span>
                            <span className="text-white">{activity.details.initialPrice}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400">Platform Fee</span>
                        <span className="text-white">2.5%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400">Gas Fee</span>
                        <span className="text-orange-400">{activity.gasFee}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-gray-700/50 rounded-lg px-4">
                        <span className="text-white font-semibold text-lg">Total Amount</span>
                        <span className="text-green-400 font-bold text-xl">{activity.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Footer */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-4">Receipt Information</h4>
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed text-sm">
                        This receipt serves as official documentation of your transaction on the R3alm Collectibles platform. 
                        All transaction details have been recorded on the Ethereum blockchain and can be independently verified. 
                        This receipt may be used for tax reporting, insurance claims, and resale documentation. 
                        For questions about this transaction, please contact our support team with your receipt number.
                      </p>
                    </div>
                    <div className="mt-6 text-center">
                      <div className="text-gray-400 text-sm">Generated on {new Date().toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">R3alm Collectibles Platform • Blockchain Verified</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download Receipt PDF</span>
                  </button>
                  <button 
                    onClick={() => window.open(`https://etherscan.io/tx/${activity.transactionHash}`, '_blank')}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View on Etherscan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>

      {/* Verification Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCertificateModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-600/20 rounded-lg p-2">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Verification Certificate</h2>
                    <p className="text-gray-400">{provenanceEvent.collectibleName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-8">
                  {/* Certificate Header */}
                  <div className="text-center bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl p-8 border border-green-600/20">
                    <div className="bg-green-600/20 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Shield className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Certificate of Authenticity</h3>
                    <p className="text-green-400 text-lg font-semibold">VERIFIED AUTHENTIC</p>
                    <p className="text-gray-400 mt-2">R3alm Collectibles Verification Network</p>
                  </div>

                  {/* Certificate Details */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Certificate Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-400 text-sm">Certificate Number</label>
                          <div className="text-white font-mono text-lg">R3C-2024-001847</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Issue Date</label>
                          <div className="text-white">{provenanceEvent.date}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Verification Method</label>
                          <div className="text-white">{provenanceEvent.verificationMethod}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Certification Body</label>
                          <div className="text-white">{provenanceEvent.certificationBody}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-400 text-sm">Collectible Name</label>
                          <div className="text-white font-semibold">{provenanceEvent.collectibleName}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Authenticator</label>
                          <div className="text-white">{provenanceEvent.additionalDetails.authenticator}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Appraisal Value</label>
                          <div className="text-green-400 font-semibold">{provenanceEvent.additionalDetails.appraisalValue}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Condition</label>
                          <div className="text-white">{provenanceEvent.additionalDetails.condition}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Authentication Process */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Authentication Process</h4>
                    <div className="space-y-4">
                      {provenanceEvent.verificationSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                          <div className="bg-green-600/20 rounded-full p-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-medium">{step.step}</h5>
                            <p className="text-gray-400 text-sm">Completed on {step.date}</p>
                          </div>
                          <div className="text-green-400 font-semibold text-sm">✓ VERIFIED</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blockchain Verification */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Blockchain Verification</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-gray-400 text-sm">Transaction Hash</label>
                          <div className="text-blue-300 font-mono text-sm break-all">{provenanceEvent.transactionHash}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Block Number</label>
                          <div className="text-white">{provenanceEvent.blockNumber}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Wallet Address</label>
                          <div className="text-green-300 font-mono text-sm">{provenanceEvent.address}</div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Verification Date</label>
                          <div className="text-white">{provenanceEvent.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Statement */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-4">Certificate Statement</h4>
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed text-center italic">
                        "This certificate confirms that the collectible item described herein has been thoroughly examined, 
                        authenticated, and verified by qualified experts using industry-standard authentication methods. 
                        The item's provenance, condition, and authenticity have been documented and recorded on the blockchain 
                        for permanent verification. This certificate serves as official documentation of the item's 
                        authenticity and may be relied upon for insurance, resale, and investment purposes."
                      </p>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Authorized Signatures</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="bg-gray-700/50 rounded-lg p-4 mb-3">
                          <div className="text-2xl font-script text-blue-400 mb-2">Dr. Sarah Mitchell</div>
                        </div>
                        <div className="text-white font-medium">Chief Authenticator</div>
                        <div className="text-gray-400 text-sm">Certified Musical Instrument Appraiser</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gray-700/50 rounded-lg p-4 mb-3">
                          <div className="text-2xl font-script text-green-400 mb-2">R3alm Verification</div>
                        </div>
                        <div className="text-white font-medium">Platform Verification</div>
                        <div className="text-gray-400 text-sm">Blockchain Authentication System</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download Certificate PDF</span>
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Verify on Blockchain
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityDetail;