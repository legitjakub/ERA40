# Report CDX-005-future

## Výchozí stav

Hlavní checkout, pracovní strom nad `cc3f6d1`. Implementace je necommitovaná. Úplný report: [CDX-005-future.md](/Users/jakubhrncir/ERA40/docs/agent-reports/CDX-005-future.md).

## Změněné soubory

- `future/Future.tsx` — obsah, akce, SVG trasa a sdílení.
- `future/Future.module.css` — rozložení, mobil a focus.
- Požadovaný report. Ostatní soubory neupravovány.

## Co je implementováno

Nový nadpis a věta o pokračování zkušenosti k dalším lidem. Dvě zadané akce a klidný řádek odkazů. Osm měst a magnetický efekt odstraněny.

Trasa: plná → žlutý bod „Vaše cesta“ → tečky. Na mobilu svisle vlevo, tlačítka přes celou šířku. Kotva a `data-section` zachovány.

## Technická rozhodnutí

DrawSVG scrub přes projektový `useScene`, reverzibilní timeline bez pinu. Tečky odhaluje SVG maska. Reduced motion zobrazuje kompletní trasu ihned.

## Testy a výsledky

Testováno na dev :3040, pracovní strom nad `cc3f6d1`.

| Kontrola | Exit | Výsledek |
|---|---:|---|
| `npm run typecheck` | 0 | Prošlo |
| `npm run lint` | 0 | Prošlo |
| `git diff --check` pro `future/**` | 0 | Prošlo |
| Playwright: 8 šířek × normal/reduced | 1 | Bez přetečení; dvě chyby konzole v Hero |
| Finální opakování 1920 normal/reduced | 0 | Prošlo |
| Resize, live reduced, rychlý scroll, návrat z kvízu | 0 | Prošlo |
| Clipboard fallback | 0 | Prošlo |

Klávesnice, viditelný focus a cíle ≥ 44 px ověřeny. Axe na 1440/390/360 v obou režimech: **0 porušení**. Build nebyl podle zadání spuštěn.

## Screenshoty

Skutečně prohlédnuté screenshoty jsou v `/private/tmp/era40-cdx005/`:

- [1440 px](/private/tmp/era40-cdx005/1440-section.png)
- [390 px](/private/tmp/era40-cdx005/390-section.png)
- [360 px, reduced](/private/tmp/era40-cdx005/360-reduced-section.png)
- [Montáž matice](/private/tmp/era40-cdx005/contact-sheet.jpg)

## Známé nedostatky

**Čistá konzole není splněna:** na 1440 a 1024 React zachytil hydration mismatch u `Hero h1[data-velocity-type]`. Nález je mimo povolené soubory; neopravoval jsem jej.

Produkční build, skutečný telefon a systémový dialog Web Share nebyly ověřeny.

## Doporučený další krok

Claude: společné review kapitol 06–08, oprava hydratace Hero a produkční QA. **`future/**` je uvolněno k review.** Žádný commit, push ani restart :3000 neproběhl.