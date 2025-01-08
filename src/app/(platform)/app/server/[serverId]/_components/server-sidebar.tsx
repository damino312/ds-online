import { db } from "@/lib/db";
import { AuthUser } from "@/types/next-auth";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerSidebarHeader from "./server-sidebar-header";
import ServerSearch from "./server-search";

interface ServerSidebarProps {
  serverId: string;
  user: AuthUser;
}

const ServerSidebar = async ({ serverId, user }: ServerSidebarProps) => {
  const server = await db.server.findUnique({
    where: {
      server_id: serverId,
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
            }
          }
        },
      },
    },
  });

  if (!server) {
    return redirect("/app");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.channel_type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.channel_type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.channel_type === ChannelType.VIDEO
  );
  const members = server.members.filter((member) => member.user_id !== user.id);

  const usersRole = server.members.find(
    (member) => member.user_id === user.id
  )?.member_role;

  return (
    <div className="w-full h-full dark:bg-[#292b2e] bg-[#eaeeef]">
      <ServerSidebarHeader server={server} role={usersRole} />
      <ServerSearch server={server} />
    </div>
  );
};

export default ServerSidebar;
