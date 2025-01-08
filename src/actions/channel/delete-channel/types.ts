import { z } from "zod";
import { Channel } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteChannel } from "./schema";

export type InputType = z.infer<typeof DeleteChannel>;
export type ReturnType = ActionState<InputType, Channel>;
