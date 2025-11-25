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
import { Dashboard } from './pages/Dashboard';   // ← now exists
import { Profile } from './pages/Profile';       // ← now exists

// Components
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';

// ------------------------------------------------------------------
// Protected Route
// ------------------------------------------------------------------
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// ------------------------------------------------------------------
// App with Auth
// ------------------------------------------------------------------
function AppWithAuth() {
  const { user } = useAuth();

  // Create demo users on first load (dev only – remove the guard for prod if you want)
  useEffect(() => {
    createDemoUsersIfNotExist();
  }, []);

 