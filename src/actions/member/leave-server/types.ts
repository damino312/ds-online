import { z } from "zod";
import { Member } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { LeaveServer } from "./schema";

export type InputType = z.infer<typeof LeaveServer>;
export type ReturnType = ActionState<InputType, Member>;
