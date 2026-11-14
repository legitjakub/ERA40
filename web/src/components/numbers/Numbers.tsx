"use client";

import { useRef } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  participationPeriod,
  participationSource,
  sectorBreakdown,
  stats,
} from "@/content/stats";
import s from "./Numbers.module.css";

const format = new Intl.NumberFormat("cs-CZ");
const largestSector = Math.max(
  ...sectorBreakdown.map((sector) => sector.value),
);

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const section = root.current;
      if (
        !section ||
        reduced ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      registerGsap();
      const counters = section.querySelectorAll<HTMLElement>("[data-count]");
      counters.forEach((element) => {
        const target = Number(element.dataset.count);
        const progress = { value: 0 };
        gsap.to(progress, {
          value: target,
          snap: { value: 1 },
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
          onUpdate: () => {
            element.textContent = format.format(progress.value);
          },
        });
      });
      gsap.from(section.querySelectorAll("[data-sector-bar]"), {
        scaleX: 0,
        transformOrigin: "left",
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section.querySelector("ol"),
          start: "top 90%",
          end: "bottom 70%",
          scrub: 0.45,
        },
      });
      return () =>
        counters.forEach((element) => {
          element.textContent = format.format(Number(element.dataset.count));
        });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="cisla"
      data-section="cisla"
      data-chapter="07"
      aria-labelledby="numbers-title"
      className={s.section}
    >
      <div className={s.inner}>
        <h2 id="numbers-title">Erasmus v číslech.</h2>
        <dl className={s.stats}>
          {stats.map((stat) => (
            <div key={stat.id} className={s.stat}>
              <dt>{stat.label}</dt>
              <dd className={s.value}>
                {stat.prefix && (
                  <span className={s.qualifier}>{stat.prefix}</span>
                )}
                <span className={s.screenReaderOnly}>
                  {format.format(stat.value)}
                </span>
                <span aria-hidden="true" data-count={stat.value}>
                  {format.format(stat.value)}
                </span>
                {stat.suffix && <span className={s.unit}>{stat.suffix}</span>}
              </dd>
              <dd className={s.source}>
                {stat.period}{" "}
                <a href={stat.sources[0].url}>{stat.sources[0].label}</a>
              </dd>
            </div>
          ))}
        </dl>
        <div className={s.breakdown}>
          <div>
            <h3>Kdo vyjel z Česka?</h3>
            <p className={s.source}>
              {participationPeriod}{" "}
              <a href={participationSource.url}>{participationSource.label}</a>
            </p>
          </div>
          <ol
            className={s.bars}
            aria-label="Počty účastníků podle oblasti vzdělávání"
          >
            {sectorBreakdown.map((sector) => (
              <li key={sector.id}>
                <span>{sector.label}</span>
                <strong>{format.format(sector.value)}</strong>
                <div className={s.track} aria-hidden="true">
                  <i
                    data-sector-bar
                    style={{
                      width: (sector.value / largestSector) * 100 + "%",
                    }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
