import Link from "next/link";
import type { ProjectCardDTO } from "@/types/project";
import ProjectCompactCard from "../shared/ProjectCompactCard";
import styles from "./ProjectListingCard.module.css";

export default function ProjectListingCard({ project }: { project: ProjectCardDTO }) {
  const card = (
    <ProjectCompactCard
      layout="listing"
      project={{
        icon: project.icon,
        category: project.category,
        title: project.title,
        summary: project.description,
        technologies: project.tags,
      }}
      className={styles.linked}
    />
  );

  return (
    <Link href={`/projects/${project.slug}`} className={`${styles.link} ${styles.shell}`}>
      {card}
    </Link>
  );
}
