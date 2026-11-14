> Historické poznámky z první fáze. Aktuální ověření a implementované techniky jsou v [docs/REFERENCE-NOTES.md](docs/REFERENCE-NOTES.md).

# Motion Reference Analysis — ERA40

**Datum live browse:** 2026-11-11  
**Metoda:** Playwright scroll/wheel + DOM signals (transforms, sticky, clip-path, canvas).  
**Pravidlo:** pouze live ověřené techniky. Archive/case-study = nepoužito jako motion evidence.

## Dead / unreliable for motion verification

| URL | Stav |
|-----|------|
| https://museum.xbox.com/ | **404** — archive only |
| https://www.100lostspecies.com/ | Live HTTP 200, ale WebGL cold-load / prázdný DOM v automation — motion **neověřen** spolehlivě |
| https://messenger.abeto.co/ | Live, ale canvas/text v automation prázdný — motion **slabě ověřen** |
| Cartier Wonders / Prometheus immersive | Offline / case study — **skip** |

---

## Table (verified live)

| Referenční web | Konkrétní animační technika | Co se nám na ní líbí | Kde ji použijeme v ERA40 | Jak ji technicky implementuješ |
|---|---|---|---|---|
| **Tracing Art** (getty.edu/tracingart) — live | **Chapter progress + pinned narrative stack**; progress indikátory (~9) + sticky vrstvy; scroll mění artwork captions („Still Life…“) zatímco hero claim drží | Data→příběh pacing; návštěvník ví, kde je v cestě, bez dashboardu | Globální **chapter progress rail**; History + People kapitoly | GSAP ScrollTrigger `onUpdate` → CSS `--progress`; pin kapitol; `ScrollTrigger.batch` refresh po obrazech |
| **Inkwell** (inkwell.tech) — live | **Single-journey scrub**: sticky count ~40; headline domain rotuje (Civic → Fashion → Architecture) při kontinuálním scrollu; „SCROLL TO EXPLORE“ | Filmová kontinuita; jedna metafora na akt; žádné generic fade-in | Hero→People→History jako **jedna scrub dramaturgie**; People sticky quote | `scrub: 0.6–0.8` timelines; `matchMedia` desktop pin / mobile stack; text swap přes timeline labels |
| **Savor** (savor.it) — live | **Scroll-choreographed transform explosion**: transforms 9→213 při scrollu; canvas vrstvy + statement typography | Claim řídí pohyb; každá scrola jednotka něco *dělá*, ne jen opacity | Section statements (People intro, Future); Numbers count-scrub | Split lines → `gsap.fromTo` scrubbed y/clip; žádný `autoAlpha` alone jako jediný efekt |
| **Persepolis** (persepolis.getty.edu) — live | **Guided cinematic gate**: „Click enter“ → poetic lines → „Scroll to continue“; WebGL canvas + sticky HUD; scrollY držen v intro (guided) | Ritual vstupu; a11y-friendly continue; immersi lze řídit | Hero **mask ritual** (clip expand) + soft scroll hint; Future quiet field | Intro timeline (not hijack): clip-path scrub 0→1; `prefers-reduced-motion` = static end frame |
| **Lando Norris** (landonorris.com) — live | **Heavy clip-path masking + sticky hero layers**; ~130 clip masks, 21 canvases, sticky ~26; kinetic display identity | Craft ceiling: mask = charakter; hero presence | Hero image mask wipe; Then&Now soft wipe; story photo reveals | CSS `clip-path: inset()` scrubbed; FLIP-ish photo scales; **no** lime/F1 look |
| **Scout Motors** (scoutmotors.com) — live | **Immersion + surviving CTA**; sticky ~18, clipMasks ~18, canvas 2; claim „Scouts always come back“ drží při scrollu | CTA nesmí zmizet v immersi (bible) | Hero CTAs sticky-soft; Future magnetic links | CTAs mimo pin kill-zone; magnetic `x/y` pointer lerp desktop only |
| **Pangram Pangram** (pangrampangram.com) — live | **Typographic culture as motion**: persistent transform layers (~66) při editorial scroll; type jako produkt | Kinetic type bez WebGL; rytmus slov | Hero title letter/word reveal; quote split in People | SplitType-like word spans + scrubbed tracking/y; keep real text in DOM |
| **Paper Planes** (paperplanes.world) — live | **Ritual connection metaphor** (throw/catch); canvas world; not scroll-film — interaction = story | Erasmus = spojení zemí; lightweight metaphor | Europe Map: „odeslání“ trasy z Prahy jako path-draw ritual | SVG `stroke-dashoffset` scrub + node pulse; click = panel (ne multiplayer) |
| **Tracing Art** (mid scroll) — live | **Image stack / artwork trail** with „Tap on an artwork…“ explore mode after narrative | Guided → free explore hybrid | People horizontal rail (desktop) + map free select | Pin + horizontal `x` scrub; mobile CSS snap, no forced pin |
| **Savor + Inkwell** (combined live pattern) — live | **Seamless section color/atmosphere morph** while content swaps under sticky chrome | Pocit jednoho filmu, ne 8 landing bloků | Paper→ink→teal atmospheric shifts between acts | ScrollTrigger toggles `data-act` on `<body>` → CSS vars; soft background lerp |
| **Persepolis + Scout** — live | **Reduced / explicit continue controls** + clear primary action under immersion | Veřejná služba: motion optional, obsah vždy | In-page „Zjednodušit pohyb“ + skip link + static fallback | Central `MotionGate`; kill ScrollTriggers; Lenis off |
| **Lando sticky layers** (technique only) — live | **Multi-layer parallax ≤ small range** under pinned hero | Depth without scroll-jack | Hero media yPercent ≤ 8–12%; story Ken Burns scrub | `scrub: true` on img transform only; mobile parallax off |

