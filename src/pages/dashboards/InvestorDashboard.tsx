import React, { memo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const InvestorDashboard: React.FC = memo(() => {
  const { user } = useAuth();
  return (
    <main className="container mx-auto px-4 py-8" role="region" aria-label="Investor Dashboard">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Investor Dashboard</h1>
      <p>Welcome, {user?.email || 'Investor'}. Analytics overview.</p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4" role="article">
        Investment Returns: +5%
      </div>
    </main>
  );
});

InvestorDashboard.displayName = 'InvestorDashboard';

export default InvestorDashboard;