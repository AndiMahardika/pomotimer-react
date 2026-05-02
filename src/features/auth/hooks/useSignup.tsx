import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../validation/auth.validation";
import { z } from "zod";
import { signupWithEmailPassword } from "../service/api.signup";

type FormValues = z.infer<typeof authSchema>;

import { toast } from "react-hot-toast";

export default function useSignup() {
  const [loading, setLoading] = useState(false);

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
        toast.error(`Signup failed: ${errorSignUp}`);
      } else if (user) {
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading }
}
