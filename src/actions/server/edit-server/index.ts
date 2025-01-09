"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { EditServer } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return { error: "Unauthorized" };
  const user = session.user;

  const { server_name, server_picture, server_id } = data;

  try {

    const server = await db.server.findFirst({
      where: {
        server_id: server_id
      }
    })
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

    const updatedServer = await db.server.update({
      where: server,
      data: {
        server_name,
        server_picture
      }
    })

    revalidatePath("/app");
    return { data: updatedServer };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const editServer = createSafeAction(EditServer, handler);
