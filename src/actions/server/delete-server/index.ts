"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteServer } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return { error: "Unauthorized" };
  const user = session.user;

  const { server_id } = data;
  if (!server_id) {
    return {
      error: "Incomplete data",
    };
  }
  try {
    const server = await db.server.findFirst({
      where: {
        server_id
      }
    })
    if (server?.server_owner !== user.id) {
      return {
        error: "Unauthorized",
      };
    }
    const deletedServer = await db.server.delete({
      where: {
        server_id
      }
    })
    revalidatePath("/app");
    return { data: deletedServer };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteServer = createSafeAction(DeleteServer, handler);
