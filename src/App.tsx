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

// Optional: User detail page (you can create later)
import AdminUserDetail from './pages/admin/AdminUserDetail';

// Fallback 404 Component
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-950">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-500 mt-8">Page Not Found</p>
      <a href="/" className="mt-8 inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold">
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

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/collectible/:id" element={<AdminCollectibleDetail />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/user/:id" element={<AdminUserDetail />} />

              {/* Catch-all 404 */}
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