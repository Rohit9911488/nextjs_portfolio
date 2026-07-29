import CtaButton from "@/components/CtaButton";
import { getFeaturedProjects } from "@/lib/content";
import type { ProjectsSectionData } from "@/types/content";
import HomeProjects from "./HomeProjects";
import ProjectCard from "./ProjectCard";
import SectionShell from "./SectionShell";

export default async function Projects({
  data,
  variant = "default",
}: {
  data: ProjectsSectionData;
  variant?: "default" | "home";
}) {
  if (variant === "home") {
    return <HomeProjects data={data} />;
  }

  const projects = await getFeaturedProjects(data.projectIds?.length ?? 3);

  if (projects.length === 0) {
    return null;
  }

  return (
    <SectionShell>
      <div className="w-full">
        <div className="mx-auto flex max-w-2xl flex-col items-start text-left sm:items-center sm:text-center">
          {data.eyebrow && (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{data.description}</p>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {data.primaryCta && (
          <div className="mt-12 flex justify-start sm:justify-center">
            <CtaButton cta={data.primaryCta} variant="secondary" />
          </div>
        )}
      </div>
    </SectionShell>
  );
}
