"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureScrollTrigger, refreshScroll } from "@/lib/scroll-sync";
import StackBackdrop from "./StackBackdrop";

const STACK_CARD_SELECTOR = "[data-stack-card]";

export default function StackScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let ctx: { revert: () => void } | undefined;
    let refreshFrame = 0;

    const handleResize = () => refreshScroll();

    void ensureScrollTrigger().then(({ gsap }) => {
      if (disposed || !containerRef.current) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: "(min-width: 768px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { isDesktop, reduceMotion } = context.conditions ?? {};
            if (!isDesktop || reduceMotion) return;

            const cards = gsap.utils.toArray<HTMLElement>(STACK_CARD_SELECTOR);

            cards.forEach((card, index) => {
              const items = card.querySelectorAll<HTMLElement>("[data-stack]");
              if (items.length) {
                gsap.from(items, {
                  opacity: 0,
                  y: 28,
                  stagger: 0.12,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 45%",
                    scrub: 0.3,
                  },
                });
              }

              const next = cards[index + 1];
              if (!next) return;

              gsap.to(card, {
                scale: 0.92,
                filter: "brightness(0.88)",
                y: -24,
                ease: "none",
                scrollTrigger: {
                  trigger: next,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              });
            });
          },
        );
      }, containerRef);

      refreshFrame = requestAnimationFrame(() => refreshScroll());
      window.addEventListener("resize", handleResize);
    });

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(refreshFrame);
      ctx?.revert();
    };
  }, []);

  return <StackBackdrop ref={containerRef} variant="stack">{children}</StackBackdrop>;
}
