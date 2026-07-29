import type { SectionData } from "@/types/content";

/** Component aliases stored in each section's `type` field inside Page.sections JSON. */
export const SECTION_COMPONENT_ALIASES = [
  "hero",
  "content",
  "cards",
  "projects",
  "timeline",
  "contactDetails",
  "form",
  "cta",
] as const;

export type SectionComponentAlias = (typeof SECTION_COMPONENT_ALIASES)[number];

export function isSectionComponentAlias(value: string): value is SectionComponentAlias {
  return SECTION_COMPONENT_ALIASES.includes(value as SectionComponentAlias);
}

export function parsePageSections(raw: string): SectionData[] {
  try {
    const parsed = JSON.parse(raw) as SectionData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
