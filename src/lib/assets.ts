import fs from "node:fs";
import path from "node:path";

// Server-only check: several images referenced by the content JSON haven't
// been supplied yet. Rather than let next/image request a 404, callers use
// this to decide between the real asset and a theme-compatible placeholder.
export function publicAssetExists(assetPath: string): boolean {
  if (!assetPath || !assetPath.startsWith("/")) return false;
  const resolved = path.join(process.cwd(), "public", assetPath);
  return fs.existsSync(resolved);
}
