import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StackBackdrop from "@/components/sections/StackBackdrop";
import ProjectsListing from "@/components/sections/ProjectsListing";
import Cta from "@/components/sections/Cta";
import { getPageByPath, getSite } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import type { CtaSectionData, HeroSectionData, ProjectsSectionData } from "@/types/content";

type ProjectsPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath("/projects");
  const site = await getSite();
  return page ? buildPageMetadata(page, site) : {};
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const page = await getPageByPath("/projects");
  if (!page) {
    return null;
  }

  const params = await searchParams;
  const hero = page.sections.find((section): section is HeroSectionData => section.type === "hero");
  const listing = page.sections.find(
    (section): section is ProjectsSectionData => section.type === "projects",
  );
  const cta = page.sections.find((section): section is CtaSectionData => section.type === "cta");

  return (
    <>
      {hero && <Hero data={hero} />}
      <StackBackdrop variant="flush">
        {listing && (
          <ProjectsListing
            data={listing}
            categorySlug={params.category ?? "all"}
            pageParam={params.page}
          />
        )}
        {cta && <Cta data={cta} variant="projects" />}
      </StackBackdrop>
    </>
  );
}
