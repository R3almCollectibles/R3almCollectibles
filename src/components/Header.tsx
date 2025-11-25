import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { Search, User, Menu, X, Home, ShoppingCart, Mint, BarChart3, Settings, Users } from 'lucide-react'; // Icons lazy-loaded below
import type { ReactNode } from 'react';

// TypeScript Interfaces
interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  children?: MenuItem[];
}

interface HeaderProps {
  menuItems?: MenuItem[];
  loading?: boolean;
}

// Lazy-load icons for performance
const LazyHome = React.lazy(() => import('lucide-react').then(module => ({ default: module.Home })));
const LazyShoppingCart = React.lazy(() => import('lucide-react').then(module => ({ default: module.ShoppingCart })));
const LazyMint = React.lazy(() => import('lucide-react').then(module => ({ default: module.Mint })));
const LazyBarChart3 = React.lazy(() => import('lucide-react').then(module => ({ default: module.BarChart3 })));
const LazySettings = React.lazy(() => import('lucide-react').then(module => ({ default: module.Settings })));

// Custom Hook: useMenuToggle
const useMenuToggle = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return { isOpen, setIsOpen, ref };
};

// Sub-Component: Search Input (Memoized)
const SearchInput = React.memo(() => {
  const [query, setQuery] = useState('');
  // Placeholder for search API (e.g., integrate with Marketplace search)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', query); // TODO: Route to /marketplace?search=${query}
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Suspense fallback={<div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </Suspense>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search collectibles..."
        className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full max-w-md"
        aria-label="Search collectibles"
      />
    </form>
  );
});

// Sub-Component: User Profile Dropdown (Memoized)
const UserDropdown = React.memo(() => {
  const { user, logout } = useAuth();
  const { isOpen, setIsOpen, ref } = useMenuToggle(false);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <Suspense fallback={<div className="w-6 h-6 bg-gray-300 rounded-full" />}>
          <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Suspense>
        {user && <span className="text-sm font-medium">{user.name}</span>}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
          >
            {user ? (
              <>
                <li>
                  <Link to="/portfolio" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Portfolio</Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</Link>
                </li>
                <li>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => {/* Trigger AuthModal */}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Login / Sign Up</button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});

// Main Header Component
export const Header: React.FC<HeaderProps> = React.memo(({ menuItems = defaultMenuItems, loading = false }) => {
  const { isOpen: mobileOpen, setIsOpen: setMobileOpen } = useMenuToggle(false);
  const location = useLocation();

  if (loading) {
    return (
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="w-32 h-8 bg-gray-300 rounded animate-pulse" />
            <div className="flex space-x-4">
              <div className="w-24 h-8 bg-gray-300 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50" role="banner">
      <nav className="container mx-auto px-4" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>R3alm</span>
            <span className="text-blue-500">Collectibles</span>
          </Link>

          {/* Desktop Nav + Search */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.id} className="relative group">
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-500'
                    }`}
                  >
                    <Suspense fallback={null}>
                      <LazyHome className="w-4 h-4" /> {/* Example; swap per item */}
                    </Suspense>
                    <span className="truncate max-w-32">{item.label}</span>
                  </Link>
                  {item.children && (
                    <AnimatePresence>
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                      >
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              to={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 truncate"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
            <SearchInput />
            <UserDropdown />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <SearchInput className="max-w-xs" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <details open={false}>
                      <summary className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer list-none">
                        <Suspense fallback={null}>{/* Icon */}</Suspense>
                        {item.label}
                      </summary>
                      {item.children && (
                        <ul className="ml-4 space-y-2 mt-2">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={child.href}
                                className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </details>
                  </li>
                ))}
                <li>
                  <UserDropdown />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
});

// Default Menu Items (Customizable via props)
const defaultMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'marketplace',
    label: 'Marketplace',
    href: '/marketplace',
    children: [
      { id: 'browse', label: 'Browse', href: '/marketplace/browse' },
      { id: 'trending', label: 'Trending', href: '/marketplace/trending' },
    ],
  },
  { id: 'mint', label: 'Mint NFT', href: '/mint' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
  { id: 'analytics', label: 'Analytics', href: '/analytics' },
  { id: 'settings', label: 'Settings', href: '/settings' },
];

Header.displayName = 'Header';
export default Header;