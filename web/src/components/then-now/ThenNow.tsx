"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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

// One trip out from home and back, in comparison pixels. Home is the top of the
// divider; the trip goes out wide on the roomier side and returns close to the
// line. At straight = 1 every point lies on the divider, so the round trip folds
// flat into it. A single loop without a crossing: never a figure eight.
function homeRoute(width: number, height: number, divider: number, straight: number) {
  const x = (divider / 100) * width + 1.5;
  const side = x > width / 2 ? -1 : 1;
  const out = side * Math.max(0, Math.min(width * 0.24, (side < 0 ? x : width - x) - 16));
  const back = -side * Math.max(0, Math.min(width * 0.08, (side < 0 ? width - x : x) - 8));
  const point = (dx: number, y: number, flatY: number) =>
    `${(x + dx * (1 - straight)).toFixed(1)} ${(y + (flatY - y) * straight).toFixed(1)}`;
  const h = height;
  return (
    `M${point(0, 0, 0)}` +
    `C${point(out, h * 0.1, h / 3)} ${point(out * 0.9, h * 0.86, (h * 2) / 3)} ${point(out * 0.3, h * 0.86, h)}` +
    `C${point(back, h * 0.86, (h * 2) / 3)} ${point(back, h * 0.2, h / 3)} ${point(0, 0, 0)}`
  );
}

export function ThenNow() {
  const root = useRef<HTMLElement>(null);
  const comparison = useRef<HTMLDivElement>(null);
  const route = useRef<SVGPathElement>(null);
  const manual = useRef(false);
  const divider = useRef(50);
  const redraw = useRef<(() => void) | undefined>(undefined);
  const [position, setPosition] = useState(50);
  const [selection, setSelection] = useState(0);
  const reduced = usePrefersReducedMotion();
  const person = returns[selection];

  useEffect(() => {
    divider.current = position;
    redraw.current?.();
  }, [position]);

  // Any manual choice ends the entry route at once: the line is home.
  const takeOver = () => {
    manual.current = true;
    redraw.current?.();
  };

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current;
        const frame = comparison.current;
        const path = route.current;
        if (!section || !frame || !path) return;
        const inset = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        const shape = { straight: 0 };
        let box = { width: frame.clientWidth, height: frame.clientHeight };
        const drawn: { timeline?: gsap.core.Timeline } = {};
        const build = () =>
          path.setAttribute("d", homeRoute(box.width, box.height, divider.current, shape.straight));
        const state = () => {
          const p = drawn.timeline?.progress() ?? 0;
          frame.dataset.homeRoute =
            manual.current || p >= 1 ? "home" : p <= 0 ? "away" : "drawing";
        };
        // DrawSVG measures the loop itself, so geometry is rebuilt unfolded before each refresh.
        const refreshInit = () => {
          box = { width: frame.clientWidth, height: frame.clientHeight };
          shape.straight = 0;
          build();
        };
        build();
        const timeline = (drawn.timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: state,
          scrollTrigger: {
            trigger: frame,
            start: "top 80%",
            endTrigger: section,
            // Home exactly when the chapter reaches its anchor position.
            end: `top ${inset}px`,
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        }));
        timeline
          .fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7 })
          .fromTo(shape, { straight: 0 }, { straight: 1, duration: 0.3, onUpdate: build });
        // A refresh restores progress without onUpdate, so the state is read again afterwards.
        ScrollTrigger.addEventListener("refreshInit", refreshInit);
        ScrollTrigger.addEventListener("refresh", state);
        redraw.current = () => {
          build();
          state();
        };
        state();
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", refreshInit);
          ScrollTrigger.removeEventListener("refresh", state);
          redraw.current = undefined;
          delete frame.dataset.homeRoute;
        };
      });
      // P2 bod 5: phones and short screens have no pin, so the comparison
      // follows the scroll as the photo passes (then → now), until the
      // reader takes over with a finger, the buttons or the keyboard.
      media.add(
        "(max-width: 1023px), (max-height: 679px)",
        () => {
          const frame = comparison.current;
          if (!frame) return;
          ScrollTrigger.create({
            trigger: frame,
            start: "top 70%",
            end: "bottom 30%",
            onUpdate: (self) => {
              if (!manual.current) setPosition(Math.round(84 - self.progress * 68));
            },
          });
        },
      );
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
              kolegové, noví studenti. Posuň čáru mezi tehdy a teď.
            </p>
          </header>
          <div
            className={s.options}
            data-handoff-copy
            role="group"
            aria-label="Vyber člověka"
          >
            {returns.map((item, index) => (
              <button
                type="button"
                key={item.story.id}
                aria-pressed={selection === index}
                onClick={() => {
                  takeOver();
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
              ref={comparison}
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
                  <div className={s.nowInside}>
                    <p className={s.nowText}>{person.summary}</p>
                    <p className={s.nowReach}>{person.reach}</p>
                  </div>
                </div>
              </div>
              <svg className={s.route} aria-hidden="true" focusable="false">
                <path ref={route} />
              </svg>
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
                aria-label={"Podíl strany Tehdy. " + person.story.name}
                aria-valuetext={
                  position +
                  " % strany Tehdy, " +
                  (100 - position) +
                  " % strany Teď"
                }
                aria-describedby="then-now-hint"
                onPointerDown={takeOver}
                onChange={(event) => {
                  takeOver();
                  setPosition(event.target.valueAsNumber);
                }}
              />
            </div>
            {/* Narrow screens: the same "Teď" text below the split; only one copy is ever displayed. */}
            <div className={s.nowBelow}>
              <p className={s.nowText}>{person.summary}</p>
              <p className={s.nowReach}>{person.reach}</p>
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
                      takeOver();
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
                  <span>
                    {person.story.year} · {person.story.from} → {person.story.to}
                  </span>
                </div>
                <div>
                  <b>Teď</b>
                  <span>
                    {person.story.name}, <StoryLabel story={person.story} />
                  </span>
                </div>
              </div>
              <div className={s.notes}>
                <span id="then-now-hint" className={s.hint}>
                  Posuň dělicí čáru tahem nebo šipkami na klávesnici.
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
