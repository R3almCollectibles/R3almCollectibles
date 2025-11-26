// src/pages/Careers.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const perks = [
    'Competitive salary + equity',
    'Full health, dental, vision',
    'Unlimited PTO',
    'Work from anywhere',
    'Annual team retreats',
    'Hardware stipend',
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <section className="py-32 bg-gradient-to-b from-purple-900/20 to-gray-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8"
          >
            Join the Future of Collecting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-300"
          >
            We're hiring passionate builders to redefine ownership.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Move Fast</h3>
            <p className="text-gray-400">Ship products that change lives</p>
          </div>
          <div className="text-center">
            <Heart className="h-16 w-16 text-red-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Own It</h3>
            <p className="text-gray-400">Every team member is an owner</p>
          </div>
          <div className="text-center">
            <Shield className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Build Trust</h3>
            <p className="text-gray-400">Security and transparency above all</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Open Roles</h2>
          <div className="space-y-6">
            {['Senior Blockchain Engineer', 'Full-Stack Developer', 'Community Manager', 'Head of Growth'].map((role) => (
              <motion.div
                key={role}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-left hover:border-purple-500 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{role}</h3>
                    <p className="text-gray-400 mt-2">Full-time • Remote</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-purple-400" />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 mt-12 text-lg">
            Don't see your role?{' '}
            <a href="mailto:careers@r3alm.com" className="text-purple-400 hover:underline">
              Send us your resume anyway →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Careers;