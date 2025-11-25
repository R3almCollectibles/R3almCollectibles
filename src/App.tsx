import React, { useEffect, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { createDemoUsersIfNeeded } from './lib/createDemoUsers'; // Adjust path if needed

// Pages
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

// Dashboards (role-based)
import { CollectorDashboard } from './pages/dashboards/CollectorDashboard';
import { CreatorDashboard } from './pages/dashboards/CreatorDashboard';
import { InvestorDashboard } from './pages/dashboards/InvestorDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

// R3alm-Specific Pages (add imports as you build)
import { HomePage } from './pages/HomePage'; // e.g., from previous snippets
import { Marketplace } from './pages/Marketplace';
// import { MintNFT } from './pages/MintNFT';
// import { Portfolio } from './pages/Portfolio';
// import { Analytics } from './pages/Analytics';
// import { Settings } from './pages/Settings';

// Components
import { Navbar } from './components/Navbar'; // Or rename to Header if using my previous
import { Toaster } from 'react-hot-toast';

// Loading Spinner (simple, memoized)
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center min-h-screen" aria-busy="true" aria-label="Loading application">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
  </div>
));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
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

  // CRITICAL FIX: Only run ONCE per session in preview environments
  useEffect(() => {
    const hasRun = sessionStorage.getItem('demo_users_initialized');
    if (!hasRun && (import.meta.env.DEV || location.hostname.includes('stackblitz') || location.hostname.includes('bolt.new'))) {
      createDemoUsersIfNeeded().then(() => {
        sessionStorage.setItem('demo_users_initialized', 'true');
      });
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Conditional Navbar (Header) for logged-in users */}
      {user && <Navbar />}
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
      {/* Routes (no BrowserRouter needed—handled in main.tsx) */}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />
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
        {/* R3alm-Specific Routes (extend as needed) */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        {/* <Route path="/mint" element={<MintNFT />} /> */}
        {/* <Route path="/portfolio" element={<Portfolio />} /> */}
        {/* <Route path="/analytics" element={<Analytics />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;