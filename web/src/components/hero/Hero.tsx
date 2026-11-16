"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import { DUR, EASE } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FilmCaptions } from "./FilmCaptions";
import {
  measureRoute,
  renderNative,
  renderRich,
  resetScene,
  type RouteNodes,
  type RouteState,
} from "./livingRoute";
import styles from "./Hero.module.css";

const base = "/media/hero/hero-";
const RICH =
  "(min-width: 1024px) and (min-height: 680px) and (hover: hover) and (pointer: fine)";

function subscribeViewport(update: () => void) {
  const query = matchMedia("(max-width: 767px)");
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

/*
 * Spec 016 · Living Route (Jakub approved integration 16. 11. 2026, D-025).
 * The film pauses on the frame the reader sees and becomes a photograph; the
 * line under the copy becomes its frame and descends into the Prolog, where
 * PeopleIntro continues it into the underline of „trochu jiní.“.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const portrait = useSyncExternalStore(
    subscribeViewport,
    () => matchMedia("(max-width: 767px)").matches,
    () => true,
  );
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);
  // Playback rules shared by the observer, the button and the scroll scene.
  const film = useRef({
    inView: true,
    manual: false,
    hold: false,
    override: false,
    pausedByScene: false,
    sync: () => {},
  });
  const route = useRef<RouteState>({ geometry: null, mode: "static", p: 0, fraction: 1 });
  const rerender = useRef<() => void>(() => {});
  const introDone = useRef(false);

  const previousVariant = useRef(portrait);
  useEffect(() => {
    const player = video.current;
    if (!player || previousVariant.current === portrait) return;
    previousVariant.current = portrait;
    const resume = !player.paused && !reduced;
    player.load();
    if (resume) void player.play().catch(() => {});
  }, [portrait, reduced]);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const state = film.current;
    state.sync = () => {
      // Reduced motion: only the reader starts the film, and nothing here
      // ever starts it again (no revival from the observer).
      if (
        !state.inView || document.hidden || reduced || state.manual ||
        (state.hold && !state.override)
      )
        player.pause();
      else void player.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      state.inView = entry.isIntersecting;
      state.sync();
    });
    const initial = requestAnimationFrame(() => {
      if (!player.paused && player.readyState > 2) {
        setPlaying(true);
        setHasPlayed(true);
      }
    });
    const sync = () => state.sync();
    observer.observe(player);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(initial);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      state.sync = () => {};
      player.pause();
    };
  }, [reduced]);

  // Focus wins over the visual exit: a focused CTA or control stays visible
  // and reachable; inert follows only once focus has left (spec 016 §10).
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const settle = () => setTimeout(() => rerender.current(), 0);
    section.addEventListener("focusin", settle);
    section.addEventListener("focusout", settle);
    return () => {
      section.removeEventListener("focusin", settle);
      section.removeEventListener("focusout", settle);
    };
  }, []);

  // Reduced motion: a static, predrawn route and no scene.
  useEffect(() => {
    const section = root.current;
    if (!reduced || !section) return;
    const nodes = collect(section);
    const state = route.current;
    state.mode = "reduced";
    let alive = true;
    const draw = () => {
      if (!alive) return;
      state.geometry = measureRoute(section, nodes);
      renderNative(nodes, state, 1);
    };
    rerender.current = draw;
    draw();
    addEventListener("resize", draw);
    void document.fonts?.ready.then(draw);
    return () => {
      alive = false;
      removeEventListener("resize", draw);
      // The scene's layout effect may already own these; leave them alone.
      if (rerender.current === draw) rerender.current = () => {};
    };
  }, [reduced]);

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      if (reduced || !section) return;
      const nodes = collect(section);
      const state = route.current;
      const media = gsap.matchMedia();

      media.add(
        { rich: RICH, desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" },
        (context) => {
          const { rich, desktop } = context.conditions ?? {};
          state.mode = rich ? "rich" : desktop ? "compact" : "mobile";
          state.p = 0;
          state.fraction = 1;
          resetScene(nodes);
          state.geometry = measureRoute(section, nodes);
          let intro: gsap.core.Timeline | undefined;
          const render = (p: number) => {
            if (p > 0.001) intro?.progress(1);
            if (state.mode === "rich") renderRich(nodes, state, p, film.current);
            else renderNative(nodes, state, p);
          };
          rerender.current = () => render(state.p);

          // INTRO: once per mount, ≤ 1.85 s, after fonts (1 s timeout).
          if (!introDone.current && scrollY < 12 && !location.hash) {
            introDone.current = true;
            const draw = { v: 0 };
            intro = gsap
              .timeline({ paused: true, defaults: { ease: EASE.out } })
              .fromTo(nodes.context, { opacity: 0 }, { opacity: 1, duration: DUR.xs }, 0)
              .fromTo(
                nodes.figure,
                { yPercent: 105, fontVariationSettings: '"wght" 840, "wdth" 64' },
                { yPercent: 0, fontVariationSettings: '"wght" 840, "wdth" 78', duration: DUR.m },
                0.05,
              )
              .fromTo(nodes.lines, { yPercent: 115 }, { yPercent: 0, duration: DUR.m, stagger: 0.09 }, 0.18)
              .fromTo(nodes.label, { opacity: 0 }, { opacity: 1, duration: DUR.s }, 0.45);
            if (state.mode !== "mobile") {
              state.fraction = 0;
              intro.to(
                draw,
                {
                  v: 1,
                  duration: 1.1,
                  ease: EASE.inOut,
                  onUpdate: () => {
                    state.fraction = draw.v;
                    if (state.p < 0.001) render(0);
                  },
                  onComplete: () => {
                    state.fraction = 1;
                  },
                },
                0.5,
              );
            }
            const start = intro;
            let started = false;
            const go = (ready: boolean) => {
              if (started) return;
              started = true;
              if (ready) start.play();
              else start.progress(1);
            };
            void document.fonts?.ready.then(() => go(true));
            const timeout = setTimeout(() => go(false), 1000);
            context.add(() => () => clearTimeout(timeout));
          }

          if (state.mode === "rich") {
            const progress = { p: 0 };
            gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                pin: true,
                start: "top top",
                end: () => "+=" + section.clientHeight * 1.5,
                scrub: 0.45,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                refreshPriority: 3,
                onRefresh: () => {
                  state.geometry = measureRoute(section, nodes);
                  render(progress.p);
                },
              },
            }).to(progress, { p: 1, duration: 1, onUpdate: () => render(progress.p) });
          } else {
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom 40%",
              refreshPriority: 3,
              onUpdate: (self) => render(self.progress),
              onRefresh: (self) => {
                state.geometry = measureRoute(section, nodes);
                render(self.progress);
              },
            });
          }
          render(0);
          return () => {
            rerender.current = () => {};
            const f = film.current;
            if (f.hold) {
              f.hold = false;
              f.override = false;
              if (f.pausedByScene) f.sync();
              f.pausedByScene = false;
            }
            resetScene(nodes);
          };
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  async function toggleFilm() {
    const player = video.current;
    if (!player) return;
    const state = film.current;
    if (!player.paused) {
      state.manual = true;
      state.override = false;
      player.pause();
      return;
    }
    state.manual = false;
    if (state.hold) state.override = true;
    state.pausedByScene = false;
    try {
      await player.play();
    } catch {
      // The browser may interrupt playback when visibility or motion preferences change.
    }
  }

  return (
    <section
      ref={root}
      id="hero"
      data-section="hero"
      aria-labelledby="hero-title"
      className={styles.hero}
    >
      <div className={styles.frame} data-film>
        <picture>
          <source media="(max-width:767px)" srcSet={base + "mobile.avif"} />
          <img
            src={base + "desktop.avif"}
            alt={
              portrait
                ? "Ilustrační snímek tří lidí při rozhovoru venku."
                : "Ilustrační snímek přátel při večerním setkání."
            }
            fetchPriority="high"
            className={styles.media}
            data-poster
          />
        </picture>
        <video
          ref={video}
          className={styles.media}
          style={{
            visibility: (playing || !reduced) && !failed ? "visible" : "hidden",
          }}
          poster={base + (portrait ? "mobile" : "desktop") + ".avif"}
          muted
          playsInline
          loop
          autoPlay={!reduced}
          preload={reduced ? "none" : "metadata"}
          onPlaying={() => {
            setPlaying(true);
            setHasPlayed(true);
            setFailed(false);
          }}
          onPause={() => setPlaying(false)}
          onLoadedData={() => setFailed(false)}
          onError={(event) => {
            if (event.currentTarget.error) setFailed(true);
          }}
          aria-label="Ilustrační film: cesta, učení a setkávání."
          aria-describedby="hero-film-description"
          data-video
        >
          <source media="(max-width:767px)" src={base + "mobile.mp4"} type="video/mp4" />
          <source media="(max-width:767px)" src={base + "mobile.webm"} type="video/webm" />
          <source src={base + "desktop.mp4"} type="video/mp4" />
          <source src={base + "desktop.webm"} type="video/webm" />
        </video>
        <div className={styles.scrim} data-scrim />
        <div className={styles.captionScrim} data-scrim />
      </div>
      <div className={styles.copy} data-film-copy>
        <p className={styles.context} aria-hidden="true" data-context>
          <span className={styles.dot} />
          <span>1987–2027. V Česku od roku 1998.</span>
        </p>
        <p className={styles.anniversary} aria-hidden="true">
          <span className={styles.figureMask}>
            <span className={styles.figure} data-figure>40</span>
          </span>
          <span className={styles.label} data-label>let Erasmu+</span>
        </p>
        <p className="visually-hidden">40 let Erasmu+, 1987–2027, v Česku od roku 1998.</p>
        <h1 id="hero-title" className={styles.title}>
          <span>
            <span data-title-line>Některé cesty</span>
          </span>
          <span>
            <span data-title-line>změní všechno.</span>
          </span>
        </h1>
        <div className={styles.actions}>
          <a className={styles.primary} href="#pribehy">
            Objev příběhy
          </a>
          <a className={styles.history} href="#historie">
            Jak to začalo
          </a>
        </div>
      </div>
      <div className={styles.filmUi} data-film-ui>
        <FilmCaptions video={video} portrait={portrait} shown={hasPlayed && !failed} />
        {!failed && (
          <button
            type="button"
            className={styles.toggle}
            onClick={toggleFilm}
            aria-label={playing ? "Pozastavit film" : "Přehrát film"}
            title={playing ? "Pozastavit film" : "Přehrát film"}
            data-film-toggle
          >
            <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          </button>
        )}
      </div>
      <svg aria-hidden="true" className={styles.route} data-hero-route>
        <defs>
          <clipPath id="hero-film-clip">
            <rect data-film-bounds />
          </clipPath>
        </defs>
        <path className={styles.routeBlue} data-route fill="none" />
        <path className={styles.routeWhite} data-route-white fill="none" clipPath="url(#hero-film-clip)" />
        <circle className={styles.station} data-route-station r="5" />
      </svg>
      <p id="hero-film-description" className="visually-hidden">
        Film vypráví modelovou cestu od balení kufru přes učení a setkání až
        k předávání zkušenosti dalším lidem. Ilustrační záběry z fotobanky
        ukazují výuku, společnou večeři, přátele, odpočinek na trávníku a ukázku
        postupu v laboratoři. Nejde o doložený příběh konkrétních účastníků
        Erasmu+.
      </p>
    </section>
  );
}

function collect(section: HTMLElement): RouteNodes {
  const q = <T extends Element>(selector: string) => section.querySelector<T>(selector)!;
  return {
    section,
    frame: q<HTMLElement>("[data-film]"),
    media: Array.from(section.querySelectorAll<HTMLElement>("[data-poster], [data-video]")),
    scrims: Array.from(section.querySelectorAll<HTMLElement>("[data-scrim]")),
    copy: q<HTMLElement>("[data-film-copy]"),
    ui: q<HTMLElement>("[data-film-ui]"),
    context: q<HTMLElement>("[data-context]"),
    figure: q<HTMLElement>("[data-figure]"),
    label: q<HTMLElement>("[data-label]"),
    lines: Array.from(section.querySelectorAll<HTMLElement>("[data-title-line]")),
    svg: q<SVGSVGElement>("[data-hero-route]"),
    path: q<SVGPathElement>("[data-route]"),
    white: q<SVGPathElement>("[data-route-white]"),
    bounds: q<SVGRectElement>("[data-film-bounds]"),
    station: q<SVGCircleElement>("[data-route-station]"),
    video: q<HTMLVideoElement>("[data-video]"),
  };
}
