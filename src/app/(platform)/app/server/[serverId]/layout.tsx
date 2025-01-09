import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ServerSidebar from "./_components/server-sidebar";
import ServerSidebarMembers from "./_components/server-sidebar-members";
import ServerHeader from "./_components/server-header";

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

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          user_id: user?.id,
        },
      },
    }
  });


  if (!server || !user || servers.length === 0) {
    redirect("/app");
  }

  return (
    <div className=" w-full h-full flex">
      <div className="h-full hidden lg:block">
        <ServerSidebar server={server} user={user} />
      </div>
      <div className="flex flex-col w-full ">
        <ServerHeader server={server} user={user} servers={servers} />
        <div className="flex h-full">
          <div className="w-full">{children}</div>
          <ServerSidebarMembers members={server.members} />
        </div>
      </div>
    </div>
  );
};

export default ServerIdLayout;
