# Report CDX-008 — obraz, čitelnost a interaktivní mapa

## Výchozí stav a výsledek

Hlavní checkout `/Users/jakubhrncir/ERA40`, main. Výchozí runtime `3ef0455`, koordinace před dokončením `1747dd7`. Výsledný commit **c2a12d4589c622c6bb716397a2fb1bd393db237b**. Výslovný release všech runtime souborů, buildu a portů provedl Claude v `d600d0f`; Codex jej převzal18:58. Žádný paralelní zapisovatel runtime ani další agent.

## Co se změnilo a proč

- Fotografie, hero film, historické karty, archiv, rail, mapa, dialog i detail jsou bez opakovaných „Ilustrační snímek/video“ overlay. Smazány nepoužívané FictionBadge/IllustrativeLabel. Modelovost vysvětluje obyčejný text přehledu, samostatných kapitol04/05/06/07/08 a detailu/dialogu. Skutečné zdroje, metadata a kredity zůstávají; nový odkaz v patičce vede k přehledu původu.
- `ContentNote.*`, `StoryLabel.tsx`, stránky `/placeholders`, `/pribehy` a detail: zdroj se nevydává za ověřeného účastníka. Seznam modelových jmen na informační stránce vzniká z obsahu. Opraven neaktuální slib stažení zapsaného příběhu; formulář ve skutečnosti ukládá zprávy pro tým.
- `EuropeMap.*`, `MapLand.tsx`, `rebuild-vector-assets.mjs` a `europe-land-blue.svg`: plná Erasmus+ modrá kapitola, tmavší geografické pole, bílé linky/popisky s kontrastním obrysem a žlutá vybraná stanice. Předchozí/další trasa dovolí procházet příběhy bez otevření dialogu. Existující 1,4s kreslení linky a bodu reaguje na volbu; žádný nový pin, canvas nebo runtime balíček.
- `JourneySequence.tsx`: opakovaný refresh stejné stanice už nepřepíše ruční volbu mapy. Změna skutečné stanice znovu propojí rail a mapu. Odstraněné photo-label refs se nezapojují do per-frame geometrie; předávky03→04,04→05,06→07 zůstávají.
- Hero má CTA **Objev příběhy**, bez bezúčelné magnetiky. Z interních CTA zmizela ↗; směry, ovládací šipky a externí zdroje zůstávají. Interní zbytek „Tohle jsou lidé, ne doprava“ nahradil text „Každý přiveze něco jiného“.
- Archivní karty a miniatury nenajíždějí jednotně ze48/24px. Detail nemá blur odstavců ani ztlumená slova citace. Zachován pohyb fotografie, kreslená trasa, směrový přechod dalšího příběhu, SharedPhoto, WebGL hover a uživatelem vyvolané filtrování.
- `docs/research/ai-design-2026-11-15/`: stažený67bodový komunitní katalog, MIT licence, URL a ověřené SHA256, vlastní audit opřený o konkrétní soubory. Fórum a katalog jsou podklady, ne spouštěný skill ani klasifikátor autorství jednotlivých AI.
- `015-map-camera/`: skutečné projektové souřadnice a projekce, opt-in450ms kamera do1,6×. Ověřeno, ale **zůstává jen v prototypu**: plná mapa lépe ukazuje evropské vazby. GPU ribbon/Blender nyní odloženy.
- PRO_JAKUBA, master synthesis, DESIGN, AGENTS, MOTION a decision-log sjednoceny s delegací. Stávající jediný heartbeat aktualizován, žádný nový časovač. D022 pevný rok i D007 presety jsou dřívější Claudovy výsledky, nikoliv tato implementace.

## Ověření

Testovaná revize: pracovní strom odpovídající **c2a12d4**. Po buildu pouze formátování pěti JSX podmínek; přesná shoda emitovaného JavaScriptu před/po ověřena přes TypeScript transpileModule. Závěrečný lint/typecheck znovu exit0.

Produkce `http://127.0.0.1:3000`, dev pro debug rozsahy handoffs `http://127.0.0.1:3040`, izolovaný prototyp `http://127.0.0.1:3074`. Prostředí: `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers`, `AXE_SCRIPT=/private/tmp/era40-qa-tools/node_modules/axe-core/axe.min.js`. Kontakty vždy blokovány nebo mockovány.

