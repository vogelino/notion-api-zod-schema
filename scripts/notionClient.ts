import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";
dotenv.config();

export const notion = new Client({
  auth: process.env.NOTION_API_SECRET || "",
});
