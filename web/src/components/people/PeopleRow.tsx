"use client";

import Image from "next/image";
import { useRef } from "react";
import { stories, storyPhoto } from "@/content/stories";
import { gsap } from "@/lib/gsap/setup";
import { useScene } from "@/lib/gsap/useScene";
import { useOpenStory } from "./StoryDialog";
import { StoryDistortion } from "./StoryDistortion";
import { ContentNote } from "@/components/ui/ContentNote";
import s from "./PeopleRow.module.css";

/*
 * P0 (Jakub 11:44): the window-of-a-moving-train section is gone. In its
 * place: people, not transport. The eight model stories arrive one after
 * another as the reader scrolls, each with a name and a route. Desktop: a
 * row that rises like a wave (scrubbed, no pin). Phones: a swipe strip, tap
 * opens the story. Reduced motion: the same row, static.
 */
export function PeopleRow({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  // The same on-demand renderer as 04 Příběhy; the two sections are screens
  // apart and each context exists only near its section, so one runs at a time.
  const open = useOpenStory();

  useScene(
    () => {
      const row = root.current;
      if (reduced || !row) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-person]", row);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          cards,
          { y: (i) => 120 + (i % 3) * 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: row, start: "top 95%", end: "top 30%", scrub: 0.6 },
          },
        );
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          cards,
          { x: 40, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className={s.people}>
      <p className={s.kicker}>Každý přiveze něco jiného.</p>
      <ol className={s.row} aria-label="Lidé z modelových příběhů">
        {stories.map((story) => {
          const photo = storyPhoto(story);
          return (
            <li key={story.id} className={s.person} data-person>
              <button
                type="button"
                className={s.card}
                onClick={(event) =>
                  open(
                    story,
                    event.currentTarget,
                    event.currentTarget.querySelector<HTMLElement>("[data-person-photo]"),
                  )
                }
              >
                <span className={s.photo} data-person-photo data-grain>
                  <Image src={photo.file} alt="" fill sizes="(min-width: 1024px) 12vw, 44vw" />
                </span>
                <span className={s.name}>{story.name}</span>
                <span className={s.route}>
                  {story.from} <span aria-hidden="true">→</span>
                  <span className="visually-hidden"> – </span> {story.to}
                </span>
                <span className="visually-hidden">, otevřít příběh</span>
              </button>
            </li>
          );
        })}
      </ol>
      <ContentNote />
      <StoryDistortion root={root} reduced={reduced} selector="[data-person-photo]" drive="hover" />
    </div>
  );
}
