"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getScrollY } from "@/lib/scroll";

const HIDE_THRESHOLD = 80;
const DIRECTION_DELTA = 4;

export default function HeaderScrollShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  function syncScrollState() {
    const y = getScrollY();
    setScrolled(y > 8);

    const delta = y - lastY.current;
    if (y < HIDE_THRESHOLD) {
      setHidden(false);
    } else if (delta > DIRECTION_DELTA) {
      setHidden(true);
    } else if (delta < -DIRECTION_DELTA) {
      setHidden(false);
    }
    lastY.current = y;
  }

  useEffect(() => {
    lastY.current = getScrollY();
    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });
    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  // Header state persists in the layout across navigations — reset when the
  // route changes so a hidden header on the previous page doesn't stay hidden.
  useEffect(() => {
    setHidden(false);
    setScrolled(false);
    lastY.current = 0;
  }, [pathname]);

  // Publishes the header's real (measured) height as --header-height so the
  // primary hero can center its content in the space actually left below
  // the fixed header, instead of the full viewport. Falls back to the
  // value in globals.css until this runs.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty("--header-height", `${entry.contentRect.height}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-30 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`py-6 transition-colors duration-300 sm:py-8 ${
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="page-container flex items-center justify-between">{children}</div>
      </div>
    </header>
  );
}
