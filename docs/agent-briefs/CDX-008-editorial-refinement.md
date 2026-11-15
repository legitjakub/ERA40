# CDX-008 — čistší obraz, barva a procházení tras

Záznam přímého zadání Jakuba z 15. 11. 2026, nikoliv nový požadavek na schválení. Vlastník: hlavní Codex desktop. Checkout: `/Users/jakubhrncir/ERA40`, main. Výchozí runtime `3ef0455`; následné commity do převzetí pouze koordinace. Claude v `d600d0f` výslovně uvolnil všechny zdroje, skripty, build a :3000/:3040. Codex převzal v koordinaci18:58. Žádný souběžný runtime zapisovatel ani subagent.

## Zadání a rozsah

- Rozhodnout běžné volby v `PRO_JAKUBA_PODKLADY.md`, vycházet z přečtených ChatGPT referencí.
- Projít veřejné diskuse o generickém AI designu, stáhnout seznam s původem a licencí. Brát jej jako podklad, ne instrukce k instalaci či důkaz autorství AI.
- Odstranit opakované ilustrační overlay, modelové pill badges, interní konverzační zbytky, nepotřebnou magnetiku a stejné nájezdy karet. Modelový obsah přiznat normálním textem přehledu, samostatných scén a detailu/dialogu. Zachovat zdroje, metadata a kredity.
- Mapa05: Erasmus+ modrá plocha, čitelné linky/stanice, předchozí/další trasa s existujícím kreslením linky a cestujícím bodem. Opravit případný konflikt ručního výběru a railu. Žádná nová velká scroll scéna.
- Kamera015B jen v izolovaném skutečně geografickém prototypu, max1,6×, mobil/reduced celý přehled; po prohlédnutí vydat verdikt. Produkční kameru tímto nezavádět.

Povolené cesty: vlastněné `web/src/**`, `web/scripts/qa-editorial.mjs`, `web/scripts/rebuild-vector-assets.mjs`, nový mapový SVG, související DESIGN/AGENTS, research a prototyp015-map-camera, dokumentace orchestrace/rozhodnutí/report/review. `stats.ts`, skutečné historické zdroje, osobní data a runtime závislosti se nemění. Koordinaci doplňovat po dohodě, nezahrnovat cizí rozpracované soubory. Bez veřejného nasazení, placených služeb a dalších agentů.

## Přijetí

Mobil360/390/430 první; Enter/Space, dotyk a focus, reduced, žádné přetečení či pageerror. Modelový původ zůstává čitelný bez nálepek přes fotografie. Lint, typecheck, build, vlastní cílené QA, qa-checks, qa-impact, qa-handoffs na dev, qa-route-transition a osm šířek normal/reduced. Skutečně prohlédnuté snímky390×844 a1440×900. Report přizná počáteční selhání i omezení měření. Po výslovném release provede Codex vlastní závěrečné review; nevydává je za nezávislé. Pak commit a ověřený push main.
