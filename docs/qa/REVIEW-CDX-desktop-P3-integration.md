# Review P3 / 014 — finální integrace

15. 11. 2026 · **Vlastní kontrola hlavního Codexu**, který integraci napsal. Nejde o nezávislé review Clauda ani jiného agenta. Jakub výslovně určil práci pouze Codexu; rozpracovaná nezávislá kontrola byla na tento pokyn přerušena. Claude UI má 100 % limitu.

## Verdikt
**PŘIJATO** v rozsahu výslovně schválené specifikace 014 a následného konkrétního pokynu zesílit tah a doplnit efekt. Kontrola rozsahu, lifecycle a výsledků proběhla hlavním Codexem. Výsledný testovaný SHA je v reportu `docs/agent-reports/CDX-desktop-P3-integration.md`.

## Zjištění a vyřešené detaily

| Před | Po | Proč |
|---|---|---|
| Tah 2 px / 1,5 px | 5 px desktop / 3,75 px mobil | Přímý požadavek Jakuba, výraznější oblé smyčky. |
| Bez světelného čela | Krátký žlutý 2% úsek sleduje bílou kresbu, do 760 ms mizí | Podpůrný motiv pohybu po stejné Trase, bez další smyčky. |
| Původní normalizace SVG 1000 | Skutečná vykreslená délka měřená jednou při navigaci | Akcent při non-scaling-stroke na mobilu původně mizel. Po opravě prokázán screenshotem i 88 žlutými pixely na 390 a 314 na 1440. |
| Obecný resize by rušil i adresní řádek telefonu | Ruší se jen při změně šířky | Stejná mobilní animace funguje při změně výšky; změna orientace nezanechá chybnou křivku. |

- Router se nepřepisuje: žádný preventDefault/push/startViewTransition, fokus a scroll zůstávají aplikaci. Běžná routa je aktivní během plné předávky, nikoli až po ní.
- Query/hash/modified/download/target/externí odkazy nepouštějí novou plnou předávku. Archiv ↔ detail zůstává React SharedPhoto; fallback a detail ↔ detail mají krátký fade.
- OS i menu reduced ruší prostorový pohyb a všechny animace. Cleanup ruší všechny čtyři animace, deadline, root class i listenery; SSR obsah nezakrývá.
- Jediný SVG panel, bez nových závislostí, canvasu nebo rámové render smyčky. Šířka, glyphy ani layout se za běhu neanimují. Barvy a timing jsou z tokenů / schválené choreografie.
- Skutečné obrázky 1440×900 a 390×844 byly prohlédnuté, včetně reduced stavu. Finální testy: **18/18 viewport/reduced kombinací, 8/8 integračních kontrol, qa-checks 15/15**, lint, typy i build bez chyby. Původní integrace navíc prošla qa-impact (3 šířky) a qa-handoffs (6/6); beze změn jejich komponent.

## Meze
Fyzický telefon/FPS ani field INP nebyly ověřeny. Plná animace při každé běžné navigaci zůstává podle právě schváleného návrhu; případná změna četnosti je další řemeslná volba, nikoli neprovedená část tohoto zadání. Samostatné předané úkoly mobil 07/08 a loading overflow nejsou dokončením P3 prohlášeny za vyřešené.
