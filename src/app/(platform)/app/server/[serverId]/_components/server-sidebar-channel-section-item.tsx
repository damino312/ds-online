"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Channel, ChannelType } from "@prisma/client";
import { Edit, Frame, Mic, Plus, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ServerSidebarChannelSectionItem = ({
  type,
  channels,
}: {
  type: ChannelType;
  channels: Channel[];
}) => {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModal();
  const serverId = params.serverId

  const handleClick = (id: string) => {
    router.push(`/servers/${serverId}/channels/${id}`);
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

  return (
    <>
      <div className="flex justify-between items-center text-sm font-bold dark:text-gray-400">
        {type === ChannelType.TEXT && <span>TEXT CHANNELS</span>}
        {type === ChannelType.AUDIO && <span>AUDIO CHANNELS</span>}
        {type === ChannelType.VIDEO && <span>VIDEO CHANNELS</span>}
        <button className="p-1 transition duration-200 dark:hover:bg-zinc-700 hover:bg-zinc-400 rounded-sm" onClick={() => onOpen('createChannel', { channelType: type})}>
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
            className="flex justify-between items-center text-sm dark:text-gray-400 px-2 dark:hover:bg-zinc-700/50 hover:bg-zinc-700/10  transition duration-300 rounded-sm py-2 cursor-pointer group"
          >
            <div className="flex gap-2 items-center">
              {type === ChannelType.TEXT && <Frame size={18} />}
              {type === ChannelType.AUDIO && <Mic size={18} />}
              {type === ChannelType.VIDEO && <Video size={18} />}
              <span>{channel.channel_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 opacity-0 group-hover:opacity-100 transition duration-200 dark:hover:bg-zinc-700 hover:bg-zinc-400 rounded-sm">
                <Edit size={18} />
              </button>
              <button className="p-1 opacity-0 group-hover:opacity-100 transition duration-200 dark:hover:bg-zinc-700 hover:bg-zinc-400 rounded-sm">
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServerSidebarChannelSectionItem;
