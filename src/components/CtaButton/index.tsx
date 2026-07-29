import Link from "next/link";
import type { CtaLink } from "@/types/content";
import styles from "./CtaButton.module.css";

const VARIANT_STYLES = {
  primary: styles.primary,
  secondary: styles.secondary,
  inverse: styles.inverse,
  inverseOutline: styles.inverseOutline,
} as const;

export default function CtaButton({
  cta,
  variant = "primary",
  className = "",
}: {
  cta: CtaLink;
  variant?: keyof typeof VARIANT_STYLES;
  className?: string;
}) {
  const isExternal = cta.external ?? /^https?:\/\//.test(cta.url);
  const sharedClassName =
    `theme-transition ${styles.base} ${VARIANT_STYLES[variant]} ${className}`.trim();

  if (isExternal) {
    return (
      <a href={cta.url} target="_blank" rel="noopener noreferrer" className={sharedClassName}>
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.url} className={sharedClassName}>
      {cta.label}
    </Link>
  );
}
