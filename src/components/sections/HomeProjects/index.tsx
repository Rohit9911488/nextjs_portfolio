import CtaButton from "@/components/CtaButton";
import { getFeaturedProjects } from "@/lib/content";
import type { ProjectsSectionData } from "@/types/content";
import HomeProjectCard from "../HomeProjectCard";
import StackCardShell from "../StackCardShell";
import styles from "./HomeProjects.module.css";

export default async function HomeProjects({ data }: { data: ProjectsSectionData }) {
  const projects = await getFeaturedProjects(3);

  return (
    <StackCardShell background="surface2" zIndexClassName="md:z-[3]" cardVariant="compact">
      <div className={styles.shell}>
        <div className={styles.head}>
          {data.eyebrow && (
            <p data-stack="eyebrow" className={styles.eyebrow}>
              {data.eyebrow}
            </p>
          )}
          <h2 data-stack="heading" className={styles.heading}>
            {data.heading}
          </h2>
          {data.description && (
            <p data-stack="body" className={styles.description}>
              {data.description}
            </p>
          )}
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.id} data-stack="item" className={styles.item}>
              <HomeProjectCard project={project} />
            </div>
          ))}
        </div>

        {data.primaryCta && (
          <div className={styles.cta}>
            <CtaButton cta={data.primaryCta} variant="secondary" />
          </div>
        )}
      </div>
    </StackCardShell>
  );
}
