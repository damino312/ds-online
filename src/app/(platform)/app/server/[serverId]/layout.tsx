import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ServerSidebar from "./_components/server-sidebar";
import ServerSidebarMembers from "./_components/server-sidebar-members";

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
    include: {
      channels: {
        orderBy: {
          created_at: "desc",
        },
      },
      members: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          profile: {
            select: {
              user_id: true,
              user_email: true,
              user_login: true,
              user_name: true,
              user_picture: true,
            },
          },
        },
      },
    },
  });
  if (!server || !user) {
    redirect("/app");
  }

  return (
    <div className="flex w-full">
      <div className="w-56">
        <ServerSidebar server={server} user={user} />
      </div>
      <div className="flex-1">{children}</div>
      <div className="w-56">
        <ServerSidebarMembers members={server.members} />
      </div>
    </div>
  );
};

export default ServerIdLayout;
