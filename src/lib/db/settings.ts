import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { SiteInfo } from "@/types/content";
import siteDefaults from "../../../data/site-defaults.json";
import { CACHE_TAGS } from "./cache";
import { prisma } from "./prisma";

const DEFAULT_SITE = siteDefaults.site as SiteInfo;

const fetchSettings = unstable_cache(
  async () => prisma.siteSetting.findMany(),
  ["site-settings"],
  { tags: [CACHE_TAGS.settings] },
);

function parseSettingValue<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapSettingsToSite(
  rows: Array<{ key: string; value: string }>,
  fallback: SiteInfo = DEFAULT_SITE,
): SiteInfo {
  const map = new Map(rows.map((row) => [row.key, row.value]));

  const read = <K extends keyof SiteInfo>(key: `site.${K & string}`, defaultValue: SiteInfo[K]) => {
    const raw = map.get(key);
    return raw ? parseSettingValue<SiteInfo[K]>(raw, defaultValue) : defaultValue;
  };

  return {
    name: read("site.name", fallback.name),
    professionalTitle: read("site.professionalTitle", fallback.professionalTitle),
    description: read("site.description", fallback.description),
    siteUrl: read("site.siteUrl", fallback.siteUrl),
    email: read("site.email", fallback.email),
    phone: read("site.phone", fallback.phone),
    location: read("site.location", fallback.location),
    resumeUrl: read("site.resumeUrl", fallback.resumeUrl),
    navigation: read("site.navigation", fallback.navigation),
    socialLinks: read("site.socialLinks", fallback.socialLinks),
    headerCta: read("site.headerCta", fallback.headerCta),
    footer: read("site.footer", fallback.footer),
  };
}

export const getSite = cache(async (): Promise<SiteInfo> => {
  const rows = await fetchSettings();

  if (rows.length === 0) {
    return DEFAULT_SITE;
  }

  return mapSettingsToSite(rows);
});

export async function getSettingByKey<T>(key: string, fallback: T): Promise<T> {
  const rows = await fetchSettings();
  const row = rows.find((entry) => entry.key === key);
  return row ? parseSettingValue<T>(row.value, fallback) : fallback;
}
