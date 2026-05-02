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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: String(error) };
  }
};

// Login Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { data: result.user, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: String(error) };
  }
};