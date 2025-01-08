import { Channel, MemberRole } from "@prisma/client";
import ServerSidebarChannelSectionItem from "./server-sidebar-channel-section-item";

interface ServerSidebarChannelSectionProps {
  textChannels: Channel[];
  audioChannels: Channel[];
  videoChannels: Channel[];
  role?: MemberRole;
}
const ServerSidebarChannelSection = ({
  textChannels,
  audioChannels,
  videoChannels,
  role
}: ServerSidebarChannelSectionProps) => {
  return (
    <div className="mx-3 mt-3 flex flex-col gap-1">
      <ServerSidebarChannelSectionItem type="TEXT" channels={textChannels} role={role} />
      <ServerSidebarChannelSectionItem type="AUDIO" channels={audioChannels} role={role} />
      <ServerSidebarChannelSectionItem type="VIDEO" channels={videoChannels} role={role} />
    </div>
  );
};

export default ServerSidebarChannelSection;
