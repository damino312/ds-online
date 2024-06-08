import { z } from "zod";
import { Server } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { AddServer } from "./schema";

export type InputType = z.infer<typeof AddServer>;
export type ReturnType = ActionState<InputType, Server>;
