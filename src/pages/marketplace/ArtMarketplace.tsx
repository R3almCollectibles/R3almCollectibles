// src/pages/marketplace/ArtMarketplace.tsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid3x3, List, ChevronDown, Palette, Sparkles, TrendingUp, Shield } from 'lucide-react';

interface ArtCollectible {
  id: string;
  name: string;
  artist: string;
  year: string;
  medium: string;
  price: number;
  fractionsAvailable: number;
  totalValue: number;
  image: string;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
  verified: boolean;
  trending?: boolean;
}

const artCollectibles: ArtCollectible[] = [
  {
    id: 'art-1',
    name: 'Neon Dreams #47',
    artist: 'Vera Molnár x R3alm',
    year: '2024',
    medium: 'Generative Algorithm on Canvas',
    price: 890000,
    fractionsAvailable: 890,
    totalValue: 890000,
    image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rarity: 'Legendary',
    verified: true,
    trending: true,
  },
  {
    id: 'art-2',
    name: 'Eternal Fractures',
    artist: 'Julius Horsthuis',
    year: '2025',
    medium: '4K Fractal Animation Loop',
    price: 420000,
    fractionsAvailable: 420,
    totalValue: 420000,
    image: 'https://images.pexels.com/photos/5380640/pexels-photo-5380640.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rarity: 'Epic',
    verified: true,
  },
  {
    id: 'art-3',
    name: 'The Last Canvas',
    artist: 'Beeple',
    year: '2021',
    medium: 'Digital Painting (Physical Edition)',
    price: 69000000,
    fractionsAvailable: 10000,
    totalValue: 69000000,
    image: 'https://images.pexels.com/photos/5380798/pexels-photo-5380798.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rarity: 'Legendary',
    verified: true,
    trending: true,
  },
  {
    id: 'art-4',
    name: 'Quantum Brushstrokes',
    artist: 'Refik Anadol',
    year: '2025',
    medium: 'AI-Generated Oil on Canvas',
    price: 1250000,
    fractionsAvailable: 1250,
    totalValue: 1250000,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rarity: 'Epic',
    verified: true,
  },
  {
    id: 'art-5',
    name: 'Pixelated Soul',
    artist: 'XCOPY',
    year: '2024',
    medium: 'Glitch Art on LED Panel',
    price: 680000,
    fractionsAvailable: 680,
    totalValue: 680000,
    image: 'https://images.pexels.com/photos/7681255/pexels-photo-7681255.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rarity: 'Rare',
    verified: true,
  },
  {
    id: 'art-6',
    name: 'Chromatic Memory',
    artist: 'Sarah Meyohas',
    year: '2025',
    medium: 'Holographic Petal Print',
    price: 340000,
    fractionsAvailable: 340,
    totalValue: 340000,
    image: 'https://images.pexels.com/photos/7770597/pexels-photo-7770597.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rarity: 'Rare',
    verified: true,
  },
];

const ArtMarketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('trending');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSorted = useMemo(() => {
    let filtered = artCollectibles.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesRarity = selectedRarity.length === 0 || selectedRarity.includes(item.rarity);
      return matchesSearch && matchesPrice && matchesRarity;
    });

    if (sortBy === 'trending') {
      filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }

    return filtered;
  }, [searchQuery, priceRange, selectedRarity, sortBy]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price.toLocaleString()}`;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'from-orange-500 to-red-500';
      case 'Epic': return 'from-purple-500 to-pink-500';
      case 'Rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-gray-900 via-purple-900/30 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 text-purple-400 mb-6">
              <Palette className="h-8 w-8" />
              <span className="text-xl font-medium">Fine Art Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Masterpieces on Chain
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              Own fractions of museum-grade digital and physical fine art — from generative pioneers to legendary creators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-8 bg-gray-800/50 border-y border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="trending">Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              <button className="flex items-center gap-3 px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-500 transition">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="flex gap-3">
                {['Legendary', 'Epic', 'Rare'].map(rarity => (
                  <button
                    key={rarity}
                    onClick={() => {
                      setSelectedRarity(prev =>
                        prev.includes(rarity)
                          ? prev.filter(r => r !== rarity)
                          : [...prev, rarity]
                      );
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedRarity.includes(rarity)
                        ? `bg-gradient-to-r ${getRarityColor(rarity)} text-white`
                        : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {rarity}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <Grid3x3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Art Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 gap-10' : 'grid-cols-1 gap-8'}`}>
            {filteredAndSorted.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/collectible/${art.id}`}>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500 transition-all">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {art.trending && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Trending
                        </div>
                      )}
                      {art.verified && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-lg">
                          <Shield className="h-5 w-5" />
                        </div>
                      )}
                      <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${getRarityColor(art.rarity)} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                        {art.rarity}
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                        {art.name}
                      </h3>
                      <p className="text-gray-400 mb-4">by {art.artist}</p>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-3xl font-bold text-white">{formatPrice(art.price)}</div>
                          <div className="text-sm text-gray-400">{art.fractionsAvailable.toLocaleString()} fractions available</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium text-gray-300">Total Value</div>
                          <div className="text-xl font-bold text-green-400">{formatPrice(art.totalValue)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Sparkles className="h-5 w-5 text-yellow-400" />
                        <span className="text-gray-400">{art.medium}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400">{art.year}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtMarketplace;