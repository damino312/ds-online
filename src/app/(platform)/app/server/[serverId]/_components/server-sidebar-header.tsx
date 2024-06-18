import { ServerWithMembersWithUsers } from "@/types/types";
import { MemberRole } from "@prisma/client";

interface ServerSidebarHeaderProps {
  server: ServerWithMembersWithUsers;
  role: MemberRole;
}

const ServerSidebarHeader = ({ server, role }: ServerSidebarHeaderProps) => {
  return <div>header</div>;
};

export default ServerSidebarHeader;
