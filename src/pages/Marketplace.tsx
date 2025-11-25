import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  TrendingUp, 
  Heart,
  CheckCircle,
  Eye
} from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const handleCollectibleClick = (id: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/collectible/${id}`);
  };

  const categories = [
    'all', 'art', 'music', 'sports', 'gaming', 'photography', 'memorabilia'
  ];

  const collectibles = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      description: 'Rare sunburst finish, original case included',
      price: '2.5 ETH',
      fractionalPrice: '0.025 ETH',
      fractional: '1/100',
      category: 'music',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 147,
      views: '2.1k'
    },
    {
      id: 2,
      name: 'Monet Water Lilies Study',
      description: 'Authenticated 1919 oil on canvas, museum quality',
      price: '5.2 ETH',
      fractionalPrice: '0.021 ETH',
      fractional: '1/250',
      category: 'art',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 523,
      views: '8.7k'
    },
    {
      id: 3,
      name: 'Jordan Game-Worn Jersey 1996',
      description: 'NBA Finals worn, certificate of authenticity',
      price: '1.8 ETH',
      fractionalPrice: '0.036 ETH',
      fractional: '1/50',
      category: 'sports',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 891,
      views: '12.3k'
    },
    {
      id: 4,
      name: 'Rolex Submariner 1965',
      description: 'Vintage diving watch, pristine condition',
      price: '3.8 ETH',
      fractionalPrice: '0.038 ETH',
      fractional: '1/100',
      category: 'memorabilia',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 456,
      views: '5.3k'
    },
    {
      id: 5,
      name: 'First Edition Charizard PSA 10',
      description: 'Shadowless Base Set, PSA graded 10',
      price: '4.2 ETH',
      fractionalPrice: '0.042 ETH',
      fractional: '1/100',
      category: 'gaming',
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 678,
      views: '9.2k'
    },
    {
      id: 6,
      name: 'Banksy Street Art Fragment',
      description: 'Authenticated piece from London wall',
      price: '6.7 ETH',
      fractionalPrice: '0.027 ETH',
      fractional: '1/250',
      category: 'art',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 1234,
      views: '15.7k'
    },
    {
      id: 7,
      name: 'Polaroid Camera Collection',
      description: 'Vintage SX-70 models in mint condition',
      price: '0.8 ETH',
      fractionalPrice: '0.008 ETH',
      fractional: '1/100',
      category: 'photography',
      image: 'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 234,
      views: '1.8k'
    },
    {
      id: 8,
      name: 'Abstract Digital Art #42',
      description: 'AI-generated masterpiece, limited edition',
      price: '1.2 ETH',
      fractionalPrice: '0.024 ETH',
      fractional: '1/50',
      category: 'art',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 345,
      views: '3.4k'
    },
    {
      id: 9,
      name: 'Vintage Leica M3 Camera',
      description: '1954 rangefinder, fully functional',
      price: '2.1 ETH',
      fractionalPrice: '0.021 ETH',
      fractional: '1/100',
      category: 'photography',
      image: 'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 312,
      views: '2.9k'
    },
    {
      id: 10,
      name: 'Fender Stratocaster 1964',
      description: 'Sunburst finish, original electronics',
      price: '4.5 ETH',
      fractionalPrice: '0.045 ETH',
      fractional: '1/100',
      category: 'music',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 567,
      views: '6.8k'
    },
    {
      id: 11,
      name: 'Babe Ruth Signed Baseball',
      description: '1927 World Series, PSA authenticated',
      price: '8.9 ETH',
      fractionalPrice: '0.089 ETH',
      fractional: '1/100',
      category: 'sports',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 2134,
      views: '28.4k'
    },
    {
      id: 12,
      name: 'Van Gogh Sketch Study',
      description: 'Pencil on paper, 1888 provenance',
      price: '12.3 ETH',
      fractionalPrice: '0.049 ETH',
      fractional: '1/250',
      category: 'art',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 3456,
      views: '45.2k'
    },
    {
      id: 13,
      name: 'Nintendo Game & Watch 1980',
      description: 'Ball game, mint in box condition',
      price: '0.6 ETH',
      fractionalPrice: '0.012 ETH',
      fractional: '1/50',
      category: 'gaming',
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 189,
      views: '1.4k'
    },
    {
      id: 14,
      name: 'Hasselblad 500C/M Kit',
      description: 'Medium format camera with lenses',
      price: '1.9 ETH',
      fractionalPrice: '0.019 ETH',
      fractional: '1/100',
      category: 'photography',
      image: 'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: false,
      likes: 278,
      views: '2.1k'
    },
    {
      id: 15,
      name: 'Patek Philippe Calatrava',
      description: '18k gold, manual wind, 1960s',
      price: '15.7 ETH',
      fractionalPrice: '0.157 ETH',
      fractional: '1/100',
      category: 'memorabilia',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
      verified: true,
      trending: true,
      likes: 4567,
      views: '67.8k'
    }
  ];

  const filteredCollectibles = collectibles.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <p className="text-gray-400">
            Showing {filteredCollectibles.length} collectibles
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
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
          {filteredCollectibles.map((item, index) => (
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
                        src={item.image}
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
                            {item.views}
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
                          <span className="text-white font-semibold">{item.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Fractional Share</span>
                          <div className="text-right">
                            <div className="text-blue-400 font-semibold">{item.fractionalPrice}</div>
                            <div className="text-purple-300 text-xs">{item.fractional}</div>
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
                          src={item.image}
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
                              <div className="text-white font-semibold">{item.price}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Fractional</div>
                              <div className="text-blue-400 font-semibold">{item.fractionalPrice}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {item.views}
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