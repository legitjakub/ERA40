"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { DUR, EASE } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { stories, storyPhoto } from "@/content/stories";

import { StoryStatus, useOpenStory } from "@/components/people/StoryDialog";
import { project, routeArc } from "@/lib/geo/europe";
import { useJourney } from "@/components/people/JourneySequence";
import s from "./EuropeMap.module.css";

const destinations = stories.map((story) => ({
  story,
  point: project(story.id === "praha-in" ? story.coords.from : story.coords.to),
}));
const route = routeArc;
/**
 * The visible crop of the 840 × 870 Natural Earth sheet: from Lisbon to
 * Tampere, without the empty far north and east, so the routes fill the frame.
 */
const VIEW = { x: 40, y: 175, w: 640, h: 650 };
/** Map user units per CSS pixel at the desktop layout the marker sizes were drawn for. */
const DESIGN_UNIT = 1.135;
/** Hit radius in CSS pixels, so every city keeps a touch target of at least 44 px. */
const HIT_RADIUS_PX = 23;

export function EuropeMap({ land }: { land: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [unit, setUnit] = useState(DESIGN_UNIT);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width) setUnit(Math.round((VIEW.w / width) * 100) / 100);
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const k = Math.max(1, unit / DESIGN_UNIT);
  const hitR = Math.max(23, Math.ceil(HIT_RADIUS_PX * unit));
  const { mapStoryId, selectMapStory } = useJourney();
  const active = Math.max(0, destinations.findIndex(({ story }) => story.id === mapStoryId));
  const setActive = (index: number) => selectMapStory(destinations[index].story.id);
  const activeRoute = useRef<SVGPathElement>(null);
  const traveller = useRef<SVGCircleElement>(null);
  const reduced = usePrefersReducedMotion();
  const open = useOpenStory();
  const selected = destinations[active].story,
    photo = storyPhoto(selected);
  const from = project(selected.coords.from), to = project(selected.coords.to);
  useGSAP(
    () => {
      registerGsap();
      if (reduced) return;
      gsap.fromTo(
        "[data-route]",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          stagger: 0.08,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "center 45%",
            scrub: 0.5,
          },
        },
      );
      gsap.from("[data-city]", {
        scale: 0,
        transformOrigin: "center",
        duration: DUR.s,
        stagger: 0.05,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  useGSAP(() => {
    if (reduced || !activeRoute.current || !traveller.current) return;
    const path = activeRoute.current, dot = traveller.current;
    const length = path.getTotalLength();
    const progress = { value: 0 };
    const place = () => {
      const point = path.getPointAtLength(length * progress.value);
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
    };
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top 35%", once: true },
    });
    timeline.fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", duration: DUR.l, ease: "none" }, 0)
      .to(progress, { value: 1, duration: DUR.l, ease: "none", onUpdate: place }, 0)
      .fromTo(dot, { opacity: 0 }, { opacity: 1, duration: DUR.xs, ease: EASE.out }, 0);
    place();
  }, { scope: root, dependencies: [reduced, active] });
  return (
    <section
      ref={root}
      id="mapa"
      data-section="evropa"
      data-active-story={selected.id}
      aria-labelledby="map-title"
      className={s.section}
    >
      <div className={s.inner}>
        <header className={s.heading}>
          <h2 id="map-title">Blíž, než se&nbsp;zdá.</h2>
          <p>
            Cesty ven. Cesty k nám.
            <br />
            Vyber město a projdi modelový příběh.
          </p>
        </header>
        <div className={s.layout}>
          <div className={s.map}>
            <div className={s.mapNav} role="group" aria-label="Procházet trasy příběhů">
              <button type="button" aria-label="Předchozí trasa" onClick={() => setActive((active - 1 + destinations.length) % destinations.length)}>
                <span aria-hidden="true">←</span>
              </button>
              <p aria-live="polite" aria-atomic="true">
                <strong>{selected.from} → {selected.to}</strong>
                <span>Trasa {active + 1} z {destinations.length}</span>
              </p>
              <button type="button" aria-label="Další trasa" onClick={() => setActive((active + 1) % destinations.length)}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className={s.frame}>
              <svg
                ref={svgRef}
                viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
                aria-label="Mapa Evropy s trasami modelových příběhů"
                role="group"
                style={{ "--map-unit": unit } as CSSProperties}
              >
                <defs>
                  <clipPath id="europe-bounds">
                    <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} />
                  </clipPath>
                </defs>
                <g clipPath="url(#europe-bounds)">
                  {land}
                  {destinations.map(({ story }) => (
                    <path
                      data-route
                      key={story.id}
                      className={s.route}
                      d={route(project(story.coords.from), project(story.coords.to))}
                      aria-hidden="true"
                    />
                  ))}
                  <path
                    ref={activeRoute}
                    className={s.activeRoute}
                    d={route(from, to)}
                    aria-hidden="true"
                  />
                  <g aria-hidden="true" className={s.endpoint}>
                    <circle cx={from[0]} cy={from[1]} r={5 * k} />
                    {selected.id !== "praha-in" && (
                      <text x={from[0] - 12 * k} y={from[1] + 24 * k} textAnchor="end">{selected.from}</text>
                    )}
                    {selected.id === "praha-in" && (
                      <>
                        <circle cx={to[0]} cy={to[1]} r={5 * k} />
                        <text x={to[0] + 13 * k} y={to[1] + 23 * k}>Praha</text>
                      </>
                    )}
                  </g>
                  {destinations.map(({ story, point }, i) => (
                    <g
                      key={story.id}
                      data-city
                      className={s.city}
                      data-active={active === i}
                      role="button"
                      tabIndex={0}
                      aria-label={
                        story.id === "praha-in"
                          ? "Lisabon do Prahy, příběh Inês"
                          : story.to + ", příběh " + story.name
                      }
                      onFocus={() => setActive(i)}
                      onPointerEnter={() => setActive(i)}
                      onClick={(e) => {
                        setActive(i);
                        open(story, e.currentTarget);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(i);
                          open(story, e.currentTarget);
                        }
                      }}
                    >
                      <circle
                        cx={point[0]}
                        cy={point[1]}
                        r={hitR}
                        className={s.hit}
                      />
                      <circle
                        cx={point[0]}
                        cy={point[1]}
                        r={(active === i ? 7 : 5) * k}
                      />
                      {/* Lisbon's label sits under its dot so it never covers Valencie. */}
                    {/* Cities near the crop's right edge (Tampere) label to the left. */}
                    <text
                      x={point[0] + (story.id === "praha-in" ? -4 : point[0] > VIEW.x + VIEW.w * 0.78 ? -13 : 13) * k}
                      y={point[1] + (story.id === "praha-in" ? 26 : 5) * k}
                      textAnchor={story.id !== "praha-in" && point[0] > VIEW.x + VIEW.w * 0.78 ? "end" : undefined}
                    >
                        {story.id === "praha-in" ? "Lisabon" : story.to}
                      </text>
                    </g>
                  ))}
                  <circle
                    ref={traveller}
                    className={s.traveller}
                    cx={to[0]} cy={to[1]} r={7 * k}
                    aria-hidden="true"
                  />
                </g>
              </svg>
            </div>
            <a
              className={s.credit}
              href="https://www.naturalearthdata.com/about/terms-of-use/"
            >
              Mapový podklad Natural Earth
            </a>
          </div>
          <div className={s.panel}>
            <div
              className={s.selection}
              role="group"
              aria-label="Destinace příběhů"
            >
              {destinations.map(({ story }, i) => (
                <button
                  type="button"
                  key={story.id}
                  aria-pressed={active === i}
                  onFocus={() => setActive(i)}
                  onPointerEnter={() => setActive(i)}
                  onClick={(e) => {
                    setActive(i);
                    open(story, e.currentTarget);
                  }}
                >
                  {story.id === "praha-in" ? "Lisabon → Praha" : story.to}
                </button>
              ))}
            </div>
            <div className={s.photo} data-grain data-map-photo data-flip-id={"story-photo-" + selected.id}>
              <Image
                src={photo.file}
                alt={photo.alt}
                fill
                sizes="(min-width:1024px) 30vw,90vw"
              />
            </div>
            {selected.status !== "model-story" && (
              <p className={s.status}>
                <StoryStatus story={selected} />
              </p>
            )}
            <h3>
              {selected.from} → {selected.to}
            </h3>
            <p className={s.quote}>„{selected.quote}“</p>
            <button
              className={s.open}
              type="button"
              onClick={(e) =>
                open(
                  selected,
                  e.currentTarget,
                  e.currentTarget.parentElement?.querySelector(
                    "[data-flip-id]",
                  ),
                )
              }
            >
              Celý příběh: {selected.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
