import React, { memo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Marketplace: React.FC = memo(() => {
  const { user } = useAuth();

  return (
    <main className="container mx-auto px-4 py-8" role="main" aria-label="Marketplace">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Marketplace</h1>
      {user ? (
        <p className="mb-4 text-gray-600 dark:text-gray-300">Browse collectibles as {user.email}.</p>
      ) : (
        <p className="mb-4 text-gray-600 dark:text-gray-300">Log in to buy/sell NFTs.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4" role="listitem">
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" aria-label={`Placeholder image for NFT ${i}`} /> {/* Placeholder image */}
            <h3 className="font-semibold text-gray-900 dark:text-white">NFT #{i}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Unique collectible</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
});

Marketplace.displayName = 'Marketplace';

export default Marketplace;