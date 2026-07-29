import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

// The shared rhythm every non-hero section is built on: the same padding
// scale and minimum height (so short sections like a CTA don't look stunted
// next to a full project grid) and the same scroll-reveal treatment — one
// architecture, reused everywhere.
export default function SectionShell({
  children,
  className = "",
  minHeightClassName = "min-h-0",
}: {
  children: ReactNode;
  className?: string;
  minHeightClassName?: string;
}) {
  return (
    <section
      className={`relative z-10 flex flex-col justify-center overflow-hidden py-24 sm:py-32 md:py-36 ${minHeightClassName} ${className}`}
    >
      <Reveal className="page-container">{children}</Reveal>
    </section>
  );
}
