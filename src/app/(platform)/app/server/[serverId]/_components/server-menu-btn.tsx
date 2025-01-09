"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/_components/ui/sheet";
import { Menu } from "lucide-react";
import ServerSidebar from "./server-sidebar";
import { ServerWithMembersWithUsers } from "@/types/types";
import { AuthUser } from "@/types/next-auth";
import { Server } from "@prisma/client";
import Sidebar from "../../../_components/sidebar/sidebar";

interface ServerMenuBtnProps {
  server: ServerWithMembersWithUsers;
  user: AuthUser;
  servers: Server[];
}

const ServerMenuBtn = ({ server, user, servers }: ServerMenuBtnProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="m-0 p-0 w-auto flex gap-0">
        <Sidebar servers={servers} />
        <div className="flex w-56 h-full">
          <ServerSidebar server={server} user={user} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ServerMenuBtn;
