"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getLenis } from "@/lib/scroll";
import { refreshScroll } from "@/lib/scroll-sync";

export default function ScrollRefresh() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    refreshScroll();

    const timeout = window.setTimeout(refreshScroll, 350);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    refreshScroll();
  }, [searchParams]);

  return null;
}
