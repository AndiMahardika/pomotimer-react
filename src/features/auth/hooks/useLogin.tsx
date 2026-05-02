import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../validation/auth.validation";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { loginWithEmailPassword } from "../service/api.login";
import { toast } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

type FormValues = z.infer<typeof authSchema>;

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, handleLoginWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onGoogleLogin = async () => {
    try {
      setLoading(true);
      await handleLoginWithGoogle();
      toast.success("Welcome! Login with Google successful.");
    } catch (error) {
      toast.error(`Google login failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const { error } = await loginWithEmailPassword(data.email, data.password);

      if (error) {
        toast.error(`Login failed: ${error}`);
      } else {
        toast.success("Welcome back! Login successful.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, onGoogleLogin, loading }
}