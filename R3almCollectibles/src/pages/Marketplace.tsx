import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ListFilter as Filter, Grid3x2 as Grid3X3, List, TrendingUp, Heart, CircleCheck as CheckCircle, Eye } from 'lucide-react';
import { getCollectibles, type Collectible } from '../lib/collectibles';

const Marketplace = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCollectibleClick = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/collectible/${id}`);
  };

  const categories = [
    'all', 'art', 'music', 'sports', 'gaming', 'photography', 'memorabilia'
  ];

  useEffect(() => {
    loadCollectibles();
  }, [selectedCategory, searchQuery]);

  const loadCollectibles = async () => {
    setLoading(true);
    const data = await getCollectibles({
      category: selectedCategory,
      search: searchQuery
    });
    setCollectibles(data);
    setLoading(false);
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };


  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Marketplace</h1>
          <p className="text-gray-400 text-lg">
            Discover and trade authenticated collectibles with fractional ownership opportunities
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search collectibles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 capitalize"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="trending">Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {loading ? (
            <p className="text-gray-400">Loading collectibles...</p>
          ) : (
            <p className="text-gray-400">
              Showing {collectibles.length} collectibles
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          )}
        </motion.div>

        {/* Collectibles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {collectibles.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              {viewMode === 'grid' ? (
                <div onClick={() => handleCollectibleClick(item.id)} className="cursor-pointer">
                  <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex space-x-2">
                        {item.trending && (
                          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button className="bg-gray-900/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-gray-900/80 backdrop-blur rounded-lg p-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-300 flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {formatViews(item.views)}
                          </span>
                          <span className="text-gray-300 flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white line-clamp-1">{item.name}</h3>
                        {item.verified && (
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Full Price</span>
                          <span className="text-white font-semibold">{item.price_eth} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Fractional Share</span>
                          <div className="text-right">
                            <div className="text-blue-400 font-semibold">{item.fractional_price_eth} ETH</div>
                            <div className="text-purple-300 text-xs">{item.fractional_shares}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div onClick={() => handleCollectibleClick(item.id)} className="cursor-pointer">
                  <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all p-4">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                            {item.verified && <CheckCircle className="h-4 w-4 text-green-400" />}
                            {item.trending && <TrendingUp className="h-4 w-4 text-orange-400" />}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-1">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-6">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Full Price</div>
                              <div className="text-white font-semibold">{item.price_eth} ETH</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Fractional</div>
                              <div className="text-blue-400 font-semibold">{item.fractional_price_eth} ETH</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {formatViews(item.views)}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {item.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Load More Collectibles
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Marketplace;