"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { chapters } from "@/content/chapters";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const CHAPTERS = chapters.map(({ id }, index) => ({ id, label: String(index + 1).padStart(2, "0") }));

/** Tracing Art–inspired chapter progress (live-verified pattern). */
export function ChapterProgress() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    if (reduced) return;

    const triggers: ScrollTrigger[] = [];

    CHAPTERS.forEach((ch, i) => {
      const el = document.getElementById(ch.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        }),
      );
    });

    const page = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      triggers.forEach((t) => t.kill());
      page.kill();
    };
  }, [reduced]);

  useEffect(() => {
    document.body.dataset.act = String(active + 1);
    document.documentElement.style.setProperty(
      "--page-progress",
      String(progress),
    );
  }, [active, progress]);

  if (reduced) {
    return (
      <div className="chapter-progress is-static" aria-hidden="true">
        <div className="chapter-progress-bar" style={{ transform: "scaleY(1)" }} />
      </div>
    );
  }

  return (
    <nav className="chapter-progress" aria-label="Průběh kapitol">
      <div
        className="chapter-progress-bar"
        style={{ transform: `scaleY(${Math.max(progress, 0.02)})` }}
      />
      <ol>
        {CHAPTERS.map((ch, i) => (
          <li key={ch.id}>
            <a
              href={`#${ch.id}`}
              className={i === active ? "is-active" : ""}
              aria-current={i === active ? "true" : undefined}
            >
              <span>{ch.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
