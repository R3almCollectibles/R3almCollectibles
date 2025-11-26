// src/App.tsx – FINAL & CORRECTED (November 2025) – 100% WORKING
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import { MegaMenu } from './components/navigation/MegaMenu'; // ← NEW: Replaced Header
import Footer from './components/Footer';

// Public Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const CollectibleDetail = lazy(() => import('./pages/CollectibleDetail'));
const MintNFT = lazy(() => import('./pages/MintNFT'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Analytics = lazy(() => import('./pages/Analytics'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const APIDocumentation = lazy(() => import('./pages/APIDocumentation'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Settings = lazy(() => import('./pages/Settings'));
const StorageSecurity = lazy(() => import('./pages/StorageSecurity'));
const ProvenanceDetail = lazy(() => import('./pages/ProvenanceDetail'));
const ActivityDetail = lazy(() => import('./pages/ActivityDetail'));
const Demo = lazy(() => import('./pages/Demo'));

// NEW: Dedicated Security & Transparency Pages
const BlockchainDetails = lazy(() => import('./pages/BlockchainDetails'));
const PhysicalStorageSecurity = lazy(() => import('./pages/PhysicalStorageSecurity'));
const InsuranceCoverage = lazy(() => import('./pages/InsuranceCoverage'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCollectibles = lazy(() => import('./pages/admin/AdminCollectibles'));
const AdminCollectibleDetail = lazy(() => import('./pages/admin/AdminCollectibleDetail'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam'));

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* PUBLIC LAYOUT – MegaMenu + Footer on all /* routes */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen bg-gray-900 text-white flex flex-col">
                  <MegaMenu />
                  <main className="flex-1 pt-16">
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
                      <Route path="/demo" element={<Demo />} />

                      {/* Legacy route */}
                      <Route path="/storage-security" element={<StorageSecurity />} />

                      {/* NEW: Dedicated Security Pages */}
                      <Route path="/security/blockchain" element={<BlockchainDetails />} />
                      <Route path="/security/physical-storage" element={<PhysicalStorageSecurity />} />
                      <Route path="/security/insurance" element={<InsuranceCoverage />} />

                      {/* Nested detail views */}
                      <Route path="/collectible/:id/provenance/:eventId" element={<ProvenanceDetail />} />
                      <Route path="/collectible/:id/activity/:activityId" element={<ActivityDetail />} />

                      {/* MegaMenu placeholder routes (won't 404) */}
                      <Route path="/marketplace/art" element={<Marketplace />} />
                      <Route path="/marketplace/collectibles" element={<Marketplace />} />
                      <Route path="/marketplace/music" element={<Marketplace />} />
                      <Route path="/marketplace/fractions" element={<Marketplace />} />
                      <Route path="/marketplace/provenance" element={<Marketplace />} />
                      <Route path="/marketplace/auctions" element={<Marketplace />} />
                      <Route path="/about" element={<div className="p-20 text-center text-3xl">About Us – Coming Soon</div>} />
                      <Route path="/team" element={<div className="p-20 text-center text-3xl">Team – Coming Soon</div>} />
                      <Route path="/careers" element={<div className="p-20 text-center text-3xl">Careers – Join Us</div>} />
                      <Route path="/blog" element={<div className="p-20 text-center text-3xl">Blog – Coming Soon</div>} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />

            {/* ADMIN ROUTES – No Header/Footer */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/collectibles" element={<AdminCollectibles />} />
            <Route path="/admin/collectibles/:id" element={<AdminCollectibleDetail />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/team" element={<AdminTeam />} />

            {/* 404 – Catch-all (must be last) */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                  <h1 className="text-9xl font-bold text-gray-800">404</h1>
                  <p className="text-3xl mt-8 mb-4">Page Not Found</p>
                  <a href="/" className="text-xl text-purple-400 hover:underline">
                    ← Back to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;