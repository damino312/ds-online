import { z } from "zod";
import { Channel } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateChannel } from "./schema";

export type InputType = z.infer<typeof CreateChannel>;
export type ReturnType = ActionState<InputType, Channel>;
