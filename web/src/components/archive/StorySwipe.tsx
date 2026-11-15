"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/*
 * Mobile (master synthesis P1): a clear sideways swipe on the story opening
 * moves to the next or previous journey, like turning to the next person.
 * Vertical scrolling is untouched; the visible arrows remain the main path.
 */
export function StorySwipe({ prev, next }: { prev: string; next: string }) {
  const router = useRouter();
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-story-hero]");
    if (!hero || !matchMedia("(pointer: coarse)").matches) return;
    let x = 0;
    let y = 0;
    let tracking = false;
    const start = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      tracking = true;
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    };
    const end = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = event.changedTouches[0].clientX - x;
      const dy = event.changedTouches[0].clientY - y;
      // Deliberate horizontal gesture only: far enough and mostly sideways.
      if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 2) return;
      router.push(dx < 0 ? next : prev);
    };
    hero.addEventListener("touchstart", start, { passive: true });
    hero.addEventListener("touchend", end, { passive: true });
    router.prefetch(next);
    router.prefetch(prev);
    return () => {
      hero.removeEventListener("touchstart", start);
      hero.removeEventListener("touchend", end);
    };
  }, [router, prev, next]);
  return null;
}
