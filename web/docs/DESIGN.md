# DESIGN.md — ERA40 / Erasmus v Česku

> Binding art direction and motion spec. Where this document conflicts with older research docs, this document wins.

## 1. Concept

**Working title:** *Erasmus v Česku — příběhy, které překračují hranice*
**Context line:** *40 let evropského programu. Česko je u toho od roku 1998.*

**Idea:** a documentary journey, not a tech demo. The site should feel like a contemporary European cultural institution's digital exhibition: confident typography, real photography, restrained colour and precise motion.

**Signature motif — Trasa (The Route).** A single line, like a train line on a European rail map, runs through the whole site and changes role in each chapter:

| Section | What the line becomes |
|---|---|
| Hero | Draws across the video's lower edge, like a departure board ticker |
| Prolog | Underlines the key sentence and then leads down the page |
| Historie | Turns into the timeline axis, with stations = milestones |
| Příběhy | Connects the story chapters as a horizontal track |
| Evropa | Splits into routes from Prague to destination cities |
| Tehdy / Teď | Becomes the draggable divider of the comparison |
| Čísla | Becomes the data lines and bar baselines |
| Budoucnost | Leaves the frame as an open, unfinished line |

Implementation: SVG `path` + DrawSVGPlugin (or `stroke-dashoffset`), 2 px stroke (1.5 px mobile) in `--c-eu-blue` or `--c-yellow` on dark. Stations are 10 px circles. Never make it glow.

## 2. Tokens

### Colour (Erasmus+ visual guidelines 2021–27)
```css
--c-eu-blue:   #004494; /* EU emblem blue — primary dark surface, headings on light */
--c-eplus:     #007FC7; /* Erasmus+ blue — large text ≥24px, graphics, fills. NOT small text on white (4.3:1) */
--c-eplus-ink: #006BA8; /* darker Erasmus+ blue for links/small text on white (5.7:1) */
--c-yellow:    #FFED00; /* EU yellow — "you are here" + text highlights on blue/ink backgrounds (7.7:1 on #004494). Never text on white */
--c-ink:       #0B1B33; /* body text, darkest surface */
--c-paper:     #FFFFFF; /* main light surface: clean white (warm cream is a known AI-default tell — avoid) */
--c-sky:       #EAF3FA; /* alternate light surface, a 8 % tint of Erasmus+ blue */
--c-white:     #FFFFFF;
--c-mute:      #4F5B6E; /* secondary text on white/sky (≥6:1) */
--c-line:      #C9D6E3; /* hairlines, used sparingly */
--map-land:    #0A468F; /* 05 night map only: Europe silhouette on ink (in public/media/europe-land-night.svg) */
```
Text highlights (P0b, Jakub 15. 11. 2026, overrides "yellow only for you-are-here"): one or two key words per block may carry a brand colour via `.hl` (Erasmus+ blue `--c-eplus`, large text ≥ 24 px only, ≥ 3:1 on white/sky; small text uses `--c-eplus-ink`) or `.hl-dark` (EU yellow, only on EU-blue/ink surfaces or behind the hero scrim). Never whole sentences, no animation under reduced motion.

Rules: about 60 % white/sky, 30 % EU-blue and Erasmus+-blue surfaces (the site should read unmistakably as Erasmus+ blue), under 5 % yellow. Ink is a chapter surface for exactly two chapters, 05 Evropa (night map, D-023) and 07 statistics where specified; never more, so blue stays dominant. No gradients between brand colours. Exception (D-023): the 05 map silhouette may dissolve into the ink surface at its crop edges (mask fade, land → ink), never between two blues. A photo overlay may only use a flat `rgba(11,27,51,.35–.55)` ink scrim. Exception (Jakub, 15. 11. 2026): the hero film may use an ink-to-transparent gradient only behind its text, and the transparent header over the hero may use an ink-to-transparent gradient at the top edge. Both must keep text contrast ≥ 4.5:1 on the worst frame.

