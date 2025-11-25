// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, LogOut, Shield, Menu } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl group-hover:scale-110 transition">
              <Package className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Collectify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/marketplace" className="text-gray-300 hover:text-white font-medium transition">
              Marketplace
            </Link>
            <Link to="/mint" className="text-gray-300 hover:text-white font-medium transition">
              Mint
            </Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-white font-medium transition">
              Portfolio
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Admin Badge */}
                {profile?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl font-bold text-sm hover:scale-105 transition"
                  >
                    <Shield className="h-4 w-4" />
                    ADMIN
                  </Link>
                )}

                {/* User Menu */}
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-400">Welcome back</p>
                    <p className="font-medium text-white">{profile?.name || 'Collector'}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 text-white font-medium hover:text-blue-400 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-3 hover:bg-gray-800 rounded-xl transition">
              <Menu className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;