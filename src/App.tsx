import React, { useEffect, memo, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { createDemoUsersIfNeeded } from './lib/createDemoUsers'; // Consolidated import

// Pages (lazy-loaded for perf where heavy; default imports otherwise)
import Login from './pages/Login';
import Signup from './pages/Signup'; // Note: Export as Signup (not default in provided, but assumed)
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';

// Dashboards (default imports)
import CollectorDashboard from './pages/dashboards/CollectorDashboard';
import CreatorDashboard from './pages/dashboards/CreatorDashboard';
import InvestorDashboard from './pages/dashboards/InvestorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

import Marketplace from './pages/Marketplace';

// Lazy-load heavy pages (charts, modals, etc.)
const Analytics = lazy(() => import('./pages/Analytics'));
const APIDocumentation = lazy(() => import('./pages/APIDocumentation'));
const Demo = lazy(() => import('./pages/Demo'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const MintNFT = lazy(() => import('./pages/Mint')); // Alias for Mint.tsx export
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Settings = lazy(() => import('./pages/Settings'));
const StorageSecurity = lazy(() => import('./pages/StorageSecurity'));
const CollectibleDetail = lazy(() => import('./pages/CollectibleDetail'));
const ProvenanceDetail = lazy(() => import('./pages/ProvenanceDetail'));
const ActivityDetail = lazy(() => import('./pages/ActivityDetail'));

// Components
import Header from './components/Header'; // Unified nav
import { Toaster } from 'react-hot-toast';

// Loading Spinner (simple, memoized; reused across app)
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center min-h-screen" aria-busy="true" aria-label="Loading application">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007BFF]" />
  </div>
));

// Lazy Loading Fallback (for Suspense)
const LazyFallback = memo(() => <LoadingSpinner />);

// Protected Route Component (auth guard)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Role-Based Protected Route (extends ProtectedRoute)
interface RoleProtectedRouteProps extends React.PropsWithChildren<{ allowedRoles: string[] }> {
  children: React.ReactNode;
}
const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role?.toLowerCase() || 'collector';
  return allowedRoles.includes(userRole) ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

// Role-Based Dashboard (memoized for perf)
const RoleBasedDashboard = memo(() => {
  const { user } = useAuth();
  const role = user?.user_metadata?.role?.toLowerCase() || 'collector';
  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'investor':
      return <InvestorDashboard />;
    case 'creator':
      return <CreatorDashboard />;
    case 'collector':
    default:
      return <CollectorDashboard />;
  }
});

RoleBasedDashboard.displayName = 'RoleBasedDashboard';

function App() {
  const { user, loading } = useAuth();

  // CRITICAL FIX: Only run ONCE per session in preview environments; optional admin flag
  useEffect(() => {
    const hasRun = sessionStorage.getItem('demo_users_initialized');
    if (!hasRun && (import.meta.env.DEV || location.hostname.includes('stackblitz') || location.hostname.includes('bolt.new'))) {
      createDemoUsersIfNeeded(import.meta.env.DEV).then(() => {
        sessionStorage.setItem('demo_users_initialized', 'true');
      });
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Conditional Header for logged-in users */}
      {user && <Header />}
      {/* Global Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            background: '#007BFF',
            color: 'white',
          },
          duration: 4000,
        }}
      />
      {/* Suspense Boundary for Lazy Loads */}
      <Suspense fallback={<LazyFallback />}>
        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" replace />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/demo" element={<Demo />} /> {/* Public demo */}
          <Route path="/help" element={<HelpCenter />} /> {/* Public help */}
          <Route path="/terms" element={<TermsOfService />} /> {/* Public */}
          <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Public */}
          <Route path="/api-docs" element={<APIDocumentation />} /> {/* Public docs */}

          {/* Protected Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleBasedDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/storage-security"
            element={
              <ProtectedRoute>
                <StorageSecurity />
              </ProtectedRoute>
            }
          />
          {/* Role-Specific: Mint for Creators */}
          <Route
            path="/mint"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={['creator', 'admin']}>
                  <MintNFT />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          {/* Nested Collectible Routes */}
          <Route
            path="/collectible/:id"
            element={
              <ProtectedRoute>
                <CollectibleDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collectible/:id/provenance/:eventId"
            element={
              <ProtectedRoute>
                <ProvenanceDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collectible/:id/activity/:activityId"
            element={
              <ProtectedRoute>
                <ActivityDetail />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;