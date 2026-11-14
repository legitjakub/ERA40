"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { loadFlip, gsap, registerGsap } from "@/lib/gsap/setup";
import { stories, storyPhoto } from "@/content/stories";
import type { Story } from "@/content/types";
import styles from "./PeopleStories.module.css";

type FlipPlugin = typeof import("gsap/Flip").Flip;
type Origin = HTMLElement | SVGElement;
type OpenStory = (
  story: Story,
  trigger: Origin,
  photo?: HTMLElement | null,
) => void;
const StoryContext = createContext<OpenStory | null>(null);
const hashPrefix = "#pribeh/";

const detailed = new Map<string, Promise<Story>>();
function withDetails(item: Story) {
  if (!detailed.has(item.id)) detailed.set(item.id,
    import("@/content/story-details").then(({storyDetails}) => ({...item, body: storyDetails[item.id]})).catch(() => item));
  return detailed.get(item.id)!;
}

export function useOpenStory() {
  const open = useContext(StoryContext);
  if (!open) throw new Error("StoryProvider is required for story navigation");
  return open;
}

export function StoryStatus({ story }: { story: Story }) {
  return story.status === "model-story" ? (
    <span>MODEL STORY – FICTIONAL PLACEHOLDER</span>
  ) : (
    <a href={story.source.url}>{story.source.label}</a>
  );
}

export function StoryProvider({ children }: { children: ReactNode }) {
  const [story, setStory] = useState<Story | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const detailPhoto = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<Origin | null>(null);
  const plugin = useRef<FlipPlugin | null>(null);
  const photoState = useRef<ReturnType<FlipPlugin["getState"]> | null>(null);
  const historyEntry = useRef(false);
  const closePending = useRef(false);
  const request = useRef(0);

  const open = useCallback<OpenStory>(async (item, trigger, photo) => {
    const token = ++request.current;
    const detail = await withDetails(item);
    if (token !== request.current) return;
    registerGsap();
    opener.current = trigger;
    if (
      photo &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      localStorage.getItem("era40-reduce-motion") !== "1"
    ) {
      try {
        plugin.current = (await loadFlip()).Flip;
        photoState.current = plugin.current.getState(photo);
      } catch {
        photoState.current = null;
      }
    } else photoState.current = null;
    if (token !== request.current) return;
    history.pushState(
      { ...history.state, eraStory: item.id },
      "",
      hashPrefix + item.id,
    );
    historyEntry.current = true;
    setStory(detail);
  }, []);

  const close = () => {
    if (closePending.current) return;
    if (historyEntry.current && history.state?.eraStory === story?.id) {
      closePending.current = true;
      history.back();
    } else {
      history.replaceState(history.state, "", "#pribehy");
      setStory(null);
    }
  };

  useEffect(() => {
    async function sync() {
      const token = ++request.current;
      closePending.current = false;
      const hash = window.location.hash;
      const item = hash.startsWith(hashPrefix)
        ? stories.find((entry) => entry.id === hash.slice(hashPrefix.length))
        : null;
      historyEntry.current = Boolean(
        item && history.state?.eraStory === item.id,
      );
      const detail = item ? await withDetails(item) : null;
      if (token === request.current) setStory(detail);
    }
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const el = dialog.current;
    if (!el || !story) return;
    el.showModal();
    el.scrollTop = 0;
    closeButton.current?.focus({ preventScroll: true });
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      if (
        !photoState.current ||
        !detailPhoto.current ||
        localStorage.getItem("era40-reduce-motion") === "1"
      )
        return;
      plugin.current?.from(photoState.current, {
        targets: detailPhoto.current,
        duration: 0.65,
        scale: true,
        ease: "power3.inOut",
      });
    }, el);
    photoState.current = null;
    return () => {
      ctx.revert();
      el.close();
      document.documentElement.style.overflow = overflow;
      const returnTo =
        opener.current ??
        document.querySelector<HTMLButtonElement>(
          `#story-${story.id} [data-story-open]`,
        );
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!el.open) returnTo?.focus({ preventScroll: true });
        });
      });
      opener.current = null;
    };
  }, [story]);

  const photo = story && storyPhoto(story);
  return (
    <StoryContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="story-dialog-title"
        data-lenis-prevent=""
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab" || !dialog.current) return;
          const controls =
            dialog.current.querySelectorAll<HTMLElement>("button, a[href]");
          const first = controls[0],
            last = controls[controls.length - 1];
          if (
            (event.shiftKey && document.activeElement === first) ||
            (!event.shiftKey && document.activeElement === last)
          ) {
            event.preventDefault();
            (event.shiftKey ? last : first)?.focus();
          }
        }}
      >
        {story && photo && (
          <div className={styles.dialogSpread}>
            <button
              type="button"
              ref={closeButton}
              onClick={close}
              className={styles.close}
            >
              Zavřít <span aria-hidden="true">×</span>
            </button>
            <div
              ref={detailPhoto}
              data-flip-id={`story-photo-${story.id}`}
              className={styles.detailPhoto}
              data-grain
            >
              <Image
                src={photo.file}
                alt={photo.alt}
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                loading="eager"
              />
              <span className={styles.caption}>Ilustrační snímek</span>
            </div>
            <article className={styles.detailText}>
              <p className={styles.kicker}>
                <StoryStatus story={story} />
              </p>
              <h2 id="story-dialog-title" className={styles.name}>
                {story.name}
              </h2>
              <p className={styles.route}>
                {story.from} → {story.to}
              </p>
              <p className={styles.info}>
                {story.year} / {story.field} / {story.mobility}
              </p>
              <blockquote>„{story.quote}“</blockquote>
              <p>{story.excerpt}</p>
              {story.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className={styles.pageLink}>
                <Link href={`/pribehy/${story.id}`}>
                  Otevřít jako samostatnou stránku
                </Link>
              </p>
            </article>
          </div>
        )}
      </dialog>
    </StoryContext.Provider>
  );
}
