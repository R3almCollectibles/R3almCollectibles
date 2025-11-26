// src/routes/ProtectedAdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedAdminRoute: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user?.isAdmin) {
    // Not admin → kick back to homepage
    return <Navigate to="/" replace />;
  }

  // TRUE ADMIN → RENDER THE DASHBOARD
  return <Outlet />;
};