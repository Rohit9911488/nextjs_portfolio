import CtaButton from "@/components/CtaButton";
import GlobeNetwork from "@/components/GlobeNetwork";
import type { HeroSectionData } from "@/types/content";

// The animated globe is this project's one established hero visual — it
// doubles as the "theme-compatible fallback" for the portrait/photo assets
// the content JSON references but that haven't been supplied yet, so no
// section here renders a broken <img>. Every page's hero shares this exact
// treatment (full viewport height, same type scale, same spacing) — only
// the content (eyebrow/heading/description/CTAs) is page-specific.
export default function Hero({ data }: { data: HeroSectionData }) {
  return (
    <section
      aria-label={data.heading}
      className="relative flex h-svh max-h-svh items-center justify-start overflow-hidden pt-(--header-height) sm:justify-center"
    >
      <GlobeNetwork />

      <div className="page-container relative z-10 flex w-full flex-col items-start text-left sm:items-center sm:text-center">
        {data.eyebrow && (
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm">
            {data.eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-225 font-display text-balance text-[clamp(2.25rem,9vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:mt-4 sm:text-[clamp(2.75rem,5vw,4.5rem)] sm:leading-[0.96] sm:tracking-tighter">
          {data.heading}
        </h1>
        {data.description && (
          <p className="mt-4 max-w-170 text-balance text-sm leading-[1.6] text-muted sm:mt-5 sm:text-base">
            {data.description}
          </p>
        )}
        {(data.primaryCta || data.secondaryCta) && (
          <div className="mt-6 flex w-full flex-wrap items-center justify-start gap-4 sm:w-auto sm:justify-center">
            {data.primaryCta && <CtaButton cta={data.primaryCta} variant="primary" />}
            {data.secondaryCta && <CtaButton cta={data.secondaryCta} variant="secondary" />}
          </div>
        )}
      </div>
    </section>
  );
}
