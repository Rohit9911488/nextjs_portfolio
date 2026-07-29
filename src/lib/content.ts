import { getAllProjectCards, getFeaturedProjectCards } from "./db/projects";
import { getAllPages, getPageByPath } from "./db/pages";
import { getSite } from "./db/settings";
import type { ProjectItem } from "@/types/content";
import type { ProjectCardDTO } from "@/types/project";

function toProjectItem(project: ProjectCardDTO): ProjectItem {
  return {
    id: project.id,
    slug: project.slug,
    icon: project.icon,
    title: project.title,
    category: project.category,
    summary: project.description,
    description: project.description,
    technologies: project.tags,
    image: project.image,
    imageAlt: project.imageAlt,
    href: `/projects/${project.slug}`,
  };
}

export { getSite, getAllPages, getPageByPath };

export async function getAllProjects(): Promise<ProjectItem[]> {
  const projects = await getAllProjectCards();
  return projects.map(toProjectItem);
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectItem[]> {
  const projects = await getFeaturedProjectCards(limit);
  return projects.map(toProjectItem);
}
