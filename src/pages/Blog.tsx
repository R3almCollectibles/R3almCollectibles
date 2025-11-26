// src/pages/Blog.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How Fractional Ownership is Revolutionizing Rare Guitar Collecting',
    excerpt: 'For decades, owning a 1959 Gibson Les Paul was reserved for rockstars and billionaires. Here’s how blockchain changed everything...',
    author: 'Marcus Rivera',
    authorRole: 'CTO & Co-Founder',
    authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'November 22, 2025',
    readTime: '8 min read',
    category: 'Technology',
    tags: ['Fractional NFTs', 'Music Collectibles', 'Blockchain'],
    featured: true,
    image: 'https://images.pexels.com/photos/1659710/pexels-photo-1659710.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: '2',
    title: 'The $2.8M Guitar: Inside the Provenance of Jimi Hendrix’s Woodstock Strat',
    excerpt: 'We tracked every owner, repair, and performance of this legendary instrument using on-chain provenance verification.',
    author: 'Sofia Patel',
    authorRole: 'Head of Curation',
    authorAvatar: 'https://images.pexels.com/photos/3760583/pexels-photo-3760583.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'November 18, 2025',
    readTime: '12 min read',
    category: 'Provenance',
    tags: ['Music History', 'Provenance', 'Hendrix'],
    image: 'https://images.pexels.com/photos/1402789/pexels-photo-1402789.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: '3',
    title: 'Why Physical Storage Security Matters More Than Ever in 2025',
    excerpt: 'With rising NFT theft and exchange hacks, here’s why institutional-grade vaults are the future of collectible ownership.',
    author: 'James Park',
    authorRole: 'Head of Asset Security',
    authorAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'November 15, 2025',
    readTime: '10 min read',
    category: 'Security',
    tags: ['Vault Security', 'Insurance', 'Risk'],
    image: 'https://images.pexels.com/photos/5847614/pexels-photo-5847614.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: '4',
    title: 'From Garage Find to $1.2M NFT: The Story of a Lost Beatles Master Tape',
    excerpt: 'A collector discovered an unreleased 1967 Beatles session in his attic. Here’s how we brought it to the blockchain.',
    author: 'Alexandra Chen',
    authorRole: 'Founder & CEO',
    authorAvatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'November 10, 2025',
    readTime: '15 min read',
    category: 'Culture',
    tags: ['Beatles', 'Music NFTs', 'Discovery'],
    image: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

const categories = ['All', 'Technology', 'Provenance', 'Security', 'Culture', 'Announcements'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        <div className="absolute inset-0 bg-grid-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
          >
            R3alm Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto"
          >
            Stories from the frontier of collectibles, blockchain, and cultural preservation.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-medium">
                    Featured
                  </span>
                  <span>{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <img src={featuredPost.authorAvatar} alt={featuredPost.author} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="text-white font-medium">{featuredPost.author}</div>
                      <div className="text-sm text-gray-400">{featuredPost.authorRole}</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  Read Full Story
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="py-12 bg-gray-900 border-y border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500 transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                    <span className="text-purple-400 font-medium">{post.category}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-white">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;