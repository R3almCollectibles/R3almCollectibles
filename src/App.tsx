// src/App.tsx — FINAL & UNBREAKABLE — MEGAMENU ALWAYS ON TOP — NOVEMBER 2025
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MegaMenu } from './components/navigation/MegaMenu';
import Footer from './components/Footer';

// PUBLIC PAGES
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
const About = lazy(() => import('/src/pages/About'));
const Team = lazy(() => import('/src/pages/Team'));
const Careers = lazy(() => import('/src/pages/Careers'));
const Blog = lazy(() => import('/src/pages/Blog'));

// ADMIN PAGES
const AdminDashboard = lazy(() => import('/src/pages/admin/AdminDashboard'));
const AdminAnalytics = lazy(() => import('/src/pages/admin/AdminAnalytics'));
const AdminCollectibles = lazy(() => import('/src/pages/admin/AdminCollectibles'));
const AdminCollectibleDetail = lazy(() => import('/src/pages/admin/AdminCollectibleDetail'));
const AdminUsers = lazy(() => import('/src/pages/admin/AdminUsers'));
const AdminReports = lazy(() => import('/src/pages/admin/AdminReports'));
const AdminSettings = lazy(() => import('/src/pages/admin/AdminSettings'));
const AdminTeam = lazy(() => import('/src/pages/admin/AdminTeam'));

// MARKETPLACE CATEGORIES
const ArtMarketplace = lazy(() => import('/src/pages/marketplace/ArtMarketplace'));
const MusicMarketplace = lazy(() => import('/src/pages/marketplace/MusicMarketplace'));
const CollectiblesMarketplace = lazy(() => import('/src/pages/marketplace/CollectiblesMarketplace'));

// SECURITY PAGES
const BlockchainDetails = lazy(() => import('/src/pages/BlockchainDetails'));
const PhysicalStorageSecurity = lazy(() => import('/src/pages/PhysicalStorageSecurity'));
const InsuranceCoverage = lazy(() => import('/src/pages/InsuranceCoverage'));

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-950 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-950 text-white">
          {/* MEGAMENU — ALWAYS VISIBLE — FIXED ON TOP */}
          <MegaMenu />

          <Suspense fallback={<LoadingSpinner />}>
            <Routes>

              {/* ADMIN ROUTES — MEGAMENU + DARK SIDEBAR + CONTENT (NO FOOTER) */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/collectibles" element={<AdminCollectibles />} />
              <Route path="/admin/collectibles/:id" element={<AdminCollectibleDetail />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/team" element={<AdminTeam />} />

              {/* ALL OTHER ROUTES — MEGAMENU + CONTENT + FOOTER */}
              <Route
                path="/*"
                element={
                  <main className="pt-16 min-h-screen flex flex-col">
                    <div className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/marketplace/art" element={<ArtMarketplace />} />
                        <Route path="/marketplace/music" element={<MusicMarketplace />} />
                        <Route path="/marketplace/collectibles" element={<CollectiblesMarketplace />} />
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
                        <Route path="/security/blockchain" element={<BlockchainDetails />} />
                        <Route path="/security/physical-storage" element={<PhysicalStorageSecurity />} />
                        <Route path="/security/insurance" element={<InsuranceCoverage />} />
                        <Route path="/collectible/:id/provenance/:eventId" element={<ProvenanceDetail />} />
                        <Route path="/collectible/:id/activity/:activityId" element={<ActivityDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<Blog />} />

                        {/* 404 */}
                        <Route path="*" element={
                          <div className="flex flex-col items-center justify-center min-h-screen text-center">
                            <h1 className="text-9xl font-black text-gray-800">404</h1>
                            <p className="text-4xl mt-8 text-gray-500">Page Not Found</p>
                            <a href="/" className="mt-8 text-purple-400 text-xl hover:underline">← Return Home</a>
                          </div>
                        } />
                      </Routes>
                    </div>
                    <Footer />
                  </main>
                }
              />

            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;