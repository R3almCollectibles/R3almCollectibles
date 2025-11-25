// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Palette,
  DollarSign,
} from 'lucide-react';

const demoAccounts = {
  collector: {
    email: 'collector@demo.com',
    name: 'Alex Collector',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'Collector',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
  },
  creator: {
    email: 'creator@demo.com',
    name: 'Maya Artist',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'Creator',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
  },
  investor: {
    email: 'investor@demo.com',
    name: 'Jordan Investor',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'Investor',          // ← Fixed: string, not DollarSign component
    icon: DollarSign,          // ← Icon used only here
    color: 'from-green-500 to-emerald-500',
  },
  admin: {
    email: 'admin@demo.com',
    name: 'Admin Manager',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'Administrator',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
  },
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    setError('');
    const { error } = await signIn(demoEmail, '123456');
    if (error) setError(error.message);
    else navigate('/');
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    else navigate('/');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Collectify
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Choose a demo account or log in with your credentials
          </p>
        </div>

        {/* Demo Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.values(demoAccounts).map((account) => {
            const Icon = account.icon;
            return (
              <button
                key={account.email}
                onClick={() => handleDemoLogin(account.email)}
                disabled={loading}
                className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-6 transition-all hover:scale-105 hover:border-gray-700 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${account.color} opacity-10 group-hover:opacity-20 transition`} />

                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gray-800 group-hover:ring-gray-700 transition">
                    <img src={account.avatar} alt={account.name} className="w-full h-full object-cover" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{account.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{account.role}</p>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                    <Icon className="h-4 w-4" />
                    <span>{account.email}</span>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${account.color} text-white`}>
                    <Sparkles className="h-4 w-4" />
                    Instant Login
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-950 text-gray-500">Or log in manually</span>
          </div>
        </div>

        {/* Manual Login Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-3"
              >
                {loading ? 'Logging in...' : 'Log In'}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};