import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, Disc as Discord, Github, Mail, Zap } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75" />
                <div className="relative bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                R3alm Collectibles
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              Democratizing access to premium collectibles through blockchain technology, 
              fractional ownership, and authenticated provenance verification.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Discord className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/marketplace')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/mint')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Mint NFT
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/portfolio')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/analytics')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/help')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/api-docs')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  API Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/terms')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/privacy')}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 R3alm Collectibles. All rights reserved. Built on blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;