# Workflow: vizuální QA

Vykonává `era40-visual-qa`. Animace není hotová, dokud ji někdo neviděl v prohlížeči.

## Prostředí
- Produkce :3000 (po `npm run build` + restartu). Dev :3040 jen pro iteraci.
- `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers` (viz `technical/playwright.md`).
- `/api/kontakty` vždy blokovat.

## Povinná matice
| Kontrola | Nástroj |
|---|---|
| 1920, 1440, 1280, 1024, 768, 390, 375, 360 × scroll dolů i nahoru (matice: `docs/orchestration/ORCHESTRATION.md` §7) | `node scripts/qa-viewports.mjs --url … --path …` |
| Rychlý scroll a návrat | tamtéž (`*-fast-return.jpg`) |
| Reduced motion | tamtéž (`*-reduced-*`) a přepínač „Omezit pohyb“ v menu |
| Konzole, page errors, overflow | `report.json` |
| Klávesnice, skip link, axe | `AXE_SCRIPT=… node scripts/qa-checks.mjs --url …` |
| Konkrétní fáze animace | Playwright s `window.__eraRanges()` → scroll na start + progress × (end−start) |
| Opakovaná interakce, refresh, navigace mezi stránkami | ruční scénář v Playwrightu nebo v prohlížeči |
| Pomalá síť | `page.route` se zpožděním nebo CDP `Network.emulateNetworkConditions` (Slow 4G) |
| Výkon | `~/.claude/skills/awwwards/scripts/shoot.mjs` (FPS, LCP, CLS) na produkci |

## Co hledat ve screenshotech
- Layout shift, ořezaný nebo překrývající se text, diakritika (háčky do řádku nad).
- Probliknutí koncového stavu před intrem. Prvky zaseknuté v mezistavu po rychlém scrollu.
- Synchronizace se scrollem (Trasa navazuje?). Kvalita obrazu (rozmazání, artefakty).
- Mobil: dotykové cíle ≥ 44 px, nic za okrajem, hover nezůstává.

## Výstup
Krátký report: co prošlo, co ne (s cestou ke screenshotu), co nešlo ověřit (reálný telefon, GPU). Nálezy zapsat do `decisions/decision-log.md` pod „QA nálezy“.
