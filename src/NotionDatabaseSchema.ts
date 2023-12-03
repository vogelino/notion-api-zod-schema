import { z } from "zod";
import { NotionEmojiSchema, NotionTextSchema } from "./NotionTextSchema.ts";
import { NotionColorSchema } from "./NotionColorSchema.ts";
import { NotionObjectSchema } from "./NotionObjectSchema.ts";
import {
  NotionExternalFileObjectSchema,
  NotionFileSchema,
  NotionInternalFileObjectSchema,
} from "./NotionFileSchema.ts";
import { NotionUserSchema } from "./NotionUserSchema.ts";
import { NotionTimezoneSchema } from "./NotionTimezoneSchema.ts";

const NotionDatabaseCellSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string().optional(),
});

const NotionDateSchema = z.object({
  start: z.string().optional().nullable(),
  end: z.string().optional().nullable(),
  time_zone: NotionTimezoneSchema.optional().nullable(),
});
export type NotionDateType = z.infer<typeof NotionDateSchema>;

export const NotionDatabaseRelationSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("relation"),
  relation: z.array(z.object({ id: z.string() })),
  has_more: z.boolean(),
});
export type NotionDatabaseRelationType = z.infer<
  typeof NotionDatabaseRelationSchema
>;

export const NotionDatabaseFilesSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("files"),
  files: z.array(NotionFileSchema),
});
export type NotionDatabaseFilesType = z.infer<typeof NotionDatabaseFilesSchema>;

export const NotionDatabaseMultiSelectSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("multi_select"),
  multi_select: z.object({
    options: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          color: NotionColorSchema.optional(),
        })
      )
      .optional(),
  }),
});
export type NotionDatabaseMultiSelectType = z.infer<
  typeof NotionDatabaseMultiSelectSchema
>;

export const NotionDatabaseTimeSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("multi_select"),
  multi_select: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: NotionColorSchema,
    })
  ),
});
export type NotionDatabaseTimeType = z.infer<typeof NotionDatabaseTimeSchema>;

export const NotionDatabaseUrlSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("url"),
  url: z.string().url(),
});
export type NotionDatabaseUrlType = z.infer<typeof NotionDatabaseUrlSchema>;

export const NotionDatabaseSelectSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("select"),
  select: z.object({
    options: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          color: NotionColorSchema.optional(),
        })
      )
      .optional(),
  }),
});
export type NotionDatabaseSelectType = z.infer<
  typeof NotionDatabaseSelectSchema
>;

export const NotionDatabaseFormulaSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("formula"),
  formula: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("string"),
      string: z.string().optional(),
    }),
    z.object({
      type: z.literal("number"),
      number: z.number().optional(),
    }),
    z.object({
      type: z.literal("boolean"),
      boolean: z.boolean().optional(),
    }),
    z.object({
      type: z.literal("date"),
      date: NotionDateSchema,
    }),
  ]),
});
export type NotionDatabaseFormulaType = z.infer<
  typeof NotionDatabaseFormulaSchema
>;

export const NotionDatabaseCheckboxSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("checkbox"),
  checkbox: z.boolean(),
});
export type NotionDatabaseCheckboxType = z.infer<
  typeof NotionDatabaseCheckboxSchema
>;

export const NotionDatabaseRollupSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("rollup"),
  rollup: z.object({
    relation_property_id: z.string().optional(),
    relation_property_name: z.string().optional(),
    rollup_property_name: z.string().optional(),
    rollup_property_id: z.string().optional(),
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
export type NotionDatabaseRollupType = z.infer<
  typeof NotionDatabaseRollupSchema
>;

export const NotionDatabaseNumberSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("number"),
  number: z.number(),
});
export type NotionDatabaseNumberType = z.infer<
  typeof NotionDatabaseNumberSchema
>;

export const NotionDatabaseTitleSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("title"),
  title: z.array(NotionTextSchema),
});
export type NotionDatabaseTitleType = z.infer<typeof NotionDatabaseTitleSchema>;

export const NotionDatabaseRichTextBlockSchema = z.object({
  type: z.literal("rich_text"),
  rich_text: z.array(NotionTextSchema),
});
export type NotionDatabaseRichTextBlockType = z.infer<
  typeof NotionDatabaseRichTextBlockSchema
