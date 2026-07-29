import Link from "next/link";
import LogoMark from "./LogoMark";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Homepage"
      className="inline-flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
    >
      <LogoMark className="h-10 w-10 text-foreground" />
    </Link>
  );
}
