import type { ProjectItem } from "@/types/content";
import { ProjectIcon } from "../shared/projectIcons";
import styles from "../HomeProjectCard/HomeProjectCard.module.css";

export type ProjectCardView = Pick<
  ProjectItem,
  "icon" | "category" | "title" | "summary" | "technologies"
>;

export default function ProjectCompactCard({
  project,
  className = "",
  layout = "default",
}: {
  project: ProjectCardView;
  className?: string;
  layout?: "default" | "listing";
}) {
  const cardClass =
    layout === "listing"
      ? `${styles.card} ${styles.cardListing} ${className}`.trim()
      : `${styles.card} ${className}`.trim();

  return (
    <article className={`theme-transition ${cardClass}`}>
      <div className={styles.top}>
        <div className={styles.badge}>
          <ProjectIcon icon={project.icon} />
        </div>
        <p className={styles.category}>{project.category}</p>
      </div>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>

      <div className={styles.tags}>
        {project.technologies.map((tech) => (
          <span key={tech} className={styles.tag}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
