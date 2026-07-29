import { createClient } from "@libsql/client/web";
import { SHUTDOWN_SETTING_KEY } from "./shutdown-constants";

export async function readShutdownFlag(): Promise<boolean> {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return false;
  }

  try {
    const client = createClient({ url, authToken });
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
    return false;
  }
}
