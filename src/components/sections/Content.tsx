import dynamic from "next/dynamic";
import CtaButton from "@/components/CtaButton";
import type { ContentSectionData } from "@/types/content";
import SectionShell from "./SectionShell";

const HomeAbout = dynamic(() => import("./HomeAbout"));
const AboutBackground = dynamic(() => import("./AboutBackground"));

export default function Content({
  data,
  variant = "default",
}: {
  data: ContentSectionData;
  variant?: "default" | "home" | "about";
}) {
  if (variant === "home") {
    return <HomeAbout data={data} />;
  }

  if (variant === "about") {
    return <AboutBackground data={data} />;
  }

  return (
    <SectionShell>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[8rem] font-bold leading-none text-foreground/5 sm:-top-12 sm:text-[13rem] lg:-top-16 lg:right-6 lg:text-[16rem]"
      >
        {"{ }"}
      </span>

      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
        <div>
          {data.eyebrow && (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {data.heading}
          </h2>
          <span aria-hidden="true" className="mt-6 hidden h-px w-20 bg-border-strong lg:block" />

          {data.facts && data.facts.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {data.facts.map((fact) => (
                <div key={fact.label}>
                  <p className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {fact.value}
                  </p>
                  <p className="mt-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
          {data.primaryCta && (
            <div className="mt-2">
              <CtaButton cta={data.primaryCta} variant="secondary" />
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
