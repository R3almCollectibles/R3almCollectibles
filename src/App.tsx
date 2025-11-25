import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Marketplace from './pages/Marketplace';
import CollectibleDetail from './pages/CollectibleDetail';
import MintNFT from './pages/MintNFT';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import HelpCenter from './pages/HelpCenter';
import APIDocumentation from './pages/APIDocumentation';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Settings from './pages/Settings';
import StorageSecurity from './pages/StorageSecurity';
import ProvenanceDetail from './pages/ProvenanceDetail';
import ActivityDetail from './pages/ActivityDetail';
import Demo from './pages/Demo';
import AdminDashboard from './pages/AdminDashboard';
import AdminCollectibleDetail from './pages/admin/AdminCollectibleDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/collectible/:id" element={<CollectibleDetail />} />
              <Route path="/mint" element={<MintNFT />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/api-docs" element={<APIDocumentation />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/storage-security" element={<StorageSecurity />} />
              <Route path="/collectible/:id/provenance/:eventId" element={<ProvenanceDetail />} />
              <Route path="/collectible/:id/activity/:activityId" element={<ActivityDetail />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;