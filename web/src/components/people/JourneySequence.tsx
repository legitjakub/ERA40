"use client";

import {
  createContext, useCallback, useContext, useMemo, useRef, useState,
  type ReactNode,
} from "react";
import { useScene } from "@/lib/gsap/useScene";
import { gsap } from "@/lib/gsap/setup";
import { EASE } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { stories } from "@/content/stories";
import s from "./JourneySequence.module.css";

type JourneyState = { railIndex: number; mapIndex: number; manual: boolean };
type Journey = JourneyState & {
  selectRailStory: (index: number) => void;
  selectMapStory: (index: number) => void;
};
const JourneyContext = createContext<Journey | null>(null);

export function useJourney() {
  const journey = useContext(JourneyContext);
  if (!journey) throw new Error("JourneySequence is required");
  return journey;
}

type Box = { x: number; y: number; width: number; height: number };
function cover(box: Box, ratio: number) {
  const width = Math.max(box.width, box.height * ratio);
  const height = width / ratio;
  return {
    x: box.x + (box.width - width) / 2,
    y: box.y + (box.height - height) / 2,
    width, height,
  };
}
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

/** The existing rail and map keep their content; only the photograph crosses their boundary. */
export function JourneySequence({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JourneyState>({ railIndex: 0, mapIndex: 0, manual: false });
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const selectRailStory = useCallback((index: number) => {
    setState((current) => current.railIndex === index && !current.manual
      ? current : { railIndex: index, mapIndex: index, manual: false });
  }, []);
  const selectMapStory = useCallback((index: number) => {
    setState((current) => current.mapIndex === index && current.manual
      ? current : { ...current, mapIndex: index, manual: true });
  }, []);
  const journey = useMemo(() => ({ ...state, selectRailStory, selectMapStory }),
    [state, selectRailStory, selectMapStory]);

  useScene(() => {
    if (reduced || state.manual || !root.current) return;
    const scope = root.current;
    const sourceSection = scope.querySelector<HTMLElement>("#pribehy");
    const mapSection = scope.querySelector<HTMLElement>("#mapa");
    const rail = sourceSection?.querySelector<HTMLElement>("[data-story-rail]");
    // On desktop the pinned rail always ends on its last story, so that photograph
    // is the one handed over. The trigger is built once instead of on every station.
    const source = scope.querySelector<HTMLElement>(`#story-${stories[stories.length - 1].id} [data-photo-wipe]`);
    const target = mapSection?.querySelector<HTMLElement>("[data-map-photo]");
    const original = source?.querySelector<HTMLImageElement>("img");
    const outgoing = [
      source?.closest("article")?.querySelector<HTMLElement>("[data-story-copy]"),
      sourceSection?.querySelector<HTMLElement>("[data-story-route]"),
    ].filter((element): element is HTMLElement => Boolean(element));
    const visual = overlay.current, crop = frame.current, photo = image.current, caption = label.current;
    if (!sourceSection || !mapSection || !rail || !source || !target || !original ||
      !visual || !crop || !photo || !caption) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px) and (min-height:620px) and (prefers-reduced-motion:no-preference)", () => {
      let geometry: { from: Box; to: Box; first: Box; last: Box; width: number; height: number } | undefined;
      const phase = { value: 0 };
      const ease = gsap.parseEase(EASE.inOut);
      const sourceVisibility = source.style.visibility;
      const targetVisibility = target.style.visibility;
      const restore = () => {
        visual.dataset.active = "false";
        source.style.visibility = sourceVisibility;
        target.style.visibility = targetVisibility;
        delete sourceSection.dataset.handoff;
        delete mapSection.dataset.handoff;
        outgoing.forEach((element) => element.style.removeProperty("opacity"));
      };
      const render = () => {
        const p = phase.value;
        if (!geometry || !photo.complete || !photo.naturalWidth || p <= 0 || p >= 1) {
          restore();
          return;
        }
        const { from, to, first, last, width, height } = geometry;
        // Smooth only the visual journey; the surrounding page keeps its native scroll.
        const at = ease(p);
        const reading = 1 - Math.min(1, Math.max(0, (p - 0.08) / 0.22));
        outgoing.forEach((element) => { element.style.opacity = String(reading); });
        const x = lerp(from.x, to.x, at), y = lerp(from.y, to.y, at);
        const w = lerp(from.width, to.width, at), h = lerp(from.height, to.height, at);
        crop.style.clipPath = `inset(${y}px ${width - x - w}px ${height - y - h}px ${x}px)`;
        photo.style.transform = `translate3d(${lerp(first.x, last.x, at)}px,${lerp(first.y, last.y, at)}px,0) scale(${lerp(1, last.width / first.width, at)})`;
        caption.style.transform = `translate3d(${x + 12}px,${y + h - 37}px,0)`;
        source.style.visibility = "hidden";
        target.style.visibility = "hidden";
        sourceSection.dataset.handoff = "true";
        mapSection.dataset.handoff = "true";
        visual.dataset.active = "true";
      };
      const measure = () => {
        if (!original.complete || !original.naturalWidth) { geometry = undefined; return; }
        const src = source.getBoundingClientRect();
        const people = sourceSection.getBoundingClientRect();
        const dst = target.getBoundingClientRect();
        const map = mapSection.getBoundingClientRect();
        // The source is measured at its final rail position, even while another story is visible.
        const distance = rail.scrollWidth - rail.clientWidth;
        const railX = Number(gsap.getProperty(rail, "x")) || 0;
        const from = { x: src.left - distance - railX, y: src.top - people.top, width: src.width, height: src.height };
        const to = { x: dst.left, y: dst.top - map.top, width: dst.width, height: dst.height };
        const ratio = original.naturalWidth / original.naturalHeight;
        const first = cover(from, ratio), last = cover(to, ratio);
        geometry = { from, to, first, last, width: innerWidth, height: innerHeight };
        photo.style.width = first.width + "px";
        photo.style.height = first.height + "px";
        const srcUrl = original.currentSrc || original.src;
        if (photo.getAttribute("src") !== srcUrl) photo.src = srcUrl;
      };
      const movement = gsap.fromTo(phase, { value: 0 }, {
        value: 1, ease: "none", onUpdate: render,
        scrollTrigger: {
          trigger: mapSection,
          start: "top bottom", end: "top top", scrub: 0.45,
          refreshPriority: -1,
          onRefresh: () => {
            measure();
            render();
          },
        },
      });
      const loaded = () => { measure(); render(); };
      original.addEventListener("load", loaded);
      photo.addEventListener("load", render);
      measure(); render();
      return () => {
        original.removeEventListener("load", loaded);
        photo.removeEventListener("load", render);
        movement.kill();
        restore();
      };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [reduced, state.manual] });

  return (
    <JourneyContext value={journey}>
      <div ref={root} className={s.sequence} data-journey-sequence>
        {children}
        <div ref={overlay} className={s.overlay} aria-hidden="true" data-journey-overlay>
          <div ref={frame} className={s.frame}>
            {/* The decoded Next image is reused only when the source is available. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={image} className={s.image} alt="" decoding="async" />
          </div>
          <span ref={label} className={s.label}>Ilustrační snímek</span>
        </div>
      </div>
    </JourneyContext>
  );
}
