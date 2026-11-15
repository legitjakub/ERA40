"use client";
// Shared motion presets — spec in docs/DESIGN.md §4. Sections compose these; do not invent one-off eases.
import { gsap, loadSplitText } from "./setup";

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;
export const DUR = { xs: 0.3, s: 0.6, m: 0.9, l: 1.4 } as const;

/** Line-masked text reveal. Returns the SplitText instance so callers can revert() on cleanup. */
export async function splitReveal(
  el: Element,
  opts: {
    scrollTrigger?: ScrollTrigger.Vars;
    delay?: number;
    type?: "lines" | "words";
  } = {},
) {
  const { SplitText } = await loadSplitText();
  const type = opts.type ?? "lines";
  const split = SplitText.create(el, { type, mask: type, autoSplit: true });
  gsap.from(type === "lines" ? split.lines : split.words, {
    yPercent: 100,
    duration: DUR.m,
    ease: EASE.out,
    stagger: 0.08,
    delay: opts.delay ?? 0,
    scrollTrigger: opts.scrollTrigger,
  });
  return split;
}

/** Clip-path reveal of a media frame, with the inner image settling from 1.15 → 1. */
export function maskReveal(
  frame: Element,
  inner: Element | null,
  opts: {
    from?: "bottom" | "left" | "right";
    scrollTrigger?: ScrollTrigger.Vars;
  } = {},
) {
  const start =
    opts.from === "left"
      ? "inset(0 100% 0 0)"
      : opts.from === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";
  const tl = gsap.timeline({
    scrollTrigger: opts.scrollTrigger,
    defaults: { duration: DUR.l, ease: EASE.expo },
  });
  tl.fromTo(frame, { clipPath: start }, { clipPath: "inset(0% 0% 0% 0%)" }, 0);
  if (inner) tl.fromTo(inner, { scale: 1.15 }, { scale: 1 }, 0);
  return tl;
}

/** Trasa (route) line draw. Scrubbed when a scrollTrigger with scrub is passed. */
export function routeDraw(
  path: SVGPathElement | SVGPathElement[],
  scrollTrigger?: ScrollTrigger.Vars,
) {
  return gsap.fromTo(
    path,
    { drawSVG: "0%" },
    {
      drawSVG: "100%",
      ease: scrollTrigger?.scrub ? "none" : EASE.inOut,
      duration: DUR.l,
      scrollTrigger,
    },
  );
}

/** Count-up with Czech thousands separator (non-breaking space). */
export function counter(
  el: HTMLElement,
  to: number,
  scrollTrigger?: ScrollTrigger.Vars,
) {
  const fmt = new Intl.NumberFormat("cs-CZ");
  const state = { v: 0 };
  return gsap.to(state, {
    v: to,
    duration: DUR.l,
    ease: EASE.out,
    snap: { v: 1 },
    scrollTrigger,
    onUpdate: () => {
      el.textContent = fmt.format(state.v);
    },
  });
}

/** Animate Roboto Flex width/weight axes — kinetic type without reflow on fixed-width boxes. */
export function flexAxes(
  el: Element,
  from: { wdth: number; wght: number },
  to: { wdth: number; wght: number },
  vars: gsap.TweenVars = {},
) {
  const s = { ...from };
  const apply = () =>
    gsap.set(el, {
      fontVariationSettings: `"wdth" ${s.wdth.toFixed(1)}, "wght" ${s.wght.toFixed(0)}`,
    });
  apply();
  return gsap.to(s, {
    ...to,
    onUpdate: apply,
    duration: DUR.m,
    ease: EASE.out,
    ...vars,
  });
}

/**
 * Opacity-and-rise reveal for groups (cards, paragraphs). Opacity only, never
 * visibility, so revealed text stays in the accessibility tree (lesson
 * 15. 11.). Returns the batch triggers for cleanup by the scene context.
 */
export function riseIn(
  targets: Element[] | NodeListOf<Element>,
  opts: { y?: number; stagger?: number; start?: string } = {},
) {
  return import("./setup").then(({ ScrollTrigger }) =>
    ScrollTrigger.batch(Array.from(targets), {
      start: opts.start ?? "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          y: opts.y ?? 32,
          duration: DUR.m,
          ease: EASE.out,
          stagger: opts.stagger ?? 0.09,
          clearProps: "transform,opacity",
        }),
    }),
  );
}

/**
 * Left-to-right wipe (clip-path), the „written out along the route“ reveal
 * used for the 07 headline. Pass a progress 0–1 to set it from a scene.
 */
export function wipe(el: HTMLElement, progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  el.style.clipPath = `inset(-0.2em ${((1 - p) * 100).toFixed(2)}% -0.2em 0)`;
}
