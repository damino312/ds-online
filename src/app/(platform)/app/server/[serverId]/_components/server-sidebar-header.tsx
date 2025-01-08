"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithUsers } from "@/types/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  TrashIcon,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerSidebarHeaderProps {
  server: ServerWithMembersWithUsers;
  role?: MemberRole;
}

const ServerSidebarHeader = ({
  server,
  role,
}: ServerSidebarHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="w-full h-12 text-md font-semibold flex items-center justify-between px-3 border-neutral-200 dark:border-neutral-800  dark:hover:bg-zinc-700/50 hover:bg-zinc-700/10 transition duration-300">
          {server.server_name}
          <ChevronDown className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        {isModerator && (
          <DropdownMenuItem
            className="text-indigo-60  dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer flex"
            onClick={() => onOpen("invite", { server: server })}
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen("editServer", { server: server })} className=" px-3 py-2 text-sm cursor-pointer">
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("members", { server: server })}
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen('createChannel', {server: server})}>
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-red-600" onClick={() => onOpen('deleteServer', {server: server})}>
            Delete Server
            <TrashIcon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-red-600" onClick={() => onOpen('leaveServer', {server: server})}>
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerSidebarHeader;