### Typography
- **Identity = Erasmus+ (not DZS).** DZS appears only as the publisher: its logo is in the footer and in the "Vydává DZS" line. The type follows the Erasmus+ visual guidelines, which allow EC Square Sans Pro inside the Commission charter and Roboto outside it. **No serif fonts.**
- **Roboto Flex** (variable, self-hosted via `@fontsource-variable/roboto-flex`) is used for everything. It belongs to the Roboto family, so it stays within the guidelines, and its `wght` (100–1000) and `wdth` (25–151) axes give us kinetic typography without needing another typeface:
  - Display: `wght 800–900`, `wdth 25–60` (condensed, tall, editorial).
  - Text: `wght 400`, `wdth 100`.
  - Kinetic moves animate `font-variation-settings` (e.g. a year widens from `wdth 25` to `100` as it activates). This is cheap and does not reflow if the element is fixed-width.
- If the EC Square Sans Pro licence and files are supplied, put them in `public/fonts/` and switch only the `--font-brand` token. Fallback stack: `"Roboto Flex", Roboto, Arial, sans-serif`.
- Scale (fluid `clamp`):
  - Display XL: 96–220 px, 700, line-height .9, tracking −0.03em. Hero and chapter openers only.
  - Display: 56–112 px, 700, 0.95.
  - H2: 36–64 px, 700, 1.0.
  - Lead: 22–30 px, 400, 1.3.
  - Body: 17–19 px, 400, 1.55, max 62ch.
  - Meta/labels: 14–15 px, 600, **sentence case** (no all-caps eyebrows, no "A · B · C" middle-dot strings, no "WORD — fragment" labels). Use them only where they carry information: place, year, source.
- Numerals: tabular figures for statistics. **Years are typographic heroes**, set solid and full colour, and **never as outlined/transparent giant numbers**.

### Layout & spacing
- 12-col grid, max 1440 px, gutters 24 px (desktop) / 16 px (mobile). Section padding: clamp(96 px, 14vh, 200 px).
- Compositions are editorial: asymmetric, with large images bleeding off-grid, text blocks of 5–6 columns and generous negative space.
- Radius: images 0, controls 2 px, story overlay/media frames may use 4 px. No drop shadows. Hairline rules only where they separate information (not newspaper-style everywhere).

### Photography & video
Documentary, natural light, real places: nádraží, vlak, kampus, knihovna, kolej, evropské ulice, Praha. Real people and moments, slightly desaturated with a fine grain.
Avoid: stock "students laughing at laptop", over-smooth AI faces, wrong signage, flags as decoration.
Provenance (Jakub, 15 Nov 2026, direct refinement request): remove repeated „Ilustrační snímek/video“ overlays and model-story pill badges. Explain model content once in normal editorial text at the overview and in the story detail/dialog; retain full metadata, credits and actual archive sources. Photography must not imply a model character is a verified participant. This replaces the earlier requirement for a badge on every photo or quote.

## 3. Anti-AI-look rules (hard bans)
1. Giant outline/transparent numerals or words in the background.
2. Glows, neon, light leaks, lens flares, bokeh orbs, "aurora" blobs.
3. Purple/blue/cyan gradients and gradient text.
4. Glassmorphism, frosted panels, cards nested in cards, three equal feature cards in a row.
5. Rounded icon tiles above headings; emoji; decorative sparkle/star icons. The EU stars are not decoration.
6. Infinity loops, particle "networks", floating 3D blobs that carry no meaning.
7. Generic English micro-labels ("Discover more", "Our Journey") on a Czech site.
8. Fake quotes, fake names presented as real, fake archival photos.
9. Uniform fade-up on every element.
10. Grey text on coloured background with low contrast.

Self-check before finishing a section: *Would the Erasmus+ / European Commission comms team recognise this as their programme, or as "an AI landing page"?*

## 4. Motion system

### Principles
- Motion explains: something travels, connects, reveals or compares. If it does none of these, cut it.
- **One hero move per section**, plus at most two supporting moves.
- Scrub where the user explores (timeline, map, comparison). Play once for reveals of text.

