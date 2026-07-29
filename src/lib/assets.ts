import fs from "node:fs";
import path from "node:path";

// Server-only check for local assets in /public. External image URLs are
// validated separately in project-image.ts.
export function publicAssetExists(assetPath: string): boolean {
  if (!assetPath || !assetPath.startsWith("/")) return false;
  const resolved = path.join(process.cwd(), "public", assetPath);
  return fs.existsSync(resolved);
}
