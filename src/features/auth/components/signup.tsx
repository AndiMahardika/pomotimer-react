import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import googleIcon from "@/assets/google.svg";
import AuthLayout from "./auth.layout";
import { Link } from "react-router-dom";
import { Hourglass } from "lucide-react";

interface FormValues {
  email: string;
  password: string;
}

export default function Signup() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <AuthLayout>
      <section className="p-8 flex flex-col justify-center items-center relative">
        <div className="flex items-center gap-x-1 font-semibold  text-slate-700 absolute left-7 top-6 text-sm md:hidden">
          <Hourglass size={18} />
          <h3>Pomotimer</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-4">
            <div>
              <h3 className="text-2xl font-bold">Signup</h3>
              <p className="text-slate-400 text-sm">
                Enter your email and password to signup your account
              </p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-green-500 hover:bg-green-600 w-full" type="submit">
              Login
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or Continue with
                </span>
              </div>
            </div>

            <Button variant="outline" type="submit" className="flex items-center justify-center w-full">
              <img src={googleIcon} alt="Google" className="w-6" />
              Google
            </Button>
          </form>
        </Form>
        <Button variant={"link"} type="submit" className="absolute top-4 right-4">
          <Link to={"/login"}>
            Login
          </Link>
        </Button>
      </section>
    </AuthLayout>
  );
}