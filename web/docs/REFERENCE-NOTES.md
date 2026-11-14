# Reference a výsledná choreografie

Ověřování proběhlo 13. listopadu 2026 v Chromium přes Playwright. Zachycen byl vstup, dvě skutečné události kolečka, další čekání na vstupní sekvence a druhý pokus u pomalu načítaných webů. Screenshoty a nezkrácené pozorování jsou v `../qa/live-references/`. Změna `scrollY` sama o sobě neprokazuje ani nevyvrací pohyb ve WebGL.

| Referenční web a stav | Konkrétní princip | Co funguje | Použití v ERA40 | Implementace |
|---|---|---|---|---|
| [Tracing Art](https://www.getty.edu/tracingart/), živě proscrollováno | Obraz zůstává středem scény, okolní díla a popisky se přeskupují | Čtenář drží kontext při změně historického období | Historie s proměnou roku, fotografie a popisku | Seřazené ScrollTrigger piny, označená timeline, změna aktivního milníku |
| Tracing Art, živě proscrollováno | Rok a ukazatel postupu doplňují scénu | Orientace zabírá málo místa | Index osmi kapitol a přímá volba milníku | Stav kapitoly podle polohy, nativní dialog, SVG linka |
| [Savor](https://www.savor.it/), živě proscrollováno | Velká textová kompozice přechází do makrozáběru přes celou plochu | Změna měřítka vytváří filmový střih | Úvodní film se promění v obraz s rámem | Scrubbed scale a inset maska, text odchází před vytvořením bílého rámu |
| [Lando Norris](https://landonorris.com/), živě proscrollováno | Po fotografickém úvodu následuje výrazný typografický statement | Obraz a text mají vlastní fázi | Dvouřádkový hero titulek a prolog | Maskované řádky, jemná animace os Roboto Flex, čtení slov podle scrollu |
| Lando Norris, živě proscrollováno | Zůstává dostupná malá navigace při změnách scény | Silná obrazová kompozice zachovává orientaci | Záhlaví s kapitolami, návrat při scrollu nahoru a při fokusu | Fixní záhlaví, nativní dialog, odkazy na existující kotvy |
| [Inkwell](https://inkwell.tech/), živá vizuální změna ověřena | Rozptýlené obrazové fragmenty se skládají do kruhové kompozice, mění se označení kapitoly | Jedna scéna může plynule přejít do další při zachování motivu | Trasa mění roli mezi filmem, časem, lidmi a mapou | DOM/SVG, sekční timelines, jeden Lenis na desktopu |
| [Pangram Pangram](https://pangrampangram.com/), proscrollováno | Typografické vzorky, velká písmena a stálé záhlaví katalogu | Písmo vytváří hierarchii bez další grafické vrstvy | Proměnné šířky roku a titulku | Vlastní lokální Roboto Flex, osy `wdth` a `wght`; samotná kinetická animace je řešením ERA40 |
| [Paper Planes](https://paperplanes.world/), omezené ověření vstupu | Úvod vybízí k házení a chytání letadel pomocí telefonu | Cestování má osobní, srozumitelný motiv | Propojení destinace s konkrétním člověkem | SVG trasy podle souřadnic, body a seznam otevírají společný detail |
| [Unseen](https://unseen.co/), ověřen vstup | Vstupní obrazovka odděluje vstup se zvukem a bez něj | Zvuk patří pod kontrolu návštěvníka | Film lze pozastavit a při omezení pohybu ručně přehrát | Nativní video a vlastní dostupná tlačítka; výsledný střih je tichý |
| [Zentry](https://zentry.com/), načítací obrazovka | Dřívější podklady projektu navrhují přechody deformací obrazu | Jemné zkreslení může spojit dvě fotografické scény | Vybraná desktopová scéna příběhů | Jeden odložený WebGL canvas, síla odvozená od rychlosti scrollu, HTML fotografie pod ním |

## Limity ověření

- U Inkwell zůstalo nativní `scrollY` nulové, přesto se vizuálně proměnila kompozice a aktivní štítek INTRO/VISION. Pozorování nezjišťuje interní technologii autora.
- U Paper Planes byl dostupný výše popsaný vstup. Házení letadel ani globální komunitní funkce tímto průchodem ověřeny nebyly.
- U Unseen byl zachycen vstup s volbou zvuku. Další prostorový průchod zde nebyl ověřen.
- Zentry v obou pokusech ukázal loader. Jeho aktuální portal/shader animace nejsou doložené těmito snímky. Jemný shader ERA40 je vlastní implementace na základě dřívějšího kreativního zadání.
- Prometheus, Into the Arctic, Xbox Museum a historické Cartier experience zůstávají archivní inspirací z původní dokumentace. Nebyly označeny jako nyní vyzkoušené živé scény.

## Pohyb po kapitolách

- **Hero** používá přehrávaný film, odhalení titulku, proměnné písmo a postupný přechod do rámu. Desktopový pin trvá 150 výšek viewportu v procentech. Mobil má vlastní vertikální střih a volný scroll.
- **Prolog** postupně zvýrazňuje slova. Výchozí kontrast slov byl zvýšen na 58 % inkoustové barvy, aby zůstala čitelná i před aktivací. Přechod obsahuje 88 snímků z okna vlaku v jedenácti postupně načítaných spritech.
- **Historie** propojí českou linku s evropskou, promění rok a odhaluje nové fotografie s popisky. Pin má 250 vh. Na telefonu a při omezení pohybu je kompletní svislá osa.
- **Příběhy** mají desktopový horizontální rail a maskované přechody fotografií. Dotyková varianta využívá nativní vodorovný swipe. Při omezení pohybu se všechny příběhy skládají pod sebe. Detail se otevírá z fotografie pomocí GSAP Flip.
- **Evropa** kreslí cesty podle souřadnic, zvýrazňuje zvolenou destinaci a propojuje ji se stejným detailem příběhu jako galerie.
- **Tehdy a teď** používá sticky porovnání. Po ručním zásahu zůstává poloha dělicí čáry pod kontrolou návštěvníka.
- **Čísla** přehrají počítání jednou při vstupu a kreslí sektorové pruhy podle průchodu kapitolou.
- **Budoucnost** uzavře motiv cesty otevřenou SVG linkou. Odhalení řádků doplní možnost zapsat a stáhnout vlastní vzpomínku.

## Společné chování

Piny vznikají v pořadí hero, historie, příběhy. Rozměry se obnoví po načtení písem. Všechny scrubbed scény fungují při návratu zpět. Lenis, Flip a WebGL mají cleanup. WebGL se načte jen poblíž galerie na desktopu s jemným ukazatelem a uvolní textury, buffery i program při opuštění scény. Při omezení pohybu zůstává obsah čitelný a film má statický poster.

Plošné ztmavení filmu má 60 %, aby bílé drobné texty zůstaly čitelné i na nejsvětlejším záběru balení kufru. Jde o vědomé upřednostnění kontrastu před původním rozsahem 35–55 % v art direction.
