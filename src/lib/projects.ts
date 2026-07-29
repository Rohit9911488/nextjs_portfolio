export const PROJECTS_PER_PAGE = 6;

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function shortenCategoryLabel(category: string): string {
  return category
    .replace("Machine Learning and Predictive Analytics", "ML & Predictive")
    .replace("Deep Learning and Computer Vision", "DL & Vision");
}

export function buildProjectCategories(categories: string[]): Array<{
  slug: string;
  label: string;
  shortLabel: string;
}> {
  return [
    { slug: "all", label: "All", shortLabel: "All" },
    ...categories.map((category) => ({
      slug: categoryToSlug(category),
      label: category,
      shortLabel: shortenCategoryLabel(category),
    })),
  ];
}

export function buildProjectsUrl(options: { category?: string | null; page?: number }) {
  const params = new URLSearchParams();

  if (options.category && options.category !== "all") {
    params.set("category", options.category);
  }

  if (options.page && options.page > 1) {
    params.set("page", String(options.page));
  }

  const query = params.toString();
  return `/projects${query ? `?${query}` : ""}#projects-list`;
}

export type PagerItem = number | "ellipsis";

export function getPagerItems(current: number, totalPages: number): PagerItem[] {
  if (totalPages <= 1) return [];

  const items: PagerItem[] = [];

  for (let page = 1; page <= totalPages; page += 1) {
    if (page === 1 || page === totalPages || Math.abs(page - current) <= 1) {
      items.push(page);
    } else if (page === current - 2 || page === current + 2) {
      items.push("ellipsis");
    }
  }

  return items.filter((item, index, array) => item !== "ellipsis" || array[index - 1] !== "ellipsis");
}

export function parseProjectsPageParam(value?: string | null): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
