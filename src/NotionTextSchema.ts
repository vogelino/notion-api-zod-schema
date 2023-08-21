import { z } from "zod";
import { NotionColorSchema } from "./NotionColorSchema.ts";

export const NotionEmojiSchema = z.object({
  type: z.literal("emoji"),
  emoji: z.string(),
});
export type NotionEmojiType = z.infer<typeof NotionEmojiSchema>;

export const NotionBasicTextSchema = z.object({
  type: z.literal("text"),
  text: z
    .object({
      content: z.string(),
      link: z.object({ url: z.string() }).nullable(),
    })
    .optional(),
  annotations: z.object({
    bold: z.boolean(),
    italic: z.boolean(),
    strikethrough: z.boolean(),
    underline: z.boolean(),
    code: z.boolean(),
    color: NotionColorSchema,
  }),
  plain_text: z.string(),
  href: z.string().nullable(),
});
export type NotionBasicTextType = z.infer<typeof NotionBasicTextSchema>;

export const NotionMentionTextSchema = z.object({
  type: z.literal("mention"),
  mention: z.object({
    type: z.enum(["user", "page", "database", "date", "file", "mention"]),
  }),
});
export type NotionMentionTextType = z.infer<typeof NotionMentionTextSchema>;

export const NotionEquationTextSchema = z.object({
  type: z.literal("equation"),
  equation: z.object({
    expression: z.string(),
  }),
});
export type NotionEquationTextType = z.infer<typeof NotionEquationTextSchema>;

export const NotionTextSchema = z.discriminatedUnion("type", [
  NotionBasicTextSchema,
  NotionMentionTextSchema,
  NotionEquationTextSchema,
]);
export type NotionTextType = z.infer<typeof NotionTextSchema>;
