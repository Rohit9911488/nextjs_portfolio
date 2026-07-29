"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });

export default function SmoothScrollDeferred({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
