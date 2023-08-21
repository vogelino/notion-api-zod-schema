import { z } from "zod";

export const NotionUserSchema = z.object({
  object: z.literal("user"),
  id: z.string(),
});
export type NotionUserType = z.infer<typeof NotionUserSchema>;
