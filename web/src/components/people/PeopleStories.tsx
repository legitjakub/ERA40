"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/setup";
import type { ScrollTrigger as ScrollScene } from "@/lib/gsap/setup";
import { useScene } from "@/lib/gsap/useScene";
import { scrollToPosition } from "@/lib/motion/scroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { stories, storyPhoto } from "@/content/stories";
import type { Story } from "@/content/types";
import { useOpenStory } from "./StoryDialog";
import { useJourney } from "./JourneySequence";
import s from "./PeopleStories.module.css";

const featured = [
  { id: "valencie", headline: "Našla odvahu mluvit.", context: "Vyjela na semestr architektury do Valencie." },
  { id: "ucitelka", headline: "Učí svou třídu venku.", context: "Týden ve finské škole změnil její hodiny." },
  { id: "praha-in", headline: "Pomáhá najít cestu.", context: "Přijela na semestr a zůstala na magisterské studium." },
].flatMap((entry) => {
  const story = stories.find((item) => item.id === entry.id);
  return story ? [{ ...entry, story }] : [];
});

const cuts = [
  { start: .18, switchAt: .25, end: .32 },
  { start: .62, switchAt: .69, end: .76 },
] as const;
const stops = [.07, .46, .87] as const;

export function PeopleStories() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollScene | null>(null);
  const nativeIndex = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const { selectStory } = useJourney();
  const open = useOpenStory();

  useEffect(() => {
    const track = rail.current;
    if (!track || reduced) return;

    function follow() {
      if (!track || trigger.current) return;
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-story-spread]"));
      const start = cards[0]?.offsetLeft ?? 0;
      const distance = (card: HTMLElement) => Math.abs(card.offsetLeft - start - track.scrollLeft);
      const index = cards.reduce((nearest, card, i) => distance(card) < distance(cards[nearest]) ? i : nearest, 0);
      const item = featured[index];
      if (item && nativeIndex.current !== index) {
        nativeIndex.current = index;
        setActive(index);
        selectStory(item.story.id);
      }
    }

    track.addEventListener("scroll", follow, { passive: true });
    return () => track.removeEventListener("scroll", follow);
  }, [reduced, selectStory]);

  useScene(() => {
    const section = root.current, frame = stage.current;
    if (!section || !frame || reduced || featured.length !== 3) return;
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", () => {
      const photos = frame.querySelectorAll<HTMLElement>("[data-photo-wipe]");
      if (photos.length !== 3) return;
      section.dataset.enhanced = "true";
      setEnhanced(true);
      let previous = -1;
      let previousCut = false;
      const timeline = gsap.timeline({ defaults: { ease: "none" }, paused: true });
      // A full unit of time keeps the two rest intervals independent of image sizes.
      timeline.to({ value: 0 }, { value: 1, duration: 1 }, 0);
      cuts.forEach(({ start, end }, index) => {
        timeline.fromTo(photos[index + 1],
          { clipPath: "inset(0 0 0 100%)" },
          { clipPath: "inset(0 0 0 0%)", duration: end - start }, start);
      });

      function sync() {
        const progress = timeline.time();
        const index = progress >= cuts[1].switchAt ? 2 : progress >= cuts[0].switchAt ? 1 : 0;
        const cutting = cuts.some(({ start, end }) => progress > start && progress < end);
        if (cutting !== previousCut) {
          frame!.toggleAttribute("data-cutting", cutting);
          previousCut = cutting;
        }
        if (index === previous) return;
        previous = index;
        setActive(index);
        if (trigger.current?.isActive) selectStory(featured[index].story.id);
      }

      timeline.eventCallback("onUpdate", sync);
      const scene = ScrollTrigger.create({
        trigger: section,
        animation: timeline,
        pin: frame,
        start: "top top",
        end: () => "+=" + Math.floor(window.innerHeight * 1.2),
        scrub: .45,
        invalidateOnRefresh: true,
        onRefresh: sync,
        onEnter: () => selectStory(featured[Math.max(previous, 0)].story.id),
        onEnterBack: () => selectStory(featured[previous < 0 ? 2 : previous].story.id),
      });
      trigger.current = scene;
      sync();

      return () => {
        trigger.current = null;
        scene.kill();
        timeline.revert();
        frame.removeAttribute("data-cutting");
        delete section.dataset.enhanced;
        setEnhanced(false);
      };
    });

    return () => media.revert();
  }, { scope: root, dependencies: [reduced, selectStory] });

  function go(index: number) {
    const item = featured[index];
    if (!item) return;
    selectStory(item.story.id, true);
    const scene = trigger.current;
    if (scene) {
      scrollToPosition(scene.start + (scene.end - scene.start) * stops[index], reduced);
      return;
    }

    const track = rail.current;
    const cards = track?.querySelectorAll<HTMLElement>("[data-story-spread]");
    const card = cards?.[index];
    if (!track || !card || !cards?.[0]) return;
    if (reduced) {
      setActive(index);
      card.scrollIntoView({ behavior: "instant", block: "nearest" });
    } else {
      track.scrollTo({ left: card.offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
    }
  }

  function openFromPhoto(story: Story, photo: HTMLDivElement) {
    const button = photo.closest("article")?.querySelector<HTMLButtonElement>("[data-story-open]");
    if (button) open(story, button, photo);
  }

  return (
    <section id="pribehy" ref={root} data-section="pribehy" data-chapter="03"
      data-reduced={reduced} aria-labelledby="stories-title" className={s.section}>
      <div ref={stage} className={s.stage}>
        <header className={s.heading}>
          <h2 id="stories-title">Příběhy</h2>
          {featured.some(({ story }) => story.status === "model-story") && <p>Výběr modelových příběhů</p>}
          <Link href="/pribehy">Všechny příběhy</Link>
        </header>

        <nav className={s.trasa} aria-label="Trasa příběhů" data-story-route>
          <ol className={s.stations}>
            {featured.map(({ story }, index) => (
              <li key={story.id}>
                <button type="button" onClick={() => go(index)}
                  aria-current={index === active ? "step" : undefined}>
                  <span aria-hidden="true" />
                  {story.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div ref={rail} className={s.rail} data-story-rail>
          {featured.map(({ story, headline, context }, index) => {
            const photo = storyPhoto(story);
            return (
              <article id={"story-" + story.id} key={story.id} className={s.spread}
                data-story-spread data-active={index === active} inert={enhanced && index !== active}>
                <div className={s.photo} data-photo-wipe data-flip-id={"story-photo-" + story.id}
                  onClick={(event) => openFromPhoto(story, event.currentTarget)}>
                  <Image src={photo.file} alt={photo.alt} fill sizes="(min-width:1024px) 60vw, 92vw" />
                </div>
                <div className={s.text} data-story-copy>
                  <p className={s.journey}>{story.from} <span aria-hidden="true">→</span> {story.to}</p>
                  <h3 className={s.name}>{story.name}</h3>
                  {story.status === "model-story" && <p className={s.outcome}>{headline}</p>}
                  <p className={s.summary}>{story.status === "model-story" ? context : story.excerpt}</p>
                  <button type="button" data-story-open onClick={(event) => {
                    const button = event.currentTarget;
                    open(story, button, button.closest("article")?.querySelector("[data-photo-wipe]"));
                  }}>Přečíst celý příběh</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
