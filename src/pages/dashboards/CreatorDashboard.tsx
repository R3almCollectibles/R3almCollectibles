import React from 'react';
import { Palette, Upload, DollarSign, Eye, MessageCircle, TrendingUp } from 'lucide-react';

export const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <Palette className="h-14 w-14 text-cyan-500" />
          <div>
            <h1 className="text-5xl font-bold text-white">Creator Studio</h1>
            <p className="text-xl text-gray-400">Maya Artist • 42 drops • 8.2K followers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Sales', value: '$1.24M', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
            { label: 'Items Minted', value: '42', icon: Upload, color: 'from-blue-500 to-cyan-500' },
            { label: 'Total Views', value: '892K', icon: Eye, color: 'from-purple-500 to-pink-500' },
            { label: 'Messages', value: '18', icon: MessageCircle, color: 'from-orange-500 to-red-500' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gray-900/90 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm hover:scale-105 transition-all">
                <Icon className={`h-12 w-12 mb-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-cyan-800/50 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Drop?</h3>
            <p className="text-gray-300 text-lg mb-8">Your next masterpiece awaits. Upload now and reach 8.2K collectors instantly.</p>
            <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-2xl text-white text-xl font-bold flex items-center justify-center gap-4 shadow-2xl hover:shadow-cyan-500/50 transition-all">
              <Upload className="h-8 w-8" />
              Create New Drop
            </button>
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              Trending Collections
            </h3>
            <div className="space-y-4">
              {['Genesis Pass +420%', 'Pixel Dreams +280%', 'Neon Souls +195%'].map((col) => (
                <div key={col} className="flex justify-between items-center p-4 bg-gray-800/50 rounded-2xl">
                  <span className="text-white font-medium">{col.split(' ')[0]}</span>
                  <span className="text-green-400 text-xl font-bold">{col.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};