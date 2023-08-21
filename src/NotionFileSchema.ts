import { z } from "zod";
import { NotionTextSchema } from "./NotionTextSchema.ts";

const NotionFileBaseSchema = z.object({
  caption: z.array(NotionTextSchema).optional().nullable(),
});

export const NotionInternalFileObjectSchema = NotionFileBaseSchema.extend({
  type: z.literal("file"),
  file: z.object({
    url: z.string().url(),
    expiry_time: z.string(),
  }),
});
export type NotionInternalFileObjectType = z.infer<
  typeof NotionInternalFileObjectSchema
>;

export const NotionExternalFileObjectSchema = NotionFileBaseSchema.extend({
  type: z.literal("external"),
  external: z.object({
    url: z.string().url(),
  }),
});
export type NotionExternalFileObjectType = z.infer<
  typeof NotionExternalFileObjectSchema
>;

export const NotionFileSchema = z.discriminatedUnion("type", [
  NotionInternalFileObjectSchema,
  NotionExternalFileObjectSchema,
]);
export type NotionFileType = z.infer<typeof NotionFileSchema>;
