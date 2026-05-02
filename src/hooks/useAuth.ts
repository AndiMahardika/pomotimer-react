import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";
import useUserStore from '@/store/useUserStore';

export default function useAuth() {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserState(firebaseUser);
        setUser(firebaseUser);
      } else {
        setUserState(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  const logout = async () => {
    await signOut(auth);
    setUserState(null);
    setUser(null);
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return { user, loading, logout, handleLoginWithGoogle };
}