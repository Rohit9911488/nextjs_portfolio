import type Lenis from "lenis";

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

export function scrollToTop() {
  if (lenisRef) {
    lenisRef.scrollTo(0, { duration: 1.1 });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