>;

export const NotionDatabaseDateSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("date"),
  date: NotionDateSchema,
});
export type NotionDatabaseDateType = z.infer<typeof NotionDatabaseDateSchema>;

const NotionDatabaseCreatedBySchema = NotionDatabaseCellSchema.extend({
  type: z.literal("created_by"),
  created_by: NotionUserSchema,
});
export type NotionDatabaseCreatedByType = z.infer<
  typeof NotionDatabaseCreatedBySchema
>;

export const NotionDatabaseCreatedTimeSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("created_time"),
  created_time: NotionDateSchema,
});
export type NotionDatabaseCreatedTimeType = z.infer<
  typeof NotionDatabaseCreatedTimeSchema
>;

export const NotionDatabaseLastEditedBySchema = NotionDatabaseCellSchema.extend(
  {
    type: z.literal("last_edited_by"),
    last_edited_by: NotionUserSchema,
  }
);
export type NotionDatabaseLastEditedByType = z.infer<
  typeof NotionDatabaseLastEditedBySchema
>;

export const NotionDatabaseLastEditedTimeSchema =
  NotionDatabaseCellSchema.extend({
    type: z.literal("last_edited_time"),
    last_edited_time: NotionDateSchema,
  });
export type NotionDatabaseLastEditedTimeType = z.infer<
  typeof NotionDatabaseLastEditedTimeSchema
>;

export const NotionDatabasePeopleSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("people"),
  people: z.array(NotionUserSchema),
});
export type NotionDatabasePeopleType = z.infer<
  typeof NotionDatabasePeopleSchema
>;

export const NotionDatabasePhoneNumberSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("phone_number"),
  phone_number: z.string(),
});
export type NotionDatabasePhoneNumberType = z.infer<
  typeof NotionDatabasePhoneNumberSchema
>;

export const NotionDatabaseStatusSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("status"),
  color: NotionColorSchema.optional(),
});
export type NotionDatabaseStatusType = z.infer<
  typeof NotionDatabaseStatusSchema
>;

export const NotionDatabaseEmailSchema = NotionDatabaseCellSchema.extend({
  type: z.literal("email"),
  email: z.string(),
});
export type NotionDatabaseEmailType = z.infer<typeof NotionDatabaseEmailSchema>;

export const NotionDatabasePropertySchema = z.discriminatedUnion("type", [
  NotionDatabaseCheckboxSchema,
  NotionDatabaseCreatedBySchema,
  NotionDatabaseCreatedTimeSchema,
  NotionDatabaseDateSchema,
  NotionDatabaseEmailSchema,
  NotionDatabaseFilesSchema,
  NotionDatabaseFormulaSchema,
  NotionDatabaseLastEditedBySchema,
  NotionDatabaseLastEditedTimeSchema,
  NotionDatabaseMultiSelectSchema,
  NotionDatabaseNumberSchema,
  NotionDatabasePeopleSchema,
  NotionDatabasePhoneNumberSchema,
  NotionDatabaseRelationSchema,
  NotionDatabaseRichTextBlockSchema,
  NotionDatabaseRollupSchema,
  NotionDatabaseSelectSchema,
  NotionDatabaseStatusSchema,
  NotionDatabaseTitleSchema,
  NotionDatabaseUrlSchema,
]);
export type NotionDatabasePropertyType = z.infer<
  typeof NotionDatabasePropertySchema
>;

export const NotionDatabaseRowSchema = NotionObjectSchema.extend({
  object: z.enum(["database", "page"]),
  title: z.array(NotionTextSchema).optional(),
  description: z.array(NotionTextSchema).optional(),
  icon: z
    .discriminatedUnion("type", [
      NotionEmojiSchema,
      NotionInternalFileObjectSchema,
      NotionExternalFileObjectSchema,
    ])
    .optional()
    .nullable(),
  cover: NotionExternalFileObjectSchema.optional().nullable(),
  properties: z.record(z.string(), NotionDatabasePropertySchema),
  is_inline: z.boolean().optional(),
});
export type NotionDatabaseRowType = z.infer<typeof NotionDatabaseRowSchema>;
