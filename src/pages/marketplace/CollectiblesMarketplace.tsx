// src/pages/marketplace/CollectiblesMarketplace.tsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Watch, Car, Guitar, Gem, Shield, TrendingUp, Sparkles, Calendar, MapPin } from 'lucide-react';

interface CollectibleItem {
  id: string;
  name: string;
  brand: string;
  year: number;
  category: 'Guitar' | 'Watch' | 'Car' | 'Memorabilia' | 'Jewelry';
  price: number;
  fractions: number;
  totalValue: number;
  image: string;
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Very Good';
  provenance: boolean;
  location: string;
  trending?: boolean;
}

const collectibles: CollectibleItem[] = [
  {
    id: 'col-1',
    name: '1959 Gibson Les Paul Standard "Burst"',
    brand: 'Gibson',
    year: 1959,
    category: 'Guitar',
    price: 1250000,
    fractions: 1250,
    totalValue: 1250000,
    image: 'https://images.pexels.com/photos/1659710/pexels-photo-1659710.jpeg?auto=compress&cs=tinysrgb&w=1600',
    condition: 'Near Mint',
    provenance: true,
    location: 'Los Angeles, CA',
    trending: true,
  },
  {
    id: 'col-2',
    name: '1969 Fender Stratocaster "Woodstock"',
    brand: 'Fender',
    year: 1969,
    category: 'Guitar',
    price: 890000,
    fractions: 890,
    totalValue: 890000,
    image: 'https://images.pexels.com/photos/1402789/pexels-photo-1402789.jpeg?auto=compress&cs=tinysrgb&w=1600',
    condition: 'Excellent',
    provenance: true,
    location: 'Nashville, TN',
    trending: true,
  },
  {
    id: 'col-3',
    name: 'Patek Philippe Nautilus 5711/1A',
    brand: 'Patek Philippe',
    year: 2021,
    category: 'Watch',
    price: 450000,
    fractions: 450,
    totalValue: 450000,
    image: 'https://images.pexels.com/photos/2775197/pexels-photo-2775197.jpeg?auto=compress&cs=tinysrgb&w=1600',
    condition: 'Mint',
    provenance: true,
    location: 'Geneva, Switzerland',
  },
  {
    id: 'col-4',
    name: '1963 Ferrari 250 GTO',
    brand: 'Ferrari',
    year: 1963,
    category: 'Car',
    price: 70000000,
    fractions: 70000,
    totalValue: 70000000,
    image: 'https://images.pexels.com/photos/154574/pexels-photo-154574.jpeg?auto=compress&cs=tinysrgb&w=1600',
    condition: 'Mint',
    provenance: true,
    location: 'Maranello, Italy',
    trending: true,
  },
  {
    id: 'col-5',
    name: 'Elvis Presley’s 1955 Pink Cadillac',
    brand: 'Cadillac',
    year: 1955,
    category: 'Car',
    price: 850000,
    fractions: 850,
    totalValue: 850000,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1600',
    condition: 'Excellent',
    provenance: true,
    location: 'Memphis, TN',
  },
  {
    id: 'col-6',
    name: 'John Lennon’s 1965 Epiphone Casino',
    brand: 'Epiphone',
    year: 1965,
    category: 'Guitar',
    price: 620000,
    fractions: 620,
    totalValue: 620000,
    image: 'https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1600',
    condition: 'Very Good',
    provenance: true,
    location: 'London, UK',
  },
];

const CollectiblesMarketplace = () => {
  const [sortBy, setSortBy] = useState('trending');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollectibles = useMemo(() => {
    let filtered = collectibles.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(item.category);
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'trending') {
      filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'year') {
      filtered.sort((a, b) => b.year - a.year);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price.toLocaleString()}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Guitar': return <Guitar className="h-6 w-6" />;
      case 'Watch': return <Watch className="h-6 w-6" />;
      case 'Car': return <Car className="h-6 w-6" />;
      case 'Jewelry': return <Gem className="h-6 w-6" />;
      default: return <Package className="h-6 w-6" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Mint': return 'from-green-500 to-emerald-500';
      case 'Near Mint': return 'from-blue-500 to-cyan-500';
      case 'Excellent': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-4 text-purple-400 mb-6">
              <Package className="h-10 w-10" />
              <span className="text-2xl font-bold">Physical Collectibles</span>
              <Sparkles className="h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Own the Legends
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Tokenized vintage guitars, luxury watches, classic cars, and iconic memorabilia — 
              all stored in institutional vaults with full provenance and fractional ownership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-800/60 border-y border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="trending">Trending</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="year">Year (Newest)</option>
              </select>

              <div className="flex gap-3">
                {['Guitar', 'Watch', 'Car', 'Memorabilia', 'Jewelry'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(prev =>
                      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                    )}
                    className={`px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
                      selectedCategory.includes(cat)
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand, model, year..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collectibles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCollectibles.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/collectible/${item.id}`}>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500 transition-all">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {item.trending && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Trending
                        </div>
                      )}
                      {item.provenance && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg">
                          <Shield className="h-5 w-5" />
                        </div>
                      )}
                      <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${getConditionColor(item.condition)} text-white px-5 py-2 rounded-full text-sm font-bold`}>
                        {item.condition}
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                        {item.name}
                      </h3>
                      <p className="text-xl text-gray-300 mb-4">{item.brand} • {item.year}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <span>{item.category}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-3xl font-bold text-white">{formatPrice(item.price)}</div>
                          <div className="text-sm text-gray-400">{item.fractions.toLocaleString()} fractions</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-xl">{formatPrice(item.totalValue)}</div>
                          <div className="text-xs text-gray-500">Total Value</div>
                        </div>
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

export default CollectiblesMarketplace;