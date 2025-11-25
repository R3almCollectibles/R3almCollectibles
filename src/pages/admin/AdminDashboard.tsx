// src/pages/admin/AdminDashboard.tsx – WITH SIDEBAR
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  Package,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Search,
  MoreVertical,
  Eye,
  UserX,
  Clock,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

// ... (keep your interface, data, handlers exactly the same)

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // ... rest of your state and logic

  // ... (your existing logic - unchanged)

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="pt-16 min-h-screen bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Your entire dashboard content stays here */}
            {/* Header, Stats, Filters, Table — all unchanged */}
            {/* Just copy-paste your current JSX inside here */}
            
            {/* Example header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white flex items-center gap-4">
                    <Shield className="h-12 w-12 text-red-500" />
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Welcome back, <span className="font-semibold text-white">{user?.name || 'Admin'}</span>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                  ADMIN MODE
                </div>
              </div>
            </motion.div>

            {/* Paste your Stats, Filters, and Table here exactly as before */}
            {/* ... your existing content ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;