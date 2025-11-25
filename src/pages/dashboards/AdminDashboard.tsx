import React, { memo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = memo(() => {
  const { user } = useAuth();
  return (
    <main className="container mx-auto px-4 py-8" role="region" aria-label="Admin Dashboard">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>
      <p>Welcome, {user?.email || 'Admin'}. Manage users & platform.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md" role="article">
          Users: 10
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md" role="article">
          NFTs: 50
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md" role="article">
          Transactions: 100
        </div>
      </div>
    </main>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;