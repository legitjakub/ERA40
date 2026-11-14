"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
export type ScrollTrigger = import("gsap/ScrollTrigger").ScrollTrigger;
export let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
let scrolling: Promise<void> | undefined;
const listeners = new Set<() => void>();

export function subscribeMotion(update: () => void) {
  listeners.add(update);
  void loadScrolling().catch(() => {
    /* The static content remains available. */
  });
  return () => {
    listeners.delete(update);
  };
}
export function motionReady() {
  return Boolean(ScrollTrigger);
}
function loadScrolling() {
  scrolling ??= import("gsap/ScrollTrigger").then((module) => {
    registerGsap();
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    listeners.forEach((update) => update());
  });
  return scrolling;
}

let registered = false;
let flip: Promise<typeof import("gsap/Flip")> | undefined;
let split: Promise<typeof import("gsap/SplitText")> | undefined;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(DrawSVGPlugin, useGSAP);
  registered = true;
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ERA_QA === "1"
  ) {
    Object.assign(window, {
      __eraRanges() {
        const ranges: Record<string, { start: number; end: number }> = {};
        for (const t of ScrollTrigger?.getAll() ?? []) {
          const chapter =
            t.trigger?.closest<HTMLElement>("[data-section]")?.dataset.section;
          if (chapter && t.pin)
            ranges[chapter] = { start: t.start, end: t.end };
        }
        return ranges;
      },
    });
  }
}

export function loadFlip() {
  flip ??= import("gsap/Flip").then((module) => {
    gsap.registerPlugin(module.Flip);
    return module;
  });
  return flip;
}

export function loadSplitText() {
  split ??= import("gsap/SplitText").then((module) => {
    gsap.registerPlugin(module.SplitText);
    return module;
  });
  return split;
}

export { gsap };
