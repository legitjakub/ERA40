"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { stories } from "@/content/stories";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./Future.module.css";

// The closing Trasa: the eight story journeys as filled stations, a bend,
// an open station for the reader's own journey, and a line that leaves the
// right edge of the screen unfinished. Geometry is in real pixels so the
// drawn length matches the screen.
const ROUTE_H = 132;
function finalRoute(width: number) {
  const top = 22;
  const low = ROUTE_H - 34;
  const bendAt = Math.round(width * (width < 600 ? 0.5 : 0.58));
  const bend = Math.min(150, Math.max(70, width * 0.12));
  const stops = stories.map((story, i) => ({
    city: story.to,
    x: Math.round(8 + ((bendAt - 40) * (i + 1)) / stories.length),
  }));
  const open = Math.round(bendAt + bend + Math.min(90, width * 0.08));
  return {
    d: `M8 ${top}H${bendAt}C${bendAt + bend / 2} ${top} ${bendAt + bend / 2} ${low} ${bendAt + bend} ${low}H${width + 8}`,
    top,
    low,
    stops,
    open,
    // Share of the path drawn when the line reaches a point on the top run.
    at: (x: number) => x / (width + bend * 0.4),
  };
}

export function Future() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const journey = useRef<HTMLDivElement>(null);
  const [routeWidth, setRouteWidth] = useState(1280);
  const route = finalRoute(routeWidth);

  useLayoutEffect(() => {
    const element = journey.current;
    if (!element) return;
    const measure = () =>
      setRouteWidth(Math.max(320, Math.round(element.clientWidth)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useGSAP(
    () => {
      registerGsap();
      if (reduced) return;
      const mm = gsap.matchMedia();
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "center 55%",
          scrub: 0.5,
        },
      });
      timeline
        .from(
          "[data-future-line]",
          { yPercent: 110, stagger: 0.1, ease: "none", duration: 0.7 },
          0,
        )
        .fromTo(
          "[data-final-route]",
          { drawSVG: "0%" },
          { drawSVG: "100%", ease: "none", duration: 1 },
          0,
        );
      const geometry = finalRoute(journey.current?.clientWidth ?? 1280);
      gsap.utils
        .toArray<SVGElement>("[data-final-stop]", root.current)
        .forEach((stop, i) => {
          const label = root.current?.querySelectorAll("[data-final-city]")[i];
          const at = geometry.at(geometry.stops[i]?.x ?? 0);
          timeline.fromTo(
            stop,
            { scale: 0, transformOrigin: "50% 50%" },
            { scale: 1, duration: 0.06, ease: "none" },
            at,
          );
          if (label)
            timeline.fromTo(
              label,
              { autoAlpha: 0, y: 6 },
              { autoAlpha: 1, y: 0, duration: 0.08, ease: "none" },
              at,
            );
        });
      timeline.fromTo(
        "[data-final-open]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.1, ease: "none" },
        0.72,
      );
      mm.add("(pointer:fine)", () => {
        const cta = root.current?.querySelector<HTMLElement>("[data-magnetic]");
        if (!cta) return;
        const x = gsap.quickTo(cta, "x", { duration: 0.3 });
        const y = gsap.quickTo(cta, "y", { duration: 0.3 });
        const move = (e: PointerEvent) => {
          const r = cta.getBoundingClientRect();
          x((e.clientX - r.x - r.width / 2) * 0.06);
          y((e.clientY - r.y - r.height / 2) * 0.12);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        cta.addEventListener("pointermove", move);
        cta.addEventListener("pointerleave", leave);
        return () => {
          cta.removeEventListener("pointermove", move);
          cta.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  async function share() {
    const url = location.origin + location.pathname;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Erasmus v Česku", url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <section
      ref={root}
      id="budoucnost"
      data-section="budoucnost"
      aria-labelledby="future-title"
      className={s.section}
    >
      <div className={s.inner}>
        <p className={s.lead}>Jedna zkušenost může změnit směr.</p>
        <h2 id="future-title" className={s.title} data-velocity-type>
          <span>
            <span data-future-line>Další cesta</span>
          </span>
          <span>
            <span data-future-line>začíná teď.</span>
          </span>
        </h2>
        <div className={s.lower}>
          <p>
            Na první přednášce v cizím jazyce. U společného stolu. Při
            rozhodnutí zkusit to. Jak začne ta vaše?
          </p>
          <Link data-magnetic className={s.primary} href="/zapojte-se#pribeh">
            Zapsat svůj příběh <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div ref={journey} className={s.journey} aria-hidden="true">
          <svg
            className={s.route}
            viewBox={`0 0 ${routeWidth} ${ROUTE_H}`}
            preserveAspectRatio="none"
          >
            <path data-final-route d={route.d} />
            <circle cx="8" cy={route.top} r="6" />
            {route.stops.map((stop) => (
              <circle
                key={stop.city}
                data-final-stop
                className={s.stop}
                cx={stop.x}
                cy={route.top}
                r="4.5"
              />
            ))}
            <circle
              data-final-open
              className={s.openStop}
              cx={route.open}
              cy={route.low}
              r="7"
            />
          </svg>
          {route.stops.map((stop) => (
            <span
              key={stop.city}
              data-final-city
              className={s.city}
              style={{ left: stop.x, top: route.top + 14 }}
            >
              {stop.city}
            </span>
          ))}
          <span
            data-final-open
            className={s.yours}
            style={{ left: route.open, top: route.low + 18 }}
          >
            Vaše cesta
          </span>
        </div>
        <div className={s.links}>
          <a href="https://www.dzs.cz/program/erasmus">Vyrazit s Erasmus+</a>
          <a href="https://erasmus-plus.ec.europa.eu/">O programu Erasmus+</a>
          <button type="button" onClick={share}>
            {copied ? "Odkaz zkopírován" : "Sdílet tento web"}
          </button>
        </div>
      </div>
    </section>
  );
}
