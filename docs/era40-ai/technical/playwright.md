# Playwright a vizuální QA

## Co je k dispozici
- `@playwright/test` 1.65 v `web/devDependencies`. Skripty importují `web/node_modules/playwright-core`.
- Chromium build 1254 je dnes v `/private/tmp/era40-qa-browsers` (`PLAYWRIGHT_BROWSERS_PATH`). **Dočasné**, restart macOS ho může smazat. Trvalá oprava: `npx playwright install chromium` (stáhne asi 150 MB do `~/Library/Caches/ms-playwright`). Je to globální změna prostředí, nutný Jakubův souhlas.
- axe-core je dnes v `/private/tmp/era40-qa-tools/node_modules/axe-core` (také dočasné). Trvale: přidat `axe-core` jako devDependency (změna package.json, jen se souhlasem).
- Projektové skripty v `web/scripts/`:
  - `qa-checks.mjs`: 15 kontrol (reduced motion, skip link, klávesnice kapitol/příběhů/mapy/srovnání, axe),
  - `qa-interactions.mjs`, `qa-motion.mjs`, `qa-shots.mjs`,
  - **`qa-viewports.mjs`** (nový, 14. 11. 2026):
    - matice 6 šířek × scroll pozice dopředu i zpět,
    - rychlý scroll,
    - reduced motion,
    - chyby konzole,
    - horizontální přetečení,
    - screenshoty.
- Prohlížeče v session: Claude in Chrome (externí weby, reference) a vestavěný prohlížeč appky (localhost).

## Playwright MCP
`claude mcp add playwright npx @playwright/mcp@latest` (Apache-2.0, Node 18+). Snapshot strom přístupnosti, s `--caps=vision` i screenshoty. README sám doporučuje pro coding agenty spíš CLI + skilly kvůli menší spotřebě tokenů. **Nekonfigurováno.** Současné nástroje pokrývají potřebu. Přidání je změna konfigurace, rozhodne Jakub.

## Standardní běh
```bash
cd web
PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers node scripts/qa-viewports.mjs --url http://127.0.0.1:3000 --out ../web/qa/viewports
```
Výstup: `report.json` (konzole, overflow, časy) a JPEG pro každou šířku, pozici a režim. Formulář `/api/kontakty` je ve skriptu blokovaný.

## Pravidla
- Testovat produkční build (:3000) pro výkon a výsledky. Dev (:3040) jen pro iteraci.
- Screenshoty **prohlédnout**, ne jen vygenerovat.
- Emulace telefonu nenahradí reálné zařízení (Animaxxing: probliknutí, tap highlight). Před předáním velké změny požádat Jakuba o kontrolu na telefonu.
