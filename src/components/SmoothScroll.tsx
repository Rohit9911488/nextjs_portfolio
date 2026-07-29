"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { refreshScroll, setLenis } from "@/lib/scroll";
import "lenis/dist/lenis.css";

let scrollTriggerRegistered = false;
function ensureScrollTrigger() {
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
}

// Lenis smooth scroll, kept in lockstep with GSAP/ScrollTrigger so the
// homepage's pinned stack-cards don't jump or desync while scrolling.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureScrollTrigger();

    const lenis = new Lenis({ autoRaf: false });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const resizeObserver = new ResizeObserver(() => refreshScroll());
    resizeObserver.observe(document.body);

    const onLoad = () => refreshScroll();
    window.addEventListener("load", onLoad);

    document.fonts?.ready.then(() => refreshScroll());

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    refreshScroll();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      resizeObserver.disconnect();
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
