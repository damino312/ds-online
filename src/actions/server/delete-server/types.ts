import { z } from "zod";
import { Server } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteServer } from "./schema";

export type InputType = z.infer<typeof DeleteServer>;
export type ReturnType = ActionState<InputType, Server>;
