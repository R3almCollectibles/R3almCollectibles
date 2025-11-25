import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Search, User, LogOut, Zap, Settings, HelpCircle, 
  FileText, Shield, Image as CollectibleIcon 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
  priority?: number; // From sitemap (0.1-1.0)
  newTab?: boolean;
}

interface NavigationMenuProps {
  className?: string;
  menuItems?: MenuItem[]; // Optional override for dynamic data
}

const defaultMenuItems: MenuItem[] = [
  { name: 'Home', href: '/', priority: 1.0 },
  { 
    name: 'Marketplace', 
    href: '/marketplace', 
    priority: 0.9,
    icon: CollectibleIcon,
    children: [
      { name: 'Featured Collectible #1', href: '/collectible/1', priority: 0.7 },
      { name: 'Featured Collectible #2', href: '/collectible/2', priority: 0.7 },
      { name: 'Featured Collectible #3', href: '/collectible/3', priority: 0.7 },
    ]
  },
  { name: 'Mint NFT', href: '/mint', priority: 0.8 },
  { name: 'Portfolio', href: '/portfolio', priority: 0.8 },
  { name: 'Analytics', href: '/analytics', priority: 0.7 },
  { 
    name: 'Profile', 
    href: '/profile', 
    priority: 0.6,
    icon: User,
    children: [
      { name: 'Settings', href: '/settings', priority: 0.5 },
      { name: 'Demo Mode', href: '/demo', priority: 0.7 },
    ]
  },
  { 
    name: 'More', 
    href: '#', // Non-link for dropdown
    priority: 0.6,
    children: [
      { name: 'Help Center', href: '/help', icon: HelpCircle, priority: 0.6 },
      { name: 'API Docs', href: '/api-docs', icon: FileText, priority: 0.5 },
      { name: 'Storage Security', href: '/storage-security', icon: Shield, priority: 0.5 },
      { name: 'Terms', href: '/terms', newTab: true, priority: 0.4 },
      { name: 'Privacy', href: '/privacy', newTab: true, priority: 0.4 },
    ]
  },
];

const NavigationMenu: React.FC<NavigationMenuProps> = React.memo(({ className = '', menuItems = defaultMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isActive = (href: string) => location.pathname === href;
  const filteredItems = menuItems.filter(item => item.priority && item.priority >= 0.5); // High-priority only for top-level

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = href; // For external/newTab
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // Integrate with Supabase or global search: e.g., navigate(`/search?q=${searchQuery}`)
      console.log('Search:', searchQuery); // Placeholder
    }
  };

  return (
    <nav ref={menuRef} className={`w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 ${className}`} role="navigation" aria-label="Main Navigation">
      {/* Desktop: Horizontal Mega-Menu */}
      <div className="hidden md:flex items-center justify-between px-4 h-16">
        <div className="flex items-center space-x-8">
          {filteredItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href) ? 'text-blue-400 bg-gray-800' : 'text-gray-300 hover:text-white'
                }`}
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onKeyDown={(e) => handleKeyDown(e, item.href)}
                tabIndex={0}
                aria-haspopup={!!item.children}
                aria-expanded={activeDropdown === item.name}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="truncate">{item.name}</span>
              </Link>
              <AnimatePresence>
                {activeDropdown === item.name && item.children && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 top-full mt-2 w-64 bg-gray-800 rounded-xl border border-gray-700 shadow-xl z-50"
                    role="menu"
                  >
                    {item.children.map((child) => (
                      <li key={child.name} role="none">
                        <Link
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                          onMouseEnter={() => setActiveDropdown(`${item.name}-${child.name}`)}
                          role="menuitem"
                        >
                          {child.icon && <child.icon className="h-4 w-4" />}
                          <span className="truncate">{child.name}</span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
          {user?.isAdmin && (
            <Link to="/admin" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors">
              Admin
            </Link>
          )}
        </div>

        {/* Desktop Search & User */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collectibles..."
              className="w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </form>
          {isAuthenticated ? (
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white rounded-lg">
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
              </button>
              {/* User Dropdown: Similar to your Header, with logout */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-xl border border-gray-700"
              >
                <button onClick={logout} className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile: Hamburger Menu */}
      <div className="md:hidden flex items-center justify-between px-4 h-16">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-400 hover:text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <form onSubmit={handleSearch} className="flex-1 mx-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
          />
        </form>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-800"
          >
            <ul className="py-4 space-y-2 px-4" role="menu">
              {filteredItems.map((item) => (
                <li key={item.name} role="none">
                  <details className="group" open={isActive(item.href)}>
                    <summary 
                      className="flex items-center space-x-2 p-3 rounded-lg text-gray-300 hover:text-white cursor-pointer list-none"
                      onClick={() => item.children && setActiveDropdown(item.name)}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.name}</span>
                    </summary>
                    {item.children && (
                      <ul className="ml-6 space-y-1 mt-2" role="menu">
                        {item.children.map((child) => (
                          <li key={child.name} role="none">
                            <Link
                              to={child.href}
                              className="block p-2 text-sm text-gray-400 hover:text-white pl-4 rounded transition-colors"
                              role="menuitem"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              ))}
              {user?.isAdmin && (
                <li>
                  <Link to="/admin" className="block p-3 text-gray-300 hover:text-white rounded-lg" onClick={() => setIsOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

NavigationMenu.displayName = 'NavigationMenu';

export default NavigationMenu;
