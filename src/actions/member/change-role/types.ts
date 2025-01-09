import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { ChangeRole } from "./schema";
import { Member } from "@prisma/client";

export type InputType = z.infer<typeof ChangeRole>;
export type ReturnType = ActionState<InputType, Member>;
