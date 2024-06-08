import { z } from "zod";
import { User } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { SignUp } from "./schema"; 

export type InputType = z.infer<typeof SignUp>;
export type ReturnType = ActionState<InputType, User>;