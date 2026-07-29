export default function LogoMark({
  className,
  title = "Rohit Sachdeva",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      className={className}
    >
      <path
        d="M4 4h11a9 9 0 0 1 0 18h-4l14 14"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="5" cy="34" r="3" fill="currentColor" />
      <circle cx="30" cy="6" r="2" fill="currentColor" />
      <circle cx="36" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}
