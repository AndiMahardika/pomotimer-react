import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../validation/auth.validation";
import { z } from "zod";
import { supabase } from "@/utils/supabase";

type FormValues = z.infer<typeof authSchema>;

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const { data: user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: 'http://localhost:5173/',
        },
      });

      if (error) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px]',
          title: "Signup failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
          title: "Signup successful",
          description: "Check your email for the confirmation link.",
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading }
}
