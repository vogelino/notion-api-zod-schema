import assert from "node:assert/strict";
import test from "node:test";

import * as dotenv from "dotenv";
dotenv.config();

import { getNotionPage } from "../scripts/getNotionPage.ts";

test.describe("getNotionPage", () => {
  test.it("should not reject", async () => {
    await assert.doesNotReject(getNotionPage(process.env.NOTION_PAGE_ID || ""));
  });
  test.it("should return a page with contents", async () => {
    const page = await getNotionPage(process.env.NOTION_PAGE_ID || "");
    assert.strictEqual(page.id.replaceAll("-", ""), process.env.NOTION_PAGE_ID);
    assert.strictEqual(page.object, "page");
  });
  test.it("should work with a complex dashboard", async () => {
    const page = await getNotionPage(process.env.NOTION_DASHBOARD_ID || "");

    assert.strictEqual(
      page.id.replaceAll("-", ""),
      process.env.NOTION_DASHBOARD_ID
    );
    assert.strictEqual(page.object, "page");
  });
});
