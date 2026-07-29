import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client/web";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || (!url.startsWith("libsql:") && !url.includes(".turso.io"))) {
    throw new Error("DATABASE_URL must be a Turso libsql URL");
  }

  if (!authToken) {
    throw new Error("Missing TURSO_AUTH_TOKEN");
  }

  const client = createClient({ url, authToken });

  const existing = await client.execute(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'Project' LIMIT 1",
  );

  if (existing.rows.length > 0) {
    console.log("Turso schema already exists, skipping migration apply.");
    return;
  }

  const migrationsDir = path.join(process.cwd(), "prisma/migrations");
  const migrationFolders = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const folder of migrationFolders) {
    const sqlPath = path.join(migrationsDir, folder, "migration.sql");
    const sql = readFileSync(sqlPath, "utf8");
    console.log(`Applying migration: ${folder}`);
    await client.executeMultiple(sql);
  }

  console.log("Turso schema is up to date.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
