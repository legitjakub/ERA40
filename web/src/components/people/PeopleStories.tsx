"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ScrollTrigger } from "@/lib/gsap/setup";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { stories, storyPhoto } from "@/content/stories";
import { storyImpact } from "@/content/story-impact";
import { StoryStatus, useOpenStory } from "./StoryDialog";
import { StoryDistortion } from "./StoryDistortion";
import { useJourney } from "./JourneySequence";
import s from "./PeopleStories.module.css";

// Each story is a station named after the place where the stay happened.
const stops = stories.map((story) => story.to);

export function PeopleStories() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const open = useOpenStory();
  const route = useRef<HTMLElement>(null);
  const pinned = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const activeIndex = useRef(0);
  const linked = useRef(0);
  const { selectRailStory } = useJourney();
  const last = stories.length - 1;

  // The Trasa under the stories mirrors the reader's position: a yellow
  // fill runs from the first to the last station and the nearest station
  // becomes active. On desktop the pinned rail drives it, on touch the
  // native horizontal scroll does.
  // `reading` is false when ScrollTrigger recalculates the pin while the
  // reader is elsewhere (e.g. on the map); that must not override a person
  // the reader picked on the map.
  function follow(progress: number, reading = true) {
    route.current?.style.setProperty("--progress", progress.toFixed(4));
    const next = Math.round(progress * last);
    if (activeIndex.current !== next) {
      activeIndex.current = next;
      setActive(next);
      if (reading) link(next);
    }
  }
  function link(index: number) {
    linked.current = index;
    selectRailStory(index);
  }

  useEffect(() => {
    const track = rail.current;
    if (!track) return;
    const onScroll = () => {
      if (root.current?.dataset.enhanced) return;
      const max = track.scrollWidth - track.clientWidth;
      follow(max > 0 ? track.scrollLeft / max : 0);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
    // follow only touches refs and a state setter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(index: number) {
    const track = rail.current;
    const trigger = pinned.current;
    const smooth = reduced ? "instant" : "smooth";
    if (trigger && root.current?.dataset.enhanced) {
      window.scrollTo({
        top: trigger.start + ((trigger.end - trigger.start) * index) / last,
        behavior: smooth,
      });
      return;
    }
    const card = track?.querySelectorAll<HTMLElement>("[data-story-spread]")[
      index
    ];
    if (!track || !card) return;
    if (reduced || getComputedStyle(track).display === "block")
      card.scrollIntoView({ behavior: smooth, block: "start" });
    else track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: smooth });
  }

  useGSAP(
    () => {
      registerGsap();
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 620px)", () => {
        const track = rail.current;
        if (!track || !root.current) return;
        root.current.dataset.enhanced = "true";
        const distance = () => track.scrollWidth - track.clientWidth;
        const movement = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.55,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => follow(self.progress, self.isActive),
            // Lenis can report a programmatic jump as a brief enter/leave pair
            // although the reader never returned to the rail; trust the position.
            onEnterBack: (self) => {
              if (self.scroll() <= self.end) link(Math.round(self.progress * last));
            },
            // Leaving downwards departs from the last story, even after a fast jump.
            onLeave: () => {
              if (linked.current !== last) link(last);
            },
          },
        });
        pinned.current = movement.scrollTrigger ?? null;
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-story-spread]",
          track,
        );
        cards.forEach((card, i) => {
          if (!i) return;
          gsap.from(card.querySelector("[data-photo-wipe]"), {
            clipPath: "inset(0 0 0 100%)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: movement,
              start: "left 90%",
              end: "left 10%",
              scrub: true,
            },
          });
          gsap.from(card.querySelector("blockquote"), {
            y: 35,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: movement,
              start: "left 95%",
              end: "left 35%",
              scrub: true,
            },
          });
        });
        // Bring a keyboard-focused chapter into the pinned viewport.
        const focus = (event: FocusEvent) => {
          const card = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-story-spread]",
          );
          const index = card ? cards.indexOf(card) : -1;
          const trigger = movement.scrollTrigger;
          if (index >= 0 && trigger)
            window.scrollTo({
              top:
                trigger.start +
                ((trigger.end - trigger.start) * index) / Math.max(1, cards.length - 1),
              behavior: "instant",
            });
        };
        track.addEventListener("focusin", focus);
        return () => {
          track.removeEventListener("focusin", focus);
          pinned.current = null;
          delete root.current?.dataset.enhanced;
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="pribehy"
      ref={root}
      data-section="pribehy"
      data-reduced={reduced}
      aria-labelledby="stories-title"
      className={s.section}
    >
      <header className={s.heading} data-stories-heading>
        <h2 id="stories-title">Osm cest. Spousta začátků.</h2>
        <p>
          Za každým pobytem je člověk.
          <br />
          <Link className={s.all} href="/pribehy">
            Všechny příběhy
          </Link>
        </p>
      </header>
      {/* R8: one sentence about the gesture on touch screens; it leaves after the first swipe. */}
      <p className={s.swipeHint} aria-hidden="true">
        Další příběhy najdeš posunem do strany <span>→</span>
      </p>
      <div className={s.viewport}>
        <div
          ref={rail}
          className={s.rail}
          data-story-rail
          onScroll={(event) => {
            const section = event.currentTarget.closest("section");
            if (section && event.currentTarget.scrollLeft > 24) section.dataset.swiped = "true";
          }}
        >
          {stories.map((story, i) => {
            const photo = storyPhoto(story);
            return (
              <article
                id={"story-" + story.id}
                key={story.id}
                className={s.spread}
                data-story-spread
                data-layout={(["photo-left", "photo-right", "plate"] as const)[i % 3]}
              >
                <div
                  className={s.photo}
                  data-photo-wipe
                  data-grain
                  data-flip-id={"story-photo-" + story.id}
                >
                  <Image
                    src={photo.file}
                    alt={photo.alt}
                    fill
                    sizes="(min-width:1024px) 48vw, 90vw"
                  />
                  <span className={s.caption}>Ilustrační snímek</span>
                </div>
                <div className={s.text} data-story-copy>
                  <p className={s.kicker}>
                    <StoryStatus story={story} />
                  </p>
                  <p className={s.journey}>
                    {story.from} <span aria-hidden="true">⟶</span> {story.to}
                  </p>
                  <h3 className={s.name}>{story.name}</h3>
                  <blockquote>„{story.quote}“</blockquote>
                  <p className={s.excerpt}>{story.excerpt}</p>
                  {storyImpact(story) && (
                    <p className={s.impact}>
                      <span>Co pokračuje dál</span>
                      {storyImpact(story)!.summary}
                    </p>
                  )}
                  <p className={s.info}>
                    {story.field}, {story.year}
                  </p>
                  <button
                    type="button"
                    data-story-open
                    onClick={(e) =>
                      open(
                        story,
                        e.currentTarget,
                        e.currentTarget
                          .closest("article")
                          ?.querySelector("[data-photo-wipe]"),
                      )
                    }
                  >
                    Přečti si příběh <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <nav
        ref={route}
        className={s.trasa}
        aria-label="Trasa příběhů"
        data-story-route
      >
        <p className={s.counter} aria-hidden="true">
          <span className={s.counterNow}>
            {String(active + 1).padStart(2, "0")}
          </span>
          {" / " + String(stories.length).padStart(2, "0")}
          <span className={s.counterCity}>{stops[active]}</span>
        </p>
        <ol className={s.stations}>
          {stories.map((story, i) => (
            <li
              key={story.id}
              data-state={i === active ? "active" : i < active ? "passed" : "next"}
            >
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === active ? "step" : undefined}
                aria-label={`${stops[i]}: ${story.name}, ${story.from} – ${story.to}`}
              >
                <span className={s.station} aria-hidden="true" />
                <span className={s.city} aria-hidden="true">
                  {stops[i]}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <StoryDistortion root={root} reduced={reduced} />
    </section>
  );
}
