import { z } from "zod";

export const NotionColorSchema = z.enum([
  "default",
  "gray",
  "brown",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "red",
]);
export type NotionColorType = z.infer<typeof NotionColorSchema>;

export const NotionTextBaseSchema = z.object({
  text: z.object({
    content: z.string(),
    link: z.object({ url: z.string() }).nullable(),
  }),
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
export const NotionBasicTextSchema = NotionTextBaseSchema.extend({
  type: z.literal("text"),
});
export const NotionRichTextSchema = NotionTextBaseSchema.extend({
  type: z.literal("rich_text"),
});
export const NotionTextSchema = z.discriminatedUnion("type", [
  NotionBasicTextSchema,
  NotionRichTextSchema,
]);
export type NotionTextType = z.infer<typeof NotionTextSchema>;

export const NotionUserSchema = z.object({
  object: z.literal("user"),
  id: z.string(),
});
export type NotionUserType = z.infer<typeof NotionUserSchema>;

export const CollaboratorSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().nullable(),
  avatar: z.string(),
});
export type CollaboratorType = z.infer<typeof CollaboratorSchema>;

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

export const NotionFileSchema = z.object({
  object: z.literal("file"),
  file: z.object({
    name: z.string().optional(),
    url: z.string().url(),
    expiry_time: z.string(),
  }),
});
export type NotionFileType = z.infer<typeof NotionFileSchema>;

export const NotionObjectSchema = z.object({
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: NotionUserSchema,
  last_edited_by: NotionUserSchema,
  archived: z.boolean(),
  url: z.string().url(),
  public_url: z.string().url(),
  parent: NotionParentSchema,
});

export const NotionBlockBaseSchema = NotionObjectSchema.extend({
  object: z.literal("block"),
});

export const NotionParagraphBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("paragraph"),
  paragraph: z.object({
    text: z.array(NotionTextSchema),
  }),
});

export const NotionRichTextBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("rich_text"),
  rich_text: z.object({
    text: z.array(NotionTextSchema),
  }),
});

export const NotionRelationSchema = z.object({
  id: z.string(),
  type: z.literal("relation"),
  relation: z.object({
    id: z.string(),
  }),
  has_more: z.boolean(),
});
export type NotionRelationType = z.infer<typeof NotionRelationSchema>;

export const NotionFilesSchema = z.object({
  id: z.string(),
  type: z.literal("files"),
  files: z.array(NotionFileSchema),
});
export type NotionFilesType = z.infer<typeof NotionFilesSchema>;

export const NotionMultiSelectSchema = z.object({
  id: z.string(),
  type: z.literal("multi_select"),
  multi_select: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: NotionColorSchema,
    })
  ),
});
export type NotionMultiSelectType = z.infer<typeof NotionMultiSelectSchema>;

export const NotionTimeSchema = z.object({
  id: z.string(),
  type: z.literal("multi_select"),
  multi_select: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: NotionColorSchema,
    })
  ),
});
export type NotionTimeType = z.infer<typeof NotionTimeSchema>;

export const NotionUrlSchema = z.object({
  id: z.string(),
  type: z.literal("url"),
  url: z.string().url(),
});
export type NotionUrlType = z.infer<typeof NotionUrlSchema>;

export const NotionSelectSchema = z.object({
  id: z.string(),
  type: z.literal("select"),
  select: z.object({
    id: z.string(),
    name: z.string(),
    color: NotionColorSchema,
  }),
});
export type NotionSelectType = z.infer<typeof NotionSelectSchema>;

export const NotionFormulaSchema = z.object({
  id: z.string(),
  type: z.literal("formula"),
  formula: z.object({
    type: z.enum(["boolean", "date", "number", "string"]),
    boolean: z.boolean().optional(),
    date: z.string().optional(),
    number: z.number().optional(),
    string: z.string().optional(),
  }),
});
export type NotionFormulaType = z.infer<typeof NotionFormulaSchema>;

export const NotionCheckboxSchema = z.object({
  id: z.string(),
  type: z.literal("checkbox"),
  checkbox: z.boolean(),
});
export type NotionCheckboxType = z.infer<typeof NotionCheckboxSchema>;

export const NotionRollupSchema = z.object({
  id: z.string(),
  type: z.literal("rollup"),
  rollup: z.object({
    type: z.literal("array"),
    array: z.array(NotionRichTextSchema).optional(),
    function: z.enum([
      "average",
      "checked",
      "count_per_group",
      "count",
      "count_values",
      "date_range",
      "earliest_date",
      "empty",
      "latest_date",
      "max",
      "median",
      "min",
      "not_empty",
      "percent_checked",
      "percent_empty",
      "percent_not_empty",
      "percent_per_group",
      "percent_unchecked",
      "range",
      "unchecked",
      "unique",
      "show_original",
      "show_unique",
      "sum",
    ]),
  }),
});
export type NotionRollupType = z.infer<typeof NotionRollupSchema>;

export const NotionNumberSchema = z.object({
  id: z.string(),
  type: z.literal("number"),
  number: z.number(),
});

export const NotionTitleSchema = z.object({
  id: z.string(),
  type: z.literal("title"),
  title: z.array(NotionTextSchema),
});
export type NotionTitleType = z.infer<typeof NotionTitleSchema>;

export const NotionPageSchema = NotionObjectSchema.extend({
  object: z.literal("page"),
  cover: NotionFileSchema.nullable(),
  icon: NotionFileSchema.nullable(),
});
export type NotionPageType = z.infer<typeof NotionPageSchema>;

export const NotionBlockSchema = z.discriminatedUnion("type", [
  NotionParagraphBlockSchema,
  NotionRichTextBlockSchema,
]);
export type NotionBlockType = z.infer<typeof NotionBlockSchema>;
