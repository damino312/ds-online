import { Channel, Member, Server, User } from "@prisma/client";
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from "next";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & {
    profile: Omit<User, 'user_password' | 'created_at' | 'updated_at'>;
  })[];
} & { channels: Channel[] };

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
}
