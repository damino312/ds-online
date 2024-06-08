"use client";
import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import { Button } from "@/_components/ui/button";
import { useToast } from "@/_components/ui/use-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const { toast } = useToast();

  const onSignIn = async (formData: FormData) => {
    const login = formData.get("login");
    const password = formData.get("password");
    const response = await signIn("credentials", {
      login: String(login),
      password: String(password),
      callbackUrl: "/app",
    });
    if (response?.ok === true) {
      toast({
        description: "You have successfully signed in",
      });
    } else if (response?.ok === false) {
      toast({
        description: "Wrong login or password",
      });
    } else {
      toast({
        description: "Something went wrong",
      });
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        action={onSignIn}
        className="w-full lg:w-2/5 mx-4 sm:mx-20 lg:mx-0 px-6 bg-[#404348] rounded-2xl h-3/5 flex flex-col pb-6"
      >
        <h2 className="text-2xl font-bold text-white text-center mt-16">
          Welcome back!
        </h2>
        <div className="flex flex-col gap-6 mt-16">
          <FormInput
            label="Login"
            labelClassName="text-white"
            id="login"
            className="py-4"
            required
          />
          <FormInput
            type="password"
            label="Password"
            labelClassName="text-white"
            id="password"
            className="py-4"
            required
          />
        </div>
        <div className="mt-1">
          <Button variant="link" asChild className="p-0 text-blue-400">
            <Link href="/sign-up" className="text-white">
              Haven&apos;t registered?
            </Link>
          </Button>
        </div>
        <div className="w-full h-full flex items-end">
          <FormSubmit className="w-full h-12 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white">
            Log In
          </FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
