import { AuthUser } from "@/types/next-auth";
import { ChannelType } from "@prisma/client";
import ServerSidebarHeader from "./server-sidebar-header";
import ServerSearch from "./server-search";
import { Separator } from "@/_components/ui/separator";
import ServerSidebarChannelSection from "./server-sidebar-channel-section";
import { ServerWithMembersWithUsers } from "@/types/types";

interface ServerSidebarProps {
  server: ServerWithMembersWithUsers;
  user: AuthUser;
}

const ServerSidebar = async ({ server, user }: ServerSidebarProps) => {
  
  const textChannels = server.channels.filter(
    (channel) => channel.channel_type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.channel_type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.channel_type === ChannelType.VIDEO
  );
  const usersRole = server.members.find(
    (member) => member.user_id === user.id
  )?.member_role;

  return (
    <div className="w-full h-full dark:bg-[#292b2e] bg-[#eaeeef]">
      <ServerSidebarHeader server={server} role={usersRole} />
      <ServerSearch server={server} />
      <div className="mx-3 mt-2">
        <Separator className=" bg-zinc-400 dark:bg-zinc-500  " />
      </div>
      <ServerSidebarChannelSection
        textChannels={textChannels}
        audioChannels={audioChannels}
        videoChannels={videoChannels}
        role={usersRole}
      />
    </div>
  );
};

export default ServerSidebar;
