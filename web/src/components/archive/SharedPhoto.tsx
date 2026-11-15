"use client";

import { ViewTransition } from "react";

/**
 * Gives a story photo the same name on the archive card and on the story
 * page, so navigation morphs one into the other. Without browser support the
 * page swaps normally. A photo that arrives through the morph drops its own
 * entrance animation, which would otherwise clip the new snapshot.
 */
export function SharedPhoto({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <ViewTransition
      name={`story-${id}`}
      share="story-photo"
      default="none"
      onShare={() => {
        document
          .querySelectorAll<HTMLElement>(`[data-shared-photo="${id}"]`)
          .forEach((photo) => {
            photo.style.animation = "none";
          });
      }}
    >
      {children}
    </ViewTransition>
  );
}
