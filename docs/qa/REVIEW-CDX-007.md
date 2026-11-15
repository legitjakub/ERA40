# Review CDX-007 (07 Rozvětvení na mobilu kratší)

15. 11. 2026 · Claude · runtime `545f573` + report `6da1283` (cherry-pick do main jako `c9d9321`, `02d7cff`).

**Verdikt: PŘIJATO.**
- Rozsah drží brief: jen `Numbers.tsx`, `Numbers.module.css`, `BigCount.module.css`. Bez nové animace, pinu a závislostí, data, období i štítky beze změny.
- Příklad sektoru na < 768 px je pod vybranou větví (`aria-expanded`, `aria-controls`, jde zavřít). Desktop beze změny.
- **Integrační QA (main po cherry-picku):**
  - výška 07: 360 = 1 820, 390 = 1 790, 430 = 1 791 px (cíl ≤ 1 900, dříve ~2 600), přetečení 0,
  - `qa-checks` 15/15, `qa-impact` 0 chyb, `qa-handoffs` 6/6, `qa-viewports` 8 šířek bez chyb, build čistý.
- **Follow-up v integračním commitu:** oba zdrojové odkazy mají `aria-label` „Zdroj: {plný zdroj}. {období}“, který začíná viditelným „Zdroj: DZS“ (dohoda s Codexem, `title` není spolehlivý popis).
- **Poznámka:** mobilní rozvržení naskočí po hydrataci (SSR fallback = desktopové pořadí). Obsah je i bez JS kompletní, layout shift je hluboko pod ohybem. Přijatelné.
