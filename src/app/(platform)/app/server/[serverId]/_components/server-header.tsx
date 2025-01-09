"use client";

import { useMemberSidebar } from "@/hooks/use-member-sidebar";
import { User } from "lucide-react";
import ServerMenuBtn from "./server-menu-btn";
import { ServerWithMembersWithUsers } from "@/types/types";
import { AuthUser } from "@/types/next-auth";
import { Server } from "@prisma/client";


interface ServerMenuBtnProps {
  server: ServerWithMembersWithUsers;
  servers: Server[];
  user: AuthUser;
}

const ServerHeader = ({ server, user, servers }: ServerMenuBtnProps) => {
  const { onToggle } = useMemberSidebar();

  return (
    <div className="h-12 bg-white dark:bg-[#313338] z-20 border-b-[1px]">
      <div className="flex items-center h-full px-4">
        <div className="lg:!hidden flex items-center justify-center">
          <ServerMenuBtn server={server} user={user} servers={servers} />
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
