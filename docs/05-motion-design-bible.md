# Motion Design Bible — ERA40

**Projekt:** Erasmus v Česku — příběhy, které překračují hranice  
**Účel:** Koherentní motion systém (ne katalog efektů) pro immersive storytelling site  
**Datum:** 11. 11. 2026  
**Vazba:** `docs/03-reference-library.md`, `docs/04-top-10-references.md`

---

## 1. Motion principles (systémové zákony)

1. **Příběh řídí čas.** Scroll není dekorace — je střih a kamera.  
2. **Jedna metafora na akt.** (dopis / hranice / setkání / návrat) — ne mix shaderů.  
3. **Emocionální tempo:** 60 % klid + 30 % zrychlení + 10 % wow.  
4. **Reduced motion first.** `prefers-reduced-motion` = okamžitý static fallback.  
5. **CTA musí přežít immersi.** (Scout Motors lesson)  
6. **Deep-link kapitoly.** (proti Inkwell „no skip“ — u veřejné služby potřebujeme skok na příběh)  
7. **Sound optional, never required.** (Persepolis toggle model)

### Dramaturgie site (5 aktů)

| Akt | Název (pracovní) | Motion režim | Primární techniky |
|-----|------------------|--------------|-------------------|
| 0 | Práh | Brand load + invitation | kinetic type, cinematic transition |
| I | Odchod | Vertikální scrollytell | scroll-scrubbing, pinned storytelling, parallax |
| II | Cesta | Horizontální / mapa | horizontal scrolling, sticky transitions, animated SVG |
| III | Setkání | Interakce lidí | cursor-reactive, magnetic, particles (soft) |
| IV | Dopad | Timeline + svědectví | image masking, morphing, text splitting |
| V | Pozvání | Closing + share | seamless section transitions, light WebGL |

---

## 2. Techniky (≥20) — katalog vázaný na systém

U každé: **vizuální reference** (z library), **jak funguje**, **scroll control**, **emocionální efekt**, **Erasmus use**, **tech**, **obtížnost** (1–5).

---

### T01 — Scroll-scrubbing

| | |
|--|--|
| **Reference** | Inkwell — https://inkwell.tech/ ; Prometheus Fuels (archive case) |
| **Jak funguje** | Progress scrollu (0–1) mapuje na timeline animace / kameru / opacity. |
| **Scroll control** | Direct scrub (GSAP ScrollTrigger `scrub: true` / Lenis + progress) |
| **Emocionální efekt** | Pocit „já řídím film“ |
| **Erasmus use** | Akt I: odjezd → příjezd jako kontinuální shot |
| **Tech** | GSAP ScrollTrigger, Lenis, requestAnimationFrame |
| **Obtížnost** | 3 |

---

### T02 — Pinned storytelling

| | |
|--|--|
| **Reference** | Tracing Art — https://www.getty.edu/tracingart/ ; Persepolis — https://persepolis.getty.edu/ |
| **Jak funguje** | Sekce se „připne“ (pin) zatímco vnitřní scény se mění se scrollem. |
| **Scroll control** | Pin + scrub vnitřních tweenů |
| **Emocionální efekt** | Soustředění; kapitola jako scéna |
| **Erasmus use** | Jedna destinace / jeden absolvent = jedna pin kapitola |
| **Tech** | ScrollTrigger `pin`, CSS sticky hybrid |
| **Obtížnost** | 3 |

---

### T03 — Sticky transitions

| | |
|--|--|
| **Reference** | Savor — https://www.savor.it/ ; Lando Norris hero layers — https://landonorris.com/ |
| **Jak funguje** | Sticky vrstvy se překrývají; přechod = crossfade / clip / z-index choreografie. |
| **Scroll control** | Sticky top + intersecting observers |
| **Emocionální efekt** | Plynulý „přeliv“ mezi světy |
| **Erasmus use** | Přechod „Česko ↔ zahraničí“ bez tvrdého cutu |
| **Tech** | `position: sticky`, IntersectionObserver, GSAP |
| **Obtížnost** | 2 |

---

### T04 — Horizontal scrolling

| | |
|--|--|
| **Reference** | Cartier Wonders „universes“ (case) ; klasické Locomotive scrollytell patterns (Pangram editorial) |
| **Jak funguje** | Vertikální wheel převádí na horizontální translate tracku. |
| **Scroll control** | Vertical-to-horizontal mapping |
| **Emocionální efekt** | Cesta / panoráma / „přejezd hranice“ |
| **Erasmus use** | Akt II: koridor evropských měst / univerzit |
| **Tech** | GSAP, CSS scroll-timeline (progressive), Lenis |
| **Obtížnost** | 3 |
| **Poznámka** | Na mobile raději swipe carousel s a11y controls, ne forced hijack. |

