import { cache } from "react";
import rawContent from "../../../data/portfolio-content.json";
import type { PageData, PageSeo } from "@/types/content";
import { parsePageSections } from "./page-sections";
import { prisma } from "./prisma";

const DEFAULT_PAGES = (rawContent as { pages: PageData[] }).pages;

function mapPageRow(row: {
  pageKey: string;
  path: string;
  seo: string;
  sections: string;
}): PageData {
  let seo: PageSeo;

  try {
    seo = JSON.parse(row.seo) as PageSeo;
  } catch {
    seo = {
      title: row.pageKey,
      description: "",
      keywords: [],
      canonical: row.path,
    };
  }

  return {
    id: row.pageKey,
    path: row.path,
    seo,
    sections: parsePageSections(row.sections),
  };
}

const fetchPublishedPages = cache(async () =>
  prisma.page.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  }),
);

export const getAllPages = cache(async (): Promise<PageData[]> => {
  const rows = await fetchPublishedPages();

  if (rows.length === 0) {
    return DEFAULT_PAGES;
  }

  return rows.map(mapPageRow);
});

export const getPageByPath = cache(async (path: string): Promise<PageData | undefined> => {
  const row = await prisma.page.findFirst({
    where: { path, published: true },
  });

  if (row) {
    return mapPageRow(row);
  }

  return DEFAULT_PAGES.find((page) => page.path === path);
});

export const getPageByKey = cache(async (pageKey: string): Promise<PageData | undefined> => {
  const row = await prisma.page.findFirst({
    where: { pageKey, published: true },
  });

  if (row) {
    return mapPageRow(row);
  }

  return DEFAULT_PAGES.find((page) => page.id === pageKey);
});
