import type { ReactNode } from "react";
import type { ProjectIconId } from "@/types/project";

const ICONS: Record<ProjectIconId, ReactNode> = {
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7-7 8-4-1-7-3.5-7-8V6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.8 1.8L15 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  nodes: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
      <path d="M12 12L5 6M12 12l7-6M12 12l-7 6M12 12l7 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  face: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 8V6h2M18 8V6h-2M6 16v2h2M18 16v2h-2" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="4.5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10.4" cy="11" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13.6" cy="11" r="0.6" fill="currentColor" stroke="none" />
      <path d="M10.4 14q1.6 1.3 3.2 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="7" y="12" width="3" height="6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="12" y="8" width="3" height="10" stroke="currentColor" strokeWidth="1.8" />
      <rect x="17" y="5" width="3" height="13" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="8 6 3 12 8 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="16 6 21 12 16 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

export function ProjectIcon({ icon }: { icon: ProjectIconId }) {
  return ICONS[icon] ?? ICONS.shield;
}
