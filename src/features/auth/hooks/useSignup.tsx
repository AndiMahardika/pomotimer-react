import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../validation/auth.validation";
import { z } from "zod";
import { signupWithEmailPassword } from "../service/api.signup";

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

      const { data: user, error: errorSignUp } = await signupWithEmailPassword(data.email, data.password);

      if (errorSignUp) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px]',
          title: "Signup failed",
          description: `${errorSignUp}`,
          variant: "destructive",
        })
      } else if (user) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
          title: "Signup successful",
          description: "You have successfully created an account.",
        })
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading }
}
