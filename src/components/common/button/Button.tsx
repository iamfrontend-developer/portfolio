"use client";

import React, { ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import Link from "next/link";

const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const hash = e.currentTarget.getAttribute("href") ?? "";
  if (!hash.startsWith("#") || hash.length < 2 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis && !reduced) window.__lenis.scrollTo(target);
  else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  history.replaceState(history.state, "", hash);
};

type ButtonProps = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
  | "primary"
  | "primaryDark"
  | "white"
  | "outline"
  | "outlineDark";
  size?: "default" | "medium" | "small";
  showArrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  align?: "left" | "center" | "right";
  as?: "link" | "button";
  href?: string;
  external?: boolean;
  ariaLabel?: string;
};

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "default",
  showArrow = true,
  className = "",
  children,
  style,
  disabled = false,
  type = "button",
  align = "left",
  as = "button",
  href,
  external,
  ariaLabel,
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  const isOutline = variant === "outline" || variant === "outlineDark";

  const content = (
    <>
      <span className={clsx(styles.fill, isOutline && styles.borderFill)} aria-hidden="true" />
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.label}>{children ?? text}</span>
      {showArrow && (
        <span className={styles.arrow} aria-hidden="true">
          <svg
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 9h14" />
            <path d="M12 13l4-4" />
            <path d="M12 5l4 4" />
          </svg>
        </span>
      )}
    </>
  );

  const buttonClass = clsx(
    styles.ctaButton,
    variant === "primaryDark" && styles.primaryDark,
    variant === "white" && styles.white,
    variant === "outline" && styles.outline,
    variant === "outlineDark" && styles.outlineDark,
    size === "small" && styles.small,
    size === "medium" && styles.medium,
    !showArrow && styles.noArrow,
    disabled && styles.disabled,
    className
  );

  return (
    <div
      className={clsx(
        styles.buttonWrapper,
        align === "center" && styles.center,
        align === "right" && styles.right
      )}
    >
      {as === "link" ? (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
            style={style}
            aria-label={ariaLabel}
          >
            {content}
          </a>
        ) : (
          <Link
            href={href ?? "#"}
            className={buttonClass}
            style={style}
            aria-label={ariaLabel}
            onClick={scrollToAnchor}
          >
            {content}
          </Link>
        )
      ) : (
        <button
          type={type}
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={ariaLabel}
          onClick={handleClick}
          style={style}
          className={buttonClass}
        >
          {content}
        </button>
      )}
    </div>
  );
}
