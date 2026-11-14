"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import {
  isIncoming,
  stories,
  storyKind,
  storyKinds,
  storyPhoto,
  type StoryKind,
} from "@/content/stories";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { StoryLabel } from "./StoryLabel";
import s from "./StoryArchive.module.css";

/*
 * Exhibition catalogue with a photo grid or index and a fixed photo panel.
 * The view and filters belong to the URL, so Back restores the same catalogue
 * instead of restoring a scroll position in an unrelated layout.
 */
type Direction = "all" | "out" | "in";
type View = "photos" | "index";

const directions: [Direction, string][] = [
  ["all", "Oba směry"],
  ["out", "Z Česka"],
  ["in", "Do Česka"],
];

function subscribeLocation(update: () => void) {
  window.addEventListener("popstate", update);
  window.addEventListener("era40-archive-change", update);
  return () => {
    window.removeEventListener("popstate", update);
    window.removeEventListener("era40-archive-change", update);
  };
}
const locationSnapshot = () => window.location.search;
const serverSnapshot = () => "";

type Filters = { kind: StoryKind | "all"; direction: Direction; view: View };

function readFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  const kind = params.get("typ");
  const direction = params.get("smer");
  return {
    kind: storyKinds.some((item) => item.id === kind) ? kind as StoryKind : "all",
    direction: direction === "in" || direction === "out" ? direction : "all",
    view: params.get("pohled") === "index" ? "index" : "photos",
  };
}

export function StoryArchive() {
  const reduced = usePrefersReducedMotion();
  const search = useSyncExternalStore(subscribeLocation, locationSnapshot, serverSnapshot);
  const { kind, direction, view } = readFilters(search);
  const [preview, setPreview] = useState(0);

  const shown = stories.filter(
    (story) =>
      (kind === "all" || storyKind(story) === kind) &&
      (direction === "all" ||
        (direction === "in" ? isIncoming(story) : !isIncoming(story))),
  );

  // The panel shows the hovered or focused story, or the first one shown.
  const current = shown.some((story) => stories.indexOf(story) === preview)
    ? preview
    : stories.indexOf(shown[0] ?? stories[0]);

  function change(patch: Partial<Filters>) {
    const update = () => {
      // View Transition callbacks may run after another filter click. Read
      // the current URL here rather than overwriting it with a stale render.
      const next = { ...readFilters(window.location.search), ...patch };
      const query = new URLSearchParams(window.location.search);
      const entries = [
        ["typ", next.kind, "all"],
        ["smer", next.direction, "all"],
        ["pohled", next.view, "photos"],
      ];
      entries.forEach(([key, value, fallback]) => {
        if (value === fallback) query.delete(key);
        else query.set(key, value);
      });
      const suffix = query.size ? "?" + query.toString() : "";
      history.replaceState(null, "", location.pathname + suffix + location.hash);
      window.dispatchEvent(new Event("era40-archive-change"));
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };
    if (reduced || !doc.startViewTransition) {
      update();
      return;
    }
    doc.startViewTransition(() => flushSync(update));
  }

  return (
    <section className={s.archive} aria-label="Archiv příběhů">
      <div className={s.toolbar}>
        <div className={s.filters} role="group" aria-label="Typ pobytu">
          {[{ id: "all", label: "Vše" } as const, ...storyKinds].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={kind === item.id}
              onClick={() => change({ kind: item.id })}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={s.filters} role="group" aria-label="Směr cesty">
          {directions.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={direction === id}
              onClick={() => change({ direction: id })}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={s.views} role="group" aria-label="Zobrazení">
          <button
            type="button"
            aria-pressed={view === "photos"}
            onClick={() => change({ view: "photos" })}
          >
            Fotografie
          </button>
          <button
            type="button"
            aria-pressed={view === "index"}
            onClick={() => change({ view: "index" })}
          >
            Rejstřík
          </button>
        </div>
      </div>
      <p className={s.count} aria-live="polite">
        {shown.length === stories.length
          ? `${shown.length} příběhů`
          : `Zobrazeno ${shown.length} z ${stories.length}`}
      </p>

      {shown.length === 0 && (
        <p className={s.empty}>
          Takovou cestu zatím nemáme.{" "}
          <Link href="/zapojte-se#pribeh">Napište nám tu svoji.</Link>
        </p>
      )}

      {view === "photos" ? (
        <ol className={s.grid}>
          {shown.map((story, i) => {
            const photo = storyPhoto(story);
            return (
              <li
                key={story.id}
                className={s.item}
                data-shape={i % 5}
                style={{ viewTransitionName: `story-${story.id}` }}
              >
                <Link href={`/pribehy/${story.id}`} className={s.card}>
                  <span className={s.photo} data-grain>
                    <Image
                      src={photo.file}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 92vw"
                    />
                    <span className={s.caption}>Ilustrační snímek</span>
                  </span>
                  <span className={s.meta}>
                    <span className={s.route}>
                      {story.from} <span aria-hidden="true">⟶</span> {story.to}
                    </span>
                    <span className={s.name}>{story.name}</span>
                    <span className={s.quote}>„{story.quote}“</span>
                    <span className={s.facts}>
                      {story.mobility}, {story.year}
                    </span>
                  </span>
                </Link>
                <p className={s.label}>
                  <StoryLabel story={story} />
                </p>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className={s.indexWrap}>
          <ol className={s.index}>
            {shown.map((story) => {
              const n = stories.indexOf(story);
              return (
                <li
                  key={story.id}
                  style={{ viewTransitionName: `story-${story.id}` }}
                >
                  <Link
                    href={`/pribehy/${story.id}`}
                    data-current={current === n}
                    onPointerEnter={() => setPreview(n)}
                    onFocus={() => setPreview(n)}
                  >
                    <span className={s.number}>
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span className={s.indexName}>{story.name}</span>
                    <span className={s.indexRoute}>
                      {story.from} <span aria-hidden="true">⟶</span> {story.to}
                    </span>
                    <span className={s.indexFacts}>
                      {storyKinds.find((k) => k.id === storyKind(story))?.label},{" "}
                      {story.year}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          {/* A fixed photo panel, like the caption column of an exhibition
              catalogue: it follows hover and keyboard focus. */}
          <aside className={s.panel} aria-hidden="true">
            <div className={s.panelInner}>
              <span className={s.panelPhoto} data-grain key={current}>
                <Image
                  src={storyPhoto(stories[current]).file}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 28vw, 1px"
                />
                <span className={s.caption}>Ilustrační snímek</span>
              </span>
              <span className={s.panelName}>{stories[current].name}</span>
              <span className={s.panelQuote}>„{stories[current].quote}“</span>
            </div>
          </aside>
        </div>
      )}
      <p className={s.note}>
        Všechny příběhy v archivu jsou modelové a fiktivní. Nahradí je skutečné
        výpovědi účastníků se souhlasem.
      </p>
    </section>
  );
}
