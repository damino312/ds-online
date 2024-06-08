import { z } from "zod";

export const SignUp = z.object({
  login: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});