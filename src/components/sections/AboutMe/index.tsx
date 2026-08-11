import Link from "next/link";
import { getAboutContent } from "@/lib/site";
import styles from "./AboutMe.module.css";

type AboutMeProps = {
  showCta?: boolean;
};

export default function AboutMe({ showCta = true }: AboutMeProps) {
  const content = getAboutContent();

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={`site-container ${styles.inner}`}>
        <h2 id="about-heading" className={styles.heading}>
          {content.heading}
        </h2>

        <div className={styles.content}>
          <p className={styles.title}>{content.title}</p>
          <p className={styles.copy}>{content.copy}</p>

          {showCta ? (
            <Link href={content.ctaHref} className={styles.link}>
              <span className={styles.linkInner}>
                <span className={styles.linkLabel}>{content.ctaLabel}</span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
