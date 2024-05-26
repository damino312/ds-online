import { FormInput } from "@/_components/form/form-input";
import { FormSubmit } from "@/_components/form/form-submit";
import { Button } from "@/_components/ui/button";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form className="w-full lg:w-2/5 mx-4 sm:mx-20 lg:mx-0 px-6 bg-[#404348] rounded-2xl h-4/6 flex flex-col pb-6">
        <h2 className="text-2xl font-bold text-white text-center mt-16 ">
          Create an account
        </h2>
        <div className="flex flex-col gap-6 mt-16">
          <FormInput
            label="Email"
            labelClassName="text-white"
            type="email"
            id="Email"
            className="py-4"
          />
          <FormInput
            label="Login"
            labelClassName="text-white"
            id="Login"
            className="py-4"
          />
          <FormInput
            label="Your name"
            labelClassName="text-white"
            id="name"
            className="py-4"
          />
          <FormInput
            label="Password"
            labelClassName="text-white"
            id="password"
            type="password"
            className="py-4"
          />
        </div>
        <div className="mt-1">
          <Button variant="link" asChild className="p-0 text-blue-400">
            <Link href="/login" className="text-white">
              I already have an account
            </Link>
          </Button>
        </div>
        <div className="w-full h-full flex items-end">
          <FormSubmit variant="babyBlue" className="w-full h-12">
            Sign Up
          </FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
