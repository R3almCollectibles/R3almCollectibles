import React from 'react';
import { Sparkles, Package, TrendingUp, Heart, Clock, Star } from 'lucide-react';

export const CollectorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <Sparkles className="h-14 w-14 text-purple-500" />
          <div>
            <h1 className="text-5xl font-bold text-white">Your Collection</h1>
            <p className="text-xl text-gray-400">1,248 rare items • Est. value $487,200</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: 'Portfolio Value', value: '$487,200', change: '+18.4%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
            { title: 'Items Owned', value: '1,248', change: '+23 this month', icon: Package, color: 'from-blue-500 to-cyan-500' },
            { title: 'Wishlist Items', value: '47', change: '12 ending soon', icon: Heart, color: 'from-pink-500 to-rose-500' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="relative overflow-hidden rounded-3xl bg-gray-900/90 border border-gray-800 p-10 backdrop-blur-sm hover:border-gray-700 transition-all hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`} />
                <Icon className={`h-14 w-14 mb-6 bg-gradient-to-br ${card.color} bg-clip-text text-transparent`} />
                <p className="text-5xl font-bold text-white">{card.value}</p>
                <p className="text-2xl text-gray-400 mt-2">{card.title}</p>
                <p className="text-green-400 mt-4 text-lg">{card.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              Auctions Ending Soon
            </h3>
            <div className="space-y-4">
              {['#P993 Rare Pokémon Card', '#L227 Vintage Watch', '#A445 Digital Art Token'].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div>
                    <p className="text-white font-medium">{item}</p>
                    <p className="text-sm text-gray-400">Ends in 2h 14m</p>
                  </div>
                  <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:scale-105 transition">
                    Bid Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              Top Performers
            </h3>
            <div className="space-y-4">
              {['CryptoPunk #7804 +245%', 'BAYC #5291 +189%', 'Art Blocks #120 +156%'].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <p className="text-white">{item.split(' ')[0]}</p>
                  <span className="text-green-400 font-bold">{item.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};