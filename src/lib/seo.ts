import type { Metadata } from "next";
import type { PageData, SiteInfo } from "@/types/content";

export function buildPageMetadata(page: PageData, site: SiteInfo): Metadata {
  const url = new URL(page.seo.canonical, site.siteUrl).toString();

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: {
      canonical: page.seo.canonical,
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  };
}
