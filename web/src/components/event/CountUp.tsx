"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Counts a figure such as "446 200" up once it enters view; text stays final for readers. */
export function CountUp({ value }: { value: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const target = /^[\d\s ]+$/.test(value) ? Number(value.replace(/\D/g, "")) : NaN;

  useEffect(() => {
    const node = el.current;
    if (!node || reduced || !Number.isFinite(target) || target < 1000) return;
    const fmt = new Intl.NumberFormat("cs-CZ");
    const state = { v: 0 };
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      tween = gsap.to(state, {
        v: target,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          node.textContent = fmt.format(Math.round(state.v));
        },
        onComplete: () => {
          node.textContent = value;
        },
      });
    }, { threshold: 0.6 });
    io.observe(node);
    return () => {
      io.disconnect();
      tween?.kill();
      node.textContent = value;
    };
  }, [reduced, target, value]);

  return (
    <span ref={el}>{value}</span>
  );
}
