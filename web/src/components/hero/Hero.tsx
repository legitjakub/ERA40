"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { flexAxes } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FilmCaptions } from "./FilmCaptions";
import styles from "./Hero.module.css";

const base = "/media/hero/hero-";

function subscribeViewport(update: () => void) {
  const query = matchMedia("(max-width: 767px)");
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

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

  const [failed, setFailed] = useState(false);
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
    let inView = true;
    let manuallyPaused = false;
    const sync = () => {
      if (!inView || document.hidden || reduced || manuallyPaused)
        player.pause();
      else void player.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const manual = (e: Event) => {
      manuallyPaused = !(e as CustomEvent<boolean>).detail;
    };
    player.addEventListener("era-play", manual);
    // Autoplay can start before hydration attaches onPlaying, so read the
    // element's real state once the effect runs.
    const initial = requestAnimationFrame(() => {
      if (!player.paused && player.readyState > 2) setPlaying(true);
    });
    observer.observe(player);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(initial);
      observer.disconnect();
      player.removeEventListener("era-play", manual);
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [reduced]);

  useEffect(() => {
    // The layout hydrates before this page. Opt into the scroll skew only
    // once the heading is hydrated, so no inline transform precedes React.
    const title = root.current?.querySelector("h1");
    if (title) title.dataset.velocityType = "";
  }, []);

  useGSAP(
    () => {
      registerGsap();
      if (reduced) return;
      const mm = gsap.matchMedia();
      gsap.from("[data-title-line]", {
        yPercent: 105,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
      });
      const end = root.current?.querySelector<HTMLElement>("[data-year-end]");
      if (end) {
        const year = { value: 1987 };
        gsap.to(year, {
          value: 2027,
          duration: 1.6,
          delay: 0.45,
          ease: "power2.inOut",
          onUpdate: () => {
            end.textContent = String(Math.round(year.value));
          },
        });
      }
      gsap.from("[data-hero-track]", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        ease: "power3.out",
      });
      const title = root.current?.querySelector("h1");
      if (title)
        flexAxes(title, { wdth: 42, wght: 690 }, { wdth: 56, wght: 840 });
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.5,
            scrub: 0.45,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 3,
          },
        });
        tl.to(
          "[data-film]",
          { scale: 0.86, clipPath: "inset(0% 4% 0% 4%)", duration: 1 },
          0,
        )
          .to(
            "[data-film-copy]",
            { yPercent: -6, opacity: 0, duration: 0.35 },
            0,
          )
          .to("[data-controls]", { opacity: 0, duration: 0.2 }, 0)
          .fromTo(
            "[data-trail]",
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 0.65 },
            0.35,
          );
      });
      mm.add("(pointer:fine)", () => {
        const link =
          root.current?.querySelector<HTMLElement>("[data-magnetic]");
        if (!link) return;
        const x = gsap.quickTo(link, "x", { duration: 0.25 });
        const y = gsap.quickTo(link, "y", { duration: 0.25 });
        const move = (event: PointerEvent) => {
          const r = link.getBoundingClientRect();
          x((event.clientX - r.left - r.width / 2) * 0.08);
          y((event.clientY - r.top - r.height / 2) * 0.15);
        };
        const reset = () => {
          x(0);
          y(0);
        };
        link.addEventListener("pointermove", move);
        link.addEventListener("pointerleave", reset);
        return () => {
          link.removeEventListener("pointermove", move);
          link.removeEventListener("pointerleave", reset);
        };
      });
      return () => {
        mm.revert();
        if (end) end.textContent = "2027";
      };
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  async function toggleFilm() {
    const player = video.current;
    if (!player) return;
    if (!player.paused) {
      player.dispatchEvent(new CustomEvent("era-play", { detail: false }));
      player.pause();
      return;
    }
    player.dispatchEvent(new CustomEvent("era-play", { detail: true }));
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
            alt="Odjezd na cestu do zahraničí"
            fetchPriority="high"
            className={styles.media}
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
          onPlaying={() => { setPlaying(true); setFailed(false); }}
          onPause={() => setPlaying(false)}
          onLoadedData={() => setFailed(false)}
          onError={(event) => { if (event.currentTarget.error) setFailed(true); }}
          aria-label="Ilustrační film o cestě vlakem a setkání studentů"
        >
              <source
                media="(max-width:767px)"
                src={base + "mobile.mp4"}
                type="video/mp4"
              />
              <source
                media="(max-width:767px)"
                src={base + "mobile.webm"}
                type="video/webm"
              />
              <source src={base + "desktop.mp4"} type="video/mp4" />
              <source src={base + "desktop.webm"} type="video/webm" />
        </video>
        <div className={styles.scrim} />
      </div>
      <div className={styles.copy} data-film-copy>
        <p className={styles.context}>
          <span className={styles.station} />
          <span>
            40 let Erasmu+ · 1987–<span data-year-end>2027</span> · v Česku od
            1998
          </span>
        </p>
        <h1 id="hero-title" className={styles.title}>
          {["Některé cesty", "změní všechno."].map((line) => (
            <span key={line}>
              <span data-title-line>{line}</span>
            </span>
          ))}
        </h1>
        <p className={styles.intro}>
          Erasmus+ již 40 let mění životy.
          <br />
          Česko je u toho od roku 1998.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} data-magnetic href="#pribehy">
            Objevovat příběhy <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.history} href="#historie">
            Jak to začalo
          </a>
        </div>
      </div>
      <FilmCaptions video={video} portrait={portrait} />
      <div className={styles.controls} data-controls>
        <span>{failed ? "Ilustrační snímek" : "Ilustrační video"}</span>
        {!failed && (
          <button
            type="button"
            onClick={toggleFilm}
            aria-label={playing ? "Pozastavit film" : "Přehrát film"}
            title={playing ? "Pozastavit film" : "Přehrát film"}
          >
            <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          </button>
        )}
      </div>
      <div className={styles.track} data-hero-track />
      <svg
        aria-hidden="true"
        className={styles.trail}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          data-trail
          d="M0 96H90Q95 96 95 98V100"
          fill="none"
          stroke="currentColor"
          vectorEffect="non-scaling-stroke"
          strokeWidth="2"
        />
      </svg>
    </section>
  );
}
