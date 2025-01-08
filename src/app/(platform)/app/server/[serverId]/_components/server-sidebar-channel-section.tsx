import { Channel } from "@prisma/client";
import ServerSidebarChannelSectionItem from "./server-sidebar-channel-section-item";

interface ServerSidebarChannelSectionProps {
  textChannels: Channel[];
  audioChannels: Channel[];
  videoChannels: Channel[];
}
``
const ServerSidebarChannelSection = ({
  textChannels,
  audioChannels,
  videoChannels,
}: ServerSidebarChannelSectionProps) => {
  return (
    <div className="mx-3 mt-3 flex flex-col gap-1">
      <ServerSidebarChannelSectionItem type="TEXT" channels={textChannels} />
      <ServerSidebarChannelSectionItem type="AUDIO" channels={audioChannels} />
      <ServerSidebarChannelSectionItem type="VIDEO" channels={videoChannels} />
    </div>
  );
};

export default ServerSidebarChannelSection;
