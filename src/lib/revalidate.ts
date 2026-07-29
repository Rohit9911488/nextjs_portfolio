import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "./db/cache";

export function revalidateProjects(slug?: string) {
  revalidateTag(CACHE_TAGS.projects, "max");

  if (slug) {
    revalidateTag(CACHE_TAGS.project(slug), "max");
  }
}

export function revalidateSettings() {
  revalidateTag(CACHE_TAGS.settings, "max");
}
