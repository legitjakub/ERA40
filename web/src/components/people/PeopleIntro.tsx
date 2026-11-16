"use client";

import { useEffect, useRef } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PeopleRow } from "./PeopleRow";
import styles from "./PeopleIntro.module.css";

const opening =
  "Od roku 1998 vyjelo s Erasmem do zahraničí přes 400 tisíc lidí z Česka. Domů se vraceli";
const ending = "trochu jiní.";
const source =
  "https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf";

function words(text: string) {
  return text.split(" ").map((word, index) => (
    <span key={index}>
      <span data-word>{word}</span>{" "}
    </span>
  ));
}

type Route = { length: number; samples: [number, number][]; desktop: boolean };

/*
 * Spec 016: the hero route arrives in the left margin and, on desktop,
 * bends into the underline of „trochu jiní.“ (the underline is the route's
 * end). On phones a short vertical route stops above the heading and the
 * underline keeps its own scrub. Geometry is read only when measuring.
 */
function measure(section: HTMLElement): Route | null {
  const svg = section.querySelector<SVGSVGElement>("[data-prolog-route]");
  const path = svg?.querySelector("path");
  const heading = section.querySelector("h2");
  const line = section.querySelector<HTMLElement>("[data-underline]");
  if (!svg || !path || !heading || !line) return null;
  const box = section.getBoundingClientRect();
  const head = heading.getBoundingClientRect();
  const desktop = box.width >= 1024;
  const xR = desktop ? Math.max(16, Math.round(head.left - box.left - 28)) : 16;
  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  let d: string;
  if (desktop) {
    // The underline box is measured even while hidden (visibility only).
    const under = line.getBoundingClientRect();
    const y = under.top - box.top + under.height / 2;
    const end = under.right - box.left;
    d = `M${xR} 0V${y - 16}Q${xR} ${y} ${xR + 16} ${y}H${end}`;
  } else {
    d = `M${xR} 0V${Math.max(16, head.top - box.top - 12)}`;
  }
  path.setAttribute("d", d);
  const length = path.getTotalLength();
  const samples = Array.from({ length: 129 }, (_, i) => {
    const point = path.getPointAtLength((length * i) / 128);
    return [point.x, point.y] as [number, number];
  });
  section.toggleAttribute("data-route-desktop", desktop);
  return { length, samples, desktop };
}

function draw(section: HTMLElement, route: Route, value: number) {
  const path = section.querySelector<SVGPathElement>("[data-prolog-route] path");
  const point = section.querySelector<SVGCircleElement>("[data-prolog-route] circle");
  if (!path || !point) return;
  const v = Math.min(1, Math.max(0, value));
  path.style.strokeDasharray = `${route.length * v} 99999`;
  // A zero-length dash with round caps would still paint a dot.
  path.style.visibility = v > 0 ? "visible" : "hidden";
  const f = v * 128;
  const i = Math.min(127, Math.floor(f));
  const t = f - i;
  const [ax, ay] = route.samples[i];
  const [bx, by] = route.samples[i + 1];
  point.setAttribute("cx", String(ax + (bx - ax) * t));
  point.setAttribute("cy", String(ay + (by - ay) * t));
  point.style.opacity = v > 0 ? "1" : "0";
}

export function PeopleIntro() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  // Reduced motion: the route is predrawn; no handoff state.
  useEffect(() => {
    const section = root.current;
    if (!reduced || !section) return;
    let alive = true;
    const update = () => {
      if (!alive) return;
      const route = measure(section);
      if (route) draw(section, route, 1);
    };
    update();
    addEventListener("resize", update);
    void document.fonts?.ready.then(update);
    return () => {
      alive = false;
      removeEventListener("resize", update);
    };
  }, [reduced]);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || reduced) return;
      const section = root.current;
      const media = gsap.matchMedia(section);
      media.add(
        {
          rich:
            "(min-width: 1024px) and (min-height: 680px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const mobile = context.conditions?.mobile;
          const heading = section.querySelector("h2");
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: heading,
              start: mobile ? "top 88%" : "top 84%",
              end: mobile ? "bottom 60%" : "bottom 42%",
              scrub: true,
            },
          });
          timeline.fromTo(
            "[data-word]",
            { opacity: 0.58 },
            { opacity: 1, stagger: 0.085, duration: 0.22 },
          );
          // On desktop the route draws the underline itself.
          if (mobile)
            timeline.fromTo(
              "[data-underline]",
              { scaleX: 0 },
              { scaleX: 1, duration: 0.18 },
              "-=0.2",
            );
          timeline.fromTo(
            "[data-note]",
            { opacity: 0 },
            { opacity: 1, duration: 0.18 },
            mobile ? "-=0.1" : "-=0.3",
          );

          // The route continues from the hero: it starts at the section top
          // and ends together with the reading scrub. After the pinned hero
          // the handoff is at the viewport bottom; in native modes the hero
          // finishes its own line when its bottom reaches 40 %.
          const rich = context.conditions?.rich;
          let route = measure(section);
          const html = document.documentElement;
          const trigger = ScrollTrigger.create({
            trigger: section,
            start: rich ? "top bottom" : "top 40%",
            endTrigger: heading,
            end: mobile ? "bottom 58%" : "bottom 42%",
            scrub: 0.35,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              route = measure(section);
              if (route) draw(section, route, self.progress);
            },
            onUpdate: (self) => {
              if (route) draw(section, route, self.progress);
              html.toggleAttribute("data-route-prolog", self.progress > 0);
            },
          });
          if (route) draw(section, route, trigger.progress);
          return () => {
            html.removeAttribute("data-route-prolog");
            section.removeAttribute("data-route-desktop");
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
      id="pribehy-intro"
      data-section="prolog"
      data-chapter="02"
      className={styles.prolog}
      aria-labelledby="people-intro-title"
    >
      <svg aria-hidden="true" className={styles.route} data-prolog-route>
        <path fill="none" />
        <circle r="5" />
      </svg>
      <div className={styles.body}>
        <h2 id="people-intro-title" aria-label={opening + " " + ending}>
          <span aria-hidden="true">
            {words(opening)}
            <span className={styles.ending}>
              {words(ending)}
              <i data-underline />
            </span>
          </span>
        </h2>
        <p className={styles.reach} data-note>
          A&nbsp;s&nbsp;nimi se zkušenost dostala i&nbsp;k&nbsp;lidem, kteří nikdy
          nevyjeli: k&nbsp;jejich studentům, kolegům a&nbsp;rodinám.
        </p>
        <p className={styles.note} data-note>
          Podle DZS za výzvy 1998–&#8288;2023, stav k&nbsp;31.&nbsp;12.&nbsp;2023. Přesné číslo najdeš v&nbsp;kapitole 07. <a href={source}>Infografika DZS (PDF)</a>
        </p>
      </div>
      <div className={styles.transition}>
        <PeopleRow reduced={reduced} />
      </div>
    </section>
  );
}
