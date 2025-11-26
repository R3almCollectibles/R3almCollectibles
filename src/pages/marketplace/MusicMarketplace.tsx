// src/pages/marketplace/MusicMarketplace.tsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Headphones, Disc3, TrendingUp, Shield, Play, Search } from 'lucide-react';

interface MusicCollectible {
  id: string;
  title: string;
  artist: string;
  year: number;
  type: 'Master Recording' | 'Royalty Share' | 'Concert Recording' | 'Unreleased Demo';
  price: number;
  fractions: number;
  totalValue: number;
  image: string;
  duration: string;
  bpm?: number;
  key?: string;
  verified: boolean;
  trending?: boolean;
}

const musicCollectibles: MusicCollectible[] = [
  {
    id: 'music-1',
    title: 'Purple Haze (1967 Studio Master)',
    artist: 'Jimi Hendrix',
    year: 1967,
    type: 'Master Recording',
    price: 2800000,
    fractions: 2800,
    totalValue: 2800000,
    image: 'https://images.pexels.com/photos/1659710/pexels-photo-1659710.jpeg?auto=compress&cs=tinysrgb&w=1600',
    duration: '2:51',
    bpm: 109,
    key: 'E Major',
    verified: true,
    trending: true,
  },
  {
    id: 'music-2',
    title: 'Unreleased Beatles Session (Abbey Road Outtake)',
    artist: 'The Beatles',
    year: 1969,
    type: 'Unreleased Demo',
    price: 12000000,
    fractions: 12000,
    totalValue: 12000000,
    image: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=1600',
    duration: '4:22',
    verified: true,
    trending: true,
  },
  {
    id: 'music-3',
    title: 'Smells Like Teen Spirit (Nevermind Master)',
    artist: 'Nirvana',
    year: 1991,
    type: 'Master Recording',
    price: 5200000,
    fractions: 5200,
    totalValue: 5200000,
    image: 'https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1600',
    duration: '5:01',
    bpm: 117,
    key: 'F minor',
    verified: true,
  },
  {
    id: 'music-4',
    title: 'Bohemian Rhapsody Royalty Share (1975–2025)',
    artist: 'Queen',
    year: 1975,
    type: 'Royalty Share',
    price: 8500000,
    fractions: 8500,
    totalValue: 8500000,
    image: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1600',
    duration: '5:55',
    verified: true,
  },
  {
    id: 'music-5',
    title: 'Woodstock 1969 Full Set (Multitrack)',
    artist: 'Jimi Hendrix',
    year: 1969,
    type: 'Concert Recording',
    price: 3800000,
    fractions: 3800,
    totalValue: 3800000,
    image: 'https://images.pexels.com/photos/1402789/pexels-photo-1402789.jpeg?auto=compress&cs=tinysrgb&w=1600',
    duration: '2h 14m',
    verified: true,
    trending: true,
  },
  {
    id: 'music-6',
    title: 'Lost Prince Demo (1987 Vault Find)',
    artist: 'Prince',
    year: 1987,
    type: 'Unreleased Demo',
    price: 2100000,
    fractions: 2100,
    totalValue: 2100000,
    image: 'https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1600',
    duration: '3:44',
    verified: true,
  },
];

const MusicMarketplace = () => {
  const [sortBy, setSortBy] = useState('trending');
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMusic = useMemo(() => {
    let filtered = musicCollectibles.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType.length === 0 || selectedType.includes(item.type);
      return matchesSearch && matchesType;
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
  }, [searchQuery, selectedType, sortBy]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    return `$${price.toLocaleString()}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Master Recording': return 'from-purple-500 to-pink-500';
      case 'Royalty Share': return 'from-green-500 to-emerald-500';
      case 'Unreleased Demo': return 'from-orange-500 to-red-500';
      case 'Concert Recording': return 'from-blue-500 to-cyan-500';
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
              <Headphones className="h-10 w-10" />
              <span className="text-2xl font-bold">Music NFTs & Masters</span>
              <Disc3 className="h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Own Music History
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Invest in iconic master recordings, unreleased demos, live performances, and royalty streams —
              all tokenized with immutable provenance and fractionalized for accessibility.
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
                className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="trending">Trending</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="year">Year Released</option>
              </select>

              <div className="flex gap-3">
                {['Master Recording', 'Royalty Share', 'Unreleased Demo', 'Concert Recording'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(prev =>
                      prev.includes(type)
                        ? prev.filter(t => t !== type)
                        : [...prev, type]
                    )}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition ${
                      selectedType.includes(type)
                        ? `bg-gradient-to-r ${getTypeColor(type)} text-white`
                        : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {type}
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
                placeholder="Search artists, songs, years..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Music Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredMusic.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/collectible/${track.id}`}>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500 transition-all">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <button className="bg-white/20 backdrop-blur-lg p-6 rounded-full hover:scale-110 transition">
                          <Play className="h-12 w-12 text-white" fill="white" />
                        </button>
                      </div>
                      {track.trending && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Trending
                        </div>
                      )}
                      {track.verified && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg">
                          <Shield className="h-5 w-5" />
                        </div>
                      )}
                      <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${getTypeColor(track.type)} text-white px-5 py-2 rounded-full text-sm font-bold`}>
                        {track.type}
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                        {track.title}
                      </h3>
                      <p className="text-xl text-gray-300 mb-4">{track.artist}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Disc3 className="h-5 w-5" />
                          <span>{track.duration}</span>
                        </div>
                        {track.bpm && (
                          <>
                            <span>•</span>
                            <span>{track.bpm} BPM</span>
                          </>
                        )}
                        {track.key && (
                          <>
                            <span>•</span>
                            <span>{track.key}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{track.year}</span>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-3xl font-bold text-white">{formatPrice(track.price)}</div>
                          <div className="text-sm text-gray-400">{track.fractions.toLocaleString()} fractions</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-xl">{formatPrice(track.totalValue)}</div>
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

export default MusicMarketplace;