---

### T05 — Kinetic typography

| | |
|--|--|
| **Reference** | Lando Norris display type; Pangram Pangram — https://pangrampangram.com/ ; Zentry distorted display |
| **Jak funguje** | Typ se pohybuje jako hlavní vizuál: scale, skew, tracking, blur-in. |
| **Scroll control** | Often scrubbed; někdy pointer-driven |
| **Emocionální efekt** | Energie / autorita claimu |
| **Erasmus use** | Hero claim „Příběhy, které překračují hranice“ |
| **Tech** | GSAP, variable fonts, SplitType |
| **Obtížnost** | 2 |

---

### T06 — Text splitting

| | |
|--|--|
| **Reference** | Inkwell micro headline interactions; Savor statement lines |
| **Jak funguje** | Rozdělení na chars/words/lines; staggered reveal. |
| **Scroll control** | Trigger on enter / scrub |
| **Emocionální efekt** | Intimní čtení; dech mezi slovy |
| **Erasmus use** | Citáty absolventů; krátké deníkové věty |
| **Tech** | SplitType / Splitting.js + GSAP |
| **Obtížnost** | 2 |
| **A11y** | Zachovat čitelný text v DOM; ne jen canvas. |

---

### T07 — Image masking

| | |
|--|--|
| **Reference** | Lando helmet/visor overlay; David Whyte door-glass framing — https://davidwhyte.com/ |
| **Jak funguje** | Clip-path / SVG mask / CSS mask odhaluje obraz. |
| **Scroll control** | Scrub mask progress |
| **Emocionální efekt** | Odhalení paměti; „nahlédnutí“ |
| **Erasmus use** | Then/now fotky; pasové okno → tvář studenta |
| **Tech** | CSS `clip-path`, SVG masks, GSAP |
| **Obtížnost** | 2 |

---

### T08 — Image distortion

| | |
|--|--|
| **Reference** | Zentry portal energy (DOM distortion) — https://zentry.com/ ; IG watercolor distortion (David Whyte case) |
| **Jak funguje** | Mesh warp / displacement map / CSS filter turbulence na hover nebo scroll. |
| **Scroll control** | Pointer or scrub intensity |
| **Emocionální efekt** | Vzpomínka je nestabilní; změna identity |
| **Erasmus use** | Soft „culture shock“ moment — velmi střídmě |
| **Tech** | WebGL plane + displacement; nebo CSS/SVG feTurbulence |
| **Obtížnost** | 4 |

---

### T09 — Displacement shaders

| | |
|--|--|
| **Reference** | Blobmixer — https://blobmixer.14islands.com/ ; Cartier GLSL (case) |
| **Jak funguje** | Fragment shader posouvá UV podle noise / mapy. |
| **Scroll control** | Uniform `uProgress` ze scrollu |
| **Emocionální efekt** | Tekutost, sen, transformace |
| **Erasmus use** | Přechod mezi kapitolami „domov ↔ cizina“ (1–2× za site) |
| **Tech** | Three.js / OGL / R3F + custom GLSL |
| **Obtížnost** | 5 |

---

### T10 — Parallax

| | |
|--|--|
| **Reference** | Persepolis depth layers; Inkwell atmospheric gradients |
| **Jak funguje** | Vrstvy se pohybují různou rychlostí. |
| **Scroll control** | Multi-speed scrub |
| **Emocionální efekt** | Prostorová hloubka; „jsem v místě“ |
| **Erasmus use** | Krajina města; nádraží; kampus |
| **Tech** | GSAP, CSS transforms; pozor na iOS jank |
| **Obtížnost** | 2 |
| **Pravidlo** | Max 3 vrstvy; žádný infinite parallax chaos. |

---

### T11 — Morphing

| | |
|--|--|
| **Reference** | 100 Lost Species state changes (presence→absence); Scout product morph language |
| **Jak funguje** | Tvar A interpoluje do tvaru B (SVG path / FLIP / mesh). |
| **Scroll control** | Scrub morph factor |
| **Emocionální efekt** | Proměna identity / generace |
| **Erasmus use** | Logo/ikonika „hranice → most“; 1998 → 2027 |
| **Tech** | SVG morph (GSAP MorphSVG), FLIP, lottie omezeně |
| **Obtížnost** | 3–4 |

---

### T12 — Scroll-controlled video

| | |
|--|--|
| **Reference** | Active Theory scroll-film lineage (Prometheus case); cinematic stills sequences u Persepolis |
| **Jak funguje** | Video currentTime = scroll progress (nebo frame sequence / ActiveFrame-like). |
| **Scroll control** | Direct time scrub |
| **Emocionální efekt** | Dokumentární autenticita |
| **Erasmus use** | Krátké alumni clips jako „živý film“ v kapitole |
| **Tech** | `<video>` + ScrollTrigger; nebo image sequence; pozor na mobile decode |
| **Obtížnost** | 4 |
| **Pravidlo** | Poster + reduced-motion still povinné. |

