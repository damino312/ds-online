import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const CreateChannel = z.object({
  channel_name: z
    .string()
    .min(3, { message: "Channel name must be at least 3 symbols" })
    .refine((val) => val.toLowerCase() !== "global", { message: "Channel name can't be 'global'" }),
  channel_type: z.nativeEnum(ChannelType),
  server_id: z.string(),
});
