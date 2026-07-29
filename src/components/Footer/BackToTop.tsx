"use client";

import { scrollToTop } from "@/lib/scroll";
import styles from "./Footer.module.css";

function ArrowUp() {
  return (
    <svg
      className={styles.toTopIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="5 12 12 5 19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BackToTop() {
  function handleClick() {
    scrollToTop();
  }

  return (
    <button type="button" className={`theme-transition ${styles.toTop}`} onClick={handleClick}>
      Back to top
      <ArrowUp />
    </button>
  );
}