---

### T13 — Cinematic transitions

| | |
|--|--|
| **Reference** | Inkwell 3D transitions; Lando loader→hero; Persepolis loader scallop |
| **Jak funguje** | Hard cuts nahrazují dissolve / wipe / camera push / shared-element. |
| **Scroll control** | Section enter/leave triggers |
| **Emocionální efekt** | Filmová kontinuita |
| **Erasmus use** | Mezi akty 0→I→II; ne mezi každým odstavcem |
| **Tech** | GSAP timelines, View Transitions API (progressive) |
| **Obtížnost** | 3 |

---

### T14 — Cursor-reactive

| | |
|--|--|
| **Reference** | Lando 3D helmet; Active Theory V6 trails — https://activetheory.net/ |
| **Jak funguje** | Pointer position ovlivňuje rotaci / parallax / glow. |
| **Scroll control** | Independent of scroll (desktop enhancement) |
| **Emocionální efekt** | „Svět reaguje na mě“ |
| **Erasmus use** | Hero objekt (dopis, razítko, mapa) |
| **Tech** | Pointer events + lerp; R3F `useFrame` |
| **Obtížnost** | 3 |
| **Mobile** | Gyro optional; jinak idle animation. |

---

### T15 — Magnetic interactions

| | |
|--|--|
| **Reference** | Modern award sites (Basement / Zentry UI magnets); Scout CTA craft |
| **Jak funguje** | Button/cursor magneticky přitahuje v radiusu. |
| **Scroll control** | Pointer-only |
| **Emocionální efekt** | Hravost; pozvání ke kliku |
| **Erasmus use** | Primární CTA „Sdílej svůj příběh“ / „Prozkoumej mapu“ |
| **Tech** | JS lerp on `mousemove` |
| **Obtížnost** | 2 |
| **A11y** | Focus ring nesmí zmizet; magnet off při keyboard. |

---

### T16 — Animated SVG

| | |
|--|--|
| **Reference** | Tracing Art timelines/diagrams; Into the Arctic map tradition (Hello Monday archive) |
| **Jak funguje** | Stroke-draw, path follow, choropleth reveal. |
| **Scroll control** | Scrub stroke-dashoffset / morph |
| **Emocionální efekt** | Mapování, porozumění systému |
| **Erasmus use** | Evropa ↔ Česko trasy; růst účastníků v čase |
| **Tech** | SVG + GSAP DrawSVG / raw dashoffset |
| **Obtížnost** | 2–3 |

---

### T17 — Particles

| | |
|--|--|
| **Reference** | Messenger ambient world dust; Paper Planes swarm energy — https://paperplanes.world/ |
| **Jak funguje** | Množina bodů/instancí s lifecycle (spawn/update/die). |
| **Scroll control** | Density by section progress |
| **Emocionální efekt** | Atmosféra, dav, sněžení vzpomínek |
| **Erasmus use** | Soft „lidé v pohybu“ na mapě — ne firework spam |
| **Tech** | Canvas 2D / Points in Three.js |
| **Obtížnost** | 3 |
| **Pravidlo** | Cap count na mobile; pause offscreen. |

---

### T18 — 3D camera

| | |
|--|--|
| **Reference** | Prometheus camera path case; Persepolis WebGL tour; Messenger orbit |
| **Jak funguje** | Kamera interpoluje mezi keyframes vázanými na scroll. |
| **Scroll control** | Scrub camera dolly/pan/orbit |
| **Emocionální efekt** | Immersion „jsem uvnitř“ |
| **Erasmus use** | Akt III: vstup do „pokoje příběhu“ absolventa |
| **Tech** | Three.js / R3F camera + ScrollTrigger |
| **Obtížnost** | 5 |
| **Pravidlo** | Max 1 hlavní 3D kamera track per page load budget. |

---

### T19 — WebGL transitions

| | |
|--|--|
| **Reference** | Inkwell OGL transitions; Cartier scene changes (case); 100 Lost Species state fades |
| **Jak funguje** | Scény A/B propojené shader crossfade / FBO pass. |
| **Scroll control** | Section thresholds |
| **Emocionální efekt** | Prémiový „portal“ pocit |
| **Erasmus use** | Jen mezi velkými akty (ne každý příběh) |
| **Tech** | Three.js / OGL, render targets |
| **Obtížnost** | 5 |

---

### T20 — Seamless section transitions

