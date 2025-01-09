import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const ChangeRole = z.object({
  memberId: z.string(),
  serverId: z.string(),
  role: z.nativeEnum(MemberRole),
});

