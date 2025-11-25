import React, { useState, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = memo(() => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(localStorage.getItem('lastEmail') || ''); // Pre-fill if available
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(email, password);
    localStorage.setItem('lastEmail', email); // Persist for next time
    setIsLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-md" role="main" aria-label="Login Form">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            aria-required="true"
            aria-label="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            aria-required="true"
            aria-label="Password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
          aria-label="Sign In"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        No account? <a href="#" className="text-blue-500 hover:underline" aria-label="Sign up link">Sign up</a>
      </p>
    </main>
  );
});

Login.displayName = 'Login';

export default Login;