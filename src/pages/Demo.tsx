import React from 'react';
import { motion } from 'framer-motion';
import { Users, Palette, TrendingUp, ArrowRight, Shield, Zap, Star, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const { loginWithDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (demoType: 'collector' | 'creator' | 'investor' | 'admin') => {
    loginWithDemo(demoType);
    navigate('/portfolio');
  };

  const demoAccounts = [
    {
      type: 'collector' as const,
      name: 'Alex Collector',
      title: 'Passionate Collector',
      description: 'Experience the platform from a collector\'s perspective. Browse premium collectibles, make fractional purchases, and build a diversified portfolio.',
      features: [
        'Browse authenticated collectibles',
        'Purchase fractional shares',
        'Track portfolio performance',
        'View detailed provenance records',
        'Access insurance documentation'
      ],
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-600/10 to-cyan-600/10',
      borderColor: 'border-blue-600/20',
      stats: {
        portfolio: '47.85 ETH',
        items: '23 Items',
        growth: '+12.4%'
      }
    },
    {
      type: 'creator' as const,
      name: 'Maya Artist',
      title: 'Digital Creator',
      description: 'Discover how creators mint and sell their collectibles. Create NFTs, set fractional ownership, and earn royalties from secondary sales.',
      features: [
        'Mint new NFT collectibles',
        'Set fractional ownership options',
        'Configure royalty percentages',
        'Track sales and earnings',
        'Manage created collections'
      ],
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-600/10 to-pink-600/10',
      borderColor: 'border-purple-600/20',
      stats: {
        portfolio: '8.92 ETH',
        items: '5 Created',
        growth: '+24.7%'
      }
    },
    {
      type: 'investor' as const,
      name: 'Jordan Investor',
      title: 'Strategic Investor',
      description: 'Explore advanced investment features. Analyze market trends, make strategic purchases, and optimize your collectibles investment strategy.',
      features: [
        'Access advanced analytics',
        'View market trends and insights',
        'Make strategic investments',
        'Monitor performance metrics',
        'Diversify across categories'
      ],
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-600/10 to-teal-600/10',
      borderColor: 'border-emerald-600/20',
      stats: {
        portfolio: '156.3 ETH',
        items: '89 Items',
        growth: '+18.9%'
      }
    },
    {
      type: 'admin' as const,
      name: 'Admin Manager',
      title: 'Platform Administrator',
      description: 'Manage the platform with full administrative privileges. Monitor user activity, moderate content, manage collections, and access advanced administration tools.',
      features: [
        'Full platform access and control',
        'User management and moderation',
        'Collection verification and approval',
        'Analytics and reporting dashboard',
        'System configuration and settings'
      ],
      icon: Crown,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-600/10 to-amber-600/10',
      borderColor: 'border-yellow-600/20',
      badge: 'Admin',
      stats: {
        portfolio: 'N/A',
        items: '2847 Items',
        growth: 'All Users'
      }
    }
  ];

  const platformFeatures = [
    {
      icon: Shield,
      title: 'Blockchain Authentication',
      description: 'Every collectible is verified on-chain with immutable provenance records.'
    },
    {
      icon: Users,
      title: 'Fractional Ownership',
      description: 'Own shares of high-value collectibles, making premium items accessible to everyone.'
    },
    {
      icon: TrendingUp,
      title: 'Secondary Markets',
      description: 'Trade your fractional shares with real-time pricing and instant liquidity.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Try R3alm Collectibles
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent block mt-2">
              Demo Experience
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our platform with pre-configured demo accounts. Experience the full functionality 
            of R3alm Collectibles without any commitment or setup required.
          </p>
        </motion.div>

        {/* Demo Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16"
        >
          {demoAccounts.map((account, index) => (
            <motion.div
              key={account.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`bg-gradient-to-br ${account.bgColor} rounded-2xl p-8 border ${account.borderColor} hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${account.color} mb-6 relative`}>
                  <account.icon className="h-12 w-12 text-white" />
                  {'badge' in account && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      {account.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{account.name}</h3>
                <p className="text-lg font-medium text-gray-300 mb-4">{account.title}</p>
                <p className="text-gray-400 leading-relaxed">{account.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{account.stats.portfolio}</div>
                  <div className="text-gray-400 text-sm">{account.type === 'admin' ? 'Role' : 'Portfolio'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{account.stats.items}</div>
                  <div className="text-gray-400 text-sm">{account.type === 'admin' ? 'Total Items' : 'Items'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{account.stats.growth}</div>
                  <div className="text-gray-400 text-sm">{account.type === 'admin' ? 'Scope' : 'Growth'}</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-white font-semibold mb-4">What you can explore:</h4>
                <ul className="space-y-2">
                  {account.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                      <Star className="h-4 w-4 text-yellow-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleDemoLogin(account.type)}
                className={`w-full bg-gradient-to-r ${account.color} hover:opacity-90 text-white py-4 px-6 rounded-xl font-semibold transition-all transform group-hover:scale-105 flex items-center justify-center space-x-2`}
              >
                <span>Try as {account.name}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Experience These Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center"
              >
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 w-fit mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demo Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-600/20 text-center"
        >
          <Zap className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Why Try Our Demo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div>
              <h4 className="text-white font-semibold mb-2">No Setup Required</h4>
              <p className="text-gray-400 text-sm">Jump right in with pre-configured accounts and sample data</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Full Functionality</h4>
              <p className="text-gray-400 text-sm">Experience all features including trading, analytics, and portfolio management</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Real-Time Data</h4>
              <p className="text-gray-400 text-sm">Interact with realistic market data and transaction histories</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Risk-Free</h4>
              <p className="text-gray-400 text-sm">Explore without any financial commitment or personal information</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;