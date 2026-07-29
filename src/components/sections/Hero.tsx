import CtaButton from "@/components/CtaButton";
import GlobeNetwork from "@/components/GlobeNetwork/GlobeNetworkDeferred";
import type { HeroSectionData } from "@/types/content";

// The animated globe is this project's one established hero visual — it
// doubles as the "theme-compatible fallback" for the portrait/photo assets
// the content JSON references but that haven't been supplied yet, so no
// Every page's hero shares this treatment: ~68svh on mobile with equal
// vertical padding below the header, full viewport on sm+. Only the content
// (eyebrow/heading/description/CTAs) is page-specific.
export default function Hero({ data }: { data: HeroSectionData }) {
  return (
    <section
      aria-label={data.heading}
      className="relative flex min-h-[68svh] flex-col overflow-hidden pt-(--header-height) sm:h-svh sm:max-h-svh sm:min-h-0 sm:justify-center"
    >
      <GlobeNetwork />

      <div className="flex w-full flex-1 flex-col justify-center py-(--hero-mobile-pad) sm:flex-none sm:justify-start sm:py-0">
        <div className="page-container relative z-10 flex w-full flex-col items-start text-left sm:items-center sm:text-center">
        {data.eyebrow && (
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm">
            {data.eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-225 font-display text-balance text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-foreground sm:mt-4 sm:text-[clamp(2.75rem,5vw,4.5rem)] sm:leading-[0.96] sm:tracking-tighter">
          {data.heading}
        </h1>
        {data.description && (
          <p className="mt-3 max-w-170 text-balance text-sm leading-[1.55] text-muted sm:mt-5 sm:text-base sm:leading-[1.6]">
            {data.description}
          </p>
        )}
        {(data.primaryCta || data.secondaryCta) && (
          <div className="mt-5 flex w-full flex-wrap items-center justify-start gap-3 sm:mt-6 sm:w-auto sm:justify-center sm:gap-4">
            {data.primaryCta && <CtaButton cta={data.primaryCta} variant="primary" />}
            {data.secondaryCta && <CtaButton cta={data.secondaryCta} variant="secondary" />}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
