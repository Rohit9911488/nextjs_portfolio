import "dotenv/config";
import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["tsx", "scripts/apply-turso-schema.ts"], {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
