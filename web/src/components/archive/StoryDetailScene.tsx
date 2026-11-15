"use client";

import { gsap } from "@/lib/gsap/setup";
import { useScene } from "@/lib/gsap/useScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/*
 * P1 (Jakub 11:36): the story page should get under the skin — less UI,
 * more person. One scene, no pin, no second renderer:
 * - the opening photo settles with a slow push-in and drifts on scroll,
 * - the quote and paragraphs remain readable at full contrast,
 * - the route on the map draws with the reading position,
 * - "Kdo pokračuje dál" opens its photo as it comes into view (touch too).
 * Reduced motion: nothing runs; the static page is complete.
 */
export function StoryDetailScene() {
  const reduced = usePrefersReducedMotion();

  useScene(
    () => {
      if (reduced) return;
      const main = document.querySelector<HTMLElement>("main");
      if (!main) return;

      const photo = main.querySelector<HTMLElement>("[data-shared-photo] img");
      if (photo) {
        gsap.fromTo(photo, { scale: 1.14 }, { scale: 1.04, duration: 3.2, ease: "power2.out" });
        gsap.to(photo, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: photo.closest("header"),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const route = main.querySelector<SVGPathElement>("[data-route-draw]");
      if (route) {
        route.style.animation = "none";
        gsap.fromTo(
          route,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: { trigger: route.closest("figure"), start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      }

      const next = main.querySelector<HTMLElement>("[data-next-photo]");
      if (next) {
        gsap.fromTo(
          next,
          { clipPath: "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0 0 0%)",
            ease: "none",
            scrollTrigger: { trigger: next.closest("a"), start: "top 85%", end: "top 35%", scrub: 0.6 },
          },
        );
      }

    },
    { dependencies: [reduced] },
  );

  return null;
}
