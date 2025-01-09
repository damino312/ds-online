import { z } from "zod";

export const EditChannel = z.object({
  channel_id: z.string(),
  channel_name: z.string(),
});
