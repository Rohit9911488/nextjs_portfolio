import AboutSkills from "./AboutSkills";
import type { CardsSectionData } from "@/types/content";
import HomeCards from "./HomeCards";
import SectionShell from "./SectionShell";
import Icon from "@/components/Icon";

export default function Cards({
  data,
  variant = "default",
}: {
  data: CardsSectionData;
  variant?: "default" | "home" | "about";
}) {
  if (variant === "home") {
    return <HomeCards data={data} />;
  }

  if (variant === "about") {
    return <AboutSkills data={data} />;
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

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <article
              key={item.title}
              className="group theme-transition relative flex min-h-58 flex-col overflow-hidden rounded-2xl border border-border bg-background/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_24px_48px_-28px_rgba(255,255,255,0.15)]"
            >
              <span className="absolute right-6 top-6 text-xs font-semibold tabular-nums text-muted/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.icon && (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                  <Icon
                    name={item.icon}
                    className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  />
                </span>
              )}
              <h3 className="mt-6 text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
