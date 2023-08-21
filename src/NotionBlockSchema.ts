import { z } from "zod";
import { NotionObjectSchema } from "./NotionObjectSchema.ts";
import { NotionEmojiType, NotionTextSchema } from "./NotionTextSchema.ts";
import {
  NotionExternalFileObjectSchema,
  NotionFileSchema,
  NotionInternalFileObjectSchema,
} from "./NotionFileSchema.ts";
import { NotionColorSchema } from "./NotionColorSchema.ts";

const NotionBlockBaseSchema = NotionObjectSchema.extend({
  type: z.string(),
  object: z.literal("block"),
});

const NotionParagraphBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("paragraph"),
  paragraph: z.object({
    rich_text: z.array(NotionTextSchema),
  }),
});

const NotionDividerBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("divider"),
});

const NotionUnsupportedBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("unsupported"),
});

const NotionCalloutBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("callout"),
  callout: z.object({
    rich_text: z.array(NotionTextSchema),
    icon: z
      .discriminatedUnion("type", [
        NotionEmojiType,
        NotionInternalFileObjectSchema,
        NotionExternalFileObjectSchema,
      ])
      .optional(),
    color: NotionColorSchema,
  }),
});

const NotionEquationBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("equation"),
  equation: z.object({
    expression: z.string(),
  }),
});

const NotionSyncedBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("synced_block"),
  synced_block: z.object({
    synced_from: z.string().nullable(),
  }),
});

const NotionHeadingBlockSchema = NotionBlockBaseSchema.extend({
  type: z.enum(["heading_1", "heading_2", "heading_3"]),
  heading_1: z.object({
    rich_text: z.array(NotionTextSchema),
    is_toggleable: z.boolean().optional(),
    color: NotionColorSchema,
  }),
});

const NotionHeading1BlockSchema = NotionHeadingBlockSchema.extend({
  type: z.literal("heading_1"),
});

const NotionHeading2BlockSchema = NotionHeadingBlockSchema.extend({
  type: z.literal("heading_2"),
});

const NotionHeading3BlockSchema = NotionHeadingBlockSchema.extend({
  type: z.literal("heading_3"),
});

const NotionBulletedListItemBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("bulleted_list_item"),
  bulleted_list_item: z.object({
    rich_text: z.array(NotionTextSchema),
    color: NotionColorSchema,
  }),
});

const NotionNumberedListItemBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("numbered_list_item"),
  numbered_list_item: z.object({
    rich_text: z.array(NotionTextSchema),
    color: NotionColorSchema,
  }),
});

const NotionToggleBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("toggle"),
  toggle: z.object({
    rich_text: z.array(NotionTextSchema),
    color: NotionColorSchema,
  }),
});

const NotionQuoteBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("quote"),
  quote: z.object({
    rich_text: z.array(NotionTextSchema),
    color: NotionColorSchema,
  }),
});

const NotionTodoBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("to_do"),
  to_do: z.object({
    rich_text: z.array(NotionTextSchema),
    color: NotionColorSchema,
    checked: z.boolean(),
  }),
});

const NotionChildPageBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("child_page"),
  child_page: z.object({
    title: z.string(),
  }),
});

const NotionTableBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("table"),
  table: z.object({
    table_width: z.number(),
    has_column_header: z.boolean(),
    has_row_header: z.boolean(),
  }),
});

const NotionTableOfContentsBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("table_of_contents"),
  table_of_contents: z.object({
    color: NotionColorSchema,
  }),
});

const NotionBookmarkBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("bookmark"),
  bookmark: z.object({
    url: z.string(),
    caption: z.array(NotionTextSchema),
    description: z.array(NotionTextSchema),
    icon: NotionFileSchema.nullable().optional(),
  }),
});

const NotionBreadcrumbBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("breadcrumb"),
  breadcrumb: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

const NotionChildDatabaseBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("child_database"),
  child_database: z.object({
    title: z.string(),
  }),
});

const NotionColumnBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("column"),
  column: z.object({
    ratio: z.number(),
  }),
});

const NotionColumnListBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("column_list"),
});

const NotionEmbedBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("embed"),
  embed: z.object({
    url: z.string(),
  }),
});

const NotionFileBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("file"),
  file: NotionFileSchema,
});

const NotionImageBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("image"),
  image: NotionFileSchema,
});

const NotionLinkPreviewBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("link_preview"),
  link_preview: z.object({
    url: z.string(),
    title: z.string(),
    description: z.string(),
    image: NotionFileSchema.nullable().optional(),
  }),
});

const NotionLinkToPageBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("link_to_page"),
});

const NotionPdfBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("pdf"),
  pdf: NotionFileSchema,
});

const NotionTableRowBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("table_row"),
});

const NotionTemplateBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("template"),
  template: z.object({
    rich_text: z.array(NotionTextSchema),
  }),
});

const NotionVideoBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal("video"),
  video: NotionFileSchema,
});

export const NotionBlockSchema = z.discriminatedUnion("type", [
  NotionBookmarkBlockSchema,
  NotionBreadcrumbBlockSchema,
  NotionBulletedListItemBlockSchema,
  NotionCalloutBlockSchema,
  NotionChildDatabaseBlockSchema,
  NotionChildPageBlockSchema,
  NotionColumnBlockSchema,
  NotionColumnListBlockSchema,
  NotionDividerBlockSchema,
  NotionEmbedBlockSchema,
  NotionEquationBlockSchema,
  NotionFileBlockSchema,
  NotionHeading1BlockSchema,
  NotionHeading2BlockSchema,
  NotionHeading3BlockSchema,
  NotionImageBlockSchema,
  NotionLinkPreviewBlockSchema,
  NotionLinkToPageBlockSchema,
  NotionNumberedListItemBlockSchema,
  NotionParagraphBlockSchema,
  NotionPdfBlockSchema,
  NotionQuoteBlockSchema,
  NotionSyncedBlockSchema,
  NotionTableBlockSchema,
  NotionTableOfContentsBlockSchema,
  NotionTableRowBlockSchema,
  NotionTemplateBlockSchema,
  NotionTodoBlockSchema,
  NotionToggleBlockSchema,
  NotionUnsupportedBlockSchema,
  NotionVideoBlockSchema,
]);
export type NotionBlockType = z.infer<typeof NotionBlockSchema>;
