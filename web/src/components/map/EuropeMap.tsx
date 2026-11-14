"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { stories, storyPhoto } from "@/content/stories";

import { StoryStatus, useOpenStory } from "@/components/people/StoryDialog";
import { project, routeArc } from "@/lib/geo/europe";
import s from "./EuropeMap.module.css";

const prague = project([14.42, 50.08]);
const destinations = stories.map((story) => ({
  story,
  point: project(story.id === "praha-in" ? story.coords.from : story.coords.to),
}));
const route = routeArc;

export function EuropeMap({ land }: { land: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const open = useOpenStory();
  const selected = destinations[active].story,
    photo = storyPhoto(selected);
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
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section
      ref={root}
      id="mapa"
      data-section="evropa"
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
                {destinations.map(({ story }, i) => (
                  <path
                    data-route
                    key={story.id}
                    className={s.route}
                    data-active={active === i}
                    d={route(project(story.coords.from), project(story.coords.to))}
                    aria-hidden="true"
                  />
                ))}
                <g aria-hidden="true" className={s.prague}>
                  <circle cx={prague[0]} cy={prague[1]} r="8" />
                  <text x={prague[0] + 13} y={prague[1] + 27}>
                    Praha
                  </text>
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
            <div className={s.photo} data-grain>
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
