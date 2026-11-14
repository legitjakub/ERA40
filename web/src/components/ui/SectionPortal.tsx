"use client";

import { useLayoutEffect, useRef } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Zentry-inspired portal wipe between sections — DOM clip only. */
export function SectionPortal({
  from = "var(--ink)",
  to = "var(--paper)",
}: {
  from?: string;
  to?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
  }, []);

  useGSAP(
    () => {
      if (!root.current || reduced) return;
      gsap.fromTo(
        root.current.querySelector(".portal-wipe"),
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      className="section-portal"
      aria-hidden="true"
      style={{ ["--portal-from" as string]: from, ["--portal-to" as string]: to }}
    >
      <div className="portal-wipe" />
    </div>
  );
}
