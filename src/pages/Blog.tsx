// src/pages/Blog.tsx
// APPLE-INSPIRED, MINIMAL, PROFESSIONAL BLOG — 2025 EDITION
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            R3alm Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Deep insights into collectibles, blockchain provenance, and the future of ownership.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <article className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    Featured Story
                  </span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-8 text-sm text-gray-500 mb-10">
                  <div className="flex items-center gap-4">
                    <img src={featuredPost.authorAvatar} alt={featuredPost.author} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-medium text-gray-900">{featuredPost.author}</div>
                      <div className="text-sm text-gray-500">{featuredPost.authorRole}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-3 text-lg font-medium text-purple-600 hover:text-purple-700 transition"
                >
                  Read the full article
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="py-12 bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all group"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="font-medium text-purple-600">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-32">
              <p className="text-2xl text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;