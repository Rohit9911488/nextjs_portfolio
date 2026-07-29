import type { ProjectIconId } from "@/types/project";

const ICON_IDS: ProjectIconId[] = ["shield", "nodes", "face", "chart", "code"];

export function toProjectIconId(value: string): ProjectIconId {
  return ICON_IDS.includes(value as ProjectIconId) ? (value as ProjectIconId) : "code";
}

type ProjectWithTags = {
  id: string;
  slug: string;
  icon: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  contentHtml: string;
  featured: boolean;
  published: boolean;
  tags: Array<{ tag: { name: string } }>;
};

export function mapProjectToCard(project: ProjectWithTags) {
  return {
    id: project.id,
    slug: project.slug,
    icon: toProjectIconId(project.icon),
    category: project.category,
    title: project.title,
    description: project.description,
    tags: project.tags.map(({ tag }) => tag.name),
    image: project.image,
    imageAlt: project.imageAlt || project.title,
  };
}

export function mapProjectToDetail(project: ProjectWithTags) {
  return {
    ...mapProjectToCard(project),
    contentHtml: project.contentHtml,
    featured: project.featured,
    published: project.published,
  };
}

export const projectInclude = {
  tags: {
    include: {
      tag: true,
    },
    orderBy: {
      tag: {
        name: "asc" as const,
      },
    },
  },
};
