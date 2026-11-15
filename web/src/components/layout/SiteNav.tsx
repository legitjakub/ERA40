"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters } from "@/content/chapters";
import { useMotionReady } from "@/lib/gsap/useScene";
import { ScrollTrigger } from "@/lib/gsap/setup";
import { scrollToPosition } from "@/lib/motion/scroll";
import {
  setReduceMotionPreference,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { siteSignature } from "./SiteFooter";
import styles from "./SiteNav.module.css";

const darkHeroPages = [
  "/pribehy",
  "/zapojte-se",
  "/o-projektu",
  "/ochrana-osobnich-udaju",
  "/tvoje-era",
];
const pages = [
  ["/pribehy", "Všechny příběhy"],
  ["/zapojte-se", "Zapoj se"],
  ["/tvoje-era", "Jaké je tvoje ERA?"],
  ["/o-projektu", "O projektu"],
] as const;

export function SiteNav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const positions = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const ready = useMotionReady();
  const pathname = usePathname();
  const home = pathname === "/";
  const darkTop = home || darkHeroPages.some(
    (page) => pathname === page || pathname.startsWith(page + "/"),
  );

  useEffect(() => {
    const bar = header.current;
    if (!bar) return;
    let frame = 0;
    let measureFrame = 0;
    let lastY = window.scrollY;
    let lastChapter = -1;
    let maxScroll = 1;
    let openingEnd = 0;
    let viewport = innerHeight;

    function update() {
      frame = 0;
      if (!bar) return;
      const y = Math.max(0, window.scrollY);
      if (home) {
        const next = Math.max(0, positions.current.findLastIndex(
          (top) => top <= y + viewport * 0.4,
        ));
        if (next !== lastChapter) {
          lastChapter = next;
          setActive(next);
        }
      }
      bar.dataset.light = String(!darkTop || y > openingEnd);
      if (Math.abs(y - lastY) > 5 || y < 40) {
        bar.dataset.hidden = String(
          y > viewport * 0.5 && y > lastY &&
          !bar.contains(document.activeElement),
        );
        lastY = y;
      }
      progress.current?.style.setProperty(
        "--progress", String(Math.min(1, y / maxScroll)),
      );
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function measure() {
      measureFrame = 0;
      viewport = innerHeight;
      const y = window.scrollY;
      // A pinned section moves independently of the document. Its spacer
      // stays in normal flow and is the stable source for navigation.
      positions.current = home ? chapters.map(({ id }) => {
        const section = document.getElementById(id);
        const anchor = section?.parentElement?.classList.contains("pin-spacer")
          ? section.parentElement : section;
        return anchor ? anchor.getBoundingClientRect().top + y : Infinity;
      }) : [];
      const opening = document.querySelector<HTMLElement>("main header");
      openingEnd = home ? viewport * 0.5 : Math.max(
        0, (opening?.getBoundingClientRect().bottom ?? 0) + y - bar!.offsetHeight,
      );
      maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
      schedule();
    }
    function scheduleMeasure() {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    }

    scheduleMeasure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    if (ready) ScrollTrigger.addEventListener("refresh", scheduleMeasure);
    const main = document.querySelector("main");
    const observer = new ResizeObserver(scheduleMeasure);
    if (main) observer.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(measureFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleMeasure);
      if (ready) ScrollTrigger.removeEventListener("refresh", scheduleMeasure);
      observer.disconnect();
      delete bar.dataset.light;
      delete bar.dataset.hidden;
    };
  }, [pathname, home, darkTop, ready]);

  function close() {
    dialog.current?.close();
    setMenuOpen(false);
  }
  function open() {
    setPreview(home ? active : 0);
    dialog.current?.showModal();
    setMenuOpen(true);
  }
  function jump(event: MouseEvent<HTMLAnchorElement>, index: number) {
    close();
    if (!home || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const top = positions.current[index];
    if (!Number.isFinite(top)) return;
    event.preventDefault();
    // Lenis also handles anchors on window. Do not let it start a second
    // scroll from the pinned element's transformed bounding box.
    event.stopPropagation();
    history.pushState(null, "", "#" + chapters[index].id);
    const section = document.getElementById(chapters[index].id);
    const pinned = section?.parentElement?.classList.contains("pin-spacer") ||
      Boolean(section?.querySelector(".pin-spacer"));
    const margin = section && !pinned
      ? Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0 : 0;
    scrollToPosition(Math.max(0, top - margin), reduced);
  }

  const prefix = home ? "" : "/";
  const selected = chapters[preview];
  return (
    <>
      <header className={styles.header} ref={header} data-other={!darkTop} data-film={home}>
        <div className={styles.identity}>
          <Link className={styles.brand} href="/#hero" aria-label="Erasmus+ navždy, úvod">
            <span>Erasmus<span className={styles.plus}>+</span> navždy</span>
          </Link>
          <span className={styles.signature}>{siteSignature}</span>
        </div>
        <div className={styles.right}>
          {home && (
            <span className={styles.chapter} aria-label={`Kapitola ${active + 1} z 8: ${chapters[active].label}`}>
              <span className={styles.chapterNumber}>{String(active + 1).padStart(2, "0")} / 08</span>
              <span className={styles.chapterName}>{chapters[active].label}</span>
            </span>
          )}
          {home && <span id="current-chapter" className="visually-hidden">Kapitola {active + 1} z 8: {chapters[active].label}</span>}
          <Link className={styles.archiveLink} href="/pribehy" aria-current={pathname === "/pribehy" ? "page" : undefined}>
            Archiv
          </Link>
          <Link href="/zapojte-se" className={styles.cta} aria-current={pathname === "/zapojte-se" ? "page" : undefined}>
            Zapoj se <span aria-hidden="true">↗</span>
          </Link>
          <button className={styles.menu} type="button" aria-label={home ? `Kapitoly ${String(active + 1).padStart(2, "0")} / 08` : "Kapitoly"} aria-describedby={home ? "current-chapter" : undefined} data-home={home} aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="chapter-menu" onClick={open}>
            <span className={styles.menuLabel}>Kapitoly</span>
            {home && <span className={styles.mobileCounter} aria-hidden="true">{String(active + 1).padStart(2, "0")} / 08</span>}
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.progress} ref={progress} aria-hidden="true">
          <span className={styles.travelled} />
          <span className={styles.here}><span /></span>
        </div>
      </header>
      <dialog id="chapter-menu" ref={dialog} className={styles.dialog} aria-labelledby="index-title" data-lenis-prevent onClose={() => setMenuOpen(false)}>
        <div className={styles.dialogInner}>
          <div className={styles.dialogTop}>
            <h2 id="index-title">Osm zastavení. Jedna Evropa.</h2>
            <button className={styles.close} onClick={close} aria-label="Zavřít kapitoly" autoFocus>
              <span className={styles.closeText}>Zavřít</span><span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.panel}>
            <nav aria-label="Index kapitol">
              <ol>
                {chapters.map(({ id, label }, i) => (
                  <li key={id}>
                    <Link href={prefix + "#" + id} onClick={(event) => jump(event, i)} onFocus={() => setPreview(i)} onPointerEnter={() => setPreview(i)} aria-current={home && i === active ? "location" : undefined}>
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      <span>{label}</span>
                      <span className={styles.chapterArrow} aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <figure className={styles.preview} aria-hidden="true">
              <Image key={selected.photo} src={`/media/placeholders/${selected.photo}.jpg`} alt="" fill sizes="(min-width: 900px) 38vw, 1px" />
              <figcaption>
                <span className={styles.previewTitle}>{String(preview + 1).padStart(2, "0")} / {selected.label}</span>
                <span>Ilustrační snímek</span>
              </figcaption>
            </figure>
          </div>
          <div className={styles.dialogBottom}>
            <nav aria-label="Další stránky">
              <ul className={styles.pages}>
                {pages.map(([href, label]) => (
                  <li key={href}><Link href={href} onClick={close} aria-current={pathname === href ? "page" : undefined}>{label}<span aria-hidden="true">↗</span></Link></li>
                ))}
              </ul>
            </nav>
            <label className={styles.pref}>
              <input type="checkbox" checked={reduced} onChange={(event) => setReduceMotionPreference(event.target.checked)} />
              Omezit pohyb
            </label>
          </div>
        </div>
      </dialog>
    </>
  );
}
