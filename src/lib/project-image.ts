import { publicAssetExists } from "@/lib/assets";

export function isExternalImageUrl(image: string): boolean {
  try {
    const url = new URL(image);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isLocalImagePath(image: string): boolean {
  return image.startsWith("/") && !image.startsWith("//");
}

export function isValidProjectImageValue(image: string): boolean {
  const trimmed = image.trim();
  if (!trimmed) return true;
  return isExternalImageUrl(trimmed) || isLocalImagePath(trimmed);
}

export function hasProjectImage(image: string): boolean {
  const trimmed = image.trim();
  if (!trimmed) return false;
  if (isExternalImageUrl(trimmed)) return true;
  if (isLocalImagePath(trimmed)) return publicAssetExists(trimmed);
  return false;
}

export function normalizeProjectImageValue(image: string): string {
  return image.trim();
}
