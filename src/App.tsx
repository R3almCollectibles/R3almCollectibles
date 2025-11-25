// src/App.tsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { createDemoUsersIfNeeded } from './lib/createDemoUsers';

// Pages
import {Login} from './pages/Login';
import { Profile } from './pages/Profile';

// Dashboards
import { CollectorDashboard } from './pages/dashboards/CollectorDashboard';
import { CreatorDashboard } from './pages/dashboards/CreatorDashboard';
import { InvestorDashboard } from './pages/dashboards/InvestorDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

// Components
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';

// Protected Route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Role-Based Dashboard
const RoleBasedDashboard = () => {
  const { user } = useAuth();
  const role = user?.user_metadata?.role?.toLowerCase() || 'collector';

  switch (role) {
    case 'admin': return <AdminDashboard />;
    case 'investor': return <InvestorDashboard />;
    case 'creator': return <CreatorDashboard />;
    case 'collector':
    default: return <CollectorDashboard />;
  }
};

function AppWithAuth() {
  const { user } = useAuth();

  // CRITICAL FIX: Only run ONCE per session in preview environments
  useEffect(() => {
    const hasRun = sessionStorage.getItem('demo_users_initialized');
    if (!hasRun && (import.meta.env.DEV || location.hostname.includes('stackblitz') || location.hostname.includes('bolt.new'))) {
      createDemoUsersIfNeeded().then(() => {
        sessionStorage.setItem('demo_users_initialized', 'true');
      });
    }
  }, []);

  return (
    <>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/"
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111',
            color: '#fff',
            borderRadius: '16px',
            padding: '16px 24px',
            fontSize: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          },
          success: { style: { background: '#10b981' } },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}