import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedDemo = localStorage.getItem('r3alm_demo_user');
      if (storedDemo) {
        setUser(JSON.parse(storedDemo));
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            avatar: profile.avatar,
            walletAddress: profile.wallet_address,
            joinDate: new Date(profile.created_at).toISOString().split('T')[0],
            isDemo: false
          });
        }
      }

      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name,
              avatar: profile.avatar,
              walletAddress: profile.wallet_address,
              joinDate: new Date(profile.created_at).toISOString().split('T')[0],
              isDemo: false
            });
          }
        } else if (!localStorage.getItem('r3alm_demo_user')) {
          setUser(null);
        }
      })();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            avatar: profile.avatar,
            walletAddress: profile.wallet_address,
            joinDate: new Date(profile.created_at).toISOString().split('T')[0],
            isDemo: false
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            name
          });

        if (profileError) throw profileError;

        setUser({
          id: data.user.id,
          email,
          name,
          joinDate: new Date().toISOString().split('T')[0],
          isDemo: false
        });
      }

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('r3alm_demo_user');
    await supabase.auth.signOut();
    setUser(null);
  };

  const loginWithDemo = (demoType: 'collector' | 'creator' | 'investor') => {
    const demoUser = demoAccounts[demoType];
    setUser(demoUser);
    localStorage.setItem('r3alm_demo_user', JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
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