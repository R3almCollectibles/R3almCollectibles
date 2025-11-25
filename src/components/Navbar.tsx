import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar: React.FC = memo(() => {
  const { user, signOut } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white" onClick={closeMobileMenu}>
            R3alm Collectibles
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className={`hover:text-blue-500 transition-colors ${location.pathname === '/marketplace' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`} aria-label="Marketplace">
              Marketplace
            </Link>
            <Link to="/mint" className={`hover:text-blue-500 transition-colors ${location.pathname === '/mint' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`} aria-label="Mint NFT">
              Mint NFT
            </Link>
            <Link to="/portfolio" className={`hover:text-blue-500 transition-colors ${location.pathname === '/portfolio' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`} aria-label="Portfolio">
              Portfolio
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {/* Dropdown toggle placeholder */}}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="User menu"
                  aria-expanded={false}
                >
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium hidden sm:inline">{user.email}</span>
                </button>
                {/* User Dropdown (simple, extend with AnimatePresence) */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={closeMobileMenu}>
                    Profile
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Logout"
                  >
                    <LogOut className="inline w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Login">
                Login
              </Link>
            )}
          </div>
          {/* Mobile Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <Link to="/marketplace" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={closeMobileMenu}>
              Marketplace
            </Link>
            <Link to="/mint" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={closeMobileMenu}>
              Mint NFT
            </Link>
            <Link to="/portfolio" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={closeMobileMenu}>
              Portfolio
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 flex items-center" onClick={closeMobileMenu}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 flex items-center"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-blue-500 hover:text-blue-600" onClick={closeMobileMenu}>
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;