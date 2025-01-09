import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (userId) {
    redirect("/app");
  }
  return (
    <div className="w-full h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      {children}
    </div>
  );
};

export default AuthLayout;
