import { getLenis } from "./scroll";

let refreshFrame = 0;
let scrollTriggerPromise: Promise<typeof import("gsap/ScrollTrigger").ScrollTrigger> | null = null;
let gsapPromise: Promise<typeof import("gsap").default> | null = null;

function loadScrollTrigger() {
  scrollTriggerPromise ??= import("gsap/ScrollTrigger").then((mod) => mod.ScrollTrigger);
  return scrollTriggerPromise;
}

function loadGsap() {
  gsapPromise ??= import("gsap").then((mod) => mod.default);
  return gsapPromise;
}

let scrollTriggerRegistered = false;

export async function ensureScrollTrigger() {
  const [gsap, ScrollTrigger] = await Promise.all([loadGsap(), loadScrollTrigger()]);

  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }

  return { gsap, ScrollTrigger };
}

/** Keep Lenis scroll limits and ScrollTrigger in sync after layout changes. */
export function refreshScroll() {
  cancelAnimationFrame(refreshFrame);
  refreshFrame = requestAnimationFrame(() => {
    getLenis()?.resize();
    void loadScrollTrigger().then((ScrollTrigger) => ScrollTrigger.refresh());
  });
}
