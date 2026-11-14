"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { useMotionReady } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { attachSmoothScroller } from "@/lib/motion/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ready = useMotionReady();
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
  }, [reduced]);
  useEffect(() => {
    // The exhibition needs a scroll clock; reading pages and forms use the
    // browser's native scroll, without an idle Lenis ticker or stale inertia.
    if (!ready || pathname !== "/") return;
    registerGsap();
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive)
        requestAnimationFrame(() => {
          if (alive) {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          }
        });
    });
    if (reduced)
      return () => {
        alive = false;
      };
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (pointer: fine)", () => {
      let disposed = false;
      let cleanup: (() => void) | undefined;
      void import("lenis").then(({ default: Lenis }) => {
        if (disposed) return;
        const lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          anchors: true,
          prevent: (el) => el.closest("dialog") !== null,
        });
        const release = attachSmoothScroller(lenis);
        const skews: ReturnType<typeof gsap.quickTo>[] = [];
        // The shared layout survives client-side navigation. Bind effects to
        // this page's nodes and revert them before creating the next instance.
        const context = gsap.context(() => {
          document.querySelectorAll<HTMLElement>("main [data-velocity-type]")
            .forEach((title) => {
              skews.push(gsap.quickTo(title, "skewX", { duration: 0.35 }));
            });
        });
        const onScroll = ({ velocity }: Lenis) => {
          ScrollTrigger.update();
          skews.forEach((skew) =>
            skew(gsap.utils.clamp(-3, 3, velocity * 0.06)),
          );
        };
        lenis.on("scroll", onScroll);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        cleanup = () => {
          gsap.ticker.remove(tick);
          release();
          lenis.off("scroll", onScroll);
          lenis.destroy();
          context.revert();
        };
      });
      return () => {
        disposed = true;
        cleanup?.();
      };
    });
    return () => {
      alive = false;
      mm.revert();
    };
  }, [reduced, ready, pathname]);
  return children;
}
