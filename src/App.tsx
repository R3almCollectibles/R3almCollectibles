// src/App.tsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { createDemoUsersIfNotExist } from './lib/createDemoUsers';

// Pages
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';  // ← CORRECT PATH

// Dashboards (role-specific)
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

// Dynamic Dashboard based on user role
const RoleBasedDashboard = () => {
  const { user } = useAuth();
  const role = (user?.user_metadata?.role as string)?.toLowerCase() || 'collector';

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

  useEffect(() => {
    createDemoUsersIfNotExist();
  }, []);

  return (
    <>
      <Router>
        {user && <Navbar />}

        <Routes>
          {/* Public */}
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

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
          style: { background: '#1f1f1f', color: '#fff', borderRadius: '12px' },
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