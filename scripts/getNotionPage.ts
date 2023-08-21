import { NotionPageSchema, NotionPageWithContentsType } from "../index.ts";
import { NotionBlockSchema } from "../src/NotionBlockSchema.ts";
import { notion } from "./notionClient.ts";

export async function getNotionPage(
  pageId: string
): Promise<NotionPageWithContentsType> {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const contents = await notion.blocks.children.list({ block_id: pageId });

  const parsedPage = NotionPageSchema.parse(page);
  const parsedContents = NotionBlockSchema.array().parse(contents.results);

  return {
    ...parsedPage,
    contents: parsedContents,
  };
}
