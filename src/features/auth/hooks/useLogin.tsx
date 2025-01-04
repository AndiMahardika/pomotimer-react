import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../validation/auth.validation";
import { z } from "zod";
import { supabase } from "@/utils/supabase";
import { useNavigate } from "react-router-dom";

type FormValues = z.infer<typeof authSchema>;

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  const navigate = useNavigate();

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

      const { data: user, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px]',
          title: "Signup failed",
          description: `${error.message}`,
          variant: "destructive",
        })
      } else {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
          title: "Signup successful",
          description: "Check your email for the confirmation link.",
        })

        navigate("/")
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading }
}