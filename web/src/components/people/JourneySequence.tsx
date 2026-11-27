"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { stories } from "@/content/stories";

type Journey = {
  mapStoryId: string;
  selectStory: (id: string, explicit?: boolean) => void;
  selectMapStory: (id: string) => void;
};

const JourneyContext = createContext<Journey | null>(null);

export function useJourney() {
  const journey = useContext(JourneyContext);
  if (!journey) throw new Error("JourneySequence is required");
  return journey;
}

export function JourneySequence({ children }: { children: ReactNode }) {
  const [mapStoryId, selectMapStory] = useState(stories[0].id);
  const lastStory = useRef(stories[0].id);

  const selectStory = useCallback((id: string, explicit = false) => {
    // Re-entering the same story leaves a deliberate map selection in place.
    if (lastStory.current === id && !explicit) return;
    lastStory.current = id;
    selectMapStory(id);
  }, []);

  const journey = useMemo(() => ({ mapStoryId, selectStory, selectMapStory }), [mapStoryId, selectStory]);
  return <JourneyContext value={journey}>{children}</JourneyContext>;
}
