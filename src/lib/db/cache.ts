export const CACHE_TAGS = {
  projects: "projects",
  project: (slug: string) => `project:${slug}`,
  settings: "settings",
} as const;