### Shared presets (`src/motion/`)
| Name | Spec |
|---|---|
| `ease.out` | `power3.out`; `ease.inOut` = `power2.inOut`; `ease.expo` = `expo.out` (only for large reveals) |
| `dur` | xs .3s · s .6s · m .9s · l 1.4s |
| `splitReveal` | SplitText lines with mask:"lines"; yPercent 100→0, stagger .08, dur m, ease.out |
| `maskReveal` | clip-path `inset(100% 0 0 0)` → `inset(0)`, dur l, ease.expo. Image scale 1.15→1 inside |
| `routeDraw` | DrawSVG 0→100 %, scrub true (or dur l when not scrubbed), ease none when scrubbed |
| `counter` | number tween with `snap: 1` and Czech thousands separator (non-breaking space), dur l |
| `parallax` | yPercent ±8 max, scrub 0.5. Desktop only |

Lenis: `lerp: 0.1`, smoothWheel on, smoothTouch off. Disabled under reduced motion.

### Per-breakpoint
- Desktop ≥1024: pins and horizontal rails allowed. Max pin length 250 vh.
- Mobile <1024: no pins longer than 100 vh, no horizontal scroll-hijack (use native swipe carousels with snap), shorter text splits (lines only).
- Reduced motion: everything visible statically, route lines pre-drawn, video replaced by poster with a play button.

## 5. Reference → technique matrix (agent: open each live site before using it; if it is unreachable, say so)
| Reference | Take exactly this | Use in |
|---|---|---|
| Getty – Tracing Art (getty.edu/tracingart) | Chapter progress indicator + editorial pacing | Global nav, Historie |
| Getty – Persepolis Reimagined (persepolis.getty.edu) | Cinematic chapter openers, captioned hotspots | Section openers, Evropa |
| Leica – Witness to a Century | Archive photography sequences driven by scroll | Historie, Tehdy/Teď |
| Studio375 – Ten Years Away (Codrops case study) | Anniversary as chaptered horizontal journey | Příběhy |
| Paper Planes (paperplanes.world) | Metaphor of connecting places/people | Evropa |
| UTB – Je nám 25 | Czech institutional tone done ambitiously | Overall tone check |
| Inkwell (inkwell.tech) | Seamless scene-to-scene transitions | Section transitions |
| Lando Norris (landonorris.com) | Polish benchmark: easing, type motion detail | Quality bar only, not style |

Do not copy layouts or identities. Extract the technique, then rebuild it in our tokens.

## 6. Sections — storyboards

Each spec lists: **Start → Scroll → End → Reverse → Mobile → Reduced**.

### 01 HERO — „Odjezd“
- Layout: fullscreen video (100svh desktop and mobile, safe-area aware; D-021), ink scrim 40 %. Bottom-left headline (Display XL, white): **„Některé cesty změní všechno.“** Context line (Lead, sentence case): „40 let Erasmu. Česko je u toho od roku 1998.“. Two CTAs: „Objev příběhy“ (primary: yellow bg + ink text) and „Jak to začalo“ (text link with underline drawn by Trasa). Sound toggle and pause button bottom-right.
- Start: poster → video fades in (.6s). The headline uses splitReveal by lines (delay .3). The Trasa draws across the bottom edge, left→right (dur l).
- Scroll (0–100 % of a 150 vh pin, desktop): video container scales from 1 to 0.86 and its clip-path insets 0→4 vw, turning the video into a framed photograph on a white background. Headline yPercent −30, opacity →0 in the last 30 %. The Trasa continues down into section 02.
- End: framed video still visible above the fold of section 02.
- Reverse: exact inverse (scrubbed).
- Mobile: no pin. Video 88svh, headline static after its reveal, the Trasa drawn on load.
- Reduced: poster image, no autoplay, all text visible.
- Video: 30–45 s documentary cut (shot list in `CONTENT-FACTS.md` §5). `muted autoplay playsinline loop`, MP4 H.264 + WebM, 1080p desktop / 720p mobile, poster AVIF. Captions file if speech is present.

