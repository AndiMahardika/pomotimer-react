import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";

// Login Email/Password
export const loginWithEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { data: userCredential.user, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

// Login Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { data: result.user, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};