| | |
|--|--|
| **Reference** | Inkwell uninterrupted journey; Savor flow; Tracing Art continuous narrative |
| **Jak funguje** | Design systém barev/typů + motion easing continuum; overlapping enter/leave. |
| **Scroll control** | Coordinated timelines across sections |
| **Emocionální efekt** | Jedna cesta, ne sada landing pages |
| **Erasmus use** | Páteř celého webu |
| **Tech** | Shared motion tokens (duration/ease), design tokens |
| **Obtížnost** | 3 (design) / 4 (eng) |

---

### T21 — Progress pathfinder (bonus systémový)

| | |
|--|--|
| **Reference** | Inkwell pathfinder; Tracing Art chapter progress |
| **Jak funguje** | Persistent UI ukazuje pozici v narativu. |
| **Scroll control** | Derived from scroll progress / chapter index |
| **Emocionální efekt** | Orientace bez chaosu |
| **Erasmus use** | „Kde jsem v cestě Erasmu“ + skok na kapitolu (na rozdíl od Inkwell — **povolit jump**) |
| **Tech** | Scroll spy + a11y tabs |
| **Obtížnost** | 2 |

---

### T22 — Long-press / gesture reveal (bonus)

| | |
|--|--|
| **Reference** | David Whyte Experience long-press landscape (IG case); Cartier hidden gestures (case) |
| **Jak funguje** | Hold gesture odhalí druhou vrstvu (báseň / fotka / audio). |
| **Scroll control** | Pointer/touch duration |
| **Emocionální efekt** | Odhalení důvěrnosti |
| **Erasmus use** | „Podrž pro originální citát v jazyce destinace“ |
| **Tech** | Pointer events + progress ring |
| **Obtížnost** | 3 |
| **A11y** | Alternativní button „Zobrazit“ povinný. |

---

## 3. Složení systému — co kdy zapnout

```
Akt 0  Práh ............ T05 kinetic type + T13 cinematic + T14 cursor (light)
Akt I  Odchod .......... T01 scrub + T02 pin + T10 parallax + T06 text split
Akt II Cesta ........... T04 horizontal + T16 SVG map + T03 sticky
Akt III Setkání ........ T07 masking + T15 magnetic CTA + T17 particles soft
Akt IV Dopad ........... T11 morph timeline + T12 video scrub (optional) + T21 pathfinder
Akt V  Pozvání ......... T20 seamless close + T15 CTA + (optional T09 once)
```

**WebGL budget:** T09 / T18 / T19 jen pokud performance budget (LCP/INP) drží na mid-range Android. Jinak CSS/SVG ekvivalenty.

---

## 4. Motion tokens (návrh)

| Token | Hodnota | Použití |
|-------|---------|---------|
| `--motion-fast` | 180ms | Hover, magnetic settle |
| `--motion-base` | 420ms | Section enters |
| `--motion-slow` | 900ms | Cinematic dissolves |
| `--ease-story` | `cubic-bezier(0.22, 1, 0.36, 1)` | Narrativní přechody |
| `--ease-snap` | `cubic-bezier(0.7, 0, 0.3, 1)` | Chapter snaps |
| `--scrub-lag` | 0.6–1.2 | ScrollTrigger scrub feel |

---

## 5. Anti-patterns (zakázáno v ERA40 motion)

- Autoplay sound bez gesture  
- Scroll hijack bez native fallback  
- Particle fireworks na každém scroll ticku  
- Displacement na body textu (čitelnost)  
- Kopírování F1 lime / luxury gold jako „award look“  
- Forced 100s disappearance (100 Lost Species) u veřejné služby  
- WebGL-only content bez HTML alternativy  

---

## 6. Implementation roadmap (dokumentační)

1. **Prototype A (no WebGL):** T01–T07, T10, T15–T16, T20–T21  
2. **Prototype B (selective WebGL):** + T14 hero object, T09 one transition  
3. **Prototype C (full cinematic):** + T12, T18 pouze pokud QA performance projde  

---

## 7. Mapování na Top 10

| Top ref | Dominantní techniky |
|---------|---------------------|
| Tracing Art | T02, T16, T20, T21 |
| Persepolis | T01, T02, T10, T13, T18 |
| Inkwell | T01, T13, T19, T20, T21 |
| 100 Lost Species | T02, T11, T17, T19 |
| Xbox Museum (archive) | T18, T21, personalization UX |
| Paper Planes | T14, T17, participatory loop |
| Lando Norris | T05, T07, T13, T14 |
| Savor | T01, T05, T20 |
| Messenger | T18, T17, world exploration |
| David Whyte | T06, T07, T22, poetic pacing |

---

*Konec dokumentu 05 — Motion Design Bible*  
*Techniky dokumentované: 22 (T01–T22). Povinný set ≥20 splněn.*
