"use client";

import { Member, MemberRole, User } from "@prisma/client";
import UserProfile from "../user-icon";
import { ActionTooltip } from "../action-tooltip";
import { FileIcon, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: User;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldCheck className="h-4 w-4 ml-2 text-red-500" />,
};

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.member_role === MemberRole.ADMIN;
  const isModerator =
    currentMember.member_role === MemberRole.MODERATOR || isAdmin;
  const isOwner = member.member_id === currentMember.member_id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="flex group gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-lg transition">
          <UserProfile
            userPicture={member.profile.user_picture}
            userName={member.profile.user_name}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {member.profile.user_name}
              </p>
              <ActionTooltip label={member.member_role}>
                {roleIconMap[member.member_role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dart:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary justify-center h-48 w-48"
            >
              <Image src={fileUrl} alt={content} fill className="object-cover"/>
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                PDF File
              </a>
            </div>
          )}
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
