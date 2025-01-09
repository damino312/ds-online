import { z } from "zod";

export const EditServer = z.object({
  server_name: z.string(),
  server_picture: z.string().nullable(),
  server_id: z.string(),
});
