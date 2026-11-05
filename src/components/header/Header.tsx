"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import baseStyle from "../../app/base.module.scss"
import styles from "./Header.module.scss";
import { Moon } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={baseStyle.container}>
        <div className={styles.headerRow}>
          {/* Logo */}
          <Link href="#home" className={styles.logo} onClick={closeMenu}>
            <span>MS</span>
            <span className={styles.logoDot}>.</span>
          </Link>

          {/* Navigation */}

          <nav
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ""
              }`}
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
              <button className={styles.theameModeButton}>
                <Moon width={18} height={18} strokeWidth={2} />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`${styles.menuToggle} ${menuOpen ? styles.menuActive : ""
              }`}
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