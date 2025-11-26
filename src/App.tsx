// src/App.tsx – FINAL & FULLY UPDATED (November 2025) – ALL MARKETPLACE PAGES LIVE
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import { MegaMenu } from './components/navigation/MegaMenu';
import Footer from './components/Footer';

// Public Pages – ALL USING FULL /src/... PATHS (bolt.new safe)
const HomePage = lazy(() => import('/src/pages/HomePage'));
const Marketplace = lazy(() => import('/src/pages/Marketplace'));
const CollectibleDetail = lazy(() => import('/src/pages/CollectibleDetail'));
const MintNFT = lazy(() => import('/src/pages/MintNFT'));
const Portfolio = lazy(() => import('/src/pages/Portfolio'));
const Analytics = lazy(() => import('/src/pages/Analytics'));
const HelpCenter = lazy(() => import('/src/pages/HelpCenter'));
const APIDocumentation = lazy(() => import('/src/pages/APIDocumentation'));
const TermsOfService = lazy(() => import('/src/pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('/src/pages/PrivacyPolicy'));
const Settings = lazy(() => import('/src/pages/Settings'));
const StorageSecurity = lazy(() => import('/src/pages/StorageSecurity'));
const ProvenanceDetail = lazy(() => import('/src/pages/ProvenanceDetail'));
const ActivityDetail = lazy(() => import('/src/pages/ActivityDetail'));
const Demo = lazy(() => import('/src/pages/Demo'));

// About Company
const About = lazy(() => import('/src/pages/About'));
const Team = lazy(() => import('/src/pages/Team'));
const Careers = lazy(() => import('/src/pages/Careers'));
const Blog = lazy(() => import('/src/pages/Blog')); // ← NOW WORKS

// Security Pages
const BlockchainDetails = lazy(() => import('/src/pages/BlockchainDetails'));
const PhysicalStorageSecurity = lazy(() => import('/src/pages/PhysicalStorageSecurity'));
const InsuranceCoverage = lazy(() => import('/src/pages/InsuranceCoverage'));

// Marketplace Category Pages
const ArtMarketplace = lazy(() => import('/src/pages/marketplace/ArtMarketplace'));
const MusicMarketplace = lazy(() => import('/src/pages/marketplace/MusicMarketplace'));
const CollectiblesMarketplace = lazy(() => import('/src/pages/marketplace/CollectiblesMarketplace'));

// Admin Pages
const AdminDashboard = lazy(() => import('/src/pages/admin/AdminDashboard'));
const AdminCollectibles = lazy(() => import('/src/pages/admin/AdminCollectibles'));
const AdminCollectibleDetail = lazy(() => import('/src/pages/admin/AdminCollectibleDetail'));
const AdminUsers = lazy(() => import('/src/pages/admin/AdminUsers'));
const AdminReports = lazy(() => import('/src/pages/admin/AdminReports'));
const AdminAnalytics = lazy(() => import('/src/pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('/src/pages/admin/AdminSettings'));
const AdminTeam = lazy(() => import('/src/pages/admin/AdminTeam'));

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
            {/* PUBLIC LAYOUT – MegaMenu + Footer */}
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
                      <Route path="/storage-security" element={<StorageSecurity />} />
                      
                      {/* Security & Transparency */}
                      <Route path="/security/blockchain" element={<BlockchainDetails />} />
                      <Route path="/security/physical-storage" element={<PhysicalStorageSecurity />} />
                      <Route path="/security/insurance" element={<InsuranceCoverage />} />
                      
                      {/* Nested Detail Views */}
                      <Route path="/collectible/:id/provenance/:eventId" element={<ProvenanceDetail />} />
                      <Route path="/collectible/:id/activity/:activityId" element={<ActivityDetail />} />
                      
                      {/* About */}
                      <Route path="/about" element={<About />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<Blog />} />

                      {/* MARKETPLACE CATEGORIES */}
                      <Route path="/marketplace/art" element={<ArtMarketplace />} />
                      <Route path="/marketplace/music" element={<MusicMarketplace />} />
                      <Route path="/marketplace/collectibles" element={<CollectiblesMarketplace />} />
                      
                      {/* Future Routes */}
                      <Route path="/marketplace/fractions" element={<Marketplace />} />
                      <Route path="/marketplace/provenance" element={<Marketplace />} />
                      <Route path="/marketplace/auctions" element={<Marketplace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />

            {/* ADMIN ROUTES – No Layout */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/collectibles" element={<AdminCollectibles />} />
            <Route path="/admin/collectibles/:id" element={<AdminCollectibleDetail />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/team" element={<AdminTeam />} />

            {/* 404 */}
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