> **Approved direction, pending integration (Creative Blueprint v0.2, Jakub 16. 11. 2026; D-024).** The text above describes the current site. Once Jakub approves integrating prototype 016, this replaces it:
> - Chapter name **„Úvod“** (not „Odjezd“).
> - Composition C2: anniversary row „40 / let Erasmu+“ above the two-line claim; context sentence „1987–2027. V Česku od roku 1998.“; the intro paragraph is removed; ink scrim only behind the left ~55 % and under the captions.
> - Display sizes (explicit exceptions to Display XL 96–220 px): claim 90 px at 1440 × 900, `min(6.25vw, 10vh)`; compact hero below 680 px height 80 px; „40“ 200 px at 1440 × 900, 80 px compact. Mobile: 360 → 88/44, 390 → 96/48, 430 → 96/54. Weight 840; `wdth` 78 for the figure, 56 for the claim.
> - One horizontal Trasa in the desktop hero (white line with a yellow station). The caption progress line is removed. Mobile has no horizontal Trasa at rest. The header „40“ lockup is hidden over the hero.
> - Motion: spec `docs/era40-ai/motion/specs/016-living-route.md`. The film pauses without seeking and becomes a photograph; the Trasa becomes its frame and descends into the Prolog.

### 02 PROLOG — „Proč na tom záleží“
- Layout: white background. A large statement (Display) across 9 cols: **„Od roku 1998 vyjelo s Erasmem do zahraničí přes 411 000 lidí z Česka. Každý se vrátil trochu jiný.“** The number comes from `CONTENT-FACTS` and shows its period in a footnote.
- Start → Scroll: words go from 15 % to 100 % ink opacity, scrubbed word-by-word with scroll (reading-highlight effect). The Trasa underlines „trochu jiný“ when that word activates.
- End: a footnote with source fades in. Then the Trasa bends downward into the timeline.
- Mobile: same effect, scrub over a shorter distance.
- Reduced: full ink text.

> **Approved direction, pending integration (spec 016; D-024):**
> - Desktop ≥ 1024 px: „trochu jiní.“ sits on its own last line.
> - The underline is the end of the hero Trasa: it descends in the left margin and turns into the underline with a 16 px bend.
> - Mobile: a short vertical Trasa stops above the heading; the underline stays as it is today.
> - S04 image slot: approved in Blueprint v0.2, not part of 016.

### 03 HISTORIE — „Dvě linie, jedna cesta“
- Concept: two parallel lines. The EU line starts at 1987 and the CZ line joins at 1998, so visually the Czech track merges into the European one.
- Desktop: pinned 250 vh. Left side shows the year as a typographic hero (Display XL, eu-blue) that **counts/morphs** between milestones. Right side shows a photo stack with maskReveal per milestone, plus a caption of 2–3 sentences. Stations are the milestones from `CONTENT-FACTS` §2. The CZ line draws in from the right edge and joins at 1998, and the scene background changes from white to EU-blue at 2004 (EU accession), with type inverting to white.
- Scrub: progress drives the line length and which station is active. Station labels use splitReveal.
- Reverse: scrubbed inverse.
- Mobile (D-021): native swipe cards, synchronised with the interactive forty-year timeline; tap, drag and keyboard range controls. No pin. Reduced motion retains the complete readable content.
- Reduced: static vertical list.

### 04 PŘÍBĚHY — „Lidé“
- Content: 6–8 stories (real first; explain model stories in ordinary introductory text and in their detail/dialog, without repeated badges or photo overlays). Each story = portrait or situational photo + name + route („Olomouc → Valencie“) + mobility type + year + quote (Lead size) + 120-word text + „Číst celý příběh“.
- Desktop: horizontal rail inside a pin (length = number of stories × 70 vh). Each story is a full-height editorial spread with alternating compositions (photo left/right/bleed). The Trasa runs through all spreads at a fixed height, with a station per story. Between stories the photo maskReveals in from the direction of travel. Quote uses splitReveal.
- Story detail: opens as a full-screen overlay using a Flip transition from the photo. Esc closes it, focus is trapped while it is open and returned on close, and the URL hash updates.
- Mobile: native horizontal swipe carousel (scroll-snap) with a progress dots line. Detail opens as a full page.
- Reduced: vertical list of spreads.

