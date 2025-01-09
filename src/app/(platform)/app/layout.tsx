import { db } from "@/lib/db";
import Sidebar from "./_components/sidebar/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          user_id: userId,
        },
      },
    },
  });
  return (
    <div className="flex min-h-svh w-full">
      <div className="h-full hidden lg:block">
        <Sidebar servers={servers} />
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
