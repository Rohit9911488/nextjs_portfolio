import type { TimelineSectionData } from "@/types/content";
import AboutTimeline from "./AboutTimeline";
import SectionShell from "./SectionShell";

export default function Timeline({
  data,
  variant = "default",
}: {
  data: TimelineSectionData;
  variant?: "default" | "home" | "about";
}) {
  if (variant === "about") {
    return <AboutTimeline data={data} />;
  }

  return (
    <SectionShell className={data.surface ? "bg-surface" : ""}>
      <div className="w-full">
        <div className="flex flex-col items-start text-left sm:items-center sm:text-center">
          {data.eyebrow && (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.heading}
          </h2>
        </div>

        <ol className="mt-12 flex flex-col gap-12 border-l border-border pl-8 sm:gap-14 sm:pl-10">
          {data.items.map((item) => (
            <li key={`${item.title}-${item.organisation}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground sm:-left-[2.65rem]"
              />

              <div className="sm:grid sm:grid-cols-[11rem_1fr] sm:gap-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted sm:pt-1">
                  {item.period}
                </p>

                <div className="mt-1 sm:mt-0">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-muted">{item.organisation}</p>

                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-3 flex flex-col gap-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5 text-sm leading-6 text-muted">
                          <span
                            aria-hidden="true"
                            className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
