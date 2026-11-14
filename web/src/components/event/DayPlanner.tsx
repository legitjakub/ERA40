"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { event, stages, type ProgramItem, type Stage } from "@/content/event";
import { gsap, loadFlip } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./DayPlanner.module.css";

/*
 * "Den na náplavce": the day as a place and a timeline at once.
 * A schematic of the embankment, a time scrubber and the programme list
 * share one state, so choosing a stage, a time or a favourite updates all
 * three. Everything works without motion; Flip only smooths the reflow.
 */

const DAY_START = 14 * 60;
const DAY_END = 22 * 60;
const STORE = "era40-muj-program";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (min: number) =>
  `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

type Slot = ProgramItem & { id: string; from: number; to: number };

function buildSlots(): Slot[] {
  const items = event.program.filter((p) => p.time);
  return items.map((item, i) => {
    const from = toMin(item.time!);
    const next = items
      .slice(i + 1)
      .find((other) => other.stage === item.stage);
    const to = item.end
      ? toMin(item.end)
      : Math.min(next ? toMin(next.time!) : DAY_END, from + 60);
    return { ...item, id: `p-${i}`, from, to };
  });
}

/** Positions of the stages on the schematic, left = Výtoň (south). */
const zones: Record<Stage, { x: number; label: string }> = {
  Stánky: { x: 14, label: "Stánky" },
  Debaty: { x: 38, label: "Debaty" },
  "Příběhy živě": { x: 60, label: "Příběhy živě" },
  "Hlavní pódium": { x: 84, label: "Hlavní pódium" },
};

type Filter = Stage | "vse" | "muj";

export function DayPlanner() {
  const slots = useMemo(() => buildSlots(), []);
  const reduced = usePrefersReducedMotion();
  const [filter, setFilter] = useState<Filter>("vse");
  const [time, setTime] = useState(toMin("18:00"));
  const [mine, setMine] = useState<string[]>([]);
  const list = useRef<HTMLOListElement>(null);
  type FlipPlugin = typeof import("gsap/Flip").Flip;
  const flip = useRef<FlipPlugin | null>(null);
  const flipState = useRef<ReturnType<FlipPlugin["getState"]> | null>(null);

  useEffect(() => {
    if (reduced) return;
    let alive = true;
    void loadFlip().then(({ Flip }) => {
      if (alive) flip.current = Flip;
    });
    return () => {
      alive = false;
    };
  }, [reduced]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
      if (Array.isArray(saved)) setMine(saved.filter((v) => typeof v === "string"));
    } catch {
      /* Storage may be unavailable; favourites then last for the visit. */
    }
  }, []);

  // A performer link on the poster (#program-guest-1) selects its slot.
  useEffect(() => {
    function fromHash() {
      const match = location.hash.match(/^#program-(.+)$/);
      if (!match) return;
      const slot = slots.find((x) => x.performer === match[1]);
      if (!slot) return;
      setFilter("vse");
      setTime(slot.from);
      requestAnimationFrame(() =>
        document.getElementById(slot.id)?.focus({ preventScroll: true }),
      );
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [slots]);

  function remember() {
    if (reduced || !list.current || !flip.current) return;
    flipState.current = flip.current.getState(list.current.children);
  }

  function choose(next: Filter) {
    remember();
    setFilter((current) => (current === next ? "vse" : next));
  }

  function toggleMine(id: string) {
    setMine((current) => {
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        /* Ignore storage errors. */
      }
      return next;
    });
  }

  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state || reduced || !list.current || !flip.current) return;
    const tween = flip.current.from(state, {
      targets: list.current.children,
      duration: 0.5,
      ease: "power3.out",
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }),
    });
    return () => {
      tween.progress(1).kill();
    };
  }, [filter, reduced]);

  const visible = slots.filter((slot) =>
    filter === "vse"
      ? true
      : filter === "muj"
        ? mine.includes(slot.id)
        : slot.stage === filter,
  );
  const now = slots.filter((slot) => slot.from <= time && time < slot.to);
  const onStage = (stage: Stage) => now.find((slot) => slot.stage === stage);
  const progress = ((time - DAY_START) / (DAY_END - DAY_START)) * 100;

  return (
    <div className={s.planner}>
      <div className={s.stageArea}>
        <figure className={s.map}>
          <svg
            className={s.river}
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 28 C 25 24, 55 33, 100 26 L100 40 L0 40 Z" />
            <path className={s.bank} d="M0 22 C 25 18, 55 27, 100 20" />
          </svg>
          <span className={s.mapLabel} data-side="left">Výtoň</span>
          <span className={s.mapLabel} data-side="right">Jiráskův most</span>
          <span className={s.mapRiver}>Vltava</span>
          {stages.map((stage) => {
            const live = onStage(stage);
            return (
              <button
                key={stage}
                type="button"
                className={s.zone}
                style={{ left: `${zones[stage].x}%` }}
                aria-pressed={filter === stage}
                data-live={Boolean(live)}
                onClick={() => choose(stage)}
              >
                <span className={s.pin} aria-hidden="true" />
                <span className={s.zoneName}>{zones[stage].label}</span>
                <span className={s.zoneNow}>
                  {live ? live.title : "Pauza"}
                </span>
              </button>
            );
          })}
          <figcaption className={s.mapNote}>
            Schéma, ne mapa v měřítku. Rozmístění je návrh.
          </figcaption>
        </figure>

        <div className={s.scrub}>
          <label htmlFor="planner-time" className={s.scrubLabel}>
            Posuňte čas
            <output htmlFor="planner-time" className={s.clock}>
              {fmt(time)}
            </output>
          </label>
          <div className={s.track} style={{ "--p": `${progress}%` } as CSSProperties}>
            <input
              id="planner-time"
              type="range"
              min={DAY_START}
              max={DAY_END - 15}
              step={15}
              value={time}
              aria-valuetext={`${fmt(time)}, ${now.length ? now.map((x) => `${x.stage}: ${x.title}`).join(", ") : "pauza"}`}
              onChange={(e) => setTime(Number(e.target.value))}
            />
            <div className={s.ticks} aria-hidden="true">
              {[14, 16, 18, 20, 22].map((h) => (
                <span key={h}>{h}:00</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={s.filters} role="group" aria-label="Filtrovat program">
        <button type="button" aria-pressed={filter === "vse"} onClick={() => choose("vse")}>
          Vše
        </button>
        {stages.map((stage) => (
          <button key={stage} type="button" aria-pressed={filter === stage} onClick={() => choose(stage)}>
            {stage}
          </button>
        ))}
        <button type="button" aria-pressed={filter === "muj"} onClick={() => choose("muj")}>
          Můj program <span className={s.count}>{mine.length}</span>
        </button>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {filter === "muj"
          ? `Můj program: ${visible.length} položek`
          : `Zobrazeno ${visible.length} položek programu`}
      </p>

      <ol ref={list} className={s.list}>
        {visible.map((slot) => {
          const live = slot.from <= time && time < slot.to;
          const saved = mine.includes(slot.id);
          return (
            <li
              key={slot.id}
              id={slot.id}
              tabIndex={-1}
              className={s.item}
              data-live={live}
              data-flip-id={slot.id}
            >
              <button
                type="button"
                className={s.timeBtn}
                onClick={() => setTime(slot.from)}
              >
                {fmt(slot.from)}–{fmt(slot.to)}
                <span className="visually-hidden">, posunout čas sem</span>
              </button>
              <span className={s.stage}>{slot.stage}</span>
              <span className={s.title}>
                {slot.title}
                {live && <span className={s.live}>Právě teď</span>}
              </span>
              <span className={s.text}>{slot.text}</span>
              <button
                type="button"
                className={s.star}
                aria-pressed={saved}
                aria-label={`${saved ? "Odebrat z" : "Přidat do"} mého programu: ${slot.title}`}
                onClick={() => toggleMine(slot.id)}
              >
                <span aria-hidden="true">{saved ? "★" : "☆"}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {filter === "muj" && visible.length === 0 && (
        <p className={s.empty}>
          Zatím nic. Hvězdičkou u položky si ji uložíte do svého programu na
          tomto zařízení.
        </p>
      )}
    </div>
  );
}
