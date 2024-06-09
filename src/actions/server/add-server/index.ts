"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { AddServer } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import { ChannelType, MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return { error: "Unauthorized" };
  const user = session.user;

  const { server_name, server_picture } = data;
  if (!server_name) {
    return {
      error: "Incomplete data",
    };
  }
  let server;
  try {
    server = await db.server.create({
      data: {
        server_name,
        server_picture,
        server_owner: user.id,
        server_invite_code: uuidv4(),
        channels: {
          create: [
            {
              channel_name: "general",
              user_id: user.id,
              channel_type: ChannelType.TEXT,
            },
          ],
        },
        members: {
          create: [{ user_id: user.id, member_role: MemberRole.ADMIN }],
        },
      },
    });
    revalidatePath("/app");
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
  return { data: server };
};

export const addServer = createSafeAction(AddServer, handler);
