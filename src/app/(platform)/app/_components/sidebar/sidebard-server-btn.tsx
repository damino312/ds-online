"use client";

import { cn } from "@/lib/utils";
import { Server } from "@prisma/client";
import Image from "next/image";

interface SidebarServerBtnProps {
  server: Server;
  className: string;
}

const SidebarServerBtn = ({ server, className }: SidebarServerBtnProps) => {
  return (
    <button
      className={cn(
        "w-12 h-12 flex justify-center items-center rounded-full overflow-hidden",
        className
      )}
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
        <span className="text-black font-semibold">
          {server?.server_name?.toUpperCase()[0] || "S"}
        </span>
      )}
    </button>
  );
};

export default SidebarServerBtn;
