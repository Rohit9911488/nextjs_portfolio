import Image from "next/image";
import { getHeroContent } from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  const content = getHeroContent();

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={`site-container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>{content.headlineTop}</span>
            <span className={styles.headlineLine}>{content.headlineName}</span>
          </h1>

          <p className={styles.subhead}>{content.description}</p>

          <div className={styles.actions}>
            <a href={content.ctaHref} className={styles.cta}>
              <span className={styles.ctaLabel}>{content.ctaLabel}</span>
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

        <div className={styles.media}>
          <div className={styles.imageFrame}>
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 600px"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
