// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Mint from './pages/Mint';
import Portfolio from './pages/Portfolio';
import CollectibleDetail from './pages/CollectibleDetail';

// Auth Pages
// src/App.tsx — UPDATE THESE LINES
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCollectibleDetail from './pages/admin/AdminCollectibleDetail';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserDetail from './pages/admin/AdminUserDetail';

// 404 Page
const NotFound = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-3xl mt-8 text-gray-500">Page Not Found</p>
      <a href="/" className="mt-10 inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:scale-105 transition">
        Back to Home
      </a>
    </div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
          <Header />

          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/collectible/:id" element={<CollectibleDetail />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/collectible/:id" element={<AdminCollectibleDetail />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/user/:id" element={<AdminUserDetail />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;