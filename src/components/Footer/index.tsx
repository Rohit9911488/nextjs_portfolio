import Link from "next/link";
import { getSite } from "@/lib/content";
import Icon from "@/components/Icon";
import BackToTop from "./BackToTop";
import styles from "./Footer.module.css";

const SOCIAL_ICON_BY_LABEL: Record<string, string> = {
  LinkedIn: "linkedin",
  GitHub: "github",
  Email: "email",
};

export default async function Footer() {
  const site = await getSite();
  const navLinks = [
    ...site.navigation,
    { label: "Resume", url: site.resumeUrl },
  ];

  return (
    <footer className={`theme-transition ${styles.wrap}`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.statement}>
            {site.footer.statement} <span>{site.footer.statementAccent}</span>
          </p>
          <BackToTop />
        </div>

        <div className={styles.grid}>
          <div>
            <h4 className={styles.colHeading}>About</h4>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.blurb}>{site.footer.description}</p>
          </div>

          <div>
            <h4 className={styles.colHeading}>Navigate</h4>
            <ul className={styles.links}>
              {navLinks.map((link) => {
                const isExternal = link.url.startsWith("http") || link.url.endsWith(".pdf");
                const isResume = link.label === "Resume";

                if (isExternal || isResume) {
                  return (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={styles.link}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={link.url}>
                    <Link href={link.url} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className={styles.colHeading}>Connect</h4>
            <div className={styles.socials}>
              {site.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className={`theme-transition ${styles.social}`}
                >
                  <Icon name={SOCIAL_ICON_BY_LABEL[link.label] ?? "email"} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
            <a href={`mailto:${site.email}`} className={styles.email}>
              {site.email}
            </a>
          </div>
        </div>

        <div className={styles.bar}>
          <span>{site.footer.copyright}</span>
          <span>
            {site.footer.attributionPrefix}{" "}
            <a
              href={site.footer.attributionLink.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.footer.attributionLink.label}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
