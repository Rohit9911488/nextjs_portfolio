import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import ProjectImage from "@/components/ProjectImage";
import { getSite } from "@/lib/content";
import { hasProjectImage } from "@/lib/project-image";
import { getProjectBySlug, getPublishedProjectSlugs } from "@/lib/db/projects";
import { ProjectIcon } from "@/components/sections/shared/projectIcons";
import styles from "./ProjectDetail.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProjectBySlug(slug), getSite()]);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${site.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: new URL(`/projects/${project.slug}`, site.siteUrl).toString(),
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className={`theme-transition ${styles.page}`}>
      <div className="page-container">
        <Link href="/projects#projects-list" className={styles.back}>
          ← Back to projects
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.badge}>
              <ProjectIcon icon={project.icon} />
            </span>
            <p className={styles.category}>{project.category}</p>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className={styles.media}>
          {hasProjectImage(project.image) ? (
            <div className={styles.imageWrap}>
              <ProjectImage
                src={project.image}
                alt={project.imageAlt}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 75rem"
                priority
              />
            </div>
          ) : (
            <PlaceholderImage alt={project.imageAlt} className={styles.placeholder} />
          )}
        </div>

        {project.contentHtml ? (
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        ) : (
          <p className={styles.emptyBody}>Full write-up coming soon.</p>
        )}
      </div>
    </article>
  );
}
