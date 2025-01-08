import { z } from "zod";
import { Channel } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { EditChannel } from "./schema";

export type InputType = z.infer<typeof EditChannel>;
export type ReturnType = ActionState<InputType, Channel>;
