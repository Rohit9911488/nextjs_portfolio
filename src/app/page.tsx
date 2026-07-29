import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getPageByPath, getSite } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath("/");
  const site = await getSite();
  return page ? buildPageMetadata(page, site) : {};
}

export default function Home() {
  return <PageSections path="/" />;
}
