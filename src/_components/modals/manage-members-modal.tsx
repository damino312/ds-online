"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MemberRole } from "@prisma/client";
import { Check, GavelIcon, Loader2Icon, MoreVertical, ShieldAlertIcon, ShieldQuestion } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useAction } from '@/hooks/use-action';
import { changeRole } from '@/actions/member/change-role';
import { toast } from '../ui/use-toast';
import { useSession } from "next-auth/react";

const ManageMembersModal = () => {
  const session = useSession()
  const { isOpen, onClose, type, data, onOpen  } = useModal();
  const [isLoadingId, setIsLoadingId] = useState('')

  const { execute } = useAction(changeRole, {
    onSuccess: (updatedMember) => {
      setIsLoadingId('')
      toast({
        title: "Role changed",
        // description: 'Server "' + data.server_name + '" created successfully',
      });
      const member = server?.members?.find((member) => member.member_id === updatedMember.member_id);
      if (member) {
        member.member_role = updatedMember.member_role;
      }
      onOpen( "members", { server })
    },
    onError: (error) => {
      setIsLoadingId('')
      console.error(error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const isModalOpen = isOpen && type === "members";

  if (!isModalOpen) return null;

  const { server } = data;
  const members = server?.members;

  const onRoleChange = (memberId: string, role: MemberRole) => {
    setIsLoadingId(memberId)
    execute({
      serverId: server?.server_id as string,
      memberId: memberId,
      role: role
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-slate-100 dark:bg-slate-200">
        <DialogHeader>
          <DialogTitle className="mb-4 text-black">Manage members</DialogTitle>
          {members
            ?.sort((a, b) => {
              if (a.member_role === MemberRole.ADMIN && b.member_role !== MemberRole.ADMIN) {
                return -1;
              }
              if (a.member_role !== MemberRole.ADMIN && b.member_role === MemberRole.ADMIN) {
                return 1;
              }
              if (a.member_role === MemberRole.MODERATOR && b.member_role !== MemberRole.MODERATOR) {
                return -1;
              }
              if (a.member_role !== MemberRole.MODERATOR && b.member_role === MemberRole.MODERATOR) {
                return 1;
              }
              return a.profile.user_name.localeCompare(b.profile.user_name);
            }
            )
            .map((member) => {
              const profile = member.profile;
              return (
                <div
                  key={member.member_id}
                  className="w-full px-3 py-1 bg-slate-100   rounded-xl flex items-center justify-between"
                >
                  <div className="flex gap-4 items-center text-sm">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        {member.profile.user_name[0]}
                        {member.profile.user_name[1]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-start flex-col ">
                      <span className="text-black flex gap-1 items-center">
                        {profile.user_name}
                        {member.member_role === MemberRole.ADMIN && (
                          <ShieldAlertIcon className="h-4 stroke-red-600" />
                        )}
                        {member.member_role === MemberRole.MODERATOR && (
                          <ShieldAlertIcon className="h-4 stroke-blue-600" />
                        )}
                      </span>
                      <span className="text-gray-600">
                        {profile.user_email}
                      </span>
                    </div>
                  </div>
                  {isLoadingId === member.member_id ? <Loader2Icon className="w-6 h-6 animate-spin text-black "/> : session.data?.user?.id !== member.profile.user_id && <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="text-black " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Settings</DropdownMenuLabel>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="w-4 h-4 mr-2" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => onRoleChange(member.member_id, MemberRole.GUEST)}>
                              <ShieldQuestion className="w-4 h-4 mr-2" />
                              Guest
                              {member.member_role === MemberRole.GUEST && (
                                <Check className="w-4 h-4 ml-auto"/>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onRoleChange(member.member_id, MemberRole.MODERATOR)}>
                              <ShieldQuestion className="w-4 h-4 mr-2" />
                              Moderator
                              {member.member_role === MemberRole.MODERATOR && (
                                <Check className="w-4 h-4 ml-auto"/>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem>
                        <GavelIcon className="w-4 h-4 mr-2"/>
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> }
                </div>
              );
            })}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
