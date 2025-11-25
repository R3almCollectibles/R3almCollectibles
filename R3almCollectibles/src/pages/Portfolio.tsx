import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PortfolioChart from '../components/PortfolioChart';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Activity,
  Eye,
  Heart,
  ExternalLink,
  Plus,
  User,
  ArrowRight
} from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isAuthenticated } = useAuth();

  const handleCollectibleClick = (id: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/collectible/${id}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'owned', label: 'Owned NFTs' },
    { id: 'created', label: 'Created' },
    { id: 'activity', label: 'Activity' }
  ];

  const portfolioStats = {
    totalValue: '47.85',
    dayChange: '+12.4',
    dayChangePercent: '+2.8%',
    totalItems: 23,
    totalCreated: 5,
    totalEarnings: '8.92'
  };

  const ownedNFTs = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
      shares: 5,
      totalShares: 100,
      purchasePrice: '0.125 ETH',
      currentValue: '0.142 ETH',
      change: '+13.6%',
      changePositive: true
    },
    {
      id: 2,
      name: 'Monet Water Lilies Study',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=400',
      shares: 3,
      totalShares: 250,
      purchasePrice: '0.063 ETH',
      currentValue: '0.071 ETH',
      change: '+12.7%',
      changePositive: true
    },
    {
      id: 3,
      name: 'Jordan Game-Worn Jersey 1996',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
      shares: 2,
      totalShares: 50,
      purchasePrice: '0.072 ETH',
      currentValue: '0.068 ETH',
      change: '-5.6%',
      changePositive: false
    }
  ];

  const createdNFTs = [
    {
      id: 4,
      name: 'Digital Art Collection #1',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '1.2 ETH',
      sold: 15,
      totalShares: 50,
      earnings: '3.2 ETH',
      views: '2.1k',
      likes: 145
    },
    {
      id: 5,
      name: 'Vintage Camera Set',
      image: 'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '0.8 ETH',
      sold: 23,
      totalShares: 100,
      earnings: '1.8 ETH',
      views: '1.5k',
      likes: 89
    }
  ];

  const recentActivity = [
    {
      type: 'purchase',
      nft: 'Vintage Gibson Les Paul 1959',
      amount: '0.025 ETH',
      shares: 1,
      time: '2 hours ago'
    },
    {
      type: 'sale',
      nft: 'Digital Art Collection #1',
      amount: '0.024 ETH',
      shares: 1,
      time: '1 day ago'
    },
    {
      type: 'mint',
      nft: 'Vintage Camera Set',
      amount: '0.8 ETH',
      shares: 100,
      time: '3 days ago'
    },
    {
      type: 'royalty',
      nft: 'Digital Art Collection #1',
      amount: '0.003 ETH',
      shares: 0,
      time: '5 days ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'sale': return <DollarSign className="h-4 w-4 text-blue-400" />;
      case 'mint': return <Plus className="h-4 w-4 text-purple-400" />;
      case 'royalty': return <PieChart className="h-4 w-4 text-orange-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to view your portfolio</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-4xl font-bold text-white">Portfolio</h1>
            {user?.isDemo && (
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                Demo Account
              </span>
            )}
          </div>
          <p className="text-gray-400 text-lg">
            Welcome back, {user?.name}! Track your collectibles investments and manage your NFT collection
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8"
        >
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Value</span>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{portfolioStats.totalValue} ETH</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                +{portfolioStats.dayChange} ETH ({portfolioStats.dayChangePercent})
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Owned Items</span>
              <PieChart className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">{portfolioStats.totalItems}</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Created</span>
              <Plus className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{portfolioStats.totalCreated}</div>
          </div>

          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Earnings</span>
              <TrendingUp className="h-5 w-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white">{portfolioStats.totalEarnings} ETH</div>
            <div className="text-gray-400 text-sm">From sales & royalties</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-b border-gray-700 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Portfolio Chart Placeholder */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <PortfolioChart />
                </div>

                {/* Top Holdings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-6">Top Holdings</h3>
                  <div className="space-y-4">
                    {ownedNFTs.slice(0, 3).map((nft, index) => (
                      <div key={nft.id} className="flex items-center space-x-3">
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{nft.name}</p>
                          <p className="text-gray-400 text-sm">{nft.shares}/{nft.totalShares} shares</p>
                        </div>
                        <div className={`text-sm font-medium ${
                          nft.changePositive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {nft.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'owned' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownedNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div onClick={() => handleCollectibleClick(nft.id)} className="cursor-pointer">
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all group">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{nft.name}</h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Shares Owned</span>
                              <span className="text-white">{nft.shares}/{nft.totalShares}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Purchase Price</span>
                              <span className="text-white">{nft.purchasePrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Current Value</span>
                              <span className="text-white">{nft.currentValue}</span>
                            </div>
                          </div>
                          <div className={`flex items-center space-x-1 text-sm font-medium ${
                            nft.changePositive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {nft.changePositive ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{nft.change}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'created' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div onClick={() => handleCollectibleClick(nft.id)} className="cursor-pointer">
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{nft.name}</h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Listed Price</span>
                              <span className="text-white">{nft.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Shares Sold</span>
                              <span className="text-white">{nft.sold}/{nft.totalShares}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Total Earnings</span>
                              <span className="text-green-400">{nft.earnings}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {nft.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {nft.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                </div>
                <div className="divide-y divide-gray-700">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        // Navigate to the collectible's activity detail page
                        // Using the NFT ID from the activity and the activity index as activityId
                        const collectibleId = activity.type === 'purchase' ? 1 : 
                                            activity.type === 'sale' ? 4 : 
                                            activity.type === 'mint' ? 5 : 4;
                        navigate(`/collectible/${collectibleId}/activity/${index}`);
                      }}
                      className="p-6 hover:bg-gray-700/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-700 rounded-full p-3">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="text-white font-medium capitalize group-hover:text-blue-300 transition-colors">
                              {activity.type} {activity.shares > 0 && `• ${activity.shares} share${activity.shares > 1 ? 's' : ''}`}
                            </p>
                            <p className="text-gray-400 text-sm">{activity.nft}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center space-x-3">
                          <div>
                          <p className="text-white font-medium">{activity.amount}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;