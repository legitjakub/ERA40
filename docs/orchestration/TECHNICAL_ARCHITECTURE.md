# TECHNICAL ARCHITECTURE

15. 11. 2026 · Claude.

**Stav:** návrh. Čeká na nezávislé review Codexu (CDX-006 po resetu limitu Codexu, 04:32) a na PoC 1.

**Vstupy:**
- technické poznámky CDX-002 (`docs/era40-ai/technical/notes/`),
- rizika CDX-000 a CDX-003,
- reference 2025–26 (17 z 28 používá three.js na WebGL2).

## 1. Rozhodnutí

| Oblast | Rozhodnutí | Proč |
|---|---|---|
| Framework | **Zůstává Next.js 16.4.6 (App Router, `cacheComponents`), React 19.3, TypeScript, CSS Modules** | Funguje, je otestované, Jakub nechce restart. Přepis by nic nepřinesl. |
| Scroll | **Jeden Lenis jen na `/` a jen na desktopu**, ScrollTrigger přes `lib/gsap/setup.ts`. Podstránky mají nativní scroll. | Měření 60 fps. Lenis není povinný, ale nepřekáží. Pořadí aktualizace: Lenis → ScrollTrigger.update → timeline → měření DOM → render. |
| Choreografie | **GSAP 3.15** (timeline, ScrollTrigger, DrawSVG, Flip, SplitText lazy). Scény přes `useScene`. | Jediný systém času a scrollu, žádný druhý animační engine |
| 2D Trasa | **SVG** je základ všech linek (Trasa, smyčka M02, větve 07, závěr 08) | Přístupné, levné, ostré, mobil bez GPU |
| WebGL | **Jeden sdílený renderer a jeden canvas** (DESIGN §7). Dnes WebGL1 (`distortion.ts`). Three.js r18x vyžaduje WebGL2. Při zavedení Three.js se `distortion.ts` přepíše na Three.js ShaderMaterial ve stejném rendereru. | Dva kontexty znamenají dvojí paměť, dvojí RAF a riziko ztráty kontextu (CDX-000 #3) |
| R3F | **Nepoužít** zatím | Pro 1–2 scény bez React stromu v canvasu je přímé Three.js jednodušší a dá plnou kontrolu nad pořadím renderu (synchronizace se scrubem). Přehodnotit, pokud scén přibude. |
| GPU kandidáti | P1 ribbon linky (desktop), P2 kamera v Historii | Jen po PoC (kap. 3) |
| Postprocessing | Ne | Rozpočet, čitelnost dokumentárního obrazu |
| Assety 3D | Žádné modely. Pokud vzniknou: GLB + Draco/Meshopt, KTX2 | Viz poznámka CDX-002 #16 |
| CMS | **Rozhodnutí odloženo** do podkladů DZS (`MISSING_INPUTS` #9). Obsah je oddělený v `content/*.ts` s typy, migrace do headless CMS (např. Sanity/Strapi nebo prostředí DZS) je mapování 1:1. | Bez znalosti prostředí DZS nelze zodpovědně vybrat |
| Analytika | Odloženo. Potřebný souhlas a nástroj DZS. Body měření: kvíz start/konec/typ, CTA, formulář. | Zadání LP |
| Routing a přechody | App Router. Mezi stránkami zatím bez přechodů. React `<ViewTransition>` je kandidát (Next 16 podporuje). | CDX-002 #11 |
| Fallbacky | DOM a SVG jsou vždy obsah, GPU je dekorace (`aria-hidden`). Context loss → canvas pryč, DOM viditelný. Reduced motion → koncové stavy. | CDX-002 #18 |
| Testy | Playwright skripty (`qa-*`), jednotná matice 8 šířek, axe | ORCHESTRATION §7 |

## 2. Architektura sdíleného rendereru (cíl po PoC)

```
lib/gl/renderer.ts      jediný THREE.WebGLRenderer (WebGL2), 1 canvas fixed, DPR ≤ 1,5
  ├─ scény registrují „layers“ { mount(dom), update(state), dispose() }
  ├─ gsap.ticker řídí render (žádný vlastní RAF)
  ├─ IntersectionObserver: render jen když je aktivní vrstva v obraze
  └─ webglcontextlost → dispose všeho, data-gl="off" → CSS ukáže DOM
layers/storyDistortion  (náhrada distortion.ts)
layers/routeRibbon      (P1: Trasa jako ribbon, progress z existující timeline)
```

**Pravidla:**
- Stav pro snímek je v refech nebo proxy objektech, ne v React state.
- Geometrie se měří při refresh a resize, ne při každém snímku.
- Textury sdílí `TextureLoader` cache.
- Každá vrstva při `dispose` uvolní geometrii, materiál a texturu.

## 3. PoC (před produkcí)

| PoC | Otázka | Kritérium úspěchu | Kde |
|---|---|---|---|
| **PoC 1: ribbon + scrub + DOM** | Udrží GPU linka polohu vůči DOM prvkům při scrubu, reverse, fast scroll a resize? | Odchylka ≤ 1 px na 1440 při forward, reverse a fast. 60 fps desktop. Context loss → SVG fallback. | `docs/era40-ai/prototypes/011-ribbon-poc/` (izolovaně, three z node_modules) |
| PoC 2: renderer sdílený s distorzí | Jde `distortion.ts` převést na vrstvu bez změny vzhledu? | Vizuální diff < 2 %, stejný výkon | worktree |
| PoC 3: kamera v Historii | Nerozbije kamera 008A a kotvy? | `qa-handoffs` projde, kotva `#historie` ±2 px | worktree |

Bez úspěšného PoC 1 zůstává směr A ve 2D (SVG). Ten je už teď v produkci a funguje.

## 4. Mobil a výkon
- **Mobil:** bez WebGL vrstev (kromě dnešní distorze, která je na mobilu vypnutá), SVG linky a nativní swipe.
- **Rozpočet:**
  - LCP mobilu < 2,5 s (dnes simulovaně 692 ms),
  - CLS < 0,05,
  - desktop ≥ 55 fps, draw calls < 50,
  - textury ≤ 2048 px.
