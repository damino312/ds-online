"use client";

import { useModal } from "@/hooks/use-modal-store";
import useOnKeyDown from "@/hooks/use-on-key-down";
import { ServerWithMembersWithUsers } from "@/types/types";
import { Search } from "lucide-react";

interface ServerSearchProps {
  server: ServerWithMembersWithUsers;
}

const ServerSearch = ({server}: ServerSearchProps) => {
  const  { onOpen } = useModal();

  useOnKeyDown('K', () => onOpen("serverSearch", { server }), { cmdKey: true });

  return (
    <button onClick={() => onOpen("serverSearch", { server })} className="w-full flex justify-between items-center px-4 py-2 bg-inherit rounded-sm text-[13px]  dark:hover:bg-zinc-700/50 hover:bg-zinc-700/10  transition duration-300">
      <div className="flex gap-2 text-gray-400 items-center ">
        <Search size={20} />
        <p>Search</p>
      </div>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
    </button>
  );
};

export default ServerSearch;
