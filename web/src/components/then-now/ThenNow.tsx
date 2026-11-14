"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { comparisons } from "@/content/comparisons";
import s from "./ThenNow.module.css";

export function ThenNow() {
  const root = useRef<HTMLElement>(null);
  const manual = useRef(false);
  const [position, setPosition] = useState(50);
  const [selection, setSelection] = useState(0);
  const reduced = usePrefersReducedMotion();
  const pair = comparisons[selection];

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = root.current;
          if (!section) return;
          section.dataset.pinned = "true";
          const updatePosition = (progress: number) => {
            if (!manual.current) setPosition(Math.round(84 - progress * 68));
          };
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => updatePosition(self.progress),
            onRefresh: (self) => updatePosition(self.progress),
          });
          return () => {
            delete section.dataset.pinned;
          };
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="tehdy-ted"
      data-section="tehdy-ted"
      data-chapter="06"
      aria-labelledby="then-now-title"
      className={s.section}
    >
      <div className={s.scene} data-handoff-stage>
        <div className={s.inner}>
          <header className={s.header} data-handoff-copy>
            <h2 id="then-now-title" className={s.title}>
              Tehdy a teď.
            </h2>
            <p>
              Jak najít cestu, ozvat se domů a uchovat si vzpomínku na pobyt?
            </p>
          </header>
          <div
            className={s.options}
            data-handoff-copy
            role="group"
            aria-label="Vyberte téma porovnání"
          >
            {comparisons.map((item, index) => (
              <button
                type="button"
                key={item.topic}
                aria-pressed={selection === index}
                onClick={() => {
                  manual.current = true;
                  setSelection(index);
                  setPosition(50);
                }}
              >
                {item.topic}
              </button>
            ))}
          </div>
          <figure className={s.figure}>
            <div
              className={s.comparison}
              data-grain
              style={{ "--divider": position + "%" } as CSSProperties}
            >
              <Image
                src={pair.then.file}
                alt={pair.then.alt}
                fill
                sizes="(max-width: 1440px) 93vw, 1320px"
                className={s.image}
              />
              <div className={s.reveal}>
                <Image
                  src={pair.now.file}
                  alt={pair.now.alt}
                  fill
                  sizes="(max-width: 1440px) 93vw, 1320px"
                  className={s.image}
                />
              </div>
              <div className={s.tags} aria-hidden="true">
                <span>Tehdy</span>
                <span>Teď</span>
              </div>
              <div className={s.divider} aria-hidden="true" data-handoff-axis-source>
                <span>‹ ›</span>
              </div>
              <input
                className={s.slider}
                type="range"
                min="0"
                max="100"
                step="1"
                value={position}
                aria-label={"Podíl snímku Tehdy. " + pair.topic}
                aria-valuetext={
                  position +
                  " % snímku Tehdy, " +
                  (100 - position) +
                  " % snímku Teď"
                }
                aria-describedby="then-now-hint"
                onPointerDown={() => {
                  manual.current = true;
                }}
                onChange={(event) => {
                  manual.current = true;
                  setPosition(event.target.valueAsNumber);
                }}
              />
            </div>
            <figcaption>
              <div className={s.positions} role="group" aria-label="Zobrazení porovnání">
                {[
                  { label: "Tehdy", value: 100 },
                  { label: "Obojí", value: 50 },
                  { label: "Teď", value: 0 },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={position === item.value}
                    onClick={() => {
                      manual.current = true;
                      setPosition(item.value);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div
                key={pair.topic}
                className={s.captions}
                aria-live="polite"
                aria-atomic="true"
              >
                <div>
                  <b>Tehdy</b>
                  {pair.then.caption}
                </div>
                <div>
                  <b>Teď</b>
                  {pair.now.caption}
                </div>
              </div>
              <div className={s.notes}>
                <span id="then-now-hint">
                  Posuňte dělicí čáru tahem nebo šipkami na klávesnici.
                </span>
                <span>
                  Ilustrační snímky z Pexels (
                  <a href={pair.then.source}>tehdy</a>,{" "}
                  <a href={pair.now.source}>teď</a>).
                </span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
