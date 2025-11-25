import React, { memo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = memo(() => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8" role="main" aria-label="Profile Loading">
        <div className="text-center">Loading profile...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-md" role="main" aria-label="User Profile">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md" role="region">
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-4"><strong>Role:</strong> {user.user_metadata?.role || 'Collector'}</p>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          aria-label="Logout"
        >
          Logout
        </button>
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Edit Profile
        </button>
      </div>
    </main>
  );
});

Profile.displayName = 'Profile';

export default Profile;