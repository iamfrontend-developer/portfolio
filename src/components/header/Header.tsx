"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import baseStyle from "../../app/base.module.scss";
import styles from "./Header.module.scss";
import { Moon, PersonStanding, Sun } from "lucide-react";

type Theme = "light" | "dark";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const closeMenu = () => setMenuOpen(false);

  // Sync state with whatever theme was applied on first load
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch { }
  };

  return (
    <header className={styles.header}>
      <div className={baseStyle.container}>
        <div className={styles.headerRow}>
          <Link href="#home" className={styles.logo} onClick={closeMenu}>
            <span>MS</span>
            <span className={styles.logoDot}>.</span>
          </Link>

          <nav
            id="main-navigation"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.navLink}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            <div className={styles.theameModeWrapper}>
              <button
                type="button"
                className={`${styles.theameModeButton} ${styles.modeButton}`}
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun width={18} height={18} strokeWidth={2} />
                ) : (
                  <Moon width={18} height={18} strokeWidth={2} />
                )}
              </button>

              <button
                type="button"
                className={`${styles.accessibiliityButton} ${styles.modeButton}`}
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <PersonStanding width={18} height={18} strokeWidth={2} />
              </button>
            </div>
          </nav>

          <button
            type="button"
            className={`${styles.menuToggle} ${menuOpen ? styles.menuActive : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;