---

## ERA40 motion principles (from live)

1. **Scrub > fade** — scroll progress owns the shot.  
2. **One metaphor per act** — mask (odjezd), rail (cesty), wipe (čas), path (mapa), count (dopad).  
3. **Pin with an end** — Tracing/Inkwell density, not infinite hijack.  
4. **Type is a character** — Savor/Pangram, not decoration.  
5. **CTA survives** — Scout lesson.  
6. **Reduced motion = same story, static frames.**

## Implementation map (code)

| Act | Module |
|-----|--------|
| Progress + act colors | `src/lib/motion/chapterProgress.ts`, `ActAtmosphere.tsx` |
| Hero mask + kinetic type | `src/components/hero/Hero.tsx` |
| Sticky quote scrub | `src/components/people/PeopleIntro.tsx` |
| Timeline pin scrub | `src/components/history/HistoryTimeline.tsx` |
| Horizontal story rail | `src/components/people/PeopleStories.tsx` |
| SVG path ritual | `src/components/map/EuropeMap.tsx` |
| Clip wipe | `src/components/then-now/ThenNow.tsx` |
| Number scrub | `src/components/numbers/Numbers.tsx` |
| Magnetic close | `src/components/future/Future.tsx` |
| Section portals | `src/components/ui/SectionPortal.tsx` |
| Chapter rail | `src/components/layout/ChapterProgress.tsx` |

---

## Video hero (P0) — shipped in this upgrade

| Item | Detail |
|------|--------|
| File | `public/media/ILLUSTRATIVE-hero-departure.mp4` (~20s, 757KB) |
| Method | Illustrative Ken Burns montage from Direction A stills (GenerateVideo aborted; EC AV pending Conditions of use) |
| Poster / reduced-motion | `ai-placeholder-ILLUSTRATIVE-departure-dawn.jpg` |
| UX | muted autoplay `playsInline`, sound toggle, ILLUSTRATIVE label, pin+scrub crop/scale, kinetic type, exit portal wipe |
| Shot list | `docs/HERO-VIDEO-SHOTLIST.md` |
| Live verify | Playwright: `readyState=4`, playing, muted, heroH ≈ viewport |
