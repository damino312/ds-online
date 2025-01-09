"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole } from "@prisma/client";
import { Edit, Frame, Mic, Plus, Trash, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const ServerSidebarChannelSectionItem = ({
  type,
  channels,
  role
}: {
  type: ChannelType;
  channels: Channel[];
  role?: MemberRole;
}) => {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModal();

  const {serverId, channelId} = params;
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const handleClick = (id: string) => {
    router.push(`/app/server/${serverId}/channel/${id}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick(id);
    }
  };

  const handleClickEdit = (e: React.MouseEvent, channel: Channel) => {
    e.stopPropagation();
    onOpen("editChannel", { channel });
  };

  const handleClickDelete = (e: React.MouseEvent, channel: Channel) => {
    e.stopPropagation();
    onOpen("deleteChannel", { channel });
  };

  return (
    <>
      <div className="flex justify-between items-center text-sm font-bold dark:text-gray-400">
        {type === ChannelType.TEXT && <span>TEXT CHANNELS</span>}
        {type === ChannelType.AUDIO && <span>AUDIO CHANNELS</span>}
        {type === ChannelType.VIDEO && <span>VIDEO CHANNELS</span>}
        <button
          className="p-1 transition duration-200 dark:hover:bg-zinc-700 hover:bg-zinc-400 rounded-sm"
          onClick={() => onOpen("createChannel", { channelType: type })}
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-col">
        {channels?.map((channel) => (
          <div
            role="button"
            tabIndex={0}
            key={channel.channel_id}
            onClick={() => handleClick(channel.channel_id)}
            onKeyDown={(e) => handleKeyDown(e, channel.channel_id)}
            className={cn("flex justify-between items-center text-sm dark:text-gray-400 px-2 dark:hover:bg-zinc-700/50 hover:bg-zinc-700/10  transition duration-300 rounded-sm py-2 cursor-pointer group", channel.channel_id === channelId && "bg-zinc-700/20 dark:bg-zinc-700")}
          >
            <div className="flex gap-2 items-center">
              {type === ChannelType.TEXT && <Frame size={18} />}
              {type === ChannelType.AUDIO && <Mic size={18} />}
              {type === ChannelType.VIDEO && <Video size={18} />}
              <span>{channel.channel_name}</span>
            </div>
            {(channel.channel_name !== "general" && isModerator) && (
              <div className="flex items-center gap-2">
                <button
                  className="p-1 opacity-0 group-hover:opacity-100 transition duration-200 dark:hover:bg-zinc-700 hover:bg-zinc-400 rounded-sm"
                  onClick={(e) => handleClickEdit(e, channel)}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="p-1 opacity-0 group-hover:opacity-100 transition duration-200 dark:hover:bg-zinc-700 hover:bg-zinc-400 rounded-sm"
                  onClick={(e) => handleClickDelete(e, channel)}
                >
                  <Trash size={18} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ServerSidebarChannelSectionItem;
