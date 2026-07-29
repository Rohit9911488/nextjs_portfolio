import type { ReactElement, SVGProps } from "react";
import PlaceholderImage from "./PlaceholderImage";

function MedicalVerificationArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 130" fill="none" {...props}>
      <rect x="14" y="14" width="110" height="102" rx="10" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14 46h110M14 74h110"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
        strokeDasharray="4 5"
      />
      <circle cx="45" cy="60" r="3" fill="currentColor" />
      <circle cx="90" cy="42" r="3" fill="currentColor" />
      <circle cx="72" cy="94" r="3" fill="currentColor" />
      <path
        d="M45 60 90 42M45 60 72 94M90 42 72 94"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M150 30c14 4 24 4 34 0v34c0 20-14 34-34 40-20-6-34-20-34-40V30c10 4 20 4 34 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M138 68l9 9 17-19" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CareerPredictionArt(props: SVGProps<SVGSVGElement>) {
  const branches: Array<[number, number]> = [
    [40, 30],
    [40, 65],
    [40, 100],
    [160, 30],
    [160, 65],
    [160, 100],
  ];

  return (
    <svg viewBox="0 0 200 130" fill="none" {...props}>
      <path
        d="M100 65 40 30M100 65 40 65M100 65 40 100M100 65 160 30M100 65 160 65M100 65 160 100"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      {branches.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 6}
          y={y - 6}
          width="12"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
      <circle cx="100" cy="65" r="7" fill="currentColor" />
    </svg>
  );
}

function FaceDetectionArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 130" fill="none" {...props}>
      <rect x="60" y="15" width="80" height="100" rx="34" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="82" cy="55" r="2.6" fill="currentColor" />
      <circle cx="118" cy="55" r="2.6" fill="currentColor" />
      <path d="M85 82c6 6 24 6 30 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M34 24v-9h9M166 24v-9h-9M34 106v9h9M166 106v9h-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M158 92a12 12 0 1 1 -0.01 0" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.6" />
    </svg>
  );
}

const ART_BY_PROJECT_ID: Record<string, (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  "medical-image-verification": MedicalVerificationArt,
  "career-prediction": CareerPredictionArt,
  "face-detection": FaceDetectionArt,
};

export default function ProjectFallback({
  projectId,
  alt,
  className = "",
}: {
  projectId: string;
  alt: string;
  className?: string;
}) {
  const Art = ART_BY_PROJECT_ID[projectId];

  if (!Art) {
    return <PlaceholderImage alt={alt} className={className} />;
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`theme-transition flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface ${className}`}
    >
      <Art
        aria-hidden="true"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[54%] w-[54%] text-muted"
      />
    </div>
  );
}
