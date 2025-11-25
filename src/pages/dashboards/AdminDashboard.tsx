import React from 'react';
import { Shield, Users, Package2, AlertTriangle, CheckCircle, Ban } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <Shield className="h-14 w-14 text-red-500" />
          <div>
            <h1 className="text-5xl font-bold text-white">Admin Control Center</h1>
            <p className="text-xl text-gray-400">Platform oversight • User management • Content moderation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: '12,847', icon: Users, color: 'from-red-500 to-rose-500', change: '+12%' },
            { label: 'Flagged Items', value: '9', icon: AlertTriangle, color: 'from-yellow-500 to-orange-500', change: 'Urgent' },
            { label: 'Pending Approvals', value: '34', icon: Package2, color: 'from-purple-500 to-pink-500', change: '+5 today' },
            { label: 'Banned Accounts', value: '8', icon: Ban, color: 'from-gray-500 to-gray-600', change: 'This week' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="relative overflow-hidden rounded-3xl bg-gray-900/90 border border-gray-800 p-8 backdrop-blur-sm hover:border-gray-700 transition-all hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                <Icon className={`h-12 w-12 mb-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 mt-1">{stat.label}</p>
                <span className={`text-sm mt-3 block ${stat.change.includes('+') || stat.change === 'Urgent' ? 'text-red-400' : 'text-gray-500'}`}>
                  {stat.change}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800/50 rounded-3xl p-8">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-10 w-10 text-red-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">System Alert</h3>
              <p className="text-gray-300">High-value item #A1293 flagged for authenticity review</p>
            </div>
            <button className="ml-auto px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-medium transition">
              Review Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};