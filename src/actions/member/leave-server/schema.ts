import { z } from "zod";

export const LeaveServer = z.object({
  server_id: z.string(),
});
