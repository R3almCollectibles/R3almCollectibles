import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  DollarSign,
  Users,
  Eye,
  Heart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Analytics = () => {
  const marketStats = [
    { label: 'Total Volume', value: '$2.4M', change: '+12.5%', positive: true },
    { label: 'Active Traders', value: '12.5K', change: '+8.2%', positive: true },
    { label: 'Total Sales', value: '45.2K', change: '+15.7%', positive: true },
    { label: 'Avg. Price', value: '1.8 ETH', change: '-3.1%', positive: false }
  ];

  const topCategories = [
    { name: 'Art & Paintings', volume: '$890K', percentage: 37 },
    { name: 'Music Instruments', volume: '$650K', percentage: 27 },
    { name: 'Sports Memorabilia', volume: '$420K', percentage: 18 },
    { name: 'Gaming Items', volume: '$280K', percentage: 12 },
    { name: 'Photography', volume: '$160K', percentage: 6 }
  ];

  const trendingCollectibles = [
    {
      name: 'Vintage Gibson Les Paul 1959',
      volume: '$125K',
      change: '+24.5%',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Monet Water Lilies Study',
      volume: '$98K',
      change: '+18.7%',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Jordan Game-Worn Jersey 1996',
      volume: '$87K',
      change: '+15.2%',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Platform Analytics</h1>
          <p className="text-gray-400 text-lg">
            Real-time insights into market trends, trading volumes, and platform performance
          </p>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {marketStats.map((stat, index) => (
            <div key={stat.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.positive ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Volume Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Trading Volume (30 Days)</h3>
            <div className="bg-gray-700/50 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-white font-medium">Volume Chart</p>
                <p className="text-gray-400 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Top Categories by Volume</h3>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{category.name}</span>
                    <span className="text-gray-400">{category.volume}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trending Collectibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Trending Collectibles</h3>
          <div className="space-y-4">
            {trendingCollectibles.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-gray-400 font-medium">#{index + 1}</div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <p className="text-gray-400 text-sm">24h Volume: {item.volume}</p>
                  </div>
                </div>
                <div className="text-green-400 font-semibold flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;