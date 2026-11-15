"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { milestones } from "@/content/milestones";
import media from "@/content/media-images.json";
import styles from "./HistoryTimeline.module.css";

// Timeline geometry in real pixels (the SVG viewBox follows the measured
// width, so drawSVG lengths match what is on screen). Stations are evenly
// spaced: 1998, the second station, sits at width / (n - 1). Once joined,
// the Czech line runs 9 px above the European rail, like a second track.
const RAIL_Y = 58;
const CZ_Y = 49;
function routeGeometry(width: number) {
  const dock = width / (milestones.length - 1);
  const f = (n: number) => n.toFixed(1);
  return {
    eu: `M0 ${RAIL_Y}H${f(width)}`,
    approach: `M${f(dock * 0.52)} 12H${f(dock * 0.7)}C${f(dock * 0.86)} 12 ${f(dock * 0.84)} ${CZ_Y} ${f(dock)} ${CZ_Y}`,
    track: `M${f(dock)} ${CZ_Y}H${f(width)}`,
    czStart: (0.52 / (milestones.length - 1)) * 100,
  };
}

const stations = milestones.map((event) => {
  const photo = media.find((item) => item.id === event.mediaId)!;
  return {
    ...event,
    photo,
    date: event.endYear ? event.year + "–" + event.endYear : String(event.year),
  };
});

function Photo({ station }: { station: (typeof stations)[number] }) {
  return (
    <Image
      src={station.photo.file}
      alt={station.photo.alt}
      fill
      sizes="(min-width: 1024px) 48vw, 92vw"
    />
  );
}

function Caption({ station }: { station: (typeof stations)[number] }) {
  return (
    <>
      <h3>
        <span>{station.title}</span>
      </h3>
      <p>{station.text}</p>
      <a className={styles.source} href={station.source.url}>
        {station.source.label}
      </a>
    </>
  );
}

