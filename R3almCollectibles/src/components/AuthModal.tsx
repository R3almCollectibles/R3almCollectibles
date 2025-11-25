import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Wallet, Users, Palette, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'demo'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup, loginWithDemo } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let success = false;
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
      } else if (mode === 'signup') {
        success = await signup(formData.email, formData.password, formData.name);
      }

      if (success) {
        onClose();
        setFormData({ email: '', password: '', name: '' });
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoType: 'collector' | 'creator' | 'investor') => {
    loginWithDemo(demoType);
    onClose();
  };

  const demoAccounts = [
    {
      type: 'collector' as const,
      name: 'Alex Collector',
      description: 'Passionate about vintage guitars and rare art',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'creator' as const,
      name: 'Maya Artist',
      description: 'Digital artist with multiple NFT collections',
      icon: Palette,
      color: 'from-purple-500 to-pink-500'
    },
    {
      type: 'investor' as const,
      name: 'Jordan Investor',
      description: 'Strategic investor in premium collectibles',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'demo' && 'Try Demo Account'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {mode === 'demo' ? (
                <div className="space-y-4">
                  <p className="text-gray-400 text-center mb-6">
                    Explore R3alm Collectibles with pre-configured demo accounts.
                    <Link to="/demo" className="text-blue-400 hover:text-blue-300 transition-colors ml-1">
                      Learn more about our demo experience.
                    </Link>
                  </p>
                  
                  {demoAccounts.map((account) => (
                    <button
                      key={account.type}
                      onClick={() => handleDemoLogin(account.type)}
                      className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-600 hover:border-gray-500 transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${account.color}`}>
                          <account.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                            {account.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{account.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-700">
                    <button
                      onClick={() => setMode('login')}
                      className="w-full text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-white font-medium mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm text-center">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-all"
                  >
                    {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                  </button>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={() => setMode('demo')}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                    >
                      Try Demo Account
                    </button>
                    
                    <div className="text-gray-400">
                      {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;