// src/pages/Team.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Globe } from 'lucide-react';

const team = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & CEO',
    bio: 'Former Christie’s specialist turned blockchain visionary. 15+ years in luxury collectibles.',
    img: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    social: { linkedin: '#', twitter: '#', site: '#' },
  },
  {
    name: 'Marcus Rivera',
    role: 'CTO & Co-Founder',
    bio: 'Built NFT infrastructure at OpenSea. Ethereum core contributor.',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    social: { linkedin: '#', twitter: '#', site: '#' },
  },
  {
    name: 'Sofia Patel',
    role: 'Head of Curation',
    bio: 'Ex-Sotheby’s Contemporary Art director. Discovered 3 of the top 50 NFT artists.',
    img: 'https://images.pexels.com/photos/3760583/pexels-photo-3760583.jpeg?auto=compress&cs=tinysrgb&w=800',
    social: { linkedin: '#', twitter: '#', site: '#' },
  },
  {
    name: 'James Park',
    role: 'Head of Asset Security',
    bio: '20 years in high-security vault operations for banks and museums.',
    img: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800',
    social: { linkedin: '#', twitter: '#', site: '#' },
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Meet the Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            World-class experts in art, technology, and luxury asset management — united by a mission to redefine collecting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500 transition-all">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-purple-400 font-medium mt-1">{member.role}</p>
                  <p className="text-gray-400 text-sm mt-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-4 mt-6">
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition"><Linkedin className="h-5 w-5" /></a>
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition"><Twitter className="h-5 w-5" /></a>
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition"><Globe className="0 h-5 w-5" /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;