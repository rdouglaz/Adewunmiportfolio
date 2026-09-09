"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  // Re-evaluate every ScrollTrigger on each Lenis scroll frame. Otherwise Lenis
  // smooths scrolling on its own loop while ScrollTrigger samples independently,
  // so a fast flick jumps past a trigger's start line unevaluated and its
  // onEnter/onLeaveBack (which drive the keyboard's active-section state) never
  // fire — leaving section animations like the contact keycap "float" stuck.
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;
    // Drive Lenis from GSAP's ticker (its own RAF is off via autoRaf below) so
    // scroll and ScrollTrigger share one clock; kill lag smoothing so a dropped
    // frame can't skip a large scroll delta.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, [lenis]);

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        duration: 2,
        prevent: (node) => {
          if (isInsideModal) return true;
          const modalOpen = node.classList.contains("modall");
          return modalOpen;
        },
      }}
    >
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  );
}

/**
 * In-page anchor navigation that Lenis understands.
 *
 * Native hash jumps fight Lenis (it owns the scroll position on its own RAF
 * loop), so plain `href="#projects"` links often do nothing. This intercepts
 * same-page anchor clicks and routes them through `lenis.scrollTo`, falling
 * back to native smooth scrolling when Lenis isn't running.
 */
function AnchorScrollHandler() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      // Only handle same-page links.
      if (anchor.pathname !== window.location.pathname) return;
      let el: Element | null = null;
      try {
        el = document.querySelector(hash);
      } catch {
        return;
      }
      if (!el) return;
      e.preventDefault();
      window.history.replaceState(null, "", hash);
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.6 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export default SmoothScroll;
