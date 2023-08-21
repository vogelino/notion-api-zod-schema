import assert from "node:assert/strict";
import test from "node:test";

import * as dotenv from "dotenv";
dotenv.config();

import { getNotionDatabaseRows } from "../scripts/getNotionDatabaseRows.ts";

test.describe("getNotionDatabaseRows", () => {
  test.it("should not reject", async () => {
    await assert.doesNotReject(
      getNotionDatabaseRows(process.env.NOTION_DATABASE_ID || "")
    );
  });
  test.it("should return a list of rows", async () => {
    const rows = await getNotionDatabaseRows(
      process.env.NOTION_DATABASE_ID || ""
    );

    assert.strictEqual(rows.length, 6);
  });
});
