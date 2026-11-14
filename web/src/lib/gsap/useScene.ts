"use client";

import { useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import type gsap from "gsap";
import { motionReady, subscribeMotion } from "./setup";

type Options = Exclude<Parameters<typeof useGSAP>[1], unknown[] | undefined>;

export function useMotionReady() {
  return useSyncExternalStore(subscribeMotion, motionReady, () => false);
}

/** Scenes retain their static markup until the deferred ScrollTrigger plugin is ready. */
export function useScene(
  effect: (context: gsap.Context) => unknown,
  options: Options = {},
) {
  const ready = useMotionReady();
  return useGSAP(
    (context) => {
      if (ready) return effect(context);
    },
    {
      ...options,
      dependencies: [ready, ...(options.dependencies ?? [])],
      revertOnUpdate: true,
    },
  );
}
