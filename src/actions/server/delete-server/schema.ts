import { z } from "zod";

export const DeleteServer = z.object({
  server_id: z.string(),
});
