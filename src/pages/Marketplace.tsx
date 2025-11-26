// src/pages/Marketplace.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Clock, Shield, Zap, Filter } from 'lucide-react';

interface Category {
  name: string;
  href: string;
  icon: React.ReactNode;
  count: string;
  color: string;
}

const categories: Category[] = [
  {
    name: 'Fine Art',
    href: '/marketplace/art',
    icon: <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">Art Palette</div>,
    count: '284',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Collectibles',
    href: '/marketplace/collectibles',
    icon: <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">Guitar</div>,
    count: '892',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Music NFTs',
    href: '/marketplace/music',
    icon: <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl">Music Note</div>,
    count: '156',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Fractional',
    href: '/marketplace/fractions',
    icon: <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl">Pie Chart</div>,
    count: '67',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Live Auctions',
    href: '/marketplace/auctions',
    icon: <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl">Gavel</div>,
    count: '23',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    name: 'Provenance Verified',
    href: '/marketplace/provenance',
    icon: <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl">Shield</div>,
    count: '1,200+',
    color: 'from-indigo-500 to-blue-500',
  },
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/30 to-gray-900">
        <div className="absolute inset-0 bg-grid-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
          >
            Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12"
          >
            Discover, collect, and own fractions of the world’s most coveted physical and digital collectibles.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guitars, art, watches, music masters..."
                className="w-full bg-gray-800/90 backdrop-blur border border-gray-700 rounded-2xl pl-16 pr-6 py-6 text-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-xl font-bold transition-all">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gray-800/50 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">1,842</div>
              <div className="text-gray-400">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">$48.2M</div>
              <div className="text-gray-400">24h Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">12.4K</div>
              <div className="text-gray-400">Collectors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">100%</div>
              <div className="text-gray-400">Provenance Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-white">Browse by Category</h2>
            <button className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={cat.href}
                  className="group block bg-gray-800/50 border border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500 transition-all"
                >
                  <div className="p-8 text-center">
                    <div className={`inline-flex p-6 bg-gradient-to-br ${cat.color} rounded-3xl mb-6 text-white text-4xl group-hover:scale-110 transition-transform`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400">{cat.count} items</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 py-4 text-center">
                    <span className="text-purple-400 font-medium group-hover:text-white transition-colors">
                      Explore Collection →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Collections</h2>
          <div className="grid lg:grid-cols-3 gap-10">
            {['Vintage Guitars', 'Contemporary Art Drops', 'Rock & Roll Memorabilia'].map((collection, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Zap className="h-24 w-24 text-white/50" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{collection}</h3>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>42 items</span>
                    <span className="text-green-400 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      +124% this week
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Marketplace;