### 05 EVROPA — „Kam to vede“
- **Night map (D-023, Jakub 15. 11. 2026; replaces the Erasmus+ blue boxed map):** ink chapter surface, Europe as one silhouette in `--map-land` with borders only as faint ink gaps, Czechia in Erasmus+ blue with a white edge. Cropped to the area of the stories (Lisbon–Tampere); the crop edges fade into ink (desktop right and top, mobile top only). No frame, no card: the selected story is white type on ink (photo, route, quote, „Celý příběh“), destinations are a station list (dot + name, selected = yellow dot). Real origin/destination coordinates per story. Previous/next route controls sit under the map and select a story without opening it; clicking a destination opens the detail.
- Trasa grammar: all routes faint white, the selected route solid white, the yellow dot only for the active station and the traveller. Labels near the right crop edge anchor left.
- Start: routes draw with scroll (scrub, no pin), destination dots appear with their labels; the selected route draws with a travelling dot.
- Interaction: hover/focus on a destination selects it and updates the story beside the map. Click/Enter opens the related story overlay from §04. All destinations also exist as a list of buttons, so it works by keyboard and screen reader. Keyboard focus is white (dashed ring on cities), yellow only marks the selected station. During the 04 → 05 photo handoff the heading stays above the travelling photo and the lead fades in after it lands (CDX-011).
- Data layer (optional toggle): top destinations from `CONTENT-FACTS` §3, shown as route thickness. Show the period.
- Mobile: no pin, map at full width, route controls under the map, destination stations as a horizontal swipe strip, then the story.
- 3D: not part of the base build. It is a possible P2 upgrade (see §7) and needs approval first.

### 06 TEHDY / TEĎ — „Co se změnilo“
- 3–4 pairs (e.g. *hledání informací: brožura → aplikace; cesta: noční vlak → … ; komunikace: dopis/telefonní karta → video hovor*). Pairs must use real or labelled images.
- Desktop: a pinned split-screen. Scroll moves the divider (the Trasa as a vertical line) from right to left, revealing „Teď“ over „Tehdy“. Captions swap with a crossfade of ≤.3s.
- The slider is also draggable and keyboard operable (←/→, role="slider", aria-valuenow).
- Mobile: a stacked pair with a draggable slider and no scroll coupling.

### 07 ČÍSLA — „Erasmus v číslech“
- Ink background. 4–5 statistics max, each as a large tabular numeral (Display, white) with a one-line meaning and a small source/period label.
- Counter runs on enter (play once). A sector breakdown appears as horizontal bars whose baselines are the Trasa, growing with a scrubbed width.
- Every number comes from `CONTENT-FACTS` §3 with its period. Never show "aktuálně" for 2023 data.
- Mobile: same, stacked. Reduced: final values shown immediately.

### 08 BUDOUCNOST — „Kam dál“
- Sky background. Display statement: **„Další cesta začíná teď.“** The Trasa runs off the right edge, unfinished.
- CTAs: „Sdílej svůj příběh“ (form or mailto placeholder, not functional yet), „Erasmus+ na dzs.cz“, „Program Erasmus+ (EK)“.
- Footer: "Vydává Dům zahraniční spolupráce" + DZS logo, EU emblem with „Spolufinancováno Evropskou unií“, contact, accessibility statement, privacy, credits and image sources, and a link to the list of placeholders.

## 7. Immersive layer — the "wow" effects (required; this is what the site is about)

