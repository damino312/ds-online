import { z } from "zod";

export const AddServer = z.object({
  server_name: z.string(),
  server_picture: z.string().nullable(),
});
