import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import useUserStore from '@/store/useUserStore';

export default function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser } = useUserStore();

  const BASE_URL = import.meta.env.BASE_URL;

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Check initial auth state
    checkAuth();

    // Cleanup subscription on component unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleLoginWithGoogle = async () => {
    const {data: _user, error: _errorLogin} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${BASE_URL}`,        
      }
    })
  }

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setUser(null);
    } else {
      setUser(user);
    }
  };

  return { session, loading, logout, handleLoginWithGoogle, checkAuth };
}