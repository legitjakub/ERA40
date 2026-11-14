"use client";

import { useSyncExternalStore } from "react";

const preference = "(prefers-reduced-motion: reduce)";

function subscribe(update: () => void) {
  const media = window.matchMedia(preference);
  media.addEventListener("change", update);
  window.addEventListener("era40-motion-change", update);
  return () => {
    media.removeEventListener("change", update);
    window.removeEventListener("era40-motion-change", update);
  };
}

function current() {
  return (
    window.matchMedia(preference).matches ||
    localStorage.getItem("era40-reduce-motion") === "1"
  );
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, current, () => true);
}

export function setReduceMotionPreference(on: boolean) {
  localStorage.setItem("era40-reduce-motion", on ? "1" : "0");
  window.dispatchEvent(new Event("era40-motion-change"));
}
