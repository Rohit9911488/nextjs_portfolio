import type Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisRef: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisRef = instance;
}

export function getLenis() {
  return lenisRef;
}

export function getScrollY() {
  if (lenisRef) {
    return lenisRef.scroll;
  }

  return window.scrollY;
}

let refreshFrame = 0;

/** Keep Lenis scroll limits and ScrollTrigger in sync after layout changes. */
export function refreshScroll() {
  cancelAnimationFrame(refreshFrame);
  refreshFrame = requestAnimationFrame(() => {
    lenisRef?.resize();
    ScrollTrigger.refresh();
  });
}

export function scrollToTop() {
  if (lenisRef) {
    lenisRef.scrollTo(0, { duration: 1.1 });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
