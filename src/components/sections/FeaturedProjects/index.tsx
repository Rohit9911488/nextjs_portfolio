import Image from "next/image";
import { getFeaturedProjectsContent } from "@/lib/site";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  const content = getFeaturedProjectsContent();

  return (
    <section id="work" className={styles.section} aria-labelledby="featured-projects-heading">
      <div className={`site-container ${styles.inner}`}>
        <header className={styles.header}>
          <h2 id="featured-projects-heading" className={styles.title}>
            {content.title}
          </h2>
          <p className={styles.subhead}>{content.subhead}</p>
        </header>

        <ul className={styles.list}>
          {content.projects.map((project) => (
            <li key={project.title} className={styles.card}>
              <div className={styles.media}>
                <div className={styles.mediaInner}>
                  <p className={styles.tag}>{project.tag}</p>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 552px"
                    className={styles.image}
                  />
                </div>
              </div>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>

                <div className={styles.info}>
                  <h4 className={styles.infoTitle}>Project Info</h4>
                  <dl className={styles.infoList}>
                    {project.info.map((row) => (
                      <div key={row.topic} className={styles.infoRow}>
                        <dt className={styles.infoTopic}>{row.topic}</dt>
                        <dd className={styles.infoValue}>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className={styles.links}>
                  <a
                    href={project.liveUrl}
                    className={styles.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.projectLinkInner}>
                      <span className={styles.projectLinkLabel}>
                        {content.liveLabel}
                      </span>
                      <Image
                        className={styles.projectLinkIcon}
                        src="/icons/arrow_green.svg"
                        alt=""
                        width={16}
                        height={16}
                        unoptimized
                      />
                    </span>
                  </a>

                  <a
                    href={project.githubUrl}
                    className={styles.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.projectLinkInner}>
                      <span className={styles.projectLinkLabel}>
                        {content.githubLabel}
                      </span>
                      <Image
                        className={styles.projectLinkIcon}
                        src="/icons/github_green.svg"
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                      />
                    </span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
