"use client";

import { useRef, type ReactNode } from "react";
import { useScene } from "@/lib/gsap/useScene";
import { gsap } from "@/lib/gsap/setup";
import { EASE } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./SceneHandoffs.module.css";

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const segment = (p: number, a: number, b: number) => gsap.utils.clamp(0, 1, (p - a) / (b - a));
/** Same corner radius as the 07 tree (Numbers BEND). */
const AXIS_BEND = 12;
/** Polyline with rounded corners (one radius per corner); a corner never takes more than half of a leg. */
function rounded(points: [number, number][], radii: number[]) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1], [cx, cy] = points[i], [nx, ny] = points[i + 1];
    const into = Math.hypot(cx - px, cy - py), out = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radii[i - 1] ?? 0, into / 2, out / 2);
    if (!r) { d += `L${cx} ${cy}`; continue; }
    d += `L${cx - ((cx - px) / into) * r} ${cy - ((cy - py) / into) * r}` +
      `Q${cx} ${cy} ${cx + ((nx - cx) / out) * r} ${cy + ((ny - cy) / out) * r}`;
  }
  const [lx, ly] = points[points.length - 1];
  return d + `L${lx} ${ly}`;
}
/** Spec 008B: the comparison axis continues into the numbers chapter. */
export function SceneHandoffs({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const axisOverlay = useRef<SVGSVGElement>(null);
  const axisRoute = useRef<SVGPathElement>(null);
  const axisGradient = useRef<SVGLinearGradientElement>(null);
  const reduced = usePrefersReducedMotion();

  useScene(() => {
    const scope = root.current;
    if (!scope || reduced) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px) and (min-height:680px) and (prefers-reduced-motion:no-preference)", () => {
      // This contract also lets the next chapter design target a branching root.
      const source = scope.querySelector<HTMLElement | SVGElement>("[data-handoff-axis-source]");
      const comparison = source?.closest<HTMLElement>("[data-section]");
      const target = scope.querySelector<HTMLElement | SVGElement>("[data-handoff-axis-target]");
      const numbers = target?.closest<HTMLElement>("[data-section]");
      const heading = numbers?.querySelector<HTMLElement>("h2");
      const visual = axisOverlay.current, line = axisRoute.current;
      if (!comparison || !source || !numbers || !target || !heading || !visual || !line) return;
      const outgoing = [...comparison.querySelectorAll<HTMLElement>("[data-handoff-copy]")];
      const opacity = new Map([...outgoing, heading].map((el) => [el, el.style.opacity]));
      const sourceVisibility = source.style.visibility, border = target.style.borderTopColor;
      const headingClip = heading.style.clipPath;
      const anchorInset = Number.parseFloat(getComputedStyle(numbers).scrollMarginTop) || 0;
      const phase = { p: 0 }, ease = gsap.parseEase(EASE.inOut);
      const sourceStyle = getComputedStyle(source), targetStyle = getComputedStyle(target);
      // Trasa grammar: the line keeps the source colour over the dark surface it leaves
      // (the white divider on the photo) and the target colour on the light page.
      const surface = source.parentElement ?? source;
      const captionBelow = source.closest("figure")?.querySelector("figcaption");
      const gradient = axisGradient.current, stops = gradient?.querySelectorAll("stop");
      if (!gradient || stops?.length !== 2) return;
      stops[0].setAttribute("stop-color", sourceStyle.getPropertyValue("--handoff-axis-color").trim() ||
        (source instanceof SVGElement ? sourceStyle.stroke : sourceStyle.backgroundColor));
      stops[1].setAttribute("stop-color", targetStyle.getPropertyValue("--handoff-axis-color").trim() ||
        (target instanceof SVGElement ? targetStyle.stroke : targetStyle.borderTopColor));
      const finalStroke = target instanceof SVGElement ? Number.parseFloat(targetStyle.strokeWidth) || 1 : 1;
      const movement: { tween?: gsap.core.Tween } = {};
      let refreshFrame = 0;
      const restore = () => {
        visual.dataset.active = "false";
        source.style.visibility = sourceVisibility;
        target.style.borderTopColor = border;
        delete target.dataset.handoffAxisActive;
        opacity.forEach((value, element) => { element.style.opacity = value; });
        heading.style.clipPath = headingClip;
      };
      const render = () => {
        const p = phase.p, native = movement.tween?.scrollTrigger?.progress ?? p;
        if (p <= 0 || p >= 1 || native <= 0 || native >= 1 || document.querySelector("dialog[open]")) {
          restore(); return;
        }
        // Live boxes: the divider moves with the slider and both chapters scroll during the handoff.
        const src = source.getBoundingClientRect(), dst = target.getBoundingClientRect();
        if (!src.height || !dst.width) { restore(); return; }
        const x = src.left + src.width / 2, top = src.top, bottom = src.bottom;
        const caption = captionBelow?.getBoundingClientRect().top ?? bottom + AXIS_BEND * 2;
        const turn = Math.min(AXIS_BEND, Math.max(0, caption - bottom) / 2);
        const tx = dst.left, ty = dst.top, tw = dst.width, margin = tx - AXIS_BEND;
        // One route that crosses no text: out of the photo, left through the gap above its
        // caption, down the outer margin and into the root in the root's own direction.
        line.setAttribute("d", rounded(
          [[x, top], [x, bottom + turn], [margin, bottom + turn], [margin, ty], [tx + tw, ty]],
          [turn, AXIS_BEND, AXIS_BEND],
        ));
        const length = line.getTotalLength(), at = ease(segment(p, .12, .88));
        // The drawn window starts as the divider and ends as the root.
        const end = lerp(src.height, length, segment(at, 0, .65));
        const start = lerp(0, length - tw, segment(at, .35, 1));
        line.style.strokeDasharray = `${Math.max(0, end - start)} ${length + 1}`;
        line.style.strokeDashoffset = String(-start);
        const edge = surface.getBoundingClientRect().bottom;
        gradient.setAttribute("y1", String(edge - .5));
        gradient.setAttribute("y2", String(edge + .5));
        line.style.strokeWidth = String(lerp(src.width || 2, finalStroke, at));
        source.style.visibility = "hidden";
        target.style.borderTopColor = "transparent";
        target.dataset.handoffAxisActive = "true";
        outgoing.forEach((el) => { el.style.opacity = String(1 - segment(p, .08, .30)); });
        // Jakub 11:5x: a half-faded headline read as broken. The headline is
        // written out left to right as the line arrives at the root instead.
        const wipe = ease(segment(p, .5, .86));
        heading.style.opacity = "1";
        heading.style.clipPath = `inset(-0.2em ${((1 - wipe) * 100).toFixed(2)}% -0.2em 0)`;
        visual.dataset.active = "true";
      };
      movement.tween = gsap.to(phase, {
        p: 1, ease: "none", onUpdate: render,
        scrollTrigger: {
          id: "comparison-numbers-handoff", trigger: numbers,
          start: "top bottom", end: `top ${anchorInset}px`, scrub: .45, refreshPriority: -2,
          onRefresh: render,
          onLeave: restore, onLeaveBack: restore,
        },
      });
      const changed = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(render);
      };
      comparison.addEventListener("input", changed);
      comparison.addEventListener("click", changed);
      render();
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
      <svg ref={axisOverlay} className={`${s.overlay} ${s.axis}`} data-axis-handoff aria-hidden="true">
        <defs>
          <linearGradient ref={axisGradient} id="era-axis-surface" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" />
            <stop offset="1" />
          </linearGradient>
        </defs>
        <path ref={axisRoute} />
      </svg>
    </div>
  );
}
