"use client";

import { useMemberSidebar } from "@/hooks/use-member-sidebar";
import { Frame, Mic, User, Video } from "lucide-react";
import ServerMenuBtn from "./server-menu-btn";
import { ServerWithMembersWithUsers } from "@/types/types";
import { AuthUser } from "@/types/next-auth";
import { ChannelType, Server } from "@prisma/client";
import { useParams } from "next/navigation";
import { Span } from "next/dist/trace";

interface ServerMenuBtnProps {
  server: ServerWithMembersWithUsers;
  servers: Server[];
  user: AuthUser;
}

const ServerHeader = ({ server, user, servers }: ServerMenuBtnProps) => {
  const { onToggle } = useMemberSidebar();
  const { channelId } = useParams();
  const params = useParams();
  const { memberId } = params;

  const channel = server.channels.find(
    (channel) => channel.channel_id === channelId
  );

  const conversationMember = memberId
    ? server.members.find((member) => member.member_id === memberId)
    : null;

  return (
    <div className="h-12 bg-white dark:bg-[#313338] z-20 border-b-[1px]">
      <div className="flex items-center h-full px-4">
        <div className="flex items-center justify-center gap-2">
          <div className="lg:!hidden flex items-center justify-center">
            <ServerMenuBtn server={server} user={user} servers={servers} />
          </div>
          <div className="flex items-center gap-2">
            {!conversationMember ? (
              <>
                {" "}
                {channel?.channel_type === ChannelType.TEXT && (
                  <Frame size={18} />
                )}
                {channel?.channel_type === ChannelType.AUDIO && (
                  <Mic size={18} />
                )}
                {channel?.channel_type === ChannelType.VIDEO && (
                  <Video size={18} />
                )}
                <span>{channel?.channel_name}</span>
              </>
            ) : <span>{conversationMember.profile.user_name}</span>}
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <button onClick={onToggle}>
            <User />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerHeader;
