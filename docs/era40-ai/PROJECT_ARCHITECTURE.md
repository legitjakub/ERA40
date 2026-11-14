# ERA40: skutečná architektura a technická omezení

Audit 14. 11. 2026, commit `b22f71b` (stav po vrácení webu oslavy, kód shodný s `eb657c5`). Tento soubor popisuje, co v repozitáři **je**, ne co by mělo být. Při změně architektury ho aktualizuj.

## 1. Repozitář

| Cesta | Obsah |
|---|---|
| `CLAUDE.md`, `AGENTS.md` | Pracovní pravidla pro Claude a Codex (koordinace, integrita, ověřování) |
| `docs/01–19-*.md` | Původní kreativní a výzkumný balík (fakta, reference, motion bible, storyboardy) |
| `docs/era40-ai/` | **Tato znalostní báze** pro kreativní vývoj |
| `.claude/skills/` | Projektové skilly (převzaté + vlastní `era40-*`) |
| `web/` | Aplikace (Next.js) |
| `web/docs/DESIGN.md` | **Závazná** art direction a storyboardy osmi kapitol |
| `web/docs/CONTENT-FACTS.md` | Ověřená fakta a zdroje čísel |
| `web/docs/CLAUDE-COORDINATION.md` | Rozdělení souborů mezi Claude a Codex |
| `web/data/` | Osobní údaje z formuláře. Necommitovat, nemazat, neposílat. |
| `assets/`, `research/`, `prompts/` | Zdrojové materiály |

Git: větev `oslava`, hlavní větev `main`, bez remote. Kořenový `.gitignore` vylučuje `web/qa/`, ZIP a `.DS_Store`.

## 2. Stack

| Oblast | Skutečnost |
|---|---|
| Framework | **Next.js 16.4.6**, App Router, Turbopack. `cacheComponents: true`, `partialPrefetching: true` (`web/next.config.ts`) |
| Jazyk | TypeScript 5, React **19.3.0** |
| Build | `npm run build` (next build), `npm run lint` (ESLint 9 + eslint-config-next), `npm run typecheck` (tsc) |
| Styly | CSS Modules + globální `src/app/globals.css`, tokeny v `src/styles/tokens.css` |
| Písmo | Roboto Flex variable, lokálně (`public/fonts/*.woff2` + `@fontsource-variable/roboto-flex`) |
| Animace | **GSAP 3.15.1** + `@gsap/react` 2.1.2. Pluginy: DrawSVG (staticky), ScrollTrigger, Flip, SplitText (lazy) |
| Smooth scroll | **Lenis 1.3.27**, jediná instance v `components/layout/SmoothScroll.tsx` |
| WebGL | Žádná knihovna. Jeden vlastní WebGL1 shader v `components/people/distortion.ts` (distorze fotky v Příbězích) |
| 3D | Žádné (three.js, R3F, OGL nejsou závislosti) |
| Testy | `@playwright/test` 1.65 (devDependency), vlastní skripty `web/scripts/qa-*.mjs`, axe-core mimo projekt |
| Data | Typované obsahové soubory `src/content/*.ts|json` |
| Formulář | `app/api/kontakty/route.ts` → `lib/contacts/store.ts` (NDJSON v `web/data/`) |

Pozor: `web/AGENTS.md` upozorňuje, že Next 16 se liší od tréninkových dat. Před prací s routami čti `web/node_modules/next/dist/docs/`. Pod `cacheComponents` musí být obsah závislý na `params` za `<Suspense>` a route handlery nesmí exportovat `runtime`.

## 3. Komponenty a kapitoly

Homepage (`src/app/page.tsx`) skládá osm kapitol. ID jsou kotvy a nesmí se měnit (`src/content/chapters.ts`):

| # | ID | Komponenta | Pohybová technika dnes |
|---|---|---|---|
| 01 | `hero` | `hero/Hero.tsx`, `FilmCaptions.tsx` | video, title line reveal, rok 1987→2027 count, Trasa scaleX, **pin 150 vh** (film → rám, clip-path), DrawSVG trail, magnetické CTA, flexAxes |
| 02 | `pribehy-intro` | `people/PeopleIntro.tsx`, `TrainSequence.tsx` | scrub čtecího zvýraznění, okno vlaku (IO) |
| 03 | `historie` | `history/HistoryTimeline.tsx` | **pin**, scrub, DrawSVG dvou linií, clip-path fotek |
| 04 | `pribehy` | `people/PeopleStories.tsx`, `StoryDialog.tsx`, `StoryDistortion.tsx` | **pin + horizontální rail**, clip-path, WebGL distorze, Flip do detailu |
| 05 | `mapa` | `map/EuropeMap.tsx` | scrub, DrawSVG tras, clip-path |
| 06 | `tehdy-ted` | `then-now/ThenNow.tsx` | slider (drag + klávesnice), matchMedia |
| 07 | `cisla` | `numbers/Numbers.tsx` | counter, scrub sloupců |
| 08 | `budoucnost` | `future/Future.tsx` | DrawSVG Trasy, quickTo |

Globální vrstva: `layout/SiteNav.tsx` (kapitolový index, dialog, progres), `SmoothScroll.tsx` (Lenis + velocity skew `[data-velocity-type]`), `ChapterProgress`, `Pathfinder`, `ui/SectionPortal.tsx` (scrub přechod), `SkipLink`.

Podstránky: `/pribehy`, `/pribehy/[id]`, `/zapojte-se`, `/o-projektu`, `/ochrana-osobnich-udaju`, `/credits`, plus interní `/placeholders` a `/styleguide`. Používají `pages/PageIntro.tsx` a **nemají** GSAP scény homepage. Lenis běží jen na `/`.

