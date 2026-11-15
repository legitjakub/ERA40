"use client";

import { gsap, loadSplitText, ScrollTrigger } from "@/lib/gsap/setup";
import { useScene } from "@/lib/gsap/useScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/*
 * P1 (Jakub 11:36): the story page should get under the skin — less UI,
 * more person. One scene, no pin, no second renderer:
 * - the opening photo settles with a slow push-in and drifts on scroll,
 * - the quote gets its own quiet section, revealed word by word by scroll,
 * - the route on the map draws with the reading position,
 * - paragraphs arrive one by one (blur only on wide screens),
 * - "Kdo pokračuje dál" opens its photo as it comes into view (touch too).
 * Reduced motion: nothing runs; the static page is complete.
 */
export function StoryDetailScene() {
  const reduced = usePrefersReducedMotion();

  useScene(
    (context) => {
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

      const mm = gsap.matchMedia();
      mm.add(
        { wide: "(min-width: 1024px)", narrow: "(max-width: 1023px)" },
        ({ conditions }) => {
          const blur = conditions?.wide ? "blur(6px)" : "blur(0px)";
          const items = main.querySelectorAll("[data-reveal]");
          gsap.set(items, { opacity: 0, y: 28, filter: blur });
          ScrollTrigger.batch(items, {
            start: "top 88%",
            once: true,
            onEnter: (entered) =>
              gsap.to(entered, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12,
              }),
          });
        },
      );

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

      const voice = main.querySelector<HTMLElement>("[data-voice]");
      if (voice) {
        loadSplitText().then(({ SplitText }) => {
          context.add(() => {
            const split = SplitText.create(voice, { type: "words" });
            gsap.fromTo(
              split.words,
              { opacity: 0.14 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: voice, start: "top 80%", end: "bottom 45%", scrub: 0.5 },
              },
            );
          });
        });
      }

      return () => mm.revert();
    },
    { dependencies: [reduced] },
  );

  return null;
}
