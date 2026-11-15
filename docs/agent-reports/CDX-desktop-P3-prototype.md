# Report Codex desktop — P3 / specifikace 014

## Výchozí stav
Základ `ea9444c37cb50704c80a2555b015ff230238223a`; worktree `/private/tmp/era40-p3-route`, větev `codex/p3-route-transition`. Výsledkem je izolovaný prototyp a konkrétní specifikace k review a Jakubovu schválení. Žádná integrace v hlavním checkoutu.

## Změněné soubory
- `docs/era40-ai/motion/specs/014-route-transitions.md` — úplná choreografie, ochrana SharedPhoto, integrace s React a omezení.
- `docs/era40-ai/prototypes/014-route-transitions/` — HTML/CSS/JS prototyp, lokální read-only server, cílené browser QA, README a poctivá QA evidence.
- Tento report. Žádné produkční soubory ani závislosti.

## Co je implementováno
Modrá předávka s jedním kresleným tahem ∞, „40“ a „1987–2027“ během jedné sekundy. Navigace nečeká na efekt. Reduced = 160ms opacity; bez nativního API zůstává DOM/SVG fallback. Archiv ↔ detail používá jen sdílenou fotografii / fade. Prototyp má klávesnici, lokální historii, přednost poslední navigace a scrubber pro vizuální kontrolu.

## Technická rozhodnutí
- Produkční router i nativní ViewTransition má dál vlastnit Next/React. Žádný ruční startViewTransition vedle React SharedPhoto. Vanilla API je pouze v izolovaném prototypu.
- SVG/DOM je dostačující; druhý canvas ani nová knihovna nejsou potřeba.
- Jedna sekunda je vizuální návrh dle P3. Plocha nesmí být loader ani zámek navigace. Generační guard brání staršímu native callbacku přepsat poslední volbu.
- Referenci Inkwell jsem skutečně otevřel a posoudil ve dvou kompozicích; přenáší se kontinuita motivu, nikoli její design.

## Testy a výsledky
Testovaná revize: pracovní strom nad `ea9444c`; po hlavní matici doplněn pouze statický noscript fallback a ověřen samostatně. Server http://127.0.0.1:3073/ .

| Příkaz / kontrola | Exit | Stav | Poznámka |
|---|---|---|---|
| `node --check …/scene.js` | 0 | prošlo | syntax |
| `ERA40_QA_PACKAGE=… node …/qa.mjs` | 0 | prošlo | 18/18 viewport/reduced kombinací; 5 skutečných interakčních kontrol |
| cílené no-JS a OS preference QA | 0 | prošlo | statické vysvětlení, zrušení po matchMedia eventu |
| první kontrola ihned po CDP emulateMedia | 1 | selhalo | test kontroloval stav před doručením události; napraveno čekáním na skutečný handler |
| výchozí Playwright launch / volitelný video pokus | 1 / 1 | blokováno prostředím | chybí bundled Chromium / ffmpeg; Chrome a screenshoty fungují |
| CLI wrapper | 130 | ukončeno | síťový pokus; použita existující lokální knihovna |
| build/lint/typecheck aplikace | — | nespuštěno | žádná runtime změna, build/restart vlastní Claude |

## Screenshoty
Prohlédnuté 390×844 a 1440×900: `/private/tmp/era40-p3-qa/390-transition-50.png`, `1440-transition-50.png`, mobilní 25/80 % a reduced/fallback. Plné důkazy a meze: `prototypes/014-route-transitions/QA.md`.

## Známé nedostatky
Prototyp simuluje routy přes query, neověřuje App Router ani React. Fyzický mobil, produkční INP a skutečný SharedPhoto vyžadují integrační QA. Jemnost linky na mobilu ponechána k vizuálnímu schválení. Výslovný souhlas se specifikací a integrací dosud není udělen; main se nemění.

## Doporučený další krok
Claude review prototypu/spec 014. Jakub schválí konkrétní provedení a integraci. Poté malý oddělený implementační brief pro `components/transitions/**`; jediný mount v `app/layout.tsx` zapojí Claude, nebo jej výslovně uvolní. Každou přijatou a ověřenou dávku teprve potom do main.
