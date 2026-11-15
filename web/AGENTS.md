<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Aktuální implementace ERA40

Pracovní microsite je v této složce. Nová art direction je v `docs/DESIGN.md`, fakta v `docs/CONTENT-FACTS.md`, stav a testy v `docs/IMPLEMENTATION-REPORT.md`. Používej modrou identitu Erasmus+, Roboto Flex a SVG motiv Trasa. Výročí patří evropskému programu 1987–2027, česká účast začíná v roce 1998.

- Zachovej osm sekcí a jejich `data-section`, kotvy i přímé odkazy na příběhy.
- Importuj GSAP z `src/lib/gsap/setup.ts`. Scény používají `useScene` z `src/lib/gsap/useScene.ts`, který čeká na odložený ScrollTrigger a provádí cleanup. Zůstává právě jedna instance Lenisu.
- `media.json` obsahuje původ a licenci médií. Lehký katalog `media-images.json` a SVG mapu obnovuje `scripts/rebuild-vector-assets.mjs`.
- Původ modelového obsahu vysvětluje běžný text u přehledu a v detailu či dialogu. Jakub 15. 11. výslovně odstranil opakované štítky a popisky přes fotografie; nevracej je. Metadata, kredity a rozlišení skutečných a modelových příběhů zůstávají. Skutečné příběhy potřebují ověřitelný zdroj i souhlas k užití. Stock fotografie nepotvrzuje identitu modelové postavy.
- U statistik zobrazuj období. Datum kontroly zdroje je v datech, hodnoty z roku 2023 se nesmějí označovat jako stav v roce 2027.
- Proveď build, lint, typecheck a příslušný prohlížečový test před předáním změny.
- Zachovej ovládání videa při změně reduced motion. Chyba jednotlivého source nesmí skrýt ovládání úspěšně přehrávané alternativy.
- Podstránky: `/pribehy`, `/pribehy/[id]`, `/zapojte-se`, `/o-projektu`, `/ochrana-osobnich-udaju`. Používají `PageIntro` a nesahají na GSAP scény homepage. Obsah stránky příběhu závislý na `params` zůstává za `<Suspense>` (Partial Prefetching).
- Kontakty: validace v `src/lib/contacts/schema.ts`, úložiště v `src/lib/contacts/store.ts`, data v `data/` jsou osobní údaje a nikdy se necommitují.
