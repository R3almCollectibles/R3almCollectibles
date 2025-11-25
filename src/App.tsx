// src/App.tsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { createDemoUsersIfNeeded } from './lib/createDemoUsers'; // ← Correct function

// Pages
import { Login } from './pages/Login';
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

// Role-Based Dashboard Switcher
const RoleBasedDashboard = () => {
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
};

function AppWithAuth() {
  const { user } = useAuth();

  // Create demo users (auto-confirmed, no email verification needed)
  useEffect(() => {
    createDemoUsersIfNeeded(); // ← This now works perfectly
  }, []);

  return (
    <>
      <Router>
        {user && <Navbar />}

        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />

          {/* Protected */}
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

          {/* Catch-all */}
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
          success: {
            style: { background: '#10b981' },
          },
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