| Příkaz z web/ (není-li uvedeno jinak) | Exit | Výsledek |
|---|---|---|
| `npm run lint` | 0 | čisté |
| `npm run typecheck` | 0 | čisté |
| `npm run build` | 0 | všech22 stránek, následně jeden vlastněný restart :3000 |
| `node scripts/qa-editorial.mjs --out /private/tmp/era40-cdx-008-final/editorial` | 0 | 8/8:360/390/430/1440 × normal/reduced; next/prev, Enter, focus, dialog/Escape/return focus, archive/detail/provenance, žádné photo badges; axe0, overflow0, pageerror0 |
| `node scripts/qa-checks.mjs --url http://127.0.0.1:3000 --out /private/tmp/era40-cdx-008-final/checks` | 0 | 15/15, klávesnice, skip link, scény a axe |
| `node scripts/qa-impact.mjs --url http://127.0.0.1:3000 --out /private/tmp/era40-cdx-008-final/impact` | 0 | 3/3:1440/390/360, všech5 oblastí, manuální dělič, filtry/Back/reset, axe0 |
| `node scripts/qa-handoffs.mjs --url http://127.0.0.1:3040 --out /private/tmp/era40-cdx-008-final/handoffs` | 0 | 6/6: forward/reverse, rychlý návrat, resize, live reduced, kotvy/Back, chyby0 |
| `node scripts/qa-route-transition.mjs --url http://127.0.0.1:3000 --out /private/tmp/era40-cdx-008-final/route` | 0 | 18/18 +8 kontrol: skutečné Next přechody, SharedPhoto, reduced/menu, fallback, no-JS, resize; chyby0 |
| `node scripts/qa-viewports.mjs --url http://127.0.0.1:3000 --widths 360,390,375,768,1024,1280,1440,1920 --out /private/tmp/era40-cdx-008-final/viewports` | 0 | 16/16: vpřed/zpět/rychlý scroll, console0, pageerror0, overflow0 |
| z root: `node docs/era40-ai/prototypes/015-map-camera/build.mjs` a `qa.mjs` | 0 | 8kombinací/64výběrů, oba konce uvnitř, ≤1,6×, reset, resize, klávesnice, errors/overflow0 |
| `git diff --check`, ověření stažených hashů | 0 | bez whitespace chyb, katalog/licence beze změny |

**Počáteční selhání nezamlčeno:** první cílený běh objevil přepsání ručního výběru na desktopu. Nový editorial test dále správně selhal na kontrastu: citace s opacity0,14 měla1,27:1, miniatury archivu měly dočasně slabý kontrast při stripIn. Příčiny odstraněny a celý finální běh opakován až poté. Nešlo o přebarvení textu přes špatně vybranou fotografii.

**Lokální výkon:** `/private/tmp/era40-cdx-008-perf.mjs`, exit0. Chromium bez síťového/CPU throttlingu a s teplou cache:390 LCP144ms/CLS0,1440 LCP88ms/CLS0,00484; při výběru mapy109rAF vzorků za1,8s ≈60fps. Jde o lokální orientační měření, nikoliv mobilní síť či provozní Core Web Vitals.

## Skutečně prohlédnuté screenshoty

Základ `/private/tmp/era40-cdx-008-final/`:
- `editorial/390-normal-archive.png`: text a fotografie bez překryvných badge, modelový původ je v úvodu.
- `editorial/1440-normal-map.png`, `editorial/390-reduced-map.png`: kontrastní modré plochy, čitelná geografie, dotykové cíle/focus, všechny trasy ve výřezu.
- `editorial/390-reduced-detail.png`: fotografie, jméno, nativní předchozí/další, žádné photo labels.
- `handoffs/1440-history-down-50.jpg`, `handoffs/1440-axis-down-75.jpg`: čisté předání fotografie a pokračování osy. `numbers-title.png`: nadpis po dokončení čitelný celý, bez ořezu.
- `/private/tmp/era40-camera-015-qa/1440-camera.png`, `390-normal.png`: opt-in kamera a mobilní přehled.

## Omezení a další krok

Vlastní review provádí Codex po výslovném release; nejde o nezávislou revizi. Skutečný telefon, Safari, GPU teploty a provozní INP nebyly měřeny. Axe má vedle nulových violations také položky incomplete u médií/kontrastu/ARIA; automatický průchod není certifikace WCAG. Vizuálně zkontrolované snímky jsou uvedené výše.

Postavy a citace zůstávají modelové, obraz je licencovaný doprovod. Skutečné materiály, souhlasy a oficiální výroční identitu musí dodat DZS. Soukromé přepisy a `web/data` nejsou v indexu. Veřejné nasazení neproběhlo. Aktuální další krok je obsah DZS a zpětná vazba nad ověřeným náhledem; nepřidávat další generické efekty jen kvůli pohybu.
