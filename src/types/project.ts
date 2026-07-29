export type ProjectIconId = "shield" | "nodes" | "face" | "chart" | "code";

export interface ProjectCardDTO {
  id: string;
  slug: string;
  icon: ProjectIconId;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

export interface ProjectDetailDTO extends ProjectCardDTO {
  contentHtml: string;
  featured: boolean;
  published: boolean;
}
