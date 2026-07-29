import type { ReactNode } from "react";
import styles from "./StackCardShell.module.css";

const BACKGROUND_STYLES = {
  surface1: styles.surface1,
  surface2: styles.surface2,
  inverse: styles.inverse,
} as const;

export default function StackCardShell({
  children,
  background,
  zIndexClassName,
  cardVariant = "default",
}: {
  children: ReactNode;
  background: keyof typeof BACKGROUND_STYLES;
  zIndexClassName: string;
  cardVariant?: "default" | "relaxed" | "compact";
}) {
  const cardClass =
    cardVariant === "relaxed"
      ? `${styles.card} ${styles.cardRelaxed}`
      : cardVariant === "compact"
        ? `${styles.card} ${styles.cardCompact}`
        : styles.card;

  return (
    <section
      data-stack-card
      data-inverse-shell={background === "inverse" ? "" : undefined}
      className={`${styles.stackCard} relative md:min-h-screen ${zIndexClassName}`}
    >
      <div className={`${styles.shell} flex w-full flex-col md:min-h-screen md:py-10`}>
        <div className={`${cardClass} w-full ${BACKGROUND_STYLES[background]}`}>
          <div className="relative w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
