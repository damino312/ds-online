import { Member, Server, User } from "@prisma/client";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & { profile: User })[];
};