import Image from "next/image";
import { getAboutContent } from "@/lib/site";
import styles from "./SubPageHero.module.css";

type SubPageHeroProps = {
  variant?: "default" | "about";
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function SubPageHero({
  variant = "default",
  eyebrow = "Sub page",
  title = "Sub page hero title",
  description = "Shorter hero used on inner pages. Replace copy per route.",
}: SubPageHeroProps) {
  if (variant === "about") {
    const content = getAboutContent();

    return (
      <section className={styles.aboutSection} aria-labelledby="about-page-heading">
        <div className={`site-container ${styles.aboutInner}`}>
          <h1 id="about-page-heading" className={styles.aboutHeading}>
            {content.heading}
          </h1>

          <div className={styles.aboutContent}>
            <p className={styles.aboutTitle}>{content.title}</p>
            <p className={styles.aboutCopy}>{content.copy}</p>

            <div className={styles.actions}>
              <a
                href={content.resumeHref}
                className={styles.cta}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.ctaLabel}>{content.resumeLabel}</span>
                <span className={styles.ctaIcon} aria-hidden>
                  <span className={styles.ctaIconDefault}>
                    <Image
                      src="/icons/circle.svg"
                      alt=""
                      width={42}
                      height={42}
                      unoptimized
                    />
                  </span>
                  <span className={styles.ctaIconHover}>
                    <Image
                      src="/icons/arrow.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </span>
                </span>
              </a>

              <a
                href={content.linkedInUrl}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>

              <a
                href={content.githubUrl}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Image
                  src="/icons/github.svg"
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={`site-container ${styles.inner}`}>
        <p className={styles.label}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
