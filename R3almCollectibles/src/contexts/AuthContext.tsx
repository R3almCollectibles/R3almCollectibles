import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  walletAddress?: string;
  joinDate: string;
  isDemo: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loginWithDemo: (demoType: 'collector' | 'creator' | 'investor') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts
const demoAccounts = {
  collector: {
    id: 'demo-collector',
    email: 'collector@demo.com',
    name: 'Alex Collector',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x742d35Cc6634C0532925a3b8D46DE3C4',
    joinDate: '2023-08-15',
    isDemo: true
  },
  creator: {
    id: 'demo-creator',
    email: 'creator@demo.com',
    name: 'Maya Artist',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
    joinDate: '2023-06-22',
    isDemo: true
  },
  investor: {
    id: 'demo-investor',
    email: 'investor@demo.com',
    name: 'Jordan Investor',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    walletAddress: '0x234b5c6d7e8f9g0h1i2j3k4l5m6n7o8p',
    joinDate: '2023-09-10',
    isDemo: true
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('r3alm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any email/password combination
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      joinDate: new Date().toISOString().split('T')[0],
      isDemo: false
    };
    
    setUser(newUser);
    localStorage.setItem('r3alm_user', JSON.stringify(newUser));
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      joinDate: new Date().toISOString().split('T')[0],
      isDemo: false
    };
    
    setUser(newUser);
    localStorage.setItem('r3alm_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('r3alm_user');
  };

  const loginWithDemo = (demoType: 'collector' | 'creator' | 'investor') => {
    const demoUser = demoAccounts[demoType];
    setUser(demoUser);
    localStorage.setItem('r3alm_user', JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      loginWithDemo
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};