"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Smooth scrolling set up like the reference site (raymond-group-website):
// lerp 0.09, driven by GSAP's ticker so ScrollTrigger animations stay in sync with it.
// Off for visitors who prefer reduced motion.
const LERP = 0.09;

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: LERP,
      smoothWheel: true,
      // Let nested scrollable areas (drawers, popups) scroll natively
      prevent: (node) => {
        if (!(node instanceof HTMLElement)) return false;
        for (let current: HTMLElement | null = node; current && current !== document.body; current = current.parentElement) {
          const style = getComputedStyle(current);
          if (/(auto|scroll)/.test(style.overflowY) && current.scrollHeight > current.clientHeight) return true;
        }
        return false;
      },
    });

    // Exposed globally so components (header drawer, section links) can stop / scroll it
    window.__lenis = lenis;

    // Same as the reference: GSAP's ticker drives Lenis and ScrollTrigger updates on every Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate when elements are added or removed. (Lenis already tracks size changes;
    // watching attribute changes too would fire on every GSAP animation frame.)
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => lenis.resize());
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