export function HistoryTimeline() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const routes = useRef<HTMLDivElement>(null);
  const [routeWidth, setRouteWidth] = useState(1400);
  const geometry = routeGeometry(routeWidth);

  useLayoutEffect(() => {
    const element = routes.current;
    if (!element) return;
    const measure = () =>
      setRouteWidth(Math.max(1, Math.round(element.clientWidth)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      if (!section || reduced) return;
      const media = gsap.matchMedia(section);
      media.add(
        "(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = section.querySelector<HTMLElement>("[data-stage]")!;
          const year = pin.querySelector<HTMLElement>("[data-year]")!;
          const photos = pin.querySelectorAll<HTMLElement>("[data-photo]");
          const labels = pin.querySelectorAll<HTMLElement>(
            "[data-caption] h3 span",
          );
          section.dataset.enhanced = "true";
          const time = { position: 0 };
          let current = -1;
          const apply = () => {
            const previous = Math.floor(time.position);
            const fraction = time.position - previous;
            const change = gsap.utils.clamp(0, 1, (fraction - 0.58) / 0.36);
            const next = Math.min(stations.length - 1, previous + 1);
            const shown = change >= 0.5 ? next : previous;
            const value = Math.round(
              gsap.utils.interpolate(
                stations[previous].year,
                stations[next].year,
                change,
              ),
            );
            year.textContent = String(value);
            year.style.fontVariationSettings =
              '"wght" var(--wght-display), "wdth" ' +
              (66 - 40 * Math.sin(change * Math.PI)).toFixed(1);
            if (current !== shown) {
              current = shown;
              setActive(shown);
              pin.dataset.dark = String(stations[shown].year >= 2004);
            }
          };
          const count = stations.length - 1;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + window.innerHeight * 2.5,
              pin: true,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          });
          trigger.current = timeline.scrollTrigger!;
          timeline.to(
            time,
            { position: count, duration: count, onUpdate: apply },
            0,
          );
          timeline
            .fromTo(
              "[data-eu-trace]",
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: count },
              0,
            )
            // The Czech line approaches before 1998, docks beside the European
            // line at the 1998 station and then runs with it to 2027.
            .fromTo(
              "[data-cz-approach]",
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: 0.5 },
              0.5,
            )
            .fromTo(
              "[data-cz-trace]",
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: count - 1 },
              1,
            )
            .fromTo(
              "[data-cz-label]",
              { autoAlpha: 0, y: 6 },
              { autoAlpha: 1, y: 0, duration: 0.25 },
              0.45,
            );
          photos.forEach((photo, i) => {
            if (!i) return;
            const at = i - 0.42;
            timeline
              .fromTo(
                photo,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 0.36 },
                at,
              )
              .fromTo(
                photo.querySelector("img"),
                { scale: 1.09 },
                { scale: 1, duration: 0.44 },
                at,
              )
              .fromTo(
                labels[i],
                { yPercent: 100 },
                { yPercent: 0, duration: 0.21 },
                i - 0.26,
              );
          });
          apply();
          return () => {
            delete section.dataset.enhanced;
            delete pin.dataset.dark;
            year.style.removeProperty("font-variation-settings");
            trigger.current = null;
          };
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  function select(index: number) {
    const pin = trigger.current;
    if (pin)
      window.scrollTo({
        top:
          pin.start + ((pin.end - pin.start) * index) / (stations.length - 1),
        behavior: "instant",
      });
  }

  // Roving focus: one tab stop on the current year, arrows and Home/End move between years.
  function onStopKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = stations.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? Math.min(last, index + 1)
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? Math.max(0, index - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    if (next === index) return;
    select(next);
    event.currentTarget
      .closest("ol")
      ?.querySelectorAll("button")
      [next]?.focus({ preventScroll: true });
  }

  return (
    <section
      ref={root}
      id="historie"
      className={styles.history}
      aria-labelledby="history-title"
      data-chapter="03"
      data-section="historie"
    >
      <h2 id="history-title" className={styles.srTitle}>
        Dvě linie, jedna cesta
      </h2>
      <div data-stage className={styles.stage}>
        <div className={styles.stageInner}>
          <p className={styles.title} aria-hidden="true" data-history-copy>
            Dvě linie, jedna cesta
          </p>
          <div className={styles.scene}>
            <div className={styles.narrative} data-history-copy>
              <span className={styles.trackLabel}>
                {stations[active].line === "cz" ? "Česko" : "Evropa"}
              </span>
              <div
                className={styles.date}
                role="group"
                aria-label={stations[active].date}
              >
                <span data-year aria-hidden="true">
                  1987
                </span>
                <span className={styles.endYear} aria-hidden="true">
                  {stations[active].endYear
                    ? "–" + stations[active].endYear
                    : ""}
                </span>
              </div>
              <div className={styles.captionStack}>
                {stations.map((station, i) => (
                  <div
                    key={station.year}
                    data-caption
                    className={styles.caption}
                    data-active={active === i}
                    inert={active !== i}
                    aria-hidden={active !== i}
                  >
                    <Caption station={station} />
                  </div>
                ))}
              </div>
            </div>
            <figure className={styles.figure}>
              <div className={styles.stack} data-grain data-history-frame>
                {stations.map((station, i) => (
                  <div
                    key={station.year}
                    data-photo
                    aria-hidden={active !== i}
                    className={styles.photo}
                  >
                    <Photo station={station} />
                  </div>
                ))}
              </div>
              <figcaption>Ilustrační snímek</figcaption>
            </figure>
          </div>
          <div ref={routes} className={styles.routes} data-history-copy>
            <svg
              viewBox={`0 0 ${routeWidth} 70`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={styles.rail} d={geometry.eu} />
              <path
                className={styles.rail}
                d={geometry.approach + geometry.track.replace(/^M[^H]+/, "")}
              />
              <path data-eu-trace d={geometry.eu} />
              <path
                data-cz-approach
                className={styles.czTrace}
                d={geometry.approach}
              />
              <path
                data-cz-trace
                className={styles.czTrace}
                d={geometry.track}
              />
            </svg>
            <span className={styles.lineLabel} aria-hidden="true">
              Evropa od roku 1987
            </span>
            <span
              className={styles.lineLabel}
              data-cz-label
              data-line="cz"
              style={{ left: geometry.czStart.toFixed(2) + "%" }}
              aria-hidden="true"
            >
              Česko od roku 1998
            </span>
            <ol className={styles.stops} aria-label="Přejít na milník">
              {stations.map((station, i) => (
                <li key={station.year}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    onKeyDown={(event) => onStopKey(event, i)}
                    tabIndex={active === i ? 0 : -1}
                    aria-current={active === i ? "step" : undefined}
                    aria-label={station.date + ", " + station.title}
                  >
                    {station.year}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className={styles.static}>
        <p className={styles.staticTitle} aria-hidden="true">
          Dvě linie, jedna cesta
        </p>
        <ol>
          {stations.map((station) => (
            <li key={station.year} data-dark={station.year >= 2004}>
              <div className={styles.staticInner}>
                <figure className={styles.figure}>
                  <div className={styles.stack} data-grain>
                    <Photo station={station} />
                  </div>
                  <figcaption>Ilustrační snímek</figcaption>
                </figure>
                <p className={styles.staticDate}>{station.date}</p>
                <div className={styles.staticText}>
                  <Caption station={station} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
