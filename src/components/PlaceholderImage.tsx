export default function PlaceholderImage({
  alt,
  className = "",
}: {
  alt: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`theme-transition relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface ${className}`}
    >
      <svg viewBox="0 0 64 64" width="34%" height="34%" fill="none" aria-hidden="true" className="text-muted">
        <rect x="6" y="6" width="52" height="52" rx="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="23" cy="23" r="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M11 46l13.5-14 9.5 9.5 7-7L53 46"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
