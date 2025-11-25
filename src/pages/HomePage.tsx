import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  Star,
  Eye,
  Heart
} from 'lucide-react';

// TypeScript Interfaces
interface FeaturedCollectible {
  id: number;
  name: string;
  description: string;
  price: string;
  fractionalPrice: string;
  image: string;
  verified: boolean;
  trending: boolean;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HomePage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleCollectibleClick = (id: number): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/collectible/${id}`);
  };

  const featuredCollectibles: FeaturedCollectible[] = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      description: 'Rare sunburst finish, original case included',
      price: '2.5 ETH',
      fractionalPrice: '0.025 ETH',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true
    },
    {
      id: 2,
      name: 'Monet Water Lilies Study',
      description: 'Authenticated 1919 oil on canvas',
      price: '5.2 ETH',
      fractionalPrice: '0.021 ETH',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false
    },
    {
      id: 3,
      name: 'Jordan Game-Worn Jersey 1996',
      description: 'NBA Finals worn, certificate included',
      price: '1.8 ETH',
      fractionalPrice: '0.036 ETH',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true
    },
    {
      id: 4,
      name: 'Rolex Submariner 1965',
      description: 'Vintage diving watch, pristine condition',
      price: '3.8 ETH',
      fractionalPrice: '0.038 ETH',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true
    },
    {
      id: 5,
      name: 'First Edition Charizard PSA 10',
      description: 'Shadowless Base Set, perfect grade',
      price: '4.2 ETH',
      fractionalPrice: '0.042 ETH',
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false
    },
    {
      id: 6,
      name: 'Banksy Street Art Fragment',
      description: 'Authenticated piece from London wall',
      price: '6.7 ETH',
      fractionalPrice: '0.027 ETH',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true
    }
  ];

  const stats: Stat[] = [
    { label: 'Total Volume', value: '$2.4M', icon: TrendingUp },
    { label: 'Active Users', value: '12.5K', icon: Users },
    { label: 'Collectibles', value: '8.9K', icon: Star },
    { label: 'Transactions', value: '45.2K', icon: Zap }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" aria-label="Loading home page" />
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-emerald-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
       
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Own a Piece of
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent block">
                Digital History
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {user ? `Welcome back, ${user.email}. ` : ''}Trade authenticated collectibles with blockchain-verified provenance.
              From vintage guitars to rare art, own fractions of the world's most valuable items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                  aria-label="Explore Marketplace"
                >
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
              <Link to="/mint">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-gray-600 hover:border-gray-500"
                  aria-label="Mint Your NFT"
                >
                  Mint Your NFT
                </motion.button>
              </Link>
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                  aria-label="Try Demo"
                >
                  Try Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-gray-700">
                  <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Featured Collectibles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Featured Collectibles</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {user ? 'Your personalized recommendations: ' : ''}Discover trending items with verified authenticity and fractional ownership opportunities
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollectibles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  onClick={() => handleCollectibleClick(item.id)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCollectibleClick(item.id)}
                  aria-label={`View ${item.name}`}
                >
                  <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex space-x-2">
                        {item.trending && (
                          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        {item.verified && (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-gray-900/80 backdrop-blur rounded-lg p-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-300 flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            2.1k
                          </span>
                          <span className="text-gray-300 flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            147
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Full Price</span>
                          <span className="text-white font-semibold">{item.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Fractional Share</span>
                          <span className="text-blue-400 font-semibold">{item.fractionalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/marketplace">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                aria-label="View All Collectibles"
              >
                View All Collectibles
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose R3alm?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced blockchain technology meets premium collectibles trading
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-gray-700"
            >
              <Shield className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Blockchain Authentication</h3>
              <p className="text-gray-400">
                Every collectible is verified on-chain with immutable provenance records,
                ensuring authenticity and ownership history.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-600/10 to-emerald-600/10 rounded-xl p-8 border border-gray-700"
            >
              <Users className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Fractional Ownership</h3>
              <p className="text-gray-400">
                Own shares of high-value collectibles, making premium items accessible
                to everyone while maintaining liquidity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-600/10 to-blue-600/10 rounded-xl p-8 border border-gray-700"
            >
              <TrendingUp className="h-12 w-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Secondary Markets</h3>
              <p className="text-gray-400">
                Trade your fractional shares on integrated secondary markets with
                real-time pricing and instant liquidity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Collection?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {user ? `Continue building your portfolio, ${user.email}. ` : ''}Join thousands of collectors already trading on R3alm Collectibles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                  aria-label="Start Trading Now"
                >
                  Start Trading Now
                </motion.button>
              </Link>
              <Link to="/mint">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-gray-600 hover:border-gray-500"
                  aria-label="Mint Your First NFT"
                >
                  Mint Your First NFT
                </motion.button>
              </Link>
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                  aria-label="Try Demo"
                >
                  Try Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;