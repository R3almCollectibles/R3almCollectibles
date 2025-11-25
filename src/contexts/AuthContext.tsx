import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react'; // Keep for demo if needed

// Env vars (load from .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iwqkumtemswzmnucexfn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  wallet_address?: string;
  join_date: string;
  is_demo: boolean;
  is_admin?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loginWithDemo: (demoType: 'collector' | 'creator' | 'investor' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts (unchanged – fallback for quick testing)
const demoAccounts = {
  // ... (your existing demoAccounts object)
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id).then(profile => {
          setUser(profile);
          setIsLoading(false);
        });
      } else {
        // Fallback to localStorage demo (for offline/dev)
        const storedUser = localStorage.getItem('r3alm_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const profile = await fetchUserProfile(session!.user.id);
        setUser(profile);
        localStorage.setItem('r3alm_user', JSON.stringify(profile)); // Hybrid sync
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('r3alm_user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    return data || null;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Login error:', error);
      return false;
    }
    if (data.user) {
      const profile = await fetchUserProfile(data.user.id);
      setUser(profile || { ...data.user, name: email.split('@')[0], join_date: new Date().toISOString().split('T')[0], is_demo: false });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError || !authData.user) {
      console.error('Signup error:', authError);
      return false;
    }

    // Insert profile (assumes trigger or manual insert)
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email,
      name,
      join_date: new Date().toISOString(),
      is_demo: false,
    });

    if (profileError) {
      console.error('Profile insert error:', profileError);
      return false;
    }

    const profile = await fetchUserProfile(authData.user.id);
    setUser(profile);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const loginWithDemo = (demoType: 'collector' | 'creator' | 'investor' | 'admin') => {
    const demoUser = demoAccounts[demoType];
    setUser(demoUser);
    localStorage.setItem('r3alm_user', JSON.stringify(demoUser));
    // Optional: Insert as demo profile in Supabase for persistence
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
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