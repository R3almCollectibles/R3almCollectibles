// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Collectify
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-white transition">
            Profile
          </Link>

          <div className="flex items-center gap-4 pl-8 border-l border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-400">{user?.email}</span>
            </div>

            <button
              onClick={() => signOut()}
              className="text-gray-400 hover:text-red-400 transition"
              title="Log out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};