"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
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

export function EuropeMap({ land }: { land: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const { mapIndex: active, selectMapStory: setActive } = useJourney();
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
          <h2 id="map-title">Blíž, než se zdá.</h2>
          <p>
            Cesty ven. Cesty k nám.
            <br />
            Vyberte město a poznejte příběh.
          </p>
        </header>
        <div className={s.layout}>
          <div className={s.map}>
            <svg
              viewBox="0 0 840 870"
              aria-label="Mapa Evropy s trasami modelových příběhů"
              role="group"
            >
              <defs>
                <clipPath id="europe-bounds">
                  <rect width="840" height="870" />
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
                  <circle cx={from[0]} cy={from[1]} r="5" />
                  {selected.id !== "praha-in" && (
                    <text x={from[0] - 12} y={from[1] + 24} textAnchor="end">{selected.from}</text>
                  )}
                  {selected.id === "praha-in" && (
                    <><circle cx={to[0]} cy={to[1]} r="5" /><text x={to[0] + 13} y={to[1] + 23}>Praha</text></>
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
                      r="23"
                      className={s.hit}
                    />
                    <circle
                      cx={point[0]}
                      cy={point[1]}
                      r={active === i ? 7 : 5}
                    />
                    <text x={point[0] + 13} y={point[1] + 5}>
                      {story.id === "praha-in" ? "Lisabon" : story.to}
                    </text>
                  </g>
                ))}
                <circle
                  ref={traveller}
                  className={s.traveller}
                  cx={to[0]} cy={to[1]} r="7"
                  aria-hidden="true"
                />
              </g>
            </svg>
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
              <span>Ilustrační snímek</span>
            </div>
            <p className={s.status}>
              <StoryStatus story={selected} />
            </p>
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
              Číst příběh {selected.name} <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
