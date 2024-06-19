import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { ServerWithMembersWithUsers } from "@/types/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
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

const ServerSidebarHeader = ({ server, role }: ServerSidebarHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="w-full h-12 text-md font-semibold flex items-center justify-between px-3 border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700\10 dark:hover:bg-zinc-700/50 transition">
          {server.server_name}
          <ChevronDown className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        {isModerator && (
          <DropdownMenuItem className="text-indigo-60  dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer flex">
            Invite people
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
            Server settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Manage members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Create channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-red-600">
            Delete server
            <TrashIcon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerSidebarHeader;
