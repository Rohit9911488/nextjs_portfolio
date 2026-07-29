"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { CtaLink, NavigationItem } from "@/types/content";

export default function Navigation({
  links,
  headerCta,
  themeToggle,
}: {
  links: NavigationItem[];
  headerCta?: CtaLink;
  themeToggle?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative flex items-center gap-3 sm:gap-4">
      <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.url}
              href={link.url}
              aria-current={isActive ? "page" : undefined}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${
                isActive ? "text-foreground" : "text-foreground/70"
              }`}
            >
              {link.label}.
            </Link>
          );
        })}
      </nav>

      {headerCta && (
        <a
          href={headerCta.url}
          target={headerCta.external ? "_blank" : undefined}
          rel={headerCta.external ? "noopener noreferrer" : undefined}
          className="theme-transition hidden h-10 items-center justify-center rounded-md border border-border-strong px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:inline-flex"
        >
          {headerCta.label}
        </a>
      )}

      {themeToggle}

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
        className="theme-transition inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:hidden"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none">
          <path
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            d={open ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 10h14M3 14h14"}
          />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="theme-transition absolute right-0 top-[calc(100%+0.75rem)] z-20 w-52 rounded-2xl border border-border bg-background p-2 shadow-xl"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.url ? "page" : undefined}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface"
              >
                {link.label}.
              </Link>
            ))}
            {headerCta && (
              <a
                href={headerCta.url}
                target={headerCta.external ? "_blank" : undefined}
                rel={headerCta.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl border-t border-border px-4 py-2.5 pt-3.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface"
              >
                {headerCta.label}
              </a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
