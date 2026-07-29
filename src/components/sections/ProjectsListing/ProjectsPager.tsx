import Link from "next/link";
import { buildProjectsUrl, getPagerItems } from "@/lib/projects";
import styles from "./ProjectsListing.module.css";

export default function ProjectsPager({
  currentPage,
  totalPages,
  categorySlug,
}: {
  currentPage: number;
  totalPages: number;
  categorySlug: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPagerItems(currentPage, totalPages);

  return (
    <nav className={styles.pager} aria-label="Projects pagination">
      <Link
        href={buildProjectsUrl({ category: categorySlug, page: currentPage - 1 })}
        className={`theme-transition ${styles.pageButton}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
        data-disabled={currentPage === 1 ? "" : undefined}
      >
        ← Prev
      </Link>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className={`${styles.pageButton} ${styles.pageDots}`} aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildProjectsUrl({ category: categorySlug, page: item })}
            className={`theme-transition ${styles.pageButton} ${item === currentPage ? styles.pageActive : ""}`}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </Link>
        ),
      )}

      <Link
        href={buildProjectsUrl({ category: categorySlug, page: currentPage + 1 })}
        className={`theme-transition ${styles.pageButton}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
        data-disabled={currentPage === totalPages ? "" : undefined}
      >
        Next →
      </Link>
    </nav>
  );
}
