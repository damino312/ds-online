"use client";
import { Separator } from "@/_components/ui/separator";
import UserIcon from "../user-icon";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { AuthUser } from "@/types/next-auth";
import SidebarItem from "./sidebar-item";
import { ModeToggle } from "@/_components/mode-toggle";
import { Member, Server } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";
import AddServerBtn from "./add-server-btn";

interface SidebarProps {
  servers: (Server & { members: Member[] })[];
}

const Sidebar = ({ servers }: SidebarProps) => {
  const session = useSession();
  const user = session.data?.user as AuthUser;
  const { onOpen } = useModal();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="h-screen w-20 dark:bg-[#1c1e20] bg-[#dee1e2] flex flex-col items-center pt-4 pb-6">
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-hidden scrollbar-hide "
      >
        <div className="w-full flex justify-center">
          <AddServerBtn setOpenModal={() => onOpen("createServer")} />
        </div>

        <div className="flex justify-center">
          <Separator className="w-12 my-2 h-0.5 dark:bg-white bg-zinc-900 rounded-sm" />
        </div>

        {servers.map((server) => (
          <SidebarItem
            className="mb-4"
            key={server.server_id}
            server={server}
          />
        ))}
      </div>
      <ModeToggle />
      <div className="mt-4">
        <UserIcon user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
