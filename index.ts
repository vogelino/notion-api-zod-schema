import { z } from "zod";
import { NotionTextSchema } from "./src/NotionTextSchema.ts";
import { NotionColorSchema } from "./src/NotionColorSchema.ts";
import { NotionBlockType } from "./src/NotionBlockSchema.ts";
import { NotionObjectSchema } from "./src/NotionObjectSchema.ts";
import { NotionFileSchema } from "./src/NotionFileSchema.ts";

export const CollaboratorSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().nullable(),
  avatar: z.string(),
});
export type CollaboratorType = z.infer<typeof CollaboratorSchema>;

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
    array: z.array(NotionTextSchema).optional(),
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

const NotionRichTextBlockSchema = z.object({
  type: z.literal("rich_text"),
  rich_text: z.object({
    text: z.array(NotionTextSchema),
  }),
});

export type NotionPageWithContentsType = NotionPageType & {
  contents: NotionBlockType[];
};

export const NotionDateSchema = z.object({
  id: z.string(),
  type: z.literal("date"),
  date: z.object({
    start: z.string(),
    end: z.string().nullable(),
  }),
});

export const NotionPropertySchema = z.discriminatedUnion("type", [
  NotionTitleSchema,
  NotionRichTextBlockSchema,
  NotionNumberSchema,
  NotionSelectSchema,
  NotionMultiSelectSchema,
  NotionDateSchema,
]);

export const NotionDatabaseSchema = NotionObjectSchema.extend({
  object: z.literal("database"),
  type: z.literal("database"),
  title: z.array(NotionTextSchema),
  properties: z.array(NotionPropertySchema),
});
