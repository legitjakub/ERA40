"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { stories, storyPhoto } from "@/content/stories";
import { storyImpact } from "@/content/story-impact";
import { StoryLabel } from "@/components/archive/StoryLabel";
import s from "./ThenNow.module.css";

// Spec 009, chapter 06 "Návrat": what continues after the return, and who it reaches.
// Only existing model-story content; the reach line paraphrases each story's impact summary.
const returns = [
  { id: "ucitelka", reach: "Dostává se to k jejím žákům." },
  { id: "praha-in", reach: "Dostává se to k novým zahraničním studentům." },
  { id: "kariera", reach: "Dostává se to ke kolegům v jeho týmu." },
].map(({ id, reach }) => {
  const story = stories.find((item) => item.id === id)!;
  return { story, reach, photo: storyPhoto(story), summary: storyImpact(story)?.summary ?? story.excerpt };
});

export function ThenNow() {
  const root = useRef<HTMLElement>(null);
  const manual = useRef(false);
  const [position, setPosition] = useState(50);
  const [selection, setSelection] = useState(0);
  const reduced = usePrefersReducedMotion();
  const person = returns[selection];

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
              Po návratu.
            </h2>
            <p>
              Pobyt skončil. To, co si lidé přivezli, dnes dostávají další: žáci,
              kolegové, noví studenti. Posuňte čáru mezi tehdy a dnes.
            </p>
          </header>
          <div
            className={s.options}
            data-handoff-copy
            role="group"
            aria-label="Vyberte člověka"
          >
            {returns.map((item, index) => (
              <button
                type="button"
                key={item.story.id}
                aria-pressed={selection === index}
                onClick={() => {
                  manual.current = true;
                  setSelection(index);
                  setPosition(50);
                }}
              >
                {item.story.name}
              </button>
            ))}
          </div>
          <figure className={s.figure}>
            <div
              className={s.comparison}
              data-grain
              style={{ "--divider": position + "%", "--dnes": (100 - position) / 100 } as CSSProperties}
            >
              <Image
                src={person.photo.file}
                alt={person.photo.alt}
                fill
                sizes="(max-width: 1440px) 93vw, 1320px"
                className={s.image}
              />
              <div className={s.reveal}>
                <div className={s.now}>
                  <p className={s.nowText}>{person.summary}</p>
                  <p className={s.nowReach}>{person.reach}</p>
                </div>
              </div>
              <div className={s.tags} aria-hidden="true">
                <span>Tehdy</span>
                <span>Dnes</span>
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
                aria-label={"Podíl strany Tehdy. " + person.story.name}
                aria-valuetext={
                  position +
                  " % strany Tehdy, " +
                  (100 - position) +
                  " % strany Dnes"
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
                key={person.story.id}
                className={s.captions}
                aria-live="polite"
                aria-atomic="true"
              >
                <div>
                  <b>Tehdy</b>
                  {person.story.year} · {person.story.from} → {person.story.to}
                </div>
                <div>
                  <b>Dnes</b>
                  {person.story.name}, <StoryLabel story={person.story} />
                </div>
              </div>
              <div className={s.notes}>
                <span id="then-now-hint">
                  Posuňte dělicí čáru tahem nebo šipkami na klávesnici.
                </span>
                <span>Postavy jsou modelové, fotografie ilustrační.</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
