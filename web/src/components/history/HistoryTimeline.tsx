"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { milestones } from "@/content/milestones";
import media from "@/content/media-images.json";
import styles from "./HistoryTimeline.module.css";

// Timeline geometry in real pixels (the SVG viewBox follows the measured
// width, so drawSVG lengths match what is on screen). Spec 015 A: the line
// runs on real time, 1987 → 2027 = 40 years, so the 40 year marks are evenly
// spaced and 1998 sits on the 11th. Once joined, the Czech line runs 9 px
// above the European rail, like a second track.
const RAIL_Y = 58;
const CZ_Y = 49;
const FIRST = 1987;
const SPAN = 40;
const DOCK_YEAR = 1998;
/** Where the Czech approach begins, as a share of the 1987–1998 stretch. */
const APPROACH = 0.52;
const APPROACH_YEAR = FIRST + (DOCK_YEAR - FIRST) * APPROACH;
const share = (year: number) => (year - FIRST) / SPAN;
const marks = Array.from({ length: SPAN }, (_, i) => FIRST + 1 + i);
function routeGeometry(width: number) {
  const dock = share(DOCK_YEAR) * width;
  const f = (n: number) => n.toFixed(1);
  return {
    eu: `M0 ${RAIL_Y}H${f(width)}`,
    approach: `M${f(dock * APPROACH)} 12H${f(dock * 0.7)}C${f(dock * 0.86)} 12 ${f(dock * 0.84)} ${CZ_Y} ${f(dock)} ${CZ_Y}`,
    track: `M${f(dock)} ${CZ_Y}H${f(width)}`,
    czStart: share(DOCK_YEAR) * APPROACH * 100,
    marks: marks.map((year) => ({
      year,
      x: f(share(year) * width),
      decade: (year - FIRST) % 10 === 0,
    })),
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

/**
 * Mobile (and reduced / short screens): the 40 years as a control above the
 * milestones (master synthesis P0 „Swipe 40 let“). Swiping the milestones
 * moves the yellow dot, the drawn line and the travelled marks to that year;
 * tapping or dragging the strip, or arrow keys on it, jumps to a milestone.
 * No pin, no scroll hijack; without JS it is a static strip and a list.
 */
function FortyStrip({
  active,
  onPick,
}: {
  active: number;
  onPick: (index: number) => void;
}) {
  const pct = (year: number) => (share(year) * 100).toFixed(3) + "%";
  const year = stations[active].year;
  const nearest = (value: number) =>
    stations.reduce(
      (best, station, i) =>
        Math.abs(station.year - value) < Math.abs(stations[best].year - value)
          ? i
          : best,
      0,
    );
  return (
    <div className={styles.forty}>
      <div className={styles.fortyInner}>
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.fortyRail} d="M0 6H400" />
          <path
            className={styles.fortyEu}
            d="M0 6H400"
            pathLength={1}
            style={{ strokeDashoffset: 1 - share(year) }}
          />
          <path
            className={styles.fortyCz}
            d={`M${share(DOCK_YEAR) * 400} 2H400`}
            pathLength={1}
            style={{
              strokeDashoffset:
                1 - Math.max(0, (year - DOCK_YEAR) / (FIRST + SPAN - DOCK_YEAR)),
              opacity: year >= DOCK_YEAR ? 1 : 0,
            }}
          />
          {marks.map((mark) => (
            <line
              key={mark}
              className={styles.mark}
              data-past={mark <= year}
              x1={share(mark) * 400}
              x2={share(mark) * 400}
              y1={9}
              y2={(mark - FIRST) % 10 === 0 ? 19 : 15}
            />
          ))}
        </svg>
        <span className={styles.fortyDot} style={{ left: pct(year) }} aria-hidden="true" />
        {[FIRST, DOCK_YEAR, 2004, FIRST + SPAN].map((label) => (
          <span
            key={label}
            className={styles.fortyLabel}
            style={{ left: pct(label) }}
            data-edge={
              label === FIRST ? "start" : label === FIRST + SPAN ? "end" : undefined
            }
            aria-hidden="true"
          >
            {label}
          </span>
        ))}
        <input
          className={styles.fortyInput}
          type="range"
          min={FIRST}
          max={FIRST + SPAN}
          step={1}
          value={year}
          aria-label="Rok na časové ose 1987–2027"
          aria-valuetext={stations[active].date + ", " + stations[active].title}
          onChange={(event) => onPick(nearest(event.currentTarget.valueAsNumber))}
          onKeyDown={(event) => {
            const step =
              event.key === "ArrowRight" || event.key === "ArrowUp"
                ? 1
                : event.key === "ArrowLeft" || event.key === "ArrowDown"
                  ? -1
                  : 0;
            const jump = event.key === "Home" ? 0 : event.key === "End" ? stations.length - 1 : -1;
            if (!step && jump < 0) return;
            event.preventDefault();
            onPick(jump >= 0 ? jump : Math.min(stations.length - 1, Math.max(0, active + step)));
          }}
        />
      </div>
    </div>
  );
}

export function HistoryTimeline() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const routes = useRef<HTMLDivElement>(null);
  const [routeWidth, setRouteWidth] = useState(1400);
  const staticList = useRef<HTMLOListElement>(null);
  const [staticActive, setStaticActive] = useState(0);

  // The milestone most in view drives the strip (horizontal swipe on phones,
  // vertical reading on short or reduced-motion desktops).
  useEffect(() => {
    const list = staticList.current;
    if (!list) return;
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
        let best = -1;
        let top = 0.35;
        ratios.forEach((ratio, element) => {
          if (ratio > top) {
            top = ratio;
            best = Number((element as HTMLElement).dataset.index);
          }
        });
        if (best >= 0) setStaticActive(best);
      },
      { threshold: [0, 0.35, 0.5, 0.65, 0.8, 1] },
    );
    list.querySelectorAll("li").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function pickStatic(index: number) {
    const list = staticList.current;
    const item = list?.querySelectorAll<HTMLElement>("li")[index];
    if (!list || !item) return;
    setStaticActive(index);
    const behavior = reduced ? "instant" : "smooth";
    if (list.scrollWidth > list.clientWidth + 1)
      list.scrollTo({ left: item.offsetLeft - list.offsetLeft, behavior });
    else item.scrollIntoView({ block: "start", behavior });
  }
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
          const euTrace = pin.querySelector("[data-eu-trace]");
          const czApproach = pin.querySelector("[data-cz-approach]");
          const czTrace = pin.querySelector("[data-cz-trace]");
          const ticks =
            pin.querySelectorAll<SVGLineElement>("[data-year-mark]");
          const counter = pin.querySelector<HTMLElement>("[data-year-count]")!;
          let travelled = -1;
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
            // 015 A: the line travels only while the year changes and waits at
            // each station; traces and the 40 marks follow the shown year.
            const at = gsap.utils.interpolate(
              stations[previous].year,
              stations[next].year,
              change,
            );
            const clamp = gsap.utils.clamp(0, 1);
            gsap.set(euTrace, {
              drawSVG: "0% " + (share(at) * 100).toFixed(3) + "%",
            });
            gsap.set(czApproach, {
              drawSVG:
                "0% " +
                (
                  clamp((at - APPROACH_YEAR) / (DOCK_YEAR - APPROACH_YEAR)) *
                  100
                ).toFixed(3) +
                "%",
            });
            gsap.set(czTrace, {
              drawSVG:
                "0% " +
                (
                  clamp((at - DOCK_YEAR) / (FIRST + SPAN - DOCK_YEAR)) * 100
                ).toFixed(3) +
                "%",
            });
            const passed = Math.floor(at + 1e-6);
            if (passed !== travelled) {
              travelled = passed;
              ticks.forEach((tick) => {
                tick.dataset.past = String(Number(tick.dataset.year) <= passed);
              });
              counter.textContent = "Rok " + (passed - FIRST) + " ze " + SPAN;
            }
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
          // The traces are drawn in apply() from the shown year (015 A); the
          // Czech label still appears as the approach begins.
          timeline.fromTo(
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
            ticks.forEach((tick) => delete tick.dataset.past);
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
                <span
                  className={styles.yearCount}
                  data-year-count
                  aria-hidden="true"
                >
                  Rok 0 ze {SPAN}
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
              {geometry.marks.map((mark) => (
                <line
                  key={mark.year}
                  className={styles.mark}
                  data-year-mark
                  data-year={mark.year}
                  data-decade={mark.decade || undefined}
                  x1={mark.x}
                  x2={mark.x}
                  y1={RAIL_Y + 4}
                  y2={RAIL_Y + (mark.decade ? 16 : 11)}
                />
              ))}
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
                <li
                  key={station.year}
                  style={{ left: (share(station.year) * 100).toFixed(3) + "%" }}
                >
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
        <FortyStrip active={staticActive} onPick={pickStatic} />
        <ol ref={staticList} aria-label="Milníky 1987–2027">
          {stations.map((station, i) => (
            <li
              key={station.year}
              data-index={i}
              data-dark={station.year >= 2004}
              aria-current={staticActive === i ? "step" : undefined}
            >
              <div className={styles.staticInner}>
                <figure className={styles.figure}>
                  <div className={styles.stack} data-grain>
                    <Photo station={station} />
                  </div>
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
