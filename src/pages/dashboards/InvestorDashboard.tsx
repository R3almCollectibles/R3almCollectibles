import React from 'react';
import { DollarSign, TrendingUp, PieChart, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <DollarSign className="h-14 w-14 text-emerald-500" />
          <div>
            <h1 className="text-5xl font-bold text-white">Investment Portfolio</h1>
            <p className="text-xl text-gray-400">Total invested: $2.8M • ROI: +428%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: 'Total Value', value: '$15.4M', change: '+428%', icon: Wallet, color: 'from-emerald-500 to-green-500', positive: true },
            { title: 'Active Positions', value: '89', change: '+12 this week', icon: PieChart, color: 'from-blue-500 to-cyan-500', positive: true },
            { title: 'Best Performer', value: 'CryptoPunk #5822', change: '+2,450%', icon: TrendingUp, color: 'from-purple-500 to-pink-500', positive: true },
          ].map((card) => {
            const Icon = card.icon;
            const Arrow = card.positive ? ArrowUpRight : ArrowDownRight;
            const arrowColor = card.positive ? 'text-green-400' : 'text-red-400';
            return (
              <div key={card.title} className="relative overflow-hidden rounded-3xl bg-gray-900/90 border border-gray-800 p-10 backdrop-blur-sm hover:scale-105 transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`} />
                <Icon className={`h-14 w-14 mb-6 bg-gradient-to-br ${card.color} bg-clip-text text-transparent`} />
                <p className="text-5xl font-bold text-white">{card.value}</p>
                <p className="text-2xl text-gray-400 mt-2">{card.title}</p>
                <div className={`flex items-center gap-2 mt-4 text-xl font-bold ${arrowColor}`}>
                  <Arrow className="h-6 w-6" />
                  {card.change}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 border border-emerald-800/50 rounded-3xl p-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-white">$2.8M → $15.4M</h3>
              <p className="text-2xl text-green-400 mt-2">All-time return: +428.6%</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Portfolio started</p>
              <p className="text-xl text-white">March 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};