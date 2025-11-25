// src/components/Header.tsx
import React, { useState, useRef, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Menu,
  X,
  Zap,
  User,
  LogOut,
  Settings as SettingsIcon,
  Shield,
  ChevronDown,
  Search,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('button')
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Mint NFT', href: '/mint' },
    { name: 'Portfolio', href: '/portfolio' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 z-50 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16" ref={mobileMenuRef}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <Zap className="h-7 w-7 text-blue-400" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                R3alm
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collectibles..."
                  className="w-64 px-4 py-2.5 pl-10 bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Auth / User Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gray-800/70 transition-all duration-200 group"
                  >
                    <div className="relative">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all">
                          <User className="h-6 w-6 text-white" />
                        </div>
                      )}
                      {user?.isDemo && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-sm">{user?.name || 'User'}</div>
                      <div className="text-gray-400 text-xs font-mono">
                        {user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-72 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="text-white font-bold">{user?.name}</div>
                            {user?.isDemo && <span className="text-emerald-400 text-xs font-medium">Demo Mode</span>}
                          </div>
                          <div className="text-gray-400 text-xs font-mono mt-1">
                            {user?.walletAddress}
                          </div>
                        </div>
                        <nav className="p-3 space-y-1">
                          <Link
                            to="/portfolio"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/70 rounded-xl transition-all"
                          >
                            <User className="h-5 w-5" />
                            <span>My Portfolio</span>
                          </Link>
                          <Link
                            to="/settings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/70 rounded-xl transition-all"
                          >
                            <SettingsIcon className="h-5 w-5" />
                            <span>Settings</span>
                          </Link>
                          {user?.isAdmin && (
                            <>
                              <div className="h-px bg-gray-700 my-2" />
                              <Link
                                to="/admin"
                                onClick={() => setShowUserMenu(false)}
                                className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all font-medium"
                              >
                                <Shield className="h-5 w-5" />
                                <span>Admin Dashboard</span>
                              </Link>
                            </>
                          )}
                          <div className="h-px bg-gray-700 my-2" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                          </button>
                        </nav>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                >
                  <Wallet className="h-5 w-5" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-gray-800/70 transition-all"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-7 w-7 text-white" /> : <Menu className="h-7 w-7 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="lg:hidden border-t border-gray-800 overflow-hidden"
              >
                <div className="py-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="px-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search collectibles..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Mobile Nav Links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-6 py-4 text-xl font-medium transition-all ${
                        isActive(item.href)
                          ? 'text-blue-400 bg-gray-800/50'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Mobile Auth Section */}
                  <div className="px-6 pt-6 border-t border-gray-700">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <User className="h-8 w-8 text-white" />
                            </div>
                          )}
                          <div>
                            <div className="text-white font-bold text-lg">{user?.name}</div>
                            {user?.isDemo && <div className="text-emerald-400 text-sm">Demo Account</div>}
                          </div>
                        </div>
                        <div className="space-y-2 pt-4">
                          <Link to="/portfolio" onClick={() => setIsMenuOpen(false)} className="block py-3 text-gray-300 hover:text-white">
                            My Portfolio
                          </Link>
                          <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="block py-3 text-gray-300 hover:text-white">
                            Settings
                          </Link>
                          {user?.isAdmin && (
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-3 text-red-400 font-medium">
                              Admin Dashboard
                            </Link>
                          )}
                          <button onClick={handleLogout} className="w-full text-left py-3 text-red-400 hover:text-red-300">
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg"
                      >
                        Connect Wallet
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
});

Header.displayName = 'Header';

export default Header;