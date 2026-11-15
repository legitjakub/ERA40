"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { EASE } from "@/lib/gsap/presets";
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
import { BigCount } from "./BigCount";

const format = new Intl.NumberFormat("cs-CZ");
const outgoing = stats.find((stat) => stat.id === "outgoing-cz")!;
const others = stats.filter((stat) => stat.id !== "outgoing-cz");
const largestSector = Math.max(
  ...sectorBreakdown.map((sector) => sector.value),
);
const examples: Record<string, string | undefined> = {
  he: "kariera",
  youth: "vymena",
  vet: "porto-sos",
  school: "ucitelka",
};

const compactQuery = "(max-width: 767px)";
const compactSnapshot = () => window.matchMedia(compactQuery).matches;
const serverSnapshot = () => false;
function subscribeCompact(onChange: () => void) {
  const media = window.matchMedia(compactQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** One shared panel: beside the tree on desktop, directly under its branch on phones. */
function SectorExample({ sectorId, open }: { sectorId: string; open: boolean }) {
  const sector = sectorBreakdown.find((item) => item.id === sectorId)!;
  const example = stories.find((story) => story.id === examples[sectorId]);
  const photo = example ? storyPhoto(example) : null;
  return (
    <div id="sector-example" className={s.example} hidden={!open}>
      {example && photo ? (
        <>
          <figure className={s.examplePhoto}>
            <Image src={photo.file} alt={photo.alt} fill sizes="(max-width:767px) 88px,(min-width:1024px) 32vw,90vw" />
            <figcaption>Ilustrační snímek</figcaption>
          </figure>
          <div className={s.exampleText}>
            <p className={s.exampleLabel} role="status">
              <span className={s.exampleSector}>{sector.label}<br /></span>
              <StoryLabel story={example} />
            </p>
            <h3>{example.name}</h3>
            <StoryImpact story={example} />
            <Link href={`/pribehy/${example.id}`}>Přečti si celý příběh <span aria-hidden="true">↗</span></Link>
          </div>
        </>
      ) : (
        <div className={s.exampleText}>
          <p className={s.exampleLabel} role="status">{sector.label}</p>
          <h3>Patří sem i tvůj příběh.</h3>
          <p>Příběhy ze vzdělávání dospělých teprve shromažďujeme. Co se díky zahraniční zkušenosti změnilo u tebe?</p>
          <Link href="/zapojte-se#organizace">Zapojit organizaci <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </div>
  );
}

// Tree geometry in real pixels, measured from the HTML rows. Every branch is
// an equal elbow plus a straight run whose length is value × one common scale.
const BEND = 12;
const TIP = 12;
const ROOT_Y = 1.5;
const ARC = (Math.PI * BEND) / 2;
type Tree = { width: number; height: number; spine: number; rows: number[] };
const f = (n: number) => n.toFixed(1);

function treeGeometry({ width, spine, rows }: Tree) {
  const bent = spine >= BEND * 2;
  const scale = Math.max(0, width - spine - BEND - TIP) / largestSector;
  const top = ROOT_Y + (bent ? BEND : 0);
  const lead = bent ? ARC : 0;
  const last = rows[rows.length - 1] ?? top + BEND;
  return {
    root: bent
      ? `M0 ${ROOT_Y}H${f(spine - BEND)}`
      : `M${f(spine)} ${ROOT_Y}h0.01`,
    trunk:
      (bent
        ? `M${f(spine - BEND)} ${ROOT_Y}A${BEND} ${BEND} 0 0 1 ${f(spine)} ${f(top)}`
        : `M${f(spine)} ${ROOT_Y}`) + `V${f(Math.max(top, last - BEND))}`,
    trunkLength: lead + Math.max(0, last - BEND - top),
    branches: sectorBreakdown.map((sector, i) => {
      const y = rows[i] ?? top + BEND;
      const run = sector.value * scale;
      return {
        d: `M${f(spine)} ${f(y - BEND)}A${BEND} ${BEND} 0 0 0 ${f(spine + BEND)} ${f(y)}h${f(run)}`,
        tip: { x: spine + BEND + run, y },
        depart: lead + Math.max(0, y - BEND - top),
        run,
      };
    }),
  };
}

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [sectorId, setSectorId] = useState("school");
  const [exampleOpen, setExampleOpen] = useState(true);
  const compact = useSyncExternalStore(subscribeCompact, compactSnapshot, serverSnapshot);
  const [tree, setTree] = useState<Tree | null>(null);
  const geometry = treeGeometry(
    tree ?? { width: 800, height: 400, spine: 320, rows: [] },
  );
  const treeKey = tree
    ? [tree.width, tree.spine, ...tree.rows].map(Math.round).join()
    : "";

  useLayoutEffect(() => {
    const element = treeRef.current;
    if (!element) return;
    const measure = () => {
      const box = element.getBoundingClientRect();
      const list = element.querySelector("ol");
      if (!list || !box.width) return;
      const rows = [...element.querySelectorAll<HTMLElement>("[data-branch-row]")].map(
        (row) => {
          const r = row.getBoundingClientRect();
          return r.top + r.height / 2 - box.top;
        },
      );
      const next = {
        width: box.width,
        height: box.height,
        spine: list.getBoundingClientRect().left - box.left,
        rows,
      };
      setTree((current) =>
        current &&
        Math.round(current.width) === Math.round(next.width) &&
        Math.round(current.height) === Math.round(next.height) &&
        Math.round(current.spine) === Math.round(next.spine) &&
        current.rows.every((y, i) => Math.round(y) === Math.round(rows[i]))
          ? current
          : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const section = root.current;
      const svg = treeRef.current?.querySelector("svg");
      if (
        !section ||
        !svg ||
        !tree ||
        reduced ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      registerGsap();
      const counters = [...section.querySelectorAll<HTMLElement>("[data-count]")];
      const finals = () =>
        counters.forEach((element, i) => {
          element.style.removeProperty("visibility");
          element.textContent = format.format(sectorBreakdown[i].value);
        });
      const media = gsap.matchMedia();
      media.add(
        {
          // Same conditions as the 008B handoff: the trunk continues the arriving line.
          handoff:
            "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { handoff, motion } = context.conditions as Record<string, boolean>;
          if (!motion) return;
          const trunk = svg.querySelector<SVGPathElement>("[data-trunk]")!;
          const paths = svg.querySelectorAll<SVGPathElement>("[data-branch]");
          const tips = svg.querySelectorAll<SVGCircleElement>("[data-tip]");
          const inset = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
          const drawn: { timeline?: gsap.core.Timeline } = {};
          // Each figure is the drawn part of its straight run, read back on the common scale.
          const count = () => {
            const time = drawn.timeline?.time() ?? 0;
            counters.forEach((element, i) => {
              const { depart, run } = geometry.branches[i];
              const value = sectorBreakdown[i].value;
              const share = gsap.utils.clamp(0, 1, (time - depart - ARC) / Math.max(1, run));
              // No figure before its line arrives: a visible 0 would read as data.
              element.style.visibility = share > 0 ? "" : "hidden";
              element.textContent = format.format(
                share >= 1 ? value : Math.round((value * share) / 100) * 100,
              );
            });
          };
          // One constant drawing speed: every unit of time is one pixel of line.
          const timeline = (drawn.timeline = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            onUpdate: count,
          }));
          timeline.fromTo(
            trunk,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: Math.max(1, geometry.trunkLength) },
            0,
          );
          geometry.branches.forEach((branch, i) => {
            const end = branch.depart + ARC + branch.run;
            timeline
              .fromTo(
                paths[i],
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: ARC + branch.run },
                branch.depart,
              )
              .fromTo(
                tips[i],
                { scale: 0 },
                { scale: 1, duration: 18, transformOrigin: "50% 50%" },
                end - 6,
              );
          });
          // Scrolled through, the tree follows the scroll like a scrub. Arrived by a jump
          // (page load or Back restore inside the range, an instant jump, a chapter link
          // settling on #cisla) the 008B handoff never played, so the tree is shown
          // finished and stays finished until the reader leaves its range.
          let settled = false;
          let first = true;
          let jumped = false;
          let lastY = scrollY;
          const drive = (progress: number, immediate = false) => {
            if (progress <= 0 || progress >= 1) settled = false;
            const target = settled ? 1 : progress;
            if (immediate) {
              gsap.killTweensOf(timeline);
              timeline.progress(target);
            } else {
              gsap.to(timeline, { progress: target, duration: 0.45, ease: EASE.out, overwrite: true });
            }
          };
          const inside = (progress: number) => progress > 0 && progress < 1;
          const trigger = ScrollTrigger.create({
            ...(handoff
              ? {
                  trigger: section,
                  // The handoff copy settles on the root at p .88; the trunk takes over there.
                  start: () => `top ${inset + (innerHeight - inset) * 0.12}px`,
                  endTrigger: svg,
                  end: "bottom 78%",
                }
              : { trigger: svg, start: "top 85%", end: "bottom 72%" }),
            onUpdate: (self) => {
              const landed = jumped && inside(self.progress);
              if (landed) settled = true;
              drive(self.progress, landed);
            },
            onRefresh: (self) => {
              if (first && inside(self.progress)) settled = true;
              first = false;
              drive(self.progress, true);
            },
          });
          const onScroll = () => {
            jumped = Math.abs(scrollY - lastY) > innerHeight * 0.75;
            lastY = scrollY;
          };
          const onScrollEnd = () => {
            const anchored =
              decodeURIComponent(location.hash.slice(1)) === section.id &&
              Math.abs(section.getBoundingClientRect().top - inset) < 8;
            if (anchored && inside(trigger.progress) && !settled) {
              settled = true;
              drive(trigger.progress);
            }
          };
          // Capture: Lenis updates ScrollTrigger synchronously from its own scroll listener.
          addEventListener("scroll", onScroll, { passive: true, capture: true });
          ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
          ScrollTrigger.addEventListener("refresh", count);
          count();
          return () => {
            removeEventListener("scroll", onScroll, { capture: true });
            ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
            ScrollTrigger.removeEventListener("refresh", count);
            gsap.killTweensOf(timeline);
            trigger.kill();
          };
        },
      );
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
        media.revert();
        finals();
      };
    },
    { scope: root, dependencies: [reduced, treeKey], revertOnUpdate: true },
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
        <header className={s.head}>
          <p className={s.kicker}>Rozvětvení</p>
          <h2 id="numbers-title">Po návratu se zkušenost <span className="hl">větví.</span></h2>
          <p className={s.lead}>
            Každá oblast vzdělávání je jedna větev. Vyber ji a podívej se,
            jak může zkušenost pokračovat dál.
          </p>
        </header>
        <BigCount reduced={reduced} />
        <div ref={treeRef} className={s.tree}>
          <svg
            className={s.lines}
            data-ready={tree ? "true" : "false"}
            width={tree?.width ?? 0}
            height={tree?.height ?? 0}
            aria-hidden="true"
            focusable="false"
          >
            <path className={s.root} d={geometry.root} data-handoff-axis-target />
            <path d={geometry.trunk} data-trunk />
            {geometry.branches.map((branch, i) => (
              <path
                key={sectorBreakdown[i].id}
                d={branch.d}
                data-branch
                data-selected={sectorId === sectorBreakdown[i].id}
              />
            ))}
            {geometry.branches.map((branch, i) => (
              <circle
                key={sectorBreakdown[i].id}
                className={s.tip}
                data-selected={sectorId === sectorBreakdown[i].id}
                data-tip
                cx={f(branch.tip.x)}
                cy={f(branch.tip.y)}
                r="6"
              />
            ))}
          </svg>
          <div className={s.trunk} data-number-stat>
            {/* P2 bod 6: the figure is shown big above; the root keeps it for screen readers only. */}
            <span className="visually-hidden">
              {format.format(outgoing.value)} {outgoing.label},{" "}
            </span>
            <span className={s.trunkLabel}>Podle oblasti vzdělávání</span>
            <span className={s.source}>
              <span className={s.trunkPeriod}>{participationPeriod}</span>{" "}
              <a href={participationSource.url} title={`${participationPeriod} ${participationSource.label}`}>
                <span className={s.sourceFull}>{participationSource.label}</span>
                <span className={s.sourceShort}>Zdroj: DZS <span aria-hidden="true">↗</span></span>
              </a>
            </span>
          </div>
          <ol
            className={s.branches}
            aria-label="Počty účastníků podle oblasti vzdělávání"
          >
            {sectorBreakdown.map((sector) => (
              <li key={sector.id} data-selected={sectorId === sector.id}>
                <button
                  type="button"
                  className={s.sectorButton}
                  aria-pressed={sectorId === sector.id}
                  aria-expanded={compact ? sectorId === sector.id && exampleOpen : undefined}
                  aria-controls="sector-example"
                  onClick={() => {
                    setExampleOpen(!compact || sectorId !== sector.id || !exampleOpen);
                    setSectorId(sector.id);
                  }}
                >
                  <span>{sector.label}</span>
                  <strong>
                    <span className={s.screenReaderOnly}>{format.format(sector.value)}</span>
                    <span aria-hidden="true" data-count>
                      {format.format(sector.value)}
                    </span>
                  </strong>
                </button>
                <span className={s.track} data-branch-row aria-hidden="true" />
                {compact && sectorId === sector.id && (
                  <SectorExample sectorId={sectorId} open={exampleOpen} />
                )}
              </li>
            ))}
          </ol>
        </div>
        <p className={s.scaleNote}>
          Délka větve odpovídá počtu účastníků v oblasti, všechny větve mají
          stejné měřítko. Jde o počty účastníků, nikoli o počet lidí, které
          zkušenost nepřímo ovlivnila.
        </p>
        {!compact && <SectorExample key={sectorId} sectorId={sectorId} open />}
        <dl className={s.more}>
          {others.map((stat) => (
            <div key={stat.id}>
              <dt>{stat.label}</dt>
              <dd className={s.moreValue}>
                {stat.prefix && <span className={s.qualifier}>{stat.prefix} </span>}
                {format.format(stat.value)}
                {stat.suffix && <span className={s.unit}>{stat.suffix}</span>}
              </dd>
              <dd className={s.source}>
                <span className={s.sourcePeriod}>
                  {compact && stat.id === "satisfaction" ? "Šetření DZS a STEM/MARK, 2022." : stat.period}
                </span>{" "}
                <a href={stat.sources[0].url} title={`${stat.period} ${stat.sources[0].label}`}>
                  <span className={s.sourceFull}>{stat.sources[0].label}</span>
                  <span className={s.sourceShort}>Zdroj: DZS <span aria-hidden="true">↗</span></span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
