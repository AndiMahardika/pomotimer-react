import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../validation/auth.validation";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { loginWithEmailPassword } from "../service/api.login";

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

      const { data: user, error } = await loginWithEmailPassword(data.email, data.password);

      if (error) {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px]',
          title: "Login failed",
          description: `${error.message}`,
          variant: "destructive",
        })
      } else {
        toast({
          className:
           'fixed top-4 left-0 md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 flex md:max-w-[420px] bg-green-500 text-white',
          title: "Welcome Back",
          description: "You have successfully logged in.",
        })

        navigate("/");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading }
}