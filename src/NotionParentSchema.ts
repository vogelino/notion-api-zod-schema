import { z } from "zod";

export const NotionParentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("database_id"),
    database_id: z.string(),
  }),
  z.object({
    type: z.literal("page_id"),
    page_id: z.string(),
  }),
  z.object({
    type: z.literal("workspace"),
    workspace: z.boolean(),
  }),
  z.object({
    type: z.literal("block_id"),
    block_id: z.string(),
  }),
]);
export type NotionParentType = z.infer<typeof NotionParentSchema>;
