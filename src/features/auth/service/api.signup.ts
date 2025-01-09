import { supabase } from "@/utils/supabase";
const BASE_URL = import.meta.env.BASE_URL

export const signupWithEmailPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${BASE_URL}`,
      },
    });
    if (error) throw error;
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}