import { z } from "zod";
import { NotionUserSchema } from "./NotionUserSchema.ts";
import { NotionParentSchema } from "./NotionParentSchema.ts";

export const NotionObjectSchema = z.object({
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: NotionUserSchema,
  last_edited_by: NotionUserSchema,
  archived: z.boolean(),
  url: z.string().url().nullable().optional(),
  public_url: z.string().url().nullable().optional(),
  parent: NotionParentSchema,
});
