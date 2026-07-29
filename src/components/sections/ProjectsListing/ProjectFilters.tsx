import Link from "next/link";
import { buildProjectsUrl } from "@/lib/projects";
import styles from "./ProjectsListing.module.css";

export default function ProjectFilters({
  activeCategory,
  categories,
}: {
  activeCategory: string;
  categories: Array<{ slug: string; label: string; shortLabel: string }>;
}) {
  return (
    <div className={styles.filters} role="group" aria-label="Filter projects by category">
      {categories.map((category) => {
        const isActive = category.slug === activeCategory;

        return (
          <Link
            key={category.slug}
            href={buildProjectsUrl({ category: category.slug, page: 1 })}
            className={`theme-transition ${styles.chip} ${isActive ? styles.chipActive : ""}`}
            aria-current={isActive ? "true" : undefined}
          >
            {category.shortLabel}
          </Link>
        );
      })}
    </div>
  );
}
