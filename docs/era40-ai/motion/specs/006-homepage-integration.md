# 006 — Produkční předávka Příběhy → Evropa

Stav: **hotovo, ověřeno 14. 11. 2026** (dokončil Claude po Codexově rozpracované verzi). Původně: realizace v autorizovaném směru 005 podle Jakubova pokynu pokračovat na homepage i podstránkách a průběžně pushovat ověřené dávky do main.

## Integrační rozhodnutí

- Osm kapitol i jejich kotvy zůstávají. Nový společný koordinátor obalí jen existující příběhy a mapu; zeměpisný podklad zůstává serverovým obsahem předaným jako children.
- Mapa převezme poslední viditelný příběh z railu. Nativní mobilní swipe předá stejný výběr. Kliknutí/fokus/hover na mapě zůstává ruční volbou.
- Desktopová předávka používá poslední skutečný snímek. V aktuálním pořadí jsou to Lucie a Marta / Bologna, nikoli návrat k první Tereze. Přelet proběhne mezi odchodem existujícího pinu a usazením mapy, bez nového pinu a bez přidané výšky.
- Jeden neinteraktivní DOM vizuál po dobu předávky převezme fotografii, originály jsou pouze vizuálně skryté. Text a ovladače zůstávají původní. Existující WebGL renderer se po tuto dobu pozastaví. Poměr stran obrazu se nemění; ořez se interpoluje odděleně od rovnoměrné transformace fotografie.
- Po ruční změně osoby na mapě se zpětný sdílený přelet vynechá: nemá předstírat, že jiná osoba je poslední kartou railu. Při skutečném návratu do příběhů se převzetí výběru obnoví. To je deterministický fallback pro neodpovídající obrazy.
- Geometrie se přeměří při refresh/resize a načtení snímku, nikoli každým framem. Dekódovaný zdroj se převezme z už načteného Next obrázku. Bez načteného média zůstávají originály viditelné.
- Mobil, malá výška a omezený pohyb: bez přeletu, pouze návaznost stejné osoby. Klávesnice, modal, přímé #mapa, resize a návrat z podstránky se ověří v prohlížeči.

## Choreografie

Příběh stojí do konce railu. Během přirozeného odjezdu kapitoly 04 fotografie udrží pozornost a plynule změní rám do mapového panelu. Nová scéna získá kontext. Aktivní mapová cesta jednou projde od skutečného počátku k cíli, žlutý bod dojede do klidu. Návrat je přesná inverze, dokud čtenář ručně nezvolil jinou osobu.

Reference, původní prototyp, stavy a role: 005. Žádné nové závislosti, druhý Lenis ani druhý canvas. Soubory: `JourneySequence.*`, `PeopleStories.tsx`, `EuropeMap.*`, `distortion.ts`, `app/page.tsx`.

## Dokončení a ověření (Claude, 14. 11. 2026)

Opravy oproti rozpracované verzi:
- Koordinátor předávky se stavěl znovu při každé změně stanice railu (8× za průjezd). Na desktopu předává vždy poslední příběh railu, proto se trigger staví jednou (závisí jen na reduced motion a ruční volbě).
- Pin railu hlásil změnu osoby i mimo rail. Lenis při programovém skoku vyvolal falešný pár `onEnterBack` + `onLeave` a ten zrušil ruční volbu na mapě. Výběr nyní předává jen aktivní rail, `onEnterBack` jen při skutečné poloze uvnitř railu a `onLeave` jen když poslední stanice ještě nebyla předána (rychlý skok přes rail).
- Odstraněny ladicí atributy `data-journey-start/end/ready`.
- Přímé odkazy na kapitoly (`/#mapa`, `#tehdy-ted`, `#cisla`, `#budoucnost` …) dřív končily o tisíce px výš, protože prohlížeč skočil na kotvu před vložením pin-spacerů. `SmoothScroll` po každém refreshi ScrollTriggeru kotvu jednou dorovná, dokud čtenář sám nescrolluje. Chyba existovala před 006.

QA na produkčním buildu :3000:
- `qa-viewports` 6 šířek × normal/reduced: 0 chyb, 0 přetečení.
- `qa-checks` 15/15 (klávesnice, axe).
- Cílený test předávky 5× za sebou bez chyby: před/během (0,25/0,5/0,75)/po, návrat, ruční výběr bez přeletu, obnovení po návratu do railu, resize, mobil bez přeletu s návazností osoby, reduced bez přeletu.
- Rychlý skok z prostředku railu na mapu převezme poslední osobu.
- Přímé kotvy 6 kapitol × 1440/1280/390/reduced: odsazení 0 px.

Známé drobnosti: v ~75 % přeletu fotografie krátce překryje druhý řádek podtitulku mapy. Šedý tvar u levého okraje mapy je oříznutý východní cíp Islandu, ne chyba.
