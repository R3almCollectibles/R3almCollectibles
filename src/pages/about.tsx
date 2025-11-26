// src/pages/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Users, Award, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '500+', label: 'Premium Collectibles' },
    { value: '$50M+', label: 'Assets Under Custody' },
    { value: '10K+', label: 'Active Collectors' },
    { value: '100%', label: 'Blockchain Verified' },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'True Ownership',
      desc: 'Every item is tokenized on-chain with immutable provenance.',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Access',
      desc: 'Own fractions of rare assets from anywhere in the world.',
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: 'Trust First',
      desc: 'Physical assets stored in insured vaults with 24/7 monitoring.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 pt-24 pb-32">
        <div className="absolute inset-0 bg-grid-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
          >
            Democratizing Premium Collectibles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            R3alm brings the world’s most coveted physical and digital collectibles — 
            vintage guitars, fine art, rare watches, and iconic music memorabilia — 
            to blockchain, enabling fractional ownership and true digital provenance.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              To make owning a piece of history accessible to everyone — not just the ultra-wealthy — 
              by combining blockchain technology with institutional-grade physical asset custody.
            </p>
            <div className="flex items-center gap-4 text-purple-400">
              <Zap className="h-8 w-8" />
              <span className="text-lg font-medium">Fractional ownership starts at $100</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">Our Vision</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              A world where cultural icons and investment-grade collectibles are owned collectively, 
              traded instantly, and preserved forever on-chain.
            </p>
            <div className="flex items-center gap-4 text-blue-400">
              <Award className="h-8 w-8" />
              <span className="text-lg font-medium">The future of collecting is shared</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Built on Uncompromising Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center hover:border-purple-500 transition-all group"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Own a Piece of History?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/marketplace"
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/team"
              className="px-10 py-5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-bold text-lg transition-all"
            >
              Meet the Team →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;