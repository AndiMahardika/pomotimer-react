import { supabase } from "@/utils/supabase";

export const signupWithEmailPassword = async (email: string, password: string) => {
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:5173/',
    },
  });
}