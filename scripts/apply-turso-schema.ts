import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client/web";

const MIGRATIONS = [
  { folder: "20260729105240_init", table: "Project" },
  { folder: "20260729142000_add_page_table", table: "Page" },
] as const;

async function tableExists(client: ReturnType<typeof createClient>, tableName: string) {
  const result = await client.execute({
    sql: "SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1",
    args: [tableName],
  });

  return result.rows.length > 0;
}

async function applyMigration(
  client: ReturnType<typeof createClient>,
  migrationsDir: string,
  folder: string,
) {
  const sqlPath = path.join(migrationsDir, folder, "migration.sql");
  const sql = readFileSync(sqlPath, "utf8");
  console.log(`Applying migration: ${folder}`);
  await client.executeMultiple(sql);
}

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
  const migrationsDir = path.join(process.cwd(), "prisma/migrations");
  let applied = 0;

  for (const migration of MIGRATIONS) {
    const exists = await tableExists(client, migration.table);

    if (!exists) {
      await applyMigration(client, migrationsDir, migration.folder);
      applied += 1;
    }
  }

  if (applied === 0) {
    console.log("Turso schema is up to date.");
    return;
  }

  console.log(`Applied ${applied} migration(s). Turso schema is up to date.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
