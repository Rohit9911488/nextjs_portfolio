import CtaButton from "@/components/CtaButton";
import type { CtaSectionData } from "@/types/content";
import aboutShared from "./about/shared/aboutSection.module.css";
import SectionShell from "./SectionShell";
import StackCardShell from "./StackCardShell";

export default function Cta({
  data,
  variant = "default",
}: {
  data: CtaSectionData;
  variant?: "default" | "home" | "about";
}) {
  if (variant === "home") {
    return (
      <StackCardShell background="inverse" zIndexClassName="md:z-[4]">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start text-left sm:items-center sm:text-center">
          {data.eyebrow && (
            <p data-stack="eyebrow" className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
              {data.eyebrow}
            </p>
          )}
          <h2
            data-stack="heading"
            className="mt-4 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl"
          >
            {data.heading}
          </h2>
          {data.description && (
            <p data-stack="body" className="mt-4 text-base leading-7 text-background/70 sm:text-lg">
              {data.description}
            </p>
          )}
          {(data.primaryCta || data.secondaryCta) && (
            <div data-stack="item" className="mt-8 flex flex-wrap items-center justify-start gap-4 sm:justify-center">
              {data.primaryCta && <CtaButton cta={data.primaryCta} variant="inverse" />}
              {data.secondaryCta && <CtaButton cta={data.secondaryCta} variant="inverseOutline" />}
            </div>
          )}
        </div>
      </StackCardShell>
    );
  }

  if (data.style === "solid") {
    const shell = (
      <div className="w-full rounded-[1.75rem] bg-foreground px-6 py-14 text-left sm:px-12 sm:py-20 sm:text-center">
        {data.eyebrow && (
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
            {data.eyebrow}
          </p>
        )}
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
          {data.heading}
        </h2>
        {data.description && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-background/70 sm:text-lg">
            {data.description}
          </p>
        )}
        {(data.primaryCta || data.secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center justify-start gap-4 sm:justify-center">
            {data.primaryCta && <CtaButton cta={data.primaryCta} variant="inverse" />}
            {data.secondaryCta && <CtaButton cta={data.secondaryCta} variant="inverseOutline" />}
          </div>
        )}
      </div>
    );

    if (variant === "about") {
      return (
        <section className={aboutShared.section}>
          <div className={aboutShared.wrap}>{shell}</div>
        </section>
      );
    }

    return <SectionShell>{shell}</SectionShell>;
  }

  return (
    <SectionShell minHeightClassName="min-h-105 sm:min-h-120">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start text-left sm:items-center sm:text-center">
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
        {(data.primaryCta || data.secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center justify-start gap-4 sm:justify-center">
            {data.primaryCta && <CtaButton cta={data.primaryCta} variant="primary" />}
            {data.secondaryCta && <CtaButton cta={data.secondaryCta} variant="secondary" />}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
