import type { ContactDetailItem, SiteInfo } from "@/types/content";

function toTelUrl(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, "");
  if (!normalized) return "tel:";
  return normalized.startsWith("+") ? `tel:${normalized}` : `tel:+${normalized}`;
}

export function mergeContactItemsWithSite(
  items: ContactDetailItem[],
  site: SiteInfo,
): ContactDetailItem[] {
  return items.map((item) => {
    switch (item.label) {
      case "Email":
        return {
          ...item,
          value: site.email,
          url: `mailto:${site.email}`,
        };
      case "Phone":
        return {
          ...item,
          value: site.phone,
          url: toTelUrl(site.phone),
        };
      case "LinkedIn": {
        const link = site.socialLinks.find((entry) => entry.label === "LinkedIn");
        return link ? { ...item, url: link.url } : item;
      }
      case "GitHub": {
        const link = site.socialLinks.find((entry) => entry.label === "GitHub");
        return link ? { ...item, url: link.url } : item;
      }
      default:
        return item;
    }
  });
}
