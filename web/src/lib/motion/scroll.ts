import type Lenis from "lenis";

let current: Lenis | undefined;

/** Exactly one owner for programmatic smooth scrolling across page changes. */
export function attachSmoothScroller(scroller: Lenis) {
  current = scroller;
  return () => {
    if (current === scroller) current = undefined;
  };
}

export function scrollToPosition(top: number, reduced: boolean) {
  if (current && !reduced) {
    current.scrollTo(top, {
      duration: 1,
      easing: (progress) => 1 - Math.pow(1 - progress, 3),
    });
  } else {
    window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
  }
}
