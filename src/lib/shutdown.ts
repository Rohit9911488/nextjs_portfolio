import { createClient, type Client } from "@libsql/client";
import { promises as fs } from "node:fs";
import path from "node:path";
import { SHUTDOWN_SETTING_KEY } from "./shutdown-constants";

const SHUTDOWN_FILE = path.join(process.cwd(), "data", "shutdown.json");

function getDbClient(): Client | null {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    return null;
  }

  return createClient({ url, authToken });
}

async function ensureSettingsTable(client: Client) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS SiteSetting (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    )
  `);
}

async function readFileFlag(): Promise<boolean> {
  try {
    const raw = await fs.readFile(SHUTDOWN_FILE, "utf8");
    const parsed = JSON.parse(raw) as { shutdown?: unknown };
    return parsed.shutdown === true;
  } catch {
    return false;
  }
}

async function writeFileFlag(enabled: boolean) {
  await fs.mkdir(path.dirname(SHUTDOWN_FILE), { recursive: true });
  await fs.writeFile(
    SHUTDOWN_FILE,
    `${JSON.stringify({ shutdown: enabled }, null, 2)}\n`,
    "utf8",
  );
}

export async function getShutdownEnabled(): Promise<boolean> {
  const client = getDbClient();

  if (client) {
    try {
      await ensureSettingsTable(client);
      const result = await client.execute({
        sql: "SELECT value FROM SiteSetting WHERE key = ? LIMIT 1",
        args: [SHUTDOWN_SETTING_KEY],
      });

      const value = result.rows[0]?.value;
      if (value === undefined || value === null) {
        return false;
      }

      return JSON.parse(String(value)) === true;
    } catch {
      return readFileFlag();
    }
  }

  return readFileFlag();
}

export async function setShutdownEnabled(enabled: boolean): Promise<void> {
  const client = getDbClient();

  if (client) {
    await ensureSettingsTable(client);
    await client.execute({
      sql: `
        INSERT INTO SiteSetting (key, value)
        VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `,
      args: [SHUTDOWN_SETTING_KEY, JSON.stringify(enabled)],
    });
  }

  await writeFileFlag(enabled);
}
