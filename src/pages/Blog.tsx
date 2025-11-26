// src/pages/Blog.tsx
// FULLY DYNAMIC WITH SUPABASE — LIVE DATA
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  author_role: string;
  author_avatar: string;
  date: string;
  read_time: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const categories = ['All', 'Technology', 'Provenance', 'Security', 'Culture', 'Announcements'];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading R3alm Journal...</div>
      </div>
    );
  }

  return (
    <>
      {/* Same beautiful UI as before — now powered by Supabase */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        <div className="absolute inset-0 bg-grid-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            R3alm Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
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
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                  <span>{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.read_time}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <img src={featuredPost.author_avatar} alt={featuredPost.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="text-white text-sm font-medium">{featuredPost.author}</div>
                      <div className="text-xs text-gray-400">{featuredPost.author_role}</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    <Calendar className="inline h-3.5 w-3.5 mr-1" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-sm transition-all"
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4" />
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
      <section className="py-10 bg-gray-900 border-y border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="text-purple-400 font-medium">{post.category}</span>
                    <span>•</span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.author_avatar} alt={post.author} className="w-9 h-9 rounded-full" />
                      <div>
                        <div className="text-xs font-medium text-white">{post.author}</div>
                        <div className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;