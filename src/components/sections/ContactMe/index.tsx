import Image from "next/image";
import { getContactContent } from "@/lib/site";
import ContactForm from "./ContactForm";
import styles from "./ContactMe.module.css";

export default function ContactMe() {
  const content = getContactContent();

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={`site-container ${styles.inner}`}>
        <div className={styles.info}>
          <h2 id="contact-heading" className={styles.heading}>
            {content.heading}
          </h2>

          <div className={styles.lines}>
            <p className={styles.line}>
              <span className={styles.lineMuted}>{content.emailLabel}</span>{" "}
              <a href={`mailto:${content.email}`} className={styles.lineLink}>
                {content.email}
              </a>
            </p>

            <p className={styles.line}>
              <span className={styles.lineMuted}>{content.resumeLabel}</span>{" "}
              <a
                href={content.resumeHref}
                className={styles.lineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.resumeLinkLabel}
              </a>
            </p>
          </div>

          <div className={styles.socials}>
            {content.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />

        <p className={styles.copyright}>{content.copyright}</p>
      </div>
    </section>
  );
}
