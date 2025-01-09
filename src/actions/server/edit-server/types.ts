import { z } from "zod";
import { Server } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { EditServer } from "./schema";

export type InputType = z.infer<typeof EditServer>;
export type ReturnType = ActionState<InputType, Server>;
