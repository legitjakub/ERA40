# Vizuální revize izolovaného návrhu 005

14. 11. 2026 · Codex · Playwright / Chromium · http://127.0.0.1:3070.

**Výsledek:** izolovaný prototyp je připraven k posouzení směru a kompozice. Nejde o QA hotové produkční integrace.

| Kontrola | Výsledek / rozsah |
|---|---|
| Šířky 1440, 1280, 1024, 390, 375, 360 px | Bez chyb JavaScriptu a vodorovného přetoku. Výška desktopu 900 px, mobilu 844 px. |
| Vizuální průchod | Prohlédnuty skutečné snímky, včetně 1440 × 900 a 390 × 844, výchozího rámu, mezisnímku, mapy a mobilního zjednodušení. Vybrané další snímky při 1280, 1024, 375 a 360 px také prohlédnuty. |
| Průběh vpřed / zpět | 0, .25, .52, .75, 1, .52, 0; snímky a stavy uložené. Návrat kolečkem snižuje průběh, rychlý scroll dokončí scénu. |
| Přehrání, pauza, dokončení | Jednorázové přehrání se dostalo do mezistavu, pauza jej držela v toleranci .001 průběhu, pokračování skončilo na 1. Žádný autoplay při otevření. |
| Klávesnice | Nativní range přes Home a ArrowRight při všech šířkách. Tlačítka mají fokus a přístupné názvy; nejsou závislá na hoveru. |
| Omezený pohyb | OS emulace při všech šířkách: p=.25 ukáže hotový začátek, p=.75 hotový konec; žádný mezilehlý přelet. |
| Mobil | Přepnutí tlačítkem ukáže mapu a zpět příběh, bez scroll pinu. Dotykové gesto stránky není přebíráno. |
| Příchozí / odchozí směr | Tereza: Olomouc → Valencie. Inês: Lisabon → Praha. Viditelné popisky odpovídají souřadnicím a cílovému bodu. |
| Resize | Přestavba geometrie při 1440 → 1280 zachovala ustálený průběh; samostatný pokus .520396 → .520396. Také po předchozím rychlém scrollu se před/po resize shodovalo .809285. Během dobíhajícího nativního kolečka nepředpokládáme pevný průběh. |
| Axe | Výchozí a koncová kompozice při 1440 a 390 px, WCAG 2 A/AA, 2.1 AA, 2.2 AA: 0 nalezených porušení. Nejde o plný audit přístupnosti. |
| Lokální server | Cesty mimo explicitní allowlist vracejí 404, včetně kontaktní cesty, průchodu nad kořen, neznámého média a serverového skriptu. Žádný formulář se neodesílal. |
| Syntax | `node --check scene.js`, Python AST parse `serve.py`: OK. |
| Produkční baseline | SHA-256 shoda všech 86 předem evidovaných souborů `web/src` a package souborů. Žádné produkční komponenty ani runtime závislosti se nezměnily. |

## Refinement po první vizuální kontrole

1. Původní mezisnímek měl slabý kontrast nadpisu mapy. Podklad se nyní dokončí dříve a nadpis má vlastní čitelnou fázi ještě během pohybu fotografie.
2. Na mobilu protínala původní spodní linka poslední řádek citace. Ve výchozí mobilní kompozici je linka skrytá; finální mapová trasa zůstává.
3. Popsání snímku má vlastní geometrii a nezmenšuje se spolu s fotografií na nečitelnou velikost.
4. Oddělena obsluha scrollu a resize, reset transformace mapy před měřením a zachování průběhu při přestavbě geometrie.
5. Neaktivní textová kompozice je pro čtečku skrytá, aby se stejná citace nečetla dvakrát. Ovladač po mobilním přepnutí správně nabízí návrat k příběhu.

## Důkazy

Snímky a strojové výsledky jsou v `qa/`: `1440-0.jpg`, `1440-0.52.jpg`, `1440-1.jpg`, odpovídající mobilní a další šířky, `observations.json`, `interactions.json`, `source-verification.json`. Výchozí snímky současné homepage jsou v `qa/baseline/`; čísla na nich mohou být uprostřed existujícího dopočítávání, nejsou novým ověřením hodnot.

## Co zatím není ověřeno

- Předání fotografie mezi skutečnými React komponentami, odpojení existující WebGL distorze, konec railu a počáteční výběr mapy.
- Produkční kotvy, přepočet ScrollTrigger spacerů, deep link na mapu, Back/Forward a návrat z detailu v kombinaci s novým efektem.
- Fyzický telefon, Safari a produkční GPU / fps / LCP / CLS. Viewport emulace není skutečný telefon a nepředstavuje měření výkonu zařízení.
- Nový Next build, lint ani typecheck produkce se v tomto návrhovém kole nespouštěly: nezasahovalo se do Next aplikace ani závislostí. Předmětem kontroly je samostatný HTML/CSS/JS prototyp; produkční build a kompletní QA budou povinné při schválené integraci.

Produkční server :3000 nebyl restartován, kontaktní data nebyla čtena ani měněna a práce nebyla pushnuta ani nasazena.
