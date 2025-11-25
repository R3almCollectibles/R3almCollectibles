// src/App.tsx – FINAL & FULLY UPDATED
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages (lazy loaded)
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

// Admin Pages (from admin folder)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCollectibleDetail = lazy(() => import('./pages/admin/AdminCollectibleDetail'));

// Placeholder Pages (you can build these next)
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* === PUBLIC PAGES WITH HEADER & FOOTER === */}
            <Route
              element={
                <div className="min-h-screen bg-gray-900 text-white flex flex-col">
                  <Header />
                  <main className="flex-1">
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
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            >
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
            </Route>

            {/* === ADMIN ROUTES (NO Header/Footer — uses AdminSidebar) === */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/collectibles" element={<AdminDashboard />} />
            <Route path="/admin/collectibles/:id" element={<AdminCollectibleDetail />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* === 404 PAGE === */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                  <h1 className="text-8xl font-bold text-gray-700">404</h1>
                  <p className="text-2xl mt-4">Page not found</p>
                  <a href="/" className="mt-8 text-blue-400 hover:underline text-lg">
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