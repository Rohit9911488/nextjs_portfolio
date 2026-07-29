import ProjectFallback from "@/components/ProjectFallback";
import ProjectImage from "@/components/ProjectImage";
import { hasProjectImage } from "@/lib/project-image";
import type { ProjectItem } from "@/types/content";

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index?: number;
}) {
  const hasImage = hasProjectImage(project.image);

  return (
    <article className="group theme-transition flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_48px_-28px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_48px_-28px_rgba(255,255,255,0.15)]">
      <div className="relative">
        {typeof index === "number" && (
          <span className="absolute left-4 top-4 z-10 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {hasImage ? (
          <div className="relative aspect-4/3 w-full overflow-hidden">
            <ProjectImage
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <ProjectFallback
            projectId={project.id}
            alt={project.imageAlt}
            className="aspect-4/3 w-full rounded-none border-0 border-b transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.href) && (
          <div className="mt-6 flex gap-4 text-sm font-medium">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground underline decoration-border-strong underline-offset-4 transition-transform hover:decoration-2 group-hover:translate-x-0.5"
            >
              View project
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
