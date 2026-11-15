"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
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
import { SharedPhoto } from "./SharedPhoto";
import { StoryLabel } from "./StoryLabel";
import { impactThemes, storyImpact, type ImpactTheme } from "@/content/story-impact";
import s from "./StoryArchive.module.css";
import { gsap, ScrollTrigger } from "@/lib/gsap/setup";
import { useScene } from "@/lib/gsap/useScene";
import { StoryDistortion } from "@/components/people/StoryDistortion";

/*
 * Exhibition catalogue with a photo grid or index and a fixed photo panel.
 * The view and filters belong to the URL, so Back restores the same catalogue
 * instead of restoring a scroll position in an unrelated layout.
 */
type Direction = "all" | "out" | "in";
type View = "photos" | "index";
type Sort = "curated" | "year" | "name";

// R9: three orders; the curated one is the exhibition sequence.
const sorts: [Sort, string][] = [
  ["curated", "Doporučené pořadí"],
  ["year", "Podle roku"],
  ["name", "Podle jména"],
];
const byName = new Intl.Collator("cs");

const directions: [Direction, string][] = [
  ["all", "Oba směry"],
  ["out", "Z\u00a0Česka"],
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

type Filters = { kind: StoryKind | "all"; direction: Direction; view: View; impact: ImpactTheme | "all"; sort: Sort };

function readFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  const kind = params.get("typ");
  const direction = params.get("smer");
  const impact = params.get("dopad");
  const sort = params.get("razeni");
  return {
    kind: storyKinds.some((item) => item.id === kind) ? kind as StoryKind : "all",
    direction: direction === "in" || direction === "out" ? direction : "all",
    view: params.get("pohled") === "index" ? "index" : "photos",
    impact: impactThemes.some((item) => item.id === impact) ? impact as ImpactTheme : "all",
    sort: sort === "rok" ? "year" : sort === "jmeno" ? "name" : "curated",
  };
}

export function StoryArchive() {
  const reduced = usePrefersReducedMotion();
  const search = useSyncExternalStore(subscribeLocation, locationSnapshot, serverSnapshot);
  const { kind, direction, view, impact, sort } = readFilters(search);
  const root = useRef<HTMLElement>(null);

  // P1 bod 1: cards arrive one after another as they enter the viewport.
  // Transforms are cleared afterwards so View Transitions snapshot clean boxes.
  useScene(
    () => {
      const section = root.current;
      if (reduced || !section) return;
      ScrollTrigger.batch(section.querySelectorAll("[data-archive-item]"), {
        start: "top 94%",
        once: true,
        onEnter: (items) =>
          gsap.from(items, {
            opacity: 0,
            y: 48,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "transform,opacity",
          }),
      });
    },
    { scope: root, dependencies: [reduced, view] },
  );
  const [preview, setPreview] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const active = [kind, direction, impact].filter((value) => value !== "all").length;

  const filtered = stories.filter(
    (story) =>
      (kind === "all" || storyKind(story) === kind) &&
      (direction === "all" ||
        (direction === "in" ? isIncoming(story) : !isIncoming(story))) &&
      (impact === "all" || storyImpact(story)?.themes.includes(impact)),
  );
  const shown =
    sort === "year"
      ? [...filtered].sort((a, b) => Number(a.year) - Number(b.year))
      : sort === "name"
        ? [...filtered].sort((a, b) => byName.compare(a.name, b.name))
        : filtered;

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
        ["dopad", next.impact, "all"],
        ["razeni", next.sort === "year" ? "rok" : next.sort === "name" ? "jmeno" : "curated", "curated"],
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
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    const section = root.current;
    if (reduced || !doc.startViewTransition || !section) {
      update();
      return;
    }
    // Cards carry their names only while filtering, so the photo's own
    // story-{id} name can pair with the story page during navigation.
    section.dataset.filtering = "";
    const transition = doc.startViewTransition(() => flushSync(update));
    void transition.finished.finally(() => delete section.dataset.filtering);
    // Rapid filter changes legitimately skip the previous visual transition.
    // Its update still runs; only this expected cancellation is handled here.
    void transition.ready.catch((error) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) throw error;
    });
  }

  return (
    <section ref={root} className={s.archive} aria-label="Archiv příběhů">
      <div className={s.toolbar}>
        <button
          type="button"
          className={s.filterToggle}
          aria-expanded={filtersOpen}
          aria-controls="archive-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          Filtrovat{active > 0 && ` (${active})`}
        </button>
        <div id="archive-filters" className={s.filterPanel} data-open={filtersOpen || undefined}>
          <div className={s.filters} role="group" aria-label="Typ pobytu">
            <span className={`${s.filterLabel} ${s.mobileLabel}`} aria-hidden="true">Typ pobytu</span>
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
            <span className={`${s.filterLabel} ${s.mobileLabel}`} aria-hidden="true">Směr cesty</span>
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
          <div className={`${s.filters} ${s.themes}`} role="group" aria-label="Co pokračuje dál">
            <span className={s.filterLabel} aria-hidden="true">Co pokračuje dál</span>
            {[{ id: "all", label: "Všechna témata" } as const, ...impactThemes].map((item) => (
              <button key={item.id} type="button" aria-pressed={impact === item.id}
                onClick={() => change({ impact: item.id })}>
                {item.label}
              </button>
            ))}
          </div>
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
      <div className={s.results}>
        <p className={s.count} aria-live="polite" role="status">
          {shown.length === stories.length
            ? `${shown.length} příběhů`
            : `Zobrazeno ${shown.length} z ${stories.length}`}
        </p>
        <label className={s.sort}>
          <span>Řadit</span>
          <select value={sort} onChange={(event) => change({ sort: event.target.value as Sort })}>
            {sorts.map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </label>
        {(kind !== "all" || direction !== "all" || impact !== "all") && (
          <button
            className={s.reset}
            type="button"
            onClick={() => change({ kind: "all", direction: "all", impact: "all" })}
          >
            Zrušit filtry
          </button>
        )}
      </div>

      {shown.length === 0 && (
        <p className={s.empty}>
          Takovou cestu zatím nemáme.{" "}
          <Link href="/zapojte-se#pribeh">Napiš nám tu svoji.</Link>
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
                data-archive-item
                style={{ "--vt-name": `story-item-${story.id}` } as React.CSSProperties}
              >
                <Link href={`/pribehy/${story.id}`} className={s.card}>
                  <SharedPhoto id={story.id}>
                    <span className={s.photo} data-grain data-archive-photo>
                      <Image
                        src={photo.file}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 92vw"
                      />
                      <span className={s.caption}>Ilustrační snímek</span>
                    </span>
                  </SharedPhoto>
                  <span className={s.meta}>
                    <span className={s.route}>
                      {story.from} <span aria-hidden="true">⟶</span> {story.to}
                    </span>
                    <span className={s.quote}>„{story.quote}“</span>
                    <span className={s.name}>{story.name}</span>
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
                  style={{ "--vt-name": `story-item-${story.id}` } as React.CSSProperties}
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
        Všechny příběhy v&nbsp;archivu jsou modelové a&nbsp;fiktivní. Nahradí je skutečné
        výpovědi účastníků se souhlasem.
      </p>
      <StoryDistortion root={root} reduced={reduced} selector="[data-archive-photo]" drive="hover" />
    </section>
  );
}
