"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { ChannelType } from "@prisma/client";
import { Frame, Mic, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ServerSearchModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const session = useSession()

  const isModalOpen = isOpen && type === "serverSearch";

  if (!isModalOpen) return null;

  const server = data?.server;
  if (!server) return null;

  const { channels, members } = server;

  const textChannels = channels.filter(
    (channel) => channel.channel_type === ChannelType.TEXT
  );
  const audioChannels = channels.filter(
    (channel) => channel.channel_type === ChannelType.AUDIO
  );
  const videoChannels = channels.filter(
    (channel) => channel.channel_type === ChannelType.VIDEO
  );

  const handleClick = ({id, type}: {id: string, type: 'channel' | 'member'}) => {
    onClose();
    if (type === 'channel') {
      router.push(`/servers/${server.server_id}/channels/${id}`)
    }
    if (type === 'member') {
      router.push(`/servers/${server.server_id}/conversations/${id}`)
    }
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a name of a member or a channel" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {textChannels?.length > 0 && (
            <CommandGroup heading="Text Channels">
              {textChannels.map((channel) => (
                <CommandItem key={channel.channel_id} className="cursor-pointer" onSelect={() => handleClick({id: channel.channel_id, type: 'channel'})}>
                  <Frame />
                  <span>{channel.channel_name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {audioChannels?.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Voice Channels">
                {audioChannels.map((channel) => (
                  <CommandItem key={channel.channel_id} className="cursor-pointer" onSelect={() => handleClick({id: channel.channel_id, type: 'channel'})}>
                    <Mic />
                    <span>{channel.channel_name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {videoChannels?.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Video Channels">
                {videoChannels.map((channel) => (
                  <CommandItem key={channel.channel_id} className="cursor-pointer" onSelect={() => handleClick({id: channel.channel_id, type: 'channel'})}>
                    <Video />
                    <span>{channel.channel_name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {members?.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Members">
                {members.map((member) => (
                  <CommandItem key={member.member_id} className="cursor-pointer" onSelect={() => handleClick({id: member.member_id, type: 'member'})}>
                    <span>{member.profile.user_name}</span>
                    {session.data?.user?.id === member.user_id && (
                      <span className="text-gray-500"> (You)</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default ServerSearchModal;
