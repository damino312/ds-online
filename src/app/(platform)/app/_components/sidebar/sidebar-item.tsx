"use client";

import { cn } from "@/lib/utils";
import { Server } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface SidebarItemProps {
  server: Server;
  className: string;
}

const SidebarItem = ({ server, className }: SidebarItemProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <div
      className={cn(
        "w-full h-12 flex justify-center relative group",
        className
      )}
    >
      <div
        className={cn(
          "w-1 dark:bg-white bg-zinc-900 absolute left-0 top-1/2 -translate-y-1/2 rounded-r-md transition-all duration-300",
          params.serverId === server.server_id
            ? "h-full scale-y-100"
            : "h-1/4 scale-y-150 group-hover:scale-y-150"
        )}
      ></div>
      <button
        className={cn(
          "w-12 h-full flex justify-center items-center rounded-full overflow-hidden"
        )}
        onClick={() => router.push(`/app/server/${server?.server_id}`)}
      >
        {server?.server_picture ? (
          <Image
            src={server?.server_picture}
            alt="Server picture"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="dark:text-black text-white font-semibold dark:bg-white bg-zinc-900 w-full h-full flex items-center justify-center">
            {server?.server_name?.toUpperCase()[0] || "S"}
          </span>
        )}
      </button>
    </div>
  );
};

export default SidebarItem;
