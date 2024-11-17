"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { LeaveServer } from "./schema";
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
    const member = await db.member.findFirst({
      where: {
        server_id: server_id,
        user_id: user.id,
      }
    })

    if (!member) {
      return {
        error: "Member not found",
      };
    }

    if (member.member_role === "ADMIN") {
      return {
        error: "Admin cannot leave the server",
      };
    }

    const deletedMember = await db.member.delete({
      where: {
        member_id: member.member_id,
      }
    })


    revalidatePath("/app");
    return { data: deletedMember };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const leaveServer = createSafeAction(LeaveServer, handler);
