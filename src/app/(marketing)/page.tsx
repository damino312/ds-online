"use client";

import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 ">
      <header className="p-4 bg-white/70 backdrop-blur-lg shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Discord Clone</h1>
          <nav className="flex space-x-4">
            <Button
              onClick={() => router.push("/about")}
              className="text-gray-700 hover:text-gray-900"
              variant="link"
            >
              About
            </Button>
            <Button
              onClick={() => router.push("/contact")}
              className="text-gray-700 hover:text-gray-900"
              variant="link"
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-20 grid grid-cols-1 md:grid-cols-2 gap-x-20 md:gap-x-40 gap-y-4 justify-between p-8">
        <div className="flex flex-col justify-center p-8 bg-white/70 backdrop-blur-lg rounded-lg shadow-lg ">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Discord Clone
          </h1>
          <p className="text-gray-700 mt-4">
            Join millions of communities as you chat with friends or make new
            ones.
          </p>
        </div>
        <div className="flex flex-col justify-center p-8 bg-white/70 backdrop-blur-lg rounded-lg shadow-lg min-h-full">
          <h1 className="text-5xl font-bold text-gray-800 text-end">
            Start now
          </h1>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => router.push("/sign-in")}
              className="mr-4 px-6 bg-purple-500 text-white hover:bg-purple-600"
              variant="default"
            >
              Sign in
            </Button>
            <Button
              onClick={() => router.push("/sign-up")}
              className="ml-4 px-6 bg-indigo-500 text-white hover:bg-indigo-700"
              variant="default"
            >
              Sign up
            </Button>
          </div>
        </div>
      </main>

      <footer className="p-4 bg-white/70 backdrop-blur-lg shadow-md">
        <div className="container mx-auto text-center text-gray-700">
          &copy; 2024 Discord Clone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
