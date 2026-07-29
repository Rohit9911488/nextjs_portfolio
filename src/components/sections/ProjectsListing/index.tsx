import Reveal from "@/components/Reveal";
import { getProjectCategoriesFromDb, getProjectsPage } from "@/lib/db/projects";
import {
  buildProjectCategories,
  parseProjectsPageParam,
  PROJECTS_PER_PAGE,
} from "@/lib/projects";
import type { ProjectsSectionData } from "@/types/content";
import ProjectFilters from "./ProjectFilters";
import ProjectListingCard from "./ProjectListingCard";
import ProjectsPager from "./ProjectsPager";
import styles from "./ProjectsListing.module.css";

export default async function ProjectsListing({
  data,
  categorySlug,
  pageParam,
}: {
  data: ProjectsSectionData;
  categorySlug?: string | null;
  pageParam?: string | null;
}) {
  const categoryNames = await getProjectCategoriesFromDb();
  const categories = buildProjectCategories(categoryNames);
  const activeCategory =
    categories.find((category) => category.slug === categorySlug)?.slug ?? "all";
  const requestedPage = parseProjectsPageParam(pageParam);
  const { items, total, totalPages, page } = await getProjectsPage({
    categorySlug: activeCategory,
    page: requestedPage,
    perPage: PROJECTS_PER_PAGE,
  });

  return (
    <section id="projects-list" className={`theme-transition ${styles.section}`}>
      <div className="page-container">
        <header className={styles.intro}>
          {data.eyebrow && <p className={styles.eyebrow}>{data.eyebrow}</p>}
          <h2 className={styles.heading}>{data.heading}</h2>
          {data.description && <p className={styles.description}>{data.description}</p>}
        </header>

        <div className={styles.controls}>
          <ProjectFilters activeCategory={activeCategory} categories={categories} />
          <p className={styles.count}>
            {total} project{total === 1 ? "" : "s"}
          </p>
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>No projects in this category yet.</p>
        ) : (
          <div className={styles.grid}>
            {items.map((project) => (
              <div key={project.id} className={styles.item}>
                <Reveal className={styles.reveal}>
                  <ProjectListingCard project={project} />
                </Reveal>
              </div>
            ))}
          </div>
        )}

        <ProjectsPager
          currentPage={page}
          totalPages={totalPages}
          categorySlug={activeCategory}
        />
      </div>
    </section>
  );
}
