"use client";

import { useRef, type ReactNode } from "react";
import { useScene } from "@/lib/gsap/useScene";
import { gsap } from "@/lib/gsap/setup";
import { EASE } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./SceneHandoffs.module.css";

type Box = { x: number; y: number; width: number; height: number };
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const segment = (p: number, a: number, b: number) => gsap.utils.clamp(0, 1, (p - a) / (b - a));
function cover(box: Box, ratio: number): Box {
  const width = Math.max(box.width, box.height * ratio), height = width / ratio;
  return { x: box.x + (box.width - width) / 2, y: box.y + (box.height - height) / 2, width, height };
}

/** Spec 008: two visual continuities, inside the existing native section boundaries. */
export function SceneHandoffs({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const historyOverlay = useRef<HTMLDivElement>(null);
  const crop = useRef<HTMLDivElement>(null);
  const archiveImage = useRef<HTMLImageElement>(null);
  const portraitImage = useRef<HTMLImageElement>(null);
  const caption = useRef<HTMLSpanElement>(null);
  const axisOverlay = useRef<SVGSVGElement>(null);
  const axisLine = useRef<SVGLineElement>(null);
  const axisGradient = useRef<SVGLinearGradientElement>(null);
  const reduced = usePrefersReducedMotion();

  useScene(() => {
    const scope = root.current;
    if (!scope || reduced) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px) and (min-height:620px) and (prefers-reduced-motion:no-preference)", () => {
      const stage = scope.querySelector<HTMLElement>("#historie [data-stage]");
      const source = stage?.querySelector<HTMLElement>("[data-history-frame]");
      const sourceFigure = source?.closest("figure");
      const original = source?.querySelector<HTMLImageElement>("[data-photo]:last-child img");
      const people = scope.querySelector<HTMLElement>("#pribehy");
      const rail = people?.querySelector<HTMLElement>("[data-story-rail]");
      const target = people?.querySelector<HTMLElement>("[data-story-spread]:first-child [data-photo-wipe]");
      const destination = target?.querySelector<HTMLImageElement>("img");
      const visual = historyOverlay.current, frame = crop.current, label = caption.current;
      const images = [archiveImage.current, portraitImage.current];
      if (!stage || !source || !sourceFigure || !original || !people || !rail || !target ||
        !destination || !visual || !frame || !label || !images[0] || !images[1]) return;

      const outgoing = [...stage.querySelectorAll<HTMLElement>("[data-history-copy]")];
      const incoming = [people.querySelector<HTMLElement>("[data-stories-heading]"),
        people.querySelector<HTMLElement>("[data-story-spread]:first-child [data-story-copy]")]
        .filter((element): element is HTMLElement => Boolean(element));
      const opacity = new Map([...outgoing, ...incoming].map((el) => [el, el.style.opacity]));
      const sourceVisibility = sourceFigure.style.visibility, targetVisibility = target.style.visibility;
      const anchorInset = Number.parseFloat(getComputedStyle(people).scrollMarginTop) || 0;
      const phase = { p: 0 }, ease = gsap.parseEase(EASE.inOut);
      let alive = true, decoded = [false, false];
      const movement: { tween?: gsap.core.Tween } = {};
      let geometry: { from: Box; to: Box; planes: { first: Box; last: Box }[]; width: number; height: number } | undefined;
      const restore = () => {
        visual.dataset.active = "false";
        sourceFigure.style.visibility = sourceVisibility;
        target.style.visibility = targetVisibility;
        delete people.dataset.entryHandoff;
        opacity.forEach((value, element) => { element.style.opacity = value; });
      };
      const render = () => {
        const p = phase.p, native = movement.tween?.scrollTrigger?.progress ?? p;
        if (!geometry || !decoded.every(Boolean) || p <= 0 || p >= 1 || native <= 0 || native >= 1 ||
          document.querySelector("dialog[open]")) { restore(); return; }
        const at = ease(segment(p, .12, .88));
        const { from, to, planes, width, height } = geometry;
        const x = lerp(from.x, to.x, at), y = lerp(from.y, to.y, at);
        const w = lerp(from.width, to.width, at), h = lerp(from.height, to.height, at);
        frame.style.clipPath = `inset(${y}px ${width - x - w}px ${height - y - h}px ${x}px)`;
        planes.forEach(({ first, last }, i) => {
          images[i]!.style.transform = `translate3d(${lerp(first.x, last.x, at)}px,${lerp(first.y, last.y, at)}px,0) scale(${lerp(1, last.width / first.width, at)})`;
        });
        // A match cut separates two illustrative situations; faces never dissolve into each other.
        images[1]!.style.opacity = p < .5 ? "0" : "1";
        label.style.transform = `translate3d(${x + 12}px,${y + h - 37}px,0)`;
        outgoing.forEach((element) => { element.style.opacity = String(1 - segment(p, .08, .30)); });
        incoming.forEach((element, i) => {
          // The heading is still arriving vertically; hold it until it clears the travelling frame.
          element.style.opacity = String(segment(p, i === 0 ? .90 : .78, 1));
        });
        sourceFigure.style.visibility = "hidden";
        target.style.visibility = "hidden";
        people.dataset.entryHandoff = "true";
        visual.dataset.active = "true";
      };
      const measure = () => {
        if (!original.complete || !original.naturalWidth || !destination.complete || !destination.naturalWidth) {
          geometry = undefined; restore(); return;
        }
        const src = source.getBoundingClientRect(), stageBox = stage.getBoundingClientRect();
        const dst = target.getBoundingClientRect(), peopleBox = people.getBoundingClientRect();
        const from = { x: src.left, y: src.top - stageBox.top, width: src.width, height: src.height };
        const to = { x: dst.left - (Number(gsap.getProperty(rail, "x")) || 0),
          y: dst.top - peopleBox.top + anchorInset, width: dst.width, height: dst.height };
        if (!from.width || !to.width || !from.height || !to.height) { geometry = undefined; restore(); return; }
        const originals = [original, destination];
        const planes = originals.map((img) => ({
          first: cover(from, img.naturalWidth / img.naturalHeight),
          last: cover(to, img.naturalWidth / img.naturalHeight),
        }));
        geometry = { from, to, planes, width: innerWidth, height: innerHeight };
        originals.forEach((img, i) => {
          const ghost = images[i]!, url = img.currentSrc || img.src;
          ghost.style.width = planes[i].first.width + "px";
          ghost.style.height = planes[i].first.height + "px";
          if (ghost.getAttribute("src") !== url) {
            decoded[i] = false;
            ghost.src = url;
          }
          if (!decoded[i]) {
            void ghost.decode().then(() => {
              if (alive && ghost.getAttribute("src") === url) { decoded[i] = true; render(); }
            }).catch(() => { if (alive) restore(); });
          }
        });
      };
      movement.tween = gsap.to(phase, {
        p: 1, ease: "none", onUpdate: render,
        scrollTrigger: {
          id: "history-people-handoff", trigger: people,
          start: "top bottom", end: `top ${anchorInset}px`, scrub: .45, refreshPriority: -2,
          onRefresh: () => { measure(); render(); },
          onLeave: restore, onLeaveBack: restore,
        },
      });
      const loaded = () => { measure(); render(); };
      original.addEventListener("load", loaded);
      destination.addEventListener("load", loaded);
      original.addEventListener("error", loaded);
      destination.addEventListener("error", loaded);
      measure(); render();
      return () => {
        alive = false; decoded = [false, false];
        original.removeEventListener("load", loaded);
        destination.removeEventListener("load", loaded);
        original.removeEventListener("error", loaded);
        destination.removeEventListener("error", loaded);
        movement.tween?.kill(); restore();
      };
    });

    mm.add("(min-width:1024px) and (min-height:680px) and (prefers-reduced-motion:no-preference)", () => {
      // This contract also lets the next chapter design target a branching root.
      const source = scope.querySelector<HTMLElement | SVGElement>("[data-handoff-axis-source]");
      const stage = source?.closest<HTMLElement>("[data-handoff-stage]");
      const comparison = source?.closest<HTMLElement>("[data-section]");
      const target = scope.querySelector<HTMLElement | SVGElement>("[data-handoff-axis-target]");
      const numbers = target?.closest<HTMLElement>("[data-section]");
      const heading = numbers?.querySelector<HTMLElement>("h2");
      const visual = axisOverlay.current, line = axisLine.current;
      if (!comparison || !stage || !source || !numbers || !target || !heading || !visual || !line) return;
      const outgoing = [...comparison.querySelectorAll<HTMLElement>("[data-handoff-copy]")];
      const opacity = new Map([...outgoing, heading].map((el) => [el, el.style.opacity]));
      const sourceVisibility = source.style.visibility, border = target.style.borderTopColor;
      const anchorInset = Number.parseFloat(getComputedStyle(numbers).scrollMarginTop) || 0;
      const phase = { p: 0 }, ease = gsap.parseEase(EASE.inOut);
      const sourceStyle = getComputedStyle(source), targetStyle = getComputedStyle(target);
      // Trasa grammar: the line keeps the source colour over the dark surface it leaves
      // (the white divider on the photo) and the target colour on the light page.
      const surface = source.parentElement ?? source;
      const gradient = axisGradient.current, stops = gradient?.querySelectorAll("stop");
      if (!gradient || stops?.length !== 2) return;
      stops[0].setAttribute("stop-color", sourceStyle.getPropertyValue("--handoff-axis-color").trim() ||
        (source instanceof SVGElement ? sourceStyle.stroke : sourceStyle.backgroundColor));
      stops[1].setAttribute("stop-color", targetStyle.getPropertyValue("--handoff-axis-color").trim() ||
        (target instanceof SVGElement ? targetStyle.stroke : targetStyle.borderTopColor));
      const finalStroke = target instanceof SVGElement ? Number.parseFloat(targetStyle.strokeWidth) || 1 : 1;
      const movement: { tween?: gsap.core.Tween } = {};
      let refreshFrame = 0;
      let geometry: { x: number; y: number; h: number; w: number; edge: number; tx: number; ty: number; tw: number } | undefined;
      const restore = () => {
        visual.dataset.active = "false";
        source.style.visibility = sourceVisibility;
        target.style.borderTopColor = border;
        delete target.dataset.handoffAxisActive;
        opacity.forEach((value, element) => { element.style.opacity = value; });
      };
      const render = () => {
        const p = phase.p, native = movement.tween?.scrollTrigger?.progress ?? p;
        if (!geometry || p <= 0 || p >= 1 || native <= 0 || native >= 1 || document.querySelector("dialog[open]")) {
          restore(); return;
        }
        const at = ease(segment(p, .12, .88)), g = geometry;
        const numbersTop = innerHeight - native * (innerHeight - anchorInset);
        const targetY = g.ty + numbersTop;
        // The comparison scrolls with the page; its lower edge is a fixed distance above the next chapter.
        const edge = numbersTop - g.edge;
        gradient.setAttribute("y1", String(edge - .5));
        gradient.setAttribute("y2", String(edge + .5));
        line.setAttribute("x1", String(lerp(g.x, g.tx, at)));
        line.setAttribute("x2", String(lerp(g.x, g.tx + g.tw, at)));
        line.setAttribute("y1", String(lerp(g.y, targetY, at)));
        line.setAttribute("y2", String(lerp(g.y + g.h, targetY, at)));
        line.style.strokeWidth = String(lerp(g.w, finalStroke, at));
        source.style.visibility = "hidden";
        target.style.borderTopColor = "transparent";
        target.dataset.handoffAxisActive = "true";
        outgoing.forEach((el) => { el.style.opacity = String(1 - segment(p, .08, .30)); });
        heading.style.opacity = String(segment(p, .62, .82));
        visual.dataset.active = "true";
      };
      const measure = () => {
        const src = source.getBoundingClientRect(), stageBox = stage.getBoundingClientRect();
        const dst = target.getBoundingClientRect(), numberBox = numbers.getBoundingClientRect();
        // During the handoff the stage has finished its sticky phase and ends where the next chapter begins.
        const ground = surface.getBoundingClientRect();
        geometry = src.height && dst.width ? {
          x: src.left + src.width / 2, y: src.top - stageBox.top, h: src.height, w: src.width || 2,
          edge: stageBox.bottom - ground.bottom,
          tx: dst.left, ty: dst.top - numberBox.top, tw: dst.width,
        } : undefined;
      };
      movement.tween = gsap.to(phase, {
        p: 1, ease: "none", onUpdate: render,
        scrollTrigger: {
          id: "comparison-numbers-handoff", trigger: numbers,
          start: "top bottom", end: `top ${anchorInset}px`, scrub: .45, refreshPriority: -2,
          onEnter: measure, onEnterBack: measure,
          onRefresh: () => { measure(); render(); },
          onLeave: restore, onLeaveBack: restore,
        },
      });
      const changed = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => { measure(); render(); });
      };
      comparison.addEventListener("input", changed);
      comparison.addEventListener("click", changed);
      measure(); render();
      return () => {
        comparison.removeEventListener("input", changed);
        comparison.removeEventListener("click", changed);
        cancelAnimationFrame(refreshFrame);
        movement.tween?.kill(); restore();
      };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [reduced] });

  return (
    <div ref={root} className={s.sequence}>
      {children}
      <div ref={historyOverlay} className={s.overlay} data-history-handoff aria-hidden="true">
        <div ref={crop} className={s.frame} data-grain>
          {/* Decoded originals are reused as visual copies; source content stays in its section. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={archiveImage} className={s.image} alt="" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={portraitImage} className={s.image} alt="" decoding="async" />
        </div>
        <span ref={caption} className={s.label}>Ilustrační snímek</span>
      </div>
      <svg ref={axisOverlay} className={`${s.overlay} ${s.axis}`} data-axis-handoff aria-hidden="true">
        <defs>
          <linearGradient ref={axisGradient} id="era-axis-surface" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" />
            <stop offset="1" />
          </linearGradient>
        </defs>
        <line ref={axisLine} />
      </svg>
    </div>
  );
}
