"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

type NavItem = {
  label: string;
  href: string;
  hash: boolean;
  index: string;
};

type HeaderBarProps = {
  name: string;
  linkedInUrl: string;
  githubUrl: string;
  navItems: NavItem[];
  mobileEyebrow: string;
  mobileCtaLabel: string;
  mobileCtaHref: string;
};

export default function HeaderBar({
  name,
  linkedInUrl,
  githubUrl,
  navItems,
  mobileEyebrow,
  mobileCtaLabel,
  mobileCtaHref,
}: HeaderBarProps) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      if (menuOpen) {
        setHidden(false);
        return;
      }

      const y = window.scrollY;
      const scrollingDown = y > lastY;
      const pastHeader = y > 64;

      setHidden(scrollingDown && pastHeader);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${hidden ? styles.headerHidden : ""} ${
        menuOpen ? styles.headerMenuOpen : ""
      }`}
    >
      <div className={`site-container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {name}
        </Link>

        <nav aria-label="Primary" className={styles.navDesktop}>
          {navItems.map((item) =>
            item.hash ? (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.burgerIcon} aria-hidden>
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileGlow} aria-hidden />

        <div className={`site-container ${styles.mobileContent}`}>
          <p className={styles.mobileEyebrow}>{mobileEyebrow}</p>

          <nav aria-label="Mobile" className={styles.navMobile}>
            {navItems.map((item, index) => {
              const className = styles.mobileLink;
              const style = {
                transitionDelay: menuOpen ? `${120 + index * 90}ms` : "0ms",
              };

              const body = (
                <>
                  <span className={styles.mobileIndex}>{item.index}</span>
                  <span className={styles.mobileLabel}>{item.label}</span>
                  <span className={styles.mobileArrow} aria-hidden>
                    →
                  </span>
                </>
              );

              return item.hash ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={className}
                  style={style}
                  onClick={closeMenu}
                >
                  {body}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={className}
                  style={style}
                  onClick={closeMenu}
                >
                  {body}
                </Link>
              );
            })}
          </nav>

          <div
            className={styles.mobileFooter}
            style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
          >
            <a
              href={mobileCtaHref}
              className={styles.mobileCta}
              onClick={closeMenu}
            >
              <span className={styles.mobileCtaLabel}>{mobileCtaLabel}</span>
              <span className={styles.mobileCtaIcon} aria-hidden>
                <Image
                  src="/icons/arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                />
              </span>
            </a>

            <div className={styles.mobileSocials}>
              <a
                href={linkedInUrl}
                className={styles.mobileSocial}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                />
              </a>
              <a
                href={githubUrl}
                className={styles.mobileSocial}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Image
                  src="/icons/github.svg"
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
