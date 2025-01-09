import { z } from "zod";

export const DeleteChannel = z.object({
  channel_id: z.string(),
});
