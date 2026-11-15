# COMPONENT SYSTEM

15. 11. 2026 · Claude. Mapa skutečných komponent (`web/src`) a pravidla pro nové.

## Vrstvy

| Vrstva | Kde | Pravidlo |
|---|---|---|
| Tokeny | `styles/tokens.css`, `lib/gsap/presets.ts` (`DUR`, `EASE`) | Žádné barvy ani trvání mimo tokeny |
| Motion runtime | `lib/gsap/setup.ts` (registrace, lazy ScrollTrigger/Flip/SplitText), `lib/gsap/useScene.ts`, `layout/SmoothScroll.tsx` (jediný Lenis) | Scény jen přes `useScene`, cleanup přes context |
| Layout | `layout/SiteNav`, `SiteFooter`, `SkipLink`, `pages/PageIntro` | Podstránky = `PageIntro` + obsah |
| Kapitoly homepage | `hero/*`, `people/PeopleIntro`, `history/*`, `people/PeopleStories`, `map/*`, `then-now/*`, `numbers/*`, `future/*` | Jedna sekce = jeden soubor + CSS Module, `id` a `data-section` neměnit |
| Předávky scén | `people/JourneySequence` (005A), `scenes/SceneHandoffs` (008A/B) | Kontrakt přes datové atributy: `data-handoff-*`, `data-handoff-axis-target` |
| Obsah | `content/*.ts` (stories, story-details, story-impact, stats, milestones, era-quiz, chapters) | Modelový obsah má `status: "model-story"`, čísla `period` + `sources` |
| Sdílené prvky | `archive/StoryLabel`, `archive/StoryImpact`, `people/StoryDialog` (useOpenStory), `era/EraGlyph` | Znovu použít, nekopírovat |
| WebGL | `people/distortion.ts` + `StoryDistortion.tsx` (WebGL1, 1 canvas) | Nový GPU kód jen po PoC (fáze 3), jeden vlastník canvasu |
| QA | `scripts/qa-viewports`, `qa-checks`, `qa-impact`, `qa-handoffs`, `qa-interactions` | Každá nová interakce má cílený test |

## Pravidla pro novou komponentu
1. Obsah v `content/`, ne v JSX (kvůli budoucímu CMS).
2. Nejdřív SSR čitelný stav, pohyb je jen vylepšení. Reduced motion = koncový stav.
3. CSS Module s lokální třídou v každém selektoru (Turbopack). `:global` jen pro `html[data-reduced-motion]`.
4. Interaktivní prvky: `button` / `a`, `aria-pressed` u přepínačů, cíl ≥ 44 px, viditelný focus.
5. Linky Trasy: plná = ujeto, žlutý bod = tady jsi, tečky = budoucnost (spec 001).
6. Bez nových závislostí bez rozhodnutí v decision logu.

## Kandidáti na sjednocení (bez naléhavosti)
- Štítek „Ilustrační snímek“ je v ~10 komponentách jako lokální `.caption`. Vzhled zůstává (tmavý chip, Jakubovo rozhodnutí). Kód lze sjednotit do jedné komponenty `MediaLabel`.
- Odkazové CTA (`↗`) se opakují v archivu, číslech, kvízu a závěru. Kandidát na `ArrowLink`.
