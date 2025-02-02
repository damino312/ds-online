"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { DeleteChannel } from "./schema";
import { Channel, MemberRole } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return { error: "Unauthorized" };
  const user = session.user;

  const { channel_id} = data;

  try {
    const server = await db.server.findFirst({
      where: {
        channels: {
          some: {
            channel_id,
          },
        },
      },
    });
    if (!server) {
      return {
        error: "Server not found",
      };
    }

    const channel = await db.channel.findFirst({
      where: {
        channel_id,
      },
    }) as Channel;

    if (channel.channel_name === 'general') {
      return {
        error: "Cannot delete general channel",
      };
    }

    const member = await db.member.findFirst({
      where: {
        server_id: server.server_id,
        user_id: user.id,
      },
    });

    if (member?.member_role !== MemberRole.ADMIN && member?.member_role !== MemberRole.MODERATOR) {
      return {
        error: "Unauthorized",
      };
    }

    const deletedChannel = await db.channel.delete({
      where: {
        channel_id,
      },
    })

    revalidatePath("/app/server" + server.server_id);
    return { data: deletedChannel };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteChannel = createSafeAction(DeleteChannel, handler);
