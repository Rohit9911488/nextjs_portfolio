import { unstable_cache } from "next/cache";
import { cache } from "react";
import { CACHE_TAGS } from "./cache";
import { mapProjectToCard, mapProjectToDetail, projectInclude } from "./mappers";
import { prisma } from "./prisma";
import type { ProjectCardDTO, ProjectDetailDTO } from "@/types/project";
import { categoryToSlug } from "@/lib/projects";

const listProjects = unstable_cache(
  async () =>
    prisma.project.findMany({
      where: { published: true },
      include: projectInclude,
      orderBy: [{ order: "asc" }, { title: "asc" }],
    }),
  ["projects-all"],
  { tags: [CACHE_TAGS.projects] },
);

export async function getAllProjectCards(): Promise<ProjectCardDTO[]> {
  const projects = await listProjects();
  return projects.map(mapProjectToCard);
}

export async function getFeaturedProjectCards(limit = 3): Promise<ProjectCardDTO[]> {
  const projects = await listProjects();
  return projects.filter((project) => project.featured).slice(0, limit).map(mapProjectToCard);
}

export async function getProjectCategoriesFromDb(): Promise<string[]> {
  const projects = await listProjects();
  return Array.from(new Set(projects.map((project) => project.category)));
}

export async function getProjectsPage(options: {
  categorySlug?: string | null;
  page: number;
  perPage: number;
}): Promise<{
  items: ProjectCardDTO[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const projects = await listProjects();
  const filtered =
    !options.categorySlug || options.categorySlug === "all"
      ? projects
      : projects.filter((project) => categoryToSlug(project.category) === options.categorySlug);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / options.perPage));
  const page = Math.min(Math.max(1, options.page), totalPages);
  const start = (page - 1) * options.perPage;

  return {
    items: filtered.slice(start, start + options.perPage).map(mapProjectToCard),
    total,
    totalPages,
    page,
  };
}

export const getProjectBySlug = cache(async (slug: string): Promise<ProjectDetailDTO | null> => {
  const fetchProject = unstable_cache(
    async () =>
      prisma.project.findUnique({
        where: { slug },
        include: projectInclude,
      }),
    [`project-${slug}`],
    { tags: [CACHE_TAGS.project(slug), CACHE_TAGS.projects] },
  );

  const project = await fetchProject();
  if (!project || !project.published) {
    return null;
  }

  return mapProjectToDetail(project);
});

export async function getPublishedProjectSlugs(): Promise<string[]> {
  const projects = await listProjects();
  return projects.map((project) => project.slug);
}
