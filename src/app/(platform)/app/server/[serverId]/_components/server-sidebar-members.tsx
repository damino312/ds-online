"use client";

import { Member, User } from "@prisma/client";
import Image from "next/image";
import UserIcon from "../../../_components/user-icon";
import { useParams, useRouter } from "next/navigation";

interface ServerSidebarMembersProps {
  members: (Member & {
    profile: Omit<User, "user_password" | "created_at" | "updated_at">;
  })[];
}

const ServerSidebarMembers = ({ members }: ServerSidebarMembersProps) => {

  const router = useRouter();
  const params = useParams();

  const handleUserClick = ({ id }: { id: string }) => {
    router.push(`/servers/${params.serverId}/conversations/${id}`);
  };

  return (
    <div className="h-full dark:bg-[#292b2e] bg-[#eaeeef]">
      <div className="px-2 py-5">
        {members.map((member) => {
          return (
            <button
              className="px-3 py-2 w-full flex items-center gap-2 dark:text-gray-400  dark:hover:bg-zinc-700/50 hover:bg-zinc-700/10  transition duration-300 rounded-sm"
              key={member.member_id}
              onClick={() => handleUserClick({ id: member.member_id })}
            >
              {member.profile.user_picture ? (
                <Image
                  className="w-9 h-9"
                  src={member.profile.user_picture}
                  alt="Img"
                />
              ) : (
                <UserIcon
                  className="w-9 h-9 flex-shrink-0"
                  userName={member.profile.user_name}
                />
              )}
              <span
                className="overflow-x-hidden text-nowrap text-ellipsis"
                title={member.profile.user_name}
              >
                {member.profile.user_name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServerSidebarMembers;
