import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ServerSidebar from "./_components/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const serverId = params.serverId;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const server = await db.server.findUnique({
    where: {
      server_id: serverId,
      members: {
        some: {
          user_id: user?.id,
        },
      },
    },
  });
  if (!server || !user) {
    redirect("/app");
  }
  return (
    <>
      <div className="w-56">
        <ServerSidebar serverId={serverId} user={user} />
      </div>
      {children}
    </>
  );
};

export default ServerIdLayout;
