"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./RouteTransition.module.css";

const route = (path: string) => path.replace(/\/+$/, "") || "/";
const storyRoute = (path: string) => /^\/pribehy(?:\/[^/]+)?$/.test(path);
const milliseconds = (value: string) =>
  parseFloat(value) * (value.trim().endsWith("ms") ? 1 : 1000);
type Intent = { from: string; to: string };
type Run = (from: string, to: string, committed: boolean) => void;

/** Spec 014. A visual handoff, never a router or a loading gate.
 * React keeps ownership of native ViewTransitions (including SharedPhoto).
 * No preventDefault, delayed push, focus/scroll lock, or second native owner.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const overlay = useRef<HTMLDivElement>(null);
  const previous = useRef(route(pathname));
  const intent = useRef<Intent | null>(null);
  const run = useRef<Run | null>(null);

  useEffect(() => {
    const root = overlay.current;
    if (!root) return;
    const panel = root.querySelector<HTMLElement>("[data-route-panel]")!;
    const trail = root.querySelector<SVGPathElement>("[data-route-trail]")!;
    const type = root.querySelector<SVGGElement>("[data-route-type]")!;
    const styles = getComputedStyle(root);
    const duration = milliseconds(styles.getPropertyValue("--dur-route"));
    const fade = milliseconds(styles.getPropertyValue("--dur-route-fade"));
    const easing = styles.getPropertyValue("--ease-out").trim();
    let animations: Animation[] = [];
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let generation = 0;

    const clear = () => {
      generation++;
      clearTimeout(deadline);
      animations.forEach((animation) => animation.cancel());
      animations = [];
      root.removeAttribute("data-active");
      root.dataset.state = "idle";
      document.documentElement.classList.remove(s.routing);
    };
    const track = (next: Animation[]) => {
      animations = next;
      const current = generation;
      next.forEach((animation) => void animation.finished.catch(() => {}));
      void next[0].finished.then(() => {
        if (current === generation) clear();
      }).catch(() => {});
      // A network request or cancelled animation must never leave a veil.
      deadline = setTimeout(() => {
        if (current === generation) clear();
      }, duration + 200);
    };
    const quiet = () => {
      const main = [...document.querySelectorAll("main")].find(
        (element) => element.getClientRects().length > 0,
      );
      if (!main?.animate) return;
      root.dataset.state = "fade";
      track([main.animate([{ opacity: 0.72 }, { opacity: 1 }], { duration: fade, easing })]);
    };
    const full = () => {
      if (!panel.animate) return;
      root.dataset.state = "full";
      root.setAttribute("data-active", "");
      document.documentElement.classList.add(s.routing);
      track([
        panel.animate([
          { transform: "translateY(100%)", offset: 0, easing },
          { transform: "translateY(0)", offset: 0.16 },
          { transform: "translateY(0)", offset: 0.7, easing },
          { transform: "translateY(-100%)", offset: 1 },
        ], { duration, fill: "both" }),
        trail.animate([
          { strokeDashoffset: 1000, offset: 0 },
          { strokeDashoffset: 1000, offset: 0.12, easing },
          { strokeDashoffset: 0, offset: 0.64 },
          { strokeDashoffset: 0, offset: 1 },
        ], { duration, fill: "both" }),
        type.animate([
          { opacity: 0, offset: 0 },
          { opacity: 0, offset: 0.2, easing },
          { opacity: 1, offset: 0.38 },
          { opacity: 1, offset: 0.74 },
          { opacity: 0, offset: 0.9 },
          { opacity: 0, offset: 1 },
        ], { duration, fill: "both" }),
      ]);
    };
    const transition: Run = (from, to, committed) => {
      if (from === to) return;
      const armed = intent.current?.from === from && intent.current.to === to;
      const shared = storyRoute(from) && storyRoute(to);
      const sharedPhoto = shared && (from === "/pribehy" || to === "/pribehy");
      if (!committed) intent.current = { from, to };
      else intent.current = null;
      if (document.hidden) { clear(); return; }
      if (reduced || shared) {
        clear();
        // A real shared photo stays exclusively under React's control.
        if (committed && (reduced || !document.startViewTransition || !sharedPhoto)) quiet();
      } else if (!committed || !armed) {
        clear();
        full();
      }
    };
    run.current = transition;

    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
      const from = route(location.pathname), to = route(url.pathname);
      if (from === to) { intent.current = null; clear(); return; }
      if (/\.[a-z0-9]+$/i.test(to)) return;
      transition(from, to, false);
    };
    const pop = () => transition(previous.current, route(location.pathname), false);
    const visibility = () => { if (document.hidden) clear(); };
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", pop);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", clear);
    return () => {
      clear();
      intent.current = null;
      run.current = null;
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", pop);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pagehide", clear);
    };
  }, [reduced]);

  useEffect(() => {
    const to = route(pathname), from = previous.current;
    previous.current = to;
    if (from !== to) run.current?.(from, to, true);
  }, [pathname]);

  const path = "M500 220 C405 90 325 70 245 90 C70 125 90 345 250 350 C350 354 405 300 500 220 C595 140 650 84 750 90 C910 95 930 315 755 350 C675 370 595 350 500 220";
  return (
    <div ref={overlay} className={s.overlay} aria-hidden="true" data-route-transition data-state="idle">
      <div className={s.panel} data-route-panel>
        <span className={s.label}>Erasmus+ navždy</span>
        <svg className={s.motif} viewBox="0 0 1000 440" fill="none" focusable="false">
          <path className={s.guide} d={path} />
          <path className={s.trail} data-route-trail pathLength="1000" d={path} />
          <g className={s.type} data-route-type fill="currentColor" textAnchor="middle">
            <text className={s.forty} x="250" y="259">40</text>
            <text className={s.years} x="750" y="234">1987–2027</text>
          </g>
        </svg>
        <span className={s.caption}>Zkušenost pokračuje.</span>
      </div>
    </div>
  );
}
