// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Mint from './pages/Mint';
import Portfolio from './pages/Portfolio';
import CollectibleDetail from './pages/CollectibleDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCollectibleDetail from './pages/admin/AdminCollectibleDetail';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserDetail from './pages/admin/AdminUserDetail'; // optional future

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

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/collectible/:id" element={<AdminCollectibleDetail />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/user/:id" element={<AdminUserDetail />} />

              {/* 404 */}
              <Route path="*" element={
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-700">404</h1>
                    <p className="text-xl text-gray-500 mt-4">Page not found</p>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;