// src/contexts/AuthContext.tsx
// FINAL VERSION — admin@r3alm.com NOW HAS FULL ADMIN STATUS
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  walletAddress?: string;
  joinDate: string;
  isDemo: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loginWithDemo: (demoType: 'collector' | 'creator' | 'investor' | 'admin') => void;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoAccounts = {
  collector: {
    id: 'demo-collector',
    email: 'collector@r3alm.com',
    name: 'Alex Collector',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x742d35Cc6634C0532925a3b8D46DE3C4',
    joinDate: '2023-08-15',
    isDemo: true,
    isAdmin: false
  },
  creator: {
    id: 'demo-creator',
    email: 'creator@r3alm.com',
    name: 'Maya Artist',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
    joinDate: '2023-06-22',
    isDemo: true,
    isAdmin: false
  },
  investor: {
    id: 'demo-investor',
    email: 'investor@r3alm.com',
    name: 'Jordan Investor',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x234b5c6d7e8f9g0h1i2j3k4l5m6n7o8p',
    joinDate: '2023-09-10',
    isDemo: true,
    isAdmin: false
  },
  admin: {
    id: 'demo-admin',
    email: 'admin@r3alm.com',
    name: 'R3alm Admin',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x567c8d9e0f1g2h3i4j5k6l7m8n9o0p1q',
    joinDate: '2023-01-01',
    isDemo: true,
    isAdmin: true
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = (() => {
      try { return localStorage.getItem('r3alm_user'); } catch { return null; }
    })();
    const fallback = (() => {
      try { return sessionStorage.getItem('r3alm_user'); } catch { return null; }
    })();

    if (stored || fallback) {
      setUser(JSON.parse(stored || fallback || '{}'));
    }
  }, []);

  const storeUser = (userData: User) => {
    try {
      localStorage.setItem('r3alm_user', JSON.stringify(userData));
    } catch {
      sessionStorage.setItem('r3alm_user', JSON.stringify(userData));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    await new Promise(r => setTimeout(r, 800));

    // SPECIAL ADMIN CHECK — THIS IS THE FIX
    if (email.toLowerCase() === 'admin@r3alm.com') {
      const adminUser: User = {
        id: 'real-admin',
        email: 'admin@r3alm.com',
        name: 'R3alm Administrator',
        walletAddress: '0xAdmin1337CafeBabeDeadBeef',
        joinDate: new Date().toISOString().split('T')[0],
        isDemo: false,
        isAdmin: true
      };
      setUser(adminUser);
      storeUser(adminUser);
      setLoading(false);
      return true;
    }

    // Normal user (demo-style)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      joinDate: new Date().toISOString().split('T')[0],
      isDemo: false,
      isAdmin: false
    };

    setUser(newUser);
    storeUser(newUser);
    setLoading(false);
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      joinDate: new Date().toISOString().split('T')[0],
      isDemo: false,
      isAdmin: email.toLowerCase() === 'admin@r3alm.com'
    };

    setUser(newUser);
    storeUser(newUser);
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('r3alm_user');
    sessionStorage.removeItem('r3alm_user');
  };

  const loginWithDemo = (demoType: 'collector' | 'creator' | 'investor' | 'admin') => {
    const demoUser = demoAccounts[demoType];
    setUser(demoUser);
    storeUser(demoUser);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      loginWithDemo,
      error,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};