"use client";

import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import { Button } from "@/_components/ui/button";
import { useToast } from "@/_components/ui/use-toast";
import { signUp } from "@/actions/auth/sign-up";
import { useAction } from "@/hooks/use-action";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { execute } = useAction(signUp, {
    onSuccess: (data) => {
      toast({
        description: "You have successfully signed up!",
      });
      router.push("/sign-in");
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: error,
      });
    },
  });

  function onSubmit(FormData: FormData) {
    const login = FormData.get("login");
    const password = FormData.get("password");
    const name = FormData.get("name");
    const email = FormData.get("email");
    execute({
      login: String(login),
      password: String(password),
      name: String(name),
      email: String(email),
    });
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        action={onSubmit}
        className="w-full lg:w-2/5 mx-4 sm:mx-20 lg:mx-0 px-6 bg-[#404348] rounded-2xl h-4/6 flex flex-col pb-6"
      >
        <h2 className="text-2xl font-bold text-white text-center mt-16 ">
          Create an account
        </h2>
        <div className="flex flex-col gap-6 mt-16">
          <FormInput
            label="Email"
            labelClassName="text-white"
            type="email"
            id="email"
            className="py-4"
            required
          />
          <FormInput
            label="Login"
            labelClassName="text-white"
            id="login"
            className="py-4"
            required
          />
          <FormInput
            label="Your name"
            labelClassName="text-white"
            id="name"
            className="py-4"
            required
          />
          <FormInput
            label="Password"
            labelClassName="text-white"
            id="password"
            type="password"
            className="py-4"
            required
          />
        </div>
        <div className="mt-1">
          <Button variant="link" asChild className="p-0 text-blue-400">
            <Link href="/sign-in" className="text-white">
              I already have an account
            </Link>
          </Button>
        </div>
        <div className="w-full h-full flex items-end">
          <FormSubmit className="w-full h-12 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white">
            Sign Up
          </FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
