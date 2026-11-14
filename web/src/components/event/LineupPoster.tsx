"use client";

import { useRef } from "react";
import { event } from "@/content/event";
import { useScene } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./LineupPoster.module.css";

/*
 * The line-up set as a festival poster in Roboto Flex. Each name opens from
 * a narrow, light cut to the full display cut as it crosses the viewport,
 * so the poster "tunes up" while you read it. A name links to its slot in
 * the day planner. Static and fully readable without motion.
 */
export function LineupPoster() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const headliners = event.performers.filter((p) => p.headliner);
  const guests = event.performers.filter((p) => !p.headliner);

  useScene(
    () => {
      registerGsap();
      if (reduced || !root.current) return;
      const names = root.current.querySelectorAll<HTMLElement>("[data-axis]");
      names.forEach((el) => {
        const big = el.dataset.axis === "big";
        const from = big ? { wdth: 28, wght: 300 } : { wdth: 40, wght: 380 };
        const to = big ? { wdth: 62, wght: 900 } : { wdth: 70, wght: 800 };
        const state = { ...from };
        const apply = () => {
          el.style.fontVariationSettings = `"wdth" ${state.wdth.toFixed(1)}, "wght" ${state.wght.toFixed(0)}`;
        };
        apply();
        gsap.to(state, {
          ...to,
          ease: "none",
          onUpdate: apply,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.6,
          },
        });
      });
      gsap.from(root.current.querySelectorAll("[data-meta]"), {
        opacity: 0,
        y: 10,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
      return () => {
        names.forEach((el) => el.style.removeProperty("font-variation-settings"));
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className={s.poster} aria-labelledby="lineup-title">
      <div className={s.inner}>
        <div className={s.top}>
          <h2 id="lineup-title" className={s.kicker}>
            Účinkující
          </h2>
          <p className={s.date}>
            {event.dateLabel}
            {!event.confirmed && " · návrh"}
          </p>
        </div>
        <ul className={s.headliners}>
          {headliners.map((p) => (
            <li key={p.id}>
              <a className={s.link} href={`#program-${p.id}`}>
                <span className={s.big} data-axis="big">
                  {p.name}
                </span>
                <span className={s.meta} data-meta>
                  <span className={s.time}>{p.time}</span>
                  {p.genre}
                  {p.placeholder && <span className={s.soon}>Jméno oznámíme</span>}
                  <span className={s.arrow} aria-hidden="true">↓</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <ul className={s.guests}>
          {guests.map((p) => (
            <li key={p.id}>
              <a className={s.link} href={`#program-${p.id}`}>
                <span className={s.small} data-axis="small">
                  {p.name}
                </span>
                <span className={s.meta} data-meta>
                  <span className={s.time}>{p.time}</span>
                  {p.genre}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className={s.note}>
          Navržená dramaturgie. Konkrétní jména zveřejníme po podpisu smluv s
          účinkujícími. Klikněte na jméno a uvidíte, kdy a kde hraje.
        </p>
      </div>
    </section>
  );
}
