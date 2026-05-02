import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";

export const signupWithEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { data: userCredential.user, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};