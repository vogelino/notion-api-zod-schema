import { NotionBlockType } from "./NotionBlockSchema.ts";
import { NotionObjectSchema } from "./NotionObjectSchema.ts";
import { NotionFileSchema } from "./NotionFileSchema.ts";
import { z } from "zod";

export const NotionPageSchema = NotionObjectSchema.extend({
  object: z.literal("page"),
  cover: NotionFileSchema.nullable(),
  icon: NotionFileSchema.nullable(),
});
export type NotionPageType = z.infer<typeof NotionPageSchema>;

export type NotionPageWithContentsType = NotionPageType & {
  contents: NotionBlockType[];
};
