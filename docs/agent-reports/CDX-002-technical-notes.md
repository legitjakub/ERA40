# Report CDX-002 — Technické referenční poznámky

## Výchozí stav

Základ: `01c005103c696ce580bb75241da462f43bec39a3`, hlavní checkout `/Users/jakubhrncir/ERA40`. Výsledek je necommitovaná dokumentační dávka. Bez instalace, buildu, restartu a pushe.

Úplný report je uložen v [CDX-002-technical-notes.md](/Users/jakubhrncir/ERA40/docs/agent-reports/CDX-002-technical-notes.md).

## Změněné soubory

- [18 poznámek a README](/Users/jakubhrncir/ERA40/docs/era40-ai/technical/notes/README.md) — přehled doporučení a návazností.
- [SOURCE_INDEX.md](/Users/jakubhrncir/ERA40/docs/era40-ai/SOURCE_INDEX.md) — 34 skutečně otevřených zdrojů.
- Požadovaný report.

## Co je implementováno

Všech 18 oblastí má poznámku o 31–40 řádcích se strukturou podle briefu, vazbou na skutečné soubory ERA40, vlastní ukázkou kódu a rozlišením otevřených, neotevřených a nedostupných zdrojů.

## Technická rozhodnutí

Zachován jeden Lenis, jeden sdílený canvas a DOM/SVG jako dostupný obsah. Three.js/R3F zůstávají kandidáty pro PoC.

Potvrzen zásadní rozdíl: současná distorze používá WebGL1, zatímco [Three.js renderer vyžaduje WebGL2](https://threejs.org/docs/pages/WebGLRenderer.html). Next 16.4.6 podporuje React ViewTransition bez starého experimentálního přepínače podle [aktuálního guide](https://nextjs.org/docs/app/guides/view-transitions).

## Testy a výsledky

Testovaná revize: pracovní strom nad `01c0051`. Server nebyl použit.

| Kontrola | Exit code | Stav |
|---|---|---|
| Struktura, délky, odkazy a architekturní vazby 18 poznámek | 0 | Prošlo |
| Syntaxe 14 TS/TSX fragmentů | 0 | Prošlo; bez kontroly typů |
| `git diff --check` | 0 | Prošlo |
| Build, lint, projektový typecheck, browser QA | — | Nespuštěno |
| Kompilace 4 GLSL fragmentů, WebGL PoC | — | Nespuštěno |

## Screenshoty

Žádné; UI se neměnilo.

## Známé nedostatky

Celkový `git status` obsahuje předchozí a souběžné změny ostatních sessions. Tato dávka zapisovala pouze povolenou dokumentaci a požadovaný report.

Ukázky jsou schematické. Runtime kompatibilita, výkon na telefonu a vizuální kvalita nových efektů nebyly ověřovány.

## Doporučený další krok

Claudovo review a použití poznámek v `TECHNICAL_ARCHITECTURE.md`. Nejrizikovější jsou:

1. **Synchronizace DOM a kamery:** rozdílné okamžiky aktualizace Lenisu, scrub timeline a RAF.
2. **Sjednocení rendereru:** migrace WebGL1 → WebGL2, vlastnictví textur a mobilní rozpočet.
3. **Životní cyklus a fallback:** ztráta kontextu, pozdní import po odchodu ze sekce a změna reduced motion.

Dokumentační soubory CDX-002 jsou uvolněny k review.