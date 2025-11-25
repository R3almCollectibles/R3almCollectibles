// src/pages/Profile.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, User, LogOut } from 'lucide-react';

const roleInfo = {
  collector: { label: 'Collector', gradient: 'from-purple-500 to-pink-500', icon: 'Sparkles' },
  creator:   { label: 'Creator',   gradient: 'from-blue-500 to-cyan-500',   icon: 'Palette' },
  investor:  { label: 'Investor',  gradient: 'from-green-500 to-emerald-500', icon: 'DollarSign' },
  admin:     { label: 'Admin',     gradient: 'from-red-500 to-orange-500',    icon: 'Shield' },
};

export const Profile = () => {
  const { user, signOut } = useAuth();
  const meta = user?.user_metadata || {};
  const role = (meta.role || 'collector').toLowerCase();
  const config = roleInfo[role as keyof typeof roleInfo] || roleInfo.collector;

  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800 p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">{meta.name || user?.email}</h1>
              <p className={`text-2xl bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.label}
              </p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-white capitalize">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};