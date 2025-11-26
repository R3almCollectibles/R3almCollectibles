// src/components/navigation/MegaMenu.tsx
// FINAL VERSION — ADMIN CONSOLE NOW VISIBLE IN DROPDOWN
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Zap,
  Package,
  Palette,
  TrendingUp,
  Shield,
  Users,
  ChevronRight,
  Wallet,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import AuthModal from '../AuthModal';
import { useAuth } from '../../contexts/AuthContext';

interface MegaMenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  children?: {
    title: string;
    items: { name: string; href: string; description?: string; icon?: React.ReactNode }[];
  }[];
}

const megaMenuData: MegaMenuItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Marketplace',
    href: '/marketplace',
    icon: <Package className="h-5 w-5" />,
    children: [
      {
        title: 'Categories',
        items: [
          { name: 'Fine Art', href: '/marketplace/art', description: 'Digital & physical masterpieces', icon: <Palette className="h-4 w-4" /> },
          { name: 'Collectibles', href: '/marketplace/collectibles', description: 'Rare guitars, watches & more', icon: <Package className="h-4 w-4" /> },
          { name: 'Music NFTs', href: '/marketplace/music', description: 'Exclusive drops & royalties', icon: <TrendingUp className="h-4 w-4" /> },
        ],
      },
      {
        title: 'Features',
        items: [
          { name: 'Fractional Ownership', href: '/marketplace/fractions', description: 'Own a piece of the rarest items' },
          { name: 'Verified Provenance', href: '/marketplace/provenance', description: 'Blockchain-tracked history', icon: <Shield className="h-4 w-4" /> },
          { name: 'Live Auctions', href: '/marketplace/auctions', description: 'Bid in real-time' },
        ],
      },
    ],
  },
  { name: 'Mint NFT', href: '/mint', icon: <Zap className="h-5 w-5" /> },
  { name: 'Portfolio', href: '/portfolio', icon: <TrendingUp className="h-5 w-5" /> },
  {
    name: 'About',
    href: '/about',
    children: [
      {
        title: 'Company',
        items: [
          { name: 'Our Mission', href: '/about', description: 'Democratizing premium collectibles' },
          { name: 'Team', href: '/team', description: 'Meet the builders' },
          { name: 'Careers', href: '/careers', description: 'Join us' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { name: 'Blog', href: '/blog' },
          { name: 'Help Center', href: '/help' },
          { name: 'API Docs', href: '/api-docs' },
        ],
      },
    ],
  },
];

export const MegaMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleMouseEnter = (name: string) => {
    clearTimeout(timeoutRef.current);
    setActiveMega(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
                <div className="relative bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                R3alm
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {megaMenuData.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'text-blue-400 bg-gray-800/50'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                    {item.children && <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-200" />}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeMega === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl"
                        onMouseEnter={() => clearTimeout(timeoutRef.current)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl p-8">
                          <div className="grid grid-cols-2 gap-8">
                            {item.children.map((column) => (
                              <div key={column.title}>
                                <h3 className="text-white font-semibold mb-4 text-lg">{column.title}</h3>
                                <ul className="space-y-3">
                                  {column.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        to={subItem.href}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all group"
                                        onClick={() => setActiveMega(null)}
                                      >
                                        {subItem.icon && (
                                          <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-gray-600">
                                            {subItem.icon}
                                          </div>
                                        )}
                                        <div>
                                          <div className="text-white font-medium group-hover:text-blue-400">
                                            {subItem.name}
                                          </div>
                                          {subItem.description && (
                                            <div className="text-gray-400 text-sm mt-1">{subItem.description}</div>
                                          )}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Search + Auth */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collectibles..."
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-64"
                />
              </div>

              {/* USER MENU — NOW WITH ADMIN CONSOLE */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-[99999] overflow-hidden"
                      >
                        {/* User Info Header */}
                        <div className="p-5 border-b border-gray-700 bg-gray-900/50">
                          <div className="flex items-center gap-4">
                            {user?.avatar ? (
                              <img src={user.avatar} alt="" className="w-14 h-14 rounded-full ring-4 ring-blue-500/20" />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <User className="h-9 w-9 text-white" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-white text-lg">{user?.name}</div>
                              <div className="text-sm text-gray-400">{user?.email}</div>
                              {user?.isAdmin && (
                                <div className="mt-2 px-3 py-1 bg-red-900/50 text-red-400 text-xs font-bold rounded-full inline-block">
                                  ADMINISTRATOR
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-3 space-y-1">
                          {/* ADMIN CONSOLE — ONLY FOR ADMINS */}
                          {user?.isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-4 w-full px-5 py-4 bg-red-900/20 hover:bg-red-900/40 rounded-xl text-red-400 font-bold text-lg transition-all"
                            >
                              <Shield className="h-6 w-6" />
                              Admin Console
                            </Link>
                          )}

                          <Link
                            to="/portfolio"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-4 w-full px-5 py-3 hover:bg-gray-700 rounded-lg text-gray-300 transition"
                          >
                            <Wallet className="h-5 w-5" />
                            Portfolio
                          </Link>

                          <Link
                            to="/settings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-4 w-full px-5 py-3 hover:bg-gray-700 rounded-lg text-gray-300 transition"
                          >
                            <Settings className="h-5 w-5" />
                            Settings
                          </Link>

                          <div className="border-t border-gray-700 my-3" />

                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center gap-4 w-full px-5 py-3 text-red-400 hover:bg-gray-700 rounded-lg font-medium transition"
                          >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-900 shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-7 w-7 text-gray-400" />
                </button>
              </div>
              <nav className="p-6 space-y-6">
                {megaMenuData.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xl font-medium text-gray-300 hover:text-white transition"
                  >
                    {item.icon && <span className="inline-block mr-3">{item.icon}</span>}
                    {item.name}
                  </Link>
                ))}

                {isAuthenticated && user?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xl font-bold text-red-400 py-4 border-t border-gray-700 pt-6"
                  >
                    <Shield className="inline mr-3 h-6 w-6" />
                    Admin Console
                  </Link>
                )}

                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-2xl font-bold text-cyan-400 py-6"
                  >
                    Sign In / Demo
                  </button>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};