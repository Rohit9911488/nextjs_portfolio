import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getPageByPath, getSite } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageByPath("/contact");
  const site = await getSite();
  return page ? buildPageMetadata(page, site) : {};
}

export default function ContactPage() {
  return <PageSections path="/contact" />;
}
