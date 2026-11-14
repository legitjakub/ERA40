# PROJECT AUDIT — fáze 0

15. 11. 2026, Claude. Pouze audit, produkční web se v této fázi neměnil.

## 1. Co ERA40 je dnes

Funkční Next.js microsite, ne prázdný projekt.

| Oblast | Skutečný stav |
|---|---|
| Stack | Next.js 16.4.6 (App Router, Turbopack, `cacheComponents`), React 19.3, TypeScript, CSS Modules |
| Motion | GSAP 3.15.1 (DrawSVG; ScrollTrigger, Flip a SplitText načítané lazy), `@gsap/react`, `useScene`, Lenis 1.3.27 (jedna instance, jen `/` na desktopu) |
| WebGL | vlastní WebGL1 distorze fotografií v Příbězích (`people/distortion.ts`), DOM fallback. Three.js, R3F ani OGL **nejsou** závislosti. |
| Typografie | Roboto Flex Variable, lokální woff2 (latin, latin-ext), osy `wdth` a `wght` se animují |
| Homepage | 8 kapitol: hero (film → rám), prolog, historie (pin), příběhy (horizontální pin ~10 000 px), mapa Evropy (předávka fotky 005A), tehdy/teď (slider), čísla, budoucnost |
| Podstránky | `/pribehy` (archiv s filtry), `/pribehy/[id]`, `/zapojte-se` (formulář → lokální JSON), `/tvoje-era` (kvíz), `/o-projektu`, `/ochrana-osobnich-udaju`, `/credits`, `/placeholders`, `/styleguide` |
| Obsah | 8 **modelových** příběhů (viditelně označených), ověřená čísla DZS s obdobím, chronologie 1987–2027 |
| Média | všechna fotografie a video jsou ilustrační stock (`ILLUSTRATIVE-*`, `placeholders/`). Skutečné fotky účastníků chybí. |
| QA | Playwright skripty `qa-viewports`, `qa-checks` (axe + klávesnice), `qa-interactions`, `qa-motion`. Poslední průchod 14. 11. bez chyb a přetoků. |
| SEO | `robots: noindex` (přípravný stav), metadata a claim sladěné s podklady 14. 11. |
| Chybí vůči zadání DZS | CMS, kalendář akcí, partneři, analytika, sdílení jednotlivých příběhů, redakční workflow |

## 2. Rozpracovaná práce (pozor na souběh)

Codex (desktop aplikace) **právě implementuje spec 007** „Zkušenost pokračuje“. Do 15. 11. 00:00 bez commitu. Týká se `archive/StoryArchive.*`, `StoryImpact.*`, `content/story-impact.ts`, `numbers/*`, `then-now/*`, `future/*`, detailu příběhu a `SiteNav`. Tyto soubory má přidělené Codex. Claude do nich nezasahuje a review 007 udělá podle `ORCHESTRATION.md`, až Codex dávku předá.

## 3. Znalostní základ, který už existuje (neopakovat)

- `docs/01–19-*.md`: původní kreativní a obsahová příprava (fakta, reference, 3 kreativní směry, storyboardy, stack).
- `docs/era40-ai/`: znalostní báze. Obsahuje:
  - motion systém (`MOTION.md`), specifikace 001–007 a decision log D-001–D-014,
  - technické poznámky (GSAP, ScrollTrigger, three.js, WebGL, shadery, Playwright),
  - 6 rozborů Codrops tutoriálů a referenční syntézu.
- `docs/private/`: úplné čtení podkladů DZS od Claude i Codexu (mimo Git).

## 4. Rozpory mezi master promptem a dosavadními pravidly

Rozhodl Jakub. Pro jistotu je zapisuji, aby je oba agenti četli stejně.

| Téma | Dříve | Master prompt 15. 11. | Jak postupovat |
|---|---|---|---|
| Restart vs. vylepšování | „vylepšovat, ne restartovat“ (CLAUDE.md) | „Nepřepisuj existující funkční řešení bez důvodu“ + ambice awards-level immersive | Evoluce stávající aplikace. Nové prostorové scény se přidávají po kapitolách. Žádný přepis frameworku. |
| Motiv nekonečna | D-005: dekorativní „40 → ∞“ zamítnuto | „Motiv nekonečna musí být integrován do vizuálního a pohybového jazyka. Ne rotující ikona.“ | **Nový závazný požadavek.** Musí nést význam (zkušenost pokračuje k dalším), ne dekoraci. Řeší ho kreativní směry ve fázi 1. |
| Font | Roboto Flex schválen (D-001) | „Nepoužívej automaticky Roboto … zjisti skutečné fonty“ | Roboto Flex není automatická volba, je schválený a variabilní (animují se osy). Oficiální výroční identita DZS ale chybí (viz `MISSING_INPUTS.md`). Pokud DZS dodá jiný font, změní se. |
| WebGL / Three.js | Fáze 11: nový 3D jen přes PoC a schválení | „Skutečné WebGL interakce“, scroll kamera, shadery | Three.js je kandidát, ne výchozí volba. Ve fázi 3 PoC nejrizikovějšího efektu (scroll ↔ kamera ↔ WebGL přechod) a měření na mobilu. |
| Lenis | jedna instance | „Lenis není povinný“ | Zachovat, dokud nebrání. Ve fázi 3 vyhodnotit. |
| Počet referencí | ~22 odkazů v knihovně (převážně 2017–2024) | ≥ 20 realizovaných webů, priorita 2025–2026 | Doplnit nové, ne nahradit. Viz `RESEARCH_PLAN.md`. |

## 5. Technický dluh a nálezy

1. `web/public/media/qa-*.png` (5 souborů, 3,4 MB; opraveno podle CDX-000): QA screenshoty v servírované složce. Přesunout mimo `public/` (Codex, malý úkol).
2. Horizontální rail Příběhů: pin ~10 000 px při 1440 px. Výrazně přesahuje rozpočet 250 vh v DESIGN.md. Jde o tempo, ne o chybu. Řeší se ve směru, ne opravou.
3. DrawSVG varuje u `vector-effect: non-scaling-stroke` (mapa). Kosmetické, jen v konzoli.
4. Pod 360 px se CTA v hero zalamuje (audit 14. 11.).
5. Analytika ani CMS neexistují. Zadání DZS je vyžaduje pro MVP.

## 6. Prostředí agentů

Viz `ORCHESTRATION.md` §1 a `SKILLS_INVENTORY.md`. Codex CLI je ověřený a funkční. Spouštění: `tools/codex-task.sh`.
