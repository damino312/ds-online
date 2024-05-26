import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import { Button } from "@/_components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form className="w-full lg:w-2/5 mx-4 sm:mx-20 lg:mx-0 px-6 bg-[#404348] rounded-2xl h-3/5 flex flex-col pb-6">
        <h2 className="text-2xl font-bold text-white text-center mt-16">
          Welcome back!
        </h2>
        <div className="flex flex-col gap-6 mt-16">
          <FormInput
            label="Login"
            labelClassName="text-white"
            id="login"
            className="py-4"
          />
          <FormInput
            type="password"
            label="Password"
            labelClassName="text-white"
            id="password"
            className="py-4"
          />
        </div>
        <div className="mt-1">
          <Button variant="link" asChild className="p-0 text-blue-400">
            <Link href="/registration" className="text-white">
              Haven&apos;t registered?
            </Link>
          </Button>
        </div>
        <div className="w-full h-full flex items-end">
          <FormSubmit variant="babyBlue" className="w-full h-12">
            Log In
          </FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
