import { Channel, Member, Server, User } from "@prisma/client";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & {
    profile: Omit<User, 'user_password' | 'created_at' | 'updated_at'>;
  })[];
} & { channels: Channel[] };
