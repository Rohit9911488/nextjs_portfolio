import type { ProjectItem } from "@/types/content";
import ProjectCompactCard from "../shared/ProjectCompactCard";

export default function HomeProjectCard({ project }: { project: ProjectItem }) {
  return <ProjectCompactCard project={project} />;
}
