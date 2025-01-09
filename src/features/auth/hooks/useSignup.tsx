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

      const { data: user, error: errorSingUp } = await signupWithEmailPassword(data.email, data.password);

      if (errorSingUp) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px]',
          title: "Signup failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      } 
      if (user?.user && user.user.identities && user.user.identities.length === 0) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px]',
          title: "Signup failed",
          description: "Email Alredy exists.",
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
