import React, { memo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CreatorDashboard: React.FC = memo(() => {
  const { user } = useAuth();
  return (
    <main className="container mx-auto px-4 py-8" role="region" aria-label="Creator Dashboard">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Creator Dashboard</h1>
      <p>Welcome, {user?.email || 'Creator'}. Create new NFTs.</p>
      <button className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-600 transition-colors">
        Mint New NFT
      </button>
    </main>
  );
});

CreatorDashboard.displayName = 'CreatorDashboard';

export default CreatorDashboard;