# QA prototypu 014 — 15. 11. 2026

**Stav:** izolovaný návrh ověřený v prohlížeči, nikoli přijatá produkční integrace.
Základ worktree: `ea9444c37cb50704c80a2555b015ff230238223a`; testováno nad ním v pracovní větvi `codex/p3-route-transition`.

## Výsledky

Playwright 1.65.0 ze stávající instalace projektu, již instalovaný Google Chrome, headless. Mobilní rozměry jako první; bez fyzického telefonu.

| Šířka × výška | Běžný pohyb | Reduced | Přetečení | Chyby JS/konzole |
|---|---|---|---|---|
| 360 × 780 | pass | pass | 0 | 0 |
| 390 × 844 | pass | pass | 0 | 0 |
| 430 × 932 | pass | pass | 0 | 0 |
| 1920 × 1080 | pass | pass | 0 | 0 |
| 1440 × 900 | pass | pass | 0 | 0 |
| 1280 × 800 | pass | pass | 0 | 0 |
| 1024 × 768 | pass | pass | 0 | 0 |
| 768 × 1024 | pass | pass | 0 | 0 |
| 375 × 812 | pass | pass | 0 | 0 |

- Přímé načtení nezačne animací. Lokální fotografie se načetly.
- Běžná změna stránky odstraní překryv nejpozději do 1,2 s; navigace nečeká na kresbu.
- Archiv → detail: žádný ∞/modrý překryv, fotografie je jmenovaná pro nativní sdílení.
- Rychlá trojice požadavků skončí na poslední destinaci. Při přípravě doplněn generační guard pro pozdní native update callback, aby starší callback nepřepsal novou volbu.
- Back/forward vrací správné pohledy; klávesa Enter naviguje, fokus přejde na main, minimální změřená výška ovládání 44 px.
- Změna přepínače reduced uprostřed náhledu jej zruší, nezůstanou aktivní animace.
- Fallback otestován se skutečně nedostupným `document.startViewTransition`, ne pouze přepínačem: navigace i dokončení SVG fungují.
- Samostatně ověřena systémová změna reduced za běhu a její klidový stav po 160ms fade. U události matchMedia je nutné počkat na její doručení, nikoli ji kontrolovat synchronně hned po CDP příkazu.
- Po doplnění `noscript` je bez JS vidět statické vysvětlení omezení prototypu. To není důkaz SSR skutečné aplikace.

## Vizuální revize

Prohlédnuté skutečné snímky: 390 × 844 a 1440 × 900 v 50 %, mobil i v 80 %; doplňkově mobil 25 %. Kompozice drží linku, velké „40“ a čitelný letopočet v oddělených smyčkách. Modrá plocha má jasný odchod a nezanechává mléčnou vrstvu nad novou stránkou. Tah na mobilu je velmi subtilní; to je bod pro Jakubův feel-check, nikoli důvod slibovat hotové award-level provedení.

Regenerovatelné důkazy mimo Git: `/private/tmp/era40-p3-qa/report.json`, `followup.json`, `390-transition-25.png`, `390-transition-50.png`, `390-transition-80.png`, `1440-transition-50.png`, `390-reduced.png`, `390-fallback.png`.

## Příkazy a technické překážky

```sh
node --check docs/era40-ai/prototypes/014-route-transitions/scene.js
ERA40_QA_PACKAGE=/Users/jakubhrncir/ERA40/web/package.json node docs/era40-ai/prototypes/014-route-transitions/qa.mjs
```

Syntax check i hlavní QA: exit 0. Doplňkové no-JS / OS-preference QA: exit 0 po správném vyčkání události. Původní příliš časná kontrola preference: exit 1 (závod testu s doručením události).

CLI wrapper se pokoušel o síťové rozlišení balíčku, ukončen (130); použita již instalovaná Playwright knihovna podle zavedeného repo QA. Výchozí Playwright Chromium není stažený (první launch exit 1); použit nainstalovaný Chrome, nic se nedoinstalovalo. Pokus o video neuspěl kvůli chybějícímu ffmpeg pro Playwright (exit 1), záznam nevznikl, další software nestahován. Screenshoty jsou k dispozici.

## Co nebylo ověřeno

Skutečný Next App Router, React SharedPhoto při streamingu/prefetchi, scroll restoration produkce, produkční INP a fyzické FPS. To patří do integračního briefu po schválení specifikace 014. Žádný build/restart :3000, produkční lint/typecheck ani zápis do formuláře neproběhl. Produkční soubory a runtime závislosti jsou beze změny.
