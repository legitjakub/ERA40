"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const chapters = [
  { id: "hero", label: "Film" },
  { id: "pribehy-intro", label: "Hlas" },
  { id: "historie", label: "Čas" },
  { id: "pribehy", label: "Kapitoly" },
  { id: "mapa", label: "Trasy" },
  { id: "tehdy-ted", label: "Tehdy" },
  { id: "cisla", label: "Čísla" },
  { id: "budoucnost", label: "Dál" },
];

/** Inkwell-inspired pathfinder — orients, does not imprison. */
export function Pathfinder() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      { threshold: [0.15, 0.35], rootMargin: "-20% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="pathfinder" aria-label="Průběh příběhu">
      <div className="pathfinder-track" aria-hidden="true">
        <div
          className="pathfinder-fill"
          style={{ transform: `scaleY(${Math.min(1, Math.max(0, progress))})` }}
        />
      </div>
      <ul>
        {chapters.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={active === c.id ? "is-active" : undefined}
              aria-current={active === c.id ? "true" : undefined}
              onClick={(e) => {
                if (reduced) return;
                e.preventDefault();
                document.getElementById(c.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <span className="pathfinder-dot" />
              <span className="pathfinder-label">{c.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