## 4. Animační infrastruktura (závazné vzory)

- **`src/lib/gsap/setup.ts`**: jediný import GSAP. `registerGsap()` registruje DrawSVG a useGSAP. ScrollTrigger se načítá odloženě (`subscribeMotion`, `motionReady`). `loadFlip()` a `loadSplitText()` jsou lazy. V dev/QA je k dispozici `window.__eraRanges()` s rozsahy pinů.
- **`src/lib/gsap/useScene.ts`**: `useScene(effect, {scope, dependencies})` spustí scénu až po načtení ScrollTriggeru. `revertOnUpdate: true` zajistí cleanup. `useMotionReady()` pro ne-GSAP kód.
- **`src/lib/gsap/presets.ts`**: `EASE` (out = power3.out, inOut = power2.inOut, expo = expo.out), `DUR` (xs .3, s .6, m .9, l 1.4), `splitReveal`, `maskReveal`, `routeDraw`, `counter`, `flexAxes`. Nové scény je mají skládat, ne vymýšlet vlastní easingy.
- **`src/styles/tokens.css`**: CSS zrcadlo (`--dur-*`, `--ease-out: cubic-bezier(0.215, 0.61, 0.355, 1)`), barvy Erasmus+, typografické tokeny.
- **`src/lib/motion/scroll.ts`**: `attachSmoothScroller`, `scrollToPosition` (skoky v navigaci respektují piny a reduced motion).
- **`src/hooks/usePrefersReducedMotion.ts`**: OS preference **nebo** přepínač „Omezit pohyb“ v menu (`localStorage: era40-reduce-motion`). Každá scéna ho musí respektovat.
- Lenis: jen `/`, jen `(min-width:1024px) and (pointer:fine)`, ne při reduced motion. Dialogy jsou z Lenisu vyňaté (`prevent`).

## 5. Responzivita

- Breakpointy podle DESIGN §4: desktop ≥1024 smí piny (max 250 vh) a horizontální rail. Pod 1024 nejsou piny delší než 100 vh ani scroll-hijack, používá se nativní swipe se snapem.
- `gsap.matchMedia()` ve scénách (Hero, Historie, Příběhy, Čísla, Budoucnost…).
- Hero má portrait/landscape varianty videa (`useSyncExternalStore` na `max-width:767px`).

## 6. Výkon (existující opatření)

- Lazy ScrollTrigger/Flip/SplitText, Lenis jen na homepage.
- Video: AVIF poster jako LCP `<img fetchPriority="high">`, MP4/WebM, pauza mimo obraz a ve skrytém tabu (IO + visibilitychange).
- WebGL distorze: jeden canvas, `powerPreference: low-power`, jen na vyžádání.
- `next/image` pro fotky, subsetované fonty.

## 7. Nástroje a integrace v prostředí (14. 11. 2026)

- **Prohlížeče:** Claude in Chrome (uživatelův Chrome, výchozí) a vestavěný prohlížeč Claude desktop appky (lokální náhledy). Playwright 1.65 přes `playwright-core` ve skriptech. Chromium je dnes v `/private/tmp/era40-qa-browsers` (dočasné, viz `technical/playwright.md`).
- **MCP integrace dostupné v session:**
  - prohlížeče: Claude in Chrome, Claude Browser, Control Chrome,
  - Desktop Commander, computer-use, iOS Simulator,
  - Vercel, Supabase, Shopify, Context7 (dokumentace knihoven), registry MCP, Granola, plugin connectors.
  - Řada pluginových MCP (Figma, Notion, GitHub, Linear…) čeká na autorizaci přes `/mcp` a do té doby nefunguje.
  - Pro ERA40 jsou relevantní prohlížeče a případně Context7 pro aktuální dokumentaci knihoven. Playwright MCP **není** nakonfigurovaný, viz `technical/playwright.md`.
- **Globální skilly (~/.claude/skills):**
  - `cinematic-websites`, `awwwards`, `frontend-design`,
  - `gsap-core|timeline|scrolltrigger|react|plugins|utils|performance` (shodné s greensock/gsap-skills@aed9cfd),
  - `react-best-practices`, `web-design-guidelines`.
- **Projektové skilly:** viz `SKILL_REGISTRY.md`.

## 8. Tvrdá omezení

1. Neměnit framework, architekturu kapitol, kotvy ani `data-section`.
2. Jedna instance Lenisu, GSAP jen z `setup.ts`, scény přes `useScene`.
3. Identita: Erasmus+ modrá, žlutá střídmě (<5 %), Roboto Flex, motiv Trasa, české texty, označené modelové příběhy a ilustrační média.
4. Výročí: „40 let Erasmu“ (1987–2027), Česko od 1998. Nikdy „40 let Erasmu v Česku“.
5. Každý efekt musí mít mobilní variantu, stav pro omezený pohyb a ovládání klávesnicí. Musí fungovat i při scrollu zpět.
6. WebGL: nejvýš jeden sdílený canvas, pauza mimo obraz, dispose při odchodu, DOM je vždy přístupný zdroj.
7. `web/data/` nikdy necommitovat ani nemazat. Formulář v QA neodesílat (blokovat `/api/kontakty`).
8. Bez pokynu nepushovat, nenasazovat. Build a restart :3000 jen po dohodě (Codex může běžet souběžně).
9. Nové runtime závislosti (three, ogl, R3F) jen s doloženou potřebou a souhlasem.

## 9. Historie rozhodnutí relevantní pro pohyb

Viz `decisions/decision-log.md`. Klíčové: Jakub odmítl tři kola efektů navršených na web (odjezdová tabule, „40 → ∞“, jízdenka/vlak) i web oslavy s interaktivním programem. Každá další změna jde přes návrh, prototyp a jeho schválení.
