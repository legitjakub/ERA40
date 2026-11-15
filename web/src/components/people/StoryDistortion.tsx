"use client";

import { useEffect, useRef, type RefObject } from "react";

export function StoryDistortion({
  root,
  reduced,
  selector,
  drive,
}: {
  root: RefObject<HTMLElement | null>;
  reduced: boolean;
  selector?: string;
  drive?: "scroll" | "hover";
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (reduced || !root.current || !canvas.current) return;
    const media = matchMedia(
      "(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
    );
    let cleanup: (() => void) | undefined;
    let live = true;
    let pending = false;
    const el = root.current;
    async function mount() {
      if (!media.matches || cleanup || pending || !live) return;
      pending = true;
      const { createDistortion } = await import("./distortion");
      pending = false;
      if (live && media.matches && canvas.current)
        cleanup = createDistortion(canvas.current, el, { selector, drive });
    }
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void mount();
        else {
          cleanup?.();
          cleanup = undefined;
        }
      },
      { rootMargin: "200px" },
    );
    const change = () => {
      cleanup?.();
      cleanup = undefined;
      if (media.matches && el.getBoundingClientRect().top < innerHeight)
        void mount();
    };
    near.observe(el);
    media.addEventListener("change", change);
    return () => {
      live = false;
      near.disconnect();
      media.removeEventListener("change", change);
      cleanup?.();
    };
  }, [root, reduced, selector, drive]);
  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0,
      }}
    />
  );
}
