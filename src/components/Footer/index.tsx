import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`site-container ${styles.inner}`}>
        <p className={styles.credit}>
          <span className={styles.whisper}>designed by</span>
          <a
            href="https://heyvai.dev/"
            className={styles.creditLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            heyvai
          </a>
        </p>
      </div>
    </footer>
  );
}
