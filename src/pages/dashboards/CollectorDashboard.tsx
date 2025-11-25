import React, { memo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CollectorDashboard: React.FC = memo(() => {
  const { user } = useAuth();
  return (
    <main className="container mx-auto px-4 py-8" role="region" aria-label="Collector Dashboard">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Collector Dashboard</h1>
      <p>Welcome, {user?.email || 'Collector'}. Your collection: 0 NFTs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md" role="article">
          Portfolio Value: $0
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md" role="article">
          Recent Buys: None
        </div>
      </div>
    </main>
  );
});

CollectorDashboard.displayName = 'CollectorDashboard';

export default CollectorDashboard;