"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateChannel } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return { error: "Unauthorized" };
  const user = session.user;

  const { channel_name, channel_type,server_id} = data;
  if (!server_id || !channel_name || !channel_type) {
    return {
      error: "Incomplete data",
    };
  }

  if (channel_name === 'general') {
    return {
      error: "Channel name can't be 'general'",
    };
  }

  try {
    const server = await db.server.findFirst({
      where: {
        server_id: server_id,
      },
      include: {
        channels: true,
      },
    });

    if (!server) {
      return {
        error: "Server not found",
      };
    }

    if (server.server_owner !== user.id) {
      return {
        error: "Unauthorized",
      };
    }

    if (server.channels.some((channel) => channel.channel_name === channel_name)) {
      return {
        error: "Channel name already exists",
      };
    }

    const channel = await db.channel.create({
      data: {
        channel_name,
        channel_type,
        user_id: user.id,
        server_id: server_id,
      },
    });

   
    revalidatePath("/app/server" + server_id);
    return { data: channel };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const createChannel = createSafeAction(CreateChannel, handler);