The rules above define the restraint: no AI decoration. Within that restraint, the site must still feel like an Awwwards-level, cinematic, scroll-driven experience. **Every section is animated end-to-end. No section is allowed to be a static block with a fade-in.** On top of §6, implement the following:

| Priority | Effect | Where | How | Reference (see `docs/creative/03-reference-library.md` + `04-top-10-references.md`) |
|---|---|---|---|---|
| P0 | Video → frame transition (hero video shrinks into a framed "photograph", the page continues "inside the film") | 01→02 | GSAP scrub on scale + clip-path | Lando Norris (polish), Inkwell (seamless scenes) |
| P0 | Kinetic typography: line/word splits, scrubbed reading highlight, years that count/morph | 01, 02, 03, 08 | SplitText + scrub | Grids/Obys, Utopia Tokyo |
| P0 | Pinned storytelling with scene changes (background, photos, year) | 03 | pin + labelled timeline | Tracing Art, Leica Witness to a Century, Tabasco |
| P0 | Horizontal story rail driven by vertical scroll | 04 | pin + `x` tween with `containerAnimation` for inner reveals | Studio375 Ten Years Away |
| P0 | Image mask reveals / directional wipes between stories | 04, 06 | clip-path, Flip | Leica, Noomo |
| P0 | Animated route drawing on map | 05 | DrawSVG / MorphSVG | Paper Planes, UTB Je nám 25 |
| P1 | **WebGL image-distortion transition** between story photos (subtle displacement driven by scroll velocity; off on mobile and reduced motion) | 04 | one shared lightweight canvas (OGL or Three.js), lazy-loaded; DOM images remain the accessible source | Zentry, Floema, Hubtown/Unseen |
| P1 | Scroll-scrubbed image sequence (≈80–120 frames, e.g. a train window passing, which becomes the transition into Historie) | 02→03 | canvas frame sequence, AVIF/WebP sprites, preloaded progressively | Spyker, Prometheus (case study) |
| P1 | Smooth inertia scroll + velocity-aware skew on large type (max 3°) | global | Lenis velocity → gsap.quickTo | Inkwell |
| P1 | Meaningful CTA feedback + hover image preview in the chapter index | 01, 08, nav | native focus/hover, no magnetic pointer chase (CDX008) | Active Theory, Unseen |
| P1 | Page/overlay transition for story detail (Flip from photo to full-screen) | 04 | Flip plugin | Savor |
| P2 | One 3D moment, only if it helps the story: e.g. Europe map tilt with depth on routes in the Future finale | 05 or 08 | R3F, lazy-loaded, static SVG fallback | Noomo, Messenger/abeto |

Rules for this layer:
- Every effect must also work when scrolling backwards. It must have a mobile variant (simplified, not just removed) and a reduced-motion static state.
- WebGL is capped at one shared canvas on the page. Pause it when off-screen and dispose of it on unmount.
- The agent must build the P0 effects first, then the P1 effects, and only then propose P2.

## 8. Content model (headless-ready)
Content (stories, milestones, stats, image credits) lives in typed files under `src/content/` and is shaped like CMS documents. A later switch to a headless CMS (e.g. Sanity) must require no changes to components, only a new data loader.

## 9. Known AI-default tells to steer away from (from the frontend-design skill, adapted)
Warm cream background + serif display + terracotta accent; near-black + acid accent; newspaper hairline layouts everywhere; the SaaS card kit; ALL-CAPS eyebrow above every heading; middle-dot meta strings; "→" appended to every link; one accent word coloured in a headline; numbered markers 01/02/03 where content is not a sequence (our chapter index IS a sequence, so numbers are allowed there only).

### Global UI
- Header: Erasmus+ logo left (official file from the EC logo download centre, unmodified, with clear space), a minimal chapter index (01–08) with a progress Trasa along the top, and a menu button. It hides on scroll down and shows on scroll up.
- Chapter index opens an overlay with chapter names. Every chapter is reachable by keyboard.
- Cursor: native. No custom cursor (it would be an AI-look risk and adds no meaning here).
- Loader: none. The poster appears instantly.
