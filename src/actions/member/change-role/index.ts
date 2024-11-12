"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { ChangeRole } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return { error: "Unauthorized" };
  const user = session.user;

  const { memberId, role, serverId } = data;
  if (!memberId || !role || !serverId) {
    return {
      error: "Incomplete data",
    };
  }
  try {
    const server = await db.server.findFirst({
      where: {
        server_id: serverId,
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
        channels: true,
      },
    })

    if (!server) {
      return {
        error: "Server not found",
      };
    }


    if (server?.server_owner !== user.id) {
      return {
        error: "Unauthorized",
      };
    }

    const member = server?.members.find((member) => member.member_id === memberId);
    if (!member) {
      return {
        error: "Member not found",
      };
    }

    const updatedMember = await db.member.update({
      where: {
        member_id: memberId,
      },
      data: {
        member_role: role,
      },
    })

    // revalidatePath("/app/server/" + serverId);
    return { data: updatedMember };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const changeRole = createSafeAction(ChangeRole, handler);
