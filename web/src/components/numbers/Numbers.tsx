"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { DUR, EASE } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  participationPeriod,
  participationSource,
  sectorBreakdown,
  stats,
} from "@/content/stats";
import s from "./Numbers.module.css";
import { stories, storyPhoto } from "@/content/stories";
import { StoryLabel } from "@/components/archive/StoryLabel";
import { StoryImpact } from "@/components/archive/StoryImpact";

const format = new Intl.NumberFormat("cs-CZ");
const largestSector = Math.max(
  ...sectorBreakdown.map((sector) => sector.value),
);
const examples: Record<string, string | undefined> = {
  he: "kariera",
  youth: "vymena",
  vet: "porto-sos",
  school: "ucitelka",
};

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [sectorId, setSectorId] = useState("school");
  const selectedSector = sectorBreakdown.find((sector) => sector.id === sectorId)!;
  const example = stories.find((story) => story.id === examples[sectorId]);
  const photo = example ? storyPhoto(example) : null;

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
          duration: DUR.l,
          ease: EASE.out,
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
      // A new example can move the final scene; scrolling itself does not resize this section.
      let refreshFrame = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      observer.observe(section);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(refreshFrame);
        counters.forEach((element) => {
          element.textContent = format.format(Number(element.dataset.count));
        });
      };
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
            <div
              key={stat.id}
              className={s.stat}
              data-number-stat
              data-handoff-axis-target={stat.id === "outgoing-cz" ? "" : undefined}
            >
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
            <p className={s.explore}>Vyberte oblast a podívejte se, jak může zkušenost pokračovat.</p>
          </div>
          <ol
            className={s.bars}
            aria-label="Počty účastníků podle oblasti vzdělávání"
          >
            {sectorBreakdown.map((sector) => (
              <li key={sector.id} data-selected={sectorId === sector.id}>
                <button
                  type="button"
                  className={s.sectorButton}
                  aria-pressed={sectorId === sector.id}
                  aria-controls="sector-example"
                  onClick={() => setSectorId(sector.id)}
                >
                  <span>{sector.label}</span>
                  <strong>{format.format(sector.value)}</strong>
                </button>
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
        <div id="sector-example" className={s.example} key={sectorId}>
          {example && photo ? (
            <>
              <figure className={s.examplePhoto}>
                <Image src={photo.file} alt={photo.alt} fill sizes="(min-width:1024px) 32vw,90vw" />
                <figcaption>Ilustrační snímek</figcaption>
              </figure>
              <div className={s.exampleText}>
                <p className={s.exampleLabel} role="status">
                  {selectedSector.label}<br />
                  <StoryLabel story={example} />
                </p>
                <h4>{example.name}</h4>
                <StoryImpact story={example} />
                <Link href={`/pribehy/${example.id}`}>Číst celý příběh <span aria-hidden="true">↗</span></Link>
              </div>
            </>
          ) : (
            <div className={s.exampleText}>
              <p className={s.exampleLabel} role="status">{selectedSector.label}</p>
              <h4>Patří sem i váš příběh.</h4>
              <p>Příběhy ze vzdělávání dospělých teprve shromažďujeme. Co se díky zahraniční zkušenosti změnilo u vás?</p>
              <Link href="/zapojte-se#organizace">Zapojit organizaci <span aria-hidden="true">↗</span></Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
