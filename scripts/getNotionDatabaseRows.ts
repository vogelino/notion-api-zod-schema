import {
  NotionDatabaseRowSchema,
  NotionDatabaseRowType,
} from "../src/NotionDatabaseSchema.ts";
import { notion } from "./notionClient.ts";

export async function getNotionDatabaseRows(
  databaseId: string
): Promise<NotionDatabaseRowType[]> {
  const database = await notion.databases.query({ database_id: databaseId });
  return NotionDatabaseRowSchema.array().parse(database.results);
}
