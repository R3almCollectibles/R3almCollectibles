import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import type { Session } from '@supabase/supabase-js';

// TypeScript Interfaces
interface CustomUser extends User {
  name?: string; // Optional custom field (fetch from profile table if needed)
}

interface AuthContextType {
  user: CustomUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Supabase Client (singleton for performance)
const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user as CustomUser ?? null);
      setLoading(false);
    });

    // Listen for auth changes (real-time)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user as CustomUser ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign Up Handler
  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(`Sign up failed: ${error.message}`, { style: { background: '#007BFF', color: 'white' } });
    } else {
      toast.success('Check your email for confirmation!', { style: { background: '#007BFF', color: 'white' } });
    }
    setLoading(false);
  }, []);

  // Sign In Handler
  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(`Login failed: ${error.message}`, { style: { background: '#007BFF', color: 'white' } });
    } else {
      toast.success('Logged in successfully!', { style: { background: '#007BFF', color: 'white' } });
    }
    setLoading(false);
  }, []);

  // Sign Out Handler
  const signOut = useCallback(async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(`Logout failed: ${error.message}`, { style: { background: '#007BFF', color: 'white' } });
    } else {
      toast.success('Logged out successfully!', { style: { background: '#007BFF', color: 'white' } });
      setUser(null);
      setSession(null);
    }
    setLoading(false);
  }, []);

  // Refresh Session (for token expiry)
  const refreshSession = useCallback(async () => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) {
      toast.error('Session refresh failed', { style: { background: '#007BFF', color: 'white' } });
    } else {
      setSession(session);
      setUser(session?.user as CustomUser ?? null);
    }
    setLoading(false);
  }, []);

  // Memoized Context Value (prevents unnecessary re-renders)
  const value = useMemo(
    () => ({ user, session, loading, signUp, signIn, signOut, refreshSession }),
    [user, session, loading, signUp, signIn, signOut, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

AuthProvider.displayName = 'AuthProvider';

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};