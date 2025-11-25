// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Mail,
  Lock,
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
    role: 'Investor',
    icon: DollarSign,
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

  const DEMO_PASSWORD = 'demo123'; // ← Fixed! Was '123456' before

  const handleDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    setError('');
    const { error } = await signIn(demoEmail, DEMO_PASSWORD);
    if (error) {
      setError(
        error.message.includes('email_not_confirmed')
          ? 'Please disable "Confirm email" in Supabase Auth settings for demo to work.'
          : error.message
      );
    } else {
      navigate('/');
    }
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
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="h-16" aria-hidden="true" />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          {/* Header
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Collectify
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Choose a demo account or log in with your credentials
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {Object.values(demoAccounts).map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email)}
                  disabled={loading}
                  className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm p-8 transition-all duration-300 hover:scale-105 hover:border-gray-700 hover:shadow-2xl hover:bg-gray-900 disabled:opacity-60"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${account.color} opacity-10 group-hover:opacity-25 transition`} />
                  <div className="relative z-10 flex flex-col items-center flex-1">
                    <div className="w-28 h-28 mb-6 rounded-full overflow-hidden ring-4 ring-gray-800 group-hover:ring-gray-600 transition">
                      <img src={account.avatar} alt={account.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{account.name}</h3>
                    <p className="text-lg text-gray-300 mb-6">{account.role}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                      <Icon className="h-5 w-5" />
                      <span>{account.email}</span>
                    </div>
                    <div className="mt-auto w-full">
                      <div className={`inline-flex w-full justify-center items-center gap-3 px-6 py-4 rounded-full text-base font-semibold bg-gradient-to-r ${account.color} text-white shadow-lg transition-all group-hover:shadow-xl`}>
                        <Sparkles className="h-5 w-5" />
                        Instant Login
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="relative my-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-6 bg-gray-950 text-gray-500 font-medium">Or log in manually</span>
            </div>
          </div>

          {/* Manual Login */}
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-3xl border border-gray-800 p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-5 py-5 bg-gray-800/80 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-5 py-5 bg-gray-800/80 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-5 bg-red-900/20 border border-red-500/50 rounded-2xl text-red-400 text-center text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-60"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                  <ArrowRight className="h-6 w-6" />
                </button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-gray-400 text-sm">
                  All demo accounts use password:{' '}
                  <code className="font-mono bg-gray-800 px-3 py-1 rounded-lg">demo123</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};