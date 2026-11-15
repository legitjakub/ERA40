# 015: Interactive Assets v1 (40 let na lince, kamera mapy)

**Stav: A HOTOVO v produkci** (schváleno Jakubem 15. 11. 2026 „Yes, integrate“). **B (kamera mapy) zůstává NÁVRH.**

## 0. Výchozí stav, ověřený v kódu (ne podle reportů)

- **Větev a vlastnictví:** `main`, čistý strom (kromě zápisu schválení 3.1 ve spec 012). Codex od 13:11 nemá rezervaci produkčních souborů, build a porty drží Claude.
- **Dodané soubory chybí.** `assets/era40-40-year-marks.svg` ani `prototypes/route-camera-prototype.html` nejsou v repozitáři, v jiné větvi, v Downloads ani jinde na disku (prohledáno git i Spotlight). Audit proto vychází ze zadání a ze skutečného kódu. **Před prototypem jsou soubory potřeba.**
- **Historie (`HistoryTimeline.tsx`):**
  - jeden pin 250 vh, jedna timeline, desktop ≥ 1024 × 620,
  - linka EU se kreslí od 1987, česká linka se přibližuje a v 1998 se napojí 9 px nad EU kolej, 2004 přepne pozadí na modré,
  - 7 stanic (1987, 1998, 2004, 2007, 2014, 2021, 2027) je **rozmístěno rovnoměrně**, ne podle času. Úsek 1987–1998 (11 let) má stejnou šířku jako 2004–2007 (3 roky),
  - mobil a reduced: statický seznam bez linky.
- **Mapa (`EuropeMap.tsx`):**
  - pevný viewBox 840 × 870 (Natural Earth, rovnoběžkové zobrazení),
  - trasy příběhů se kreslí scrubem, výběr města nakreslí aktivní trasu s cestujícím bodem (jednou),
  - tap cíle jsou počítané z `--map-unit` (poměr viewBox ↔ CSS px), seznam tlačítek pod mapou.
- **Už existuje „kamera“:** `RouteMap.tsx` v detailu příběhu ořízne mapu na rámeček 4:3 kolem jedné trasy a trasu kreslí scrollem (P1).
- **Spec 014 / D-018:** route přechod mezi stránkami ukazuje ∞ s „40 / 1987–2027“. Je to jediné místo s ∞, nesmí se zdvojit.
- **Kreativní jazyk** (`motion/creative-language.md`) už oba nápady obsahuje:
  - **pražcová osa 40 let v Historii (P1, nerealizováno),**
  - **„kamera jede po Trase“ na mapě (kandidát na signature, nerealizováno).**

## 1. Audit

| | Asset A: 40 značek let | Asset B: kamera mapy |
|---|---|---|
| **Co existuje** | Dvě linie, napojení 1998, přepnutí 2004, rok se počítá ve velkém čísle | Výběr trasy, kreslení, cestující bod. Ořez kolem trasy je v detailu příběhu. |
| **Co chybí** | Číslo 40 v Historii není vidět jako *čas*, jen jako rozpětí. Linka nemá měřítko let. | Na mapě není vidět, *kudy* cesta vede v detailu. Krátké trasy (Brno → Lipsko) jsou malé. |
| **Duplicita** | Žádná. 014 ukazuje 40 jako symbol na 1 s, A ho ukáže jako 40 skutečných let. Tím se motiv vysvětlí, ne zopakuje. | **Ano:** detail příběhu (`RouteMap`) už „kamerou“ je. Velká kamera na homepage by to zdvojila. |
| **Skutečné zlepšení** | Ano, pokud se linka zároveň stane **časově věrnou** (viz 2.1). Jinak 40 rovnoměrných značek na nerovnoměrné ose lže. | Malé: jemný zoom k vybrané trase na desktopu. Hlavní riziko je ztráta přehledu a rozbité tap cíle. |
| **Zamítnout** | Velké „40“ v Historii, animace každé značky, druhý pin nebo trigger. | Automatickou jízdu kamery, kameru na mobilu, kopii schematické trasy z prototypu, zoom nad ~1,6× (zmizí Česko nebo cíl). |

## 2. Návrh

### 2.1 A: 40 let na lince Historie (doporučeno, P1)

**Narativní účel:** čtenář *vidí*, že 40 let je 40 dílků jedné cesty. Česko se připojí u 11. značky (1998) a od té doby jede vedle.

**Klíčová změna:** stanice na lince se rozmístí **podle let**, ne rovnoměrně: 1987 = 0 %, 1998 = 27,5 %, 2004 = 42,5 %, 2007 = 50 %, 2014 = 67,5 %, 2021 = 85 %, 2027 = 100 %. Jen tak mají značky stejný rozestup a 1998 sedí přesně na 11. značce.
- Stanice 2004 a 2007 jsou na 1024 px asi 70 px od sebe, tlačítka 44 px se vejdou.
- Kreslení linky a počítání roku se svážou: délka nakreslené linky = aktuální rok (místo rovnoměrně po stanicích). Roky tak „jedou“ po skutečném měřítku.

**Značky:**
- 40 krátkých svislých čárek (1988–2027) pod linkou EU, 1 px, `--c-line` na světlém, 25 % bílé na modrém (po 2004).
- Projeté roky přejdou do plné barvy linky. **Žádný nový trigger:** stav se počítá ve stávajícím `apply()` ze stejné `time.position`.
- Každá 10. značka (1997, 2007, 2017, 2027) je o 3 px delší. Bez čísel, roky nese velké číslo a stanice.
- 2004 zůstává samostatná stanice a přepíná pozadí.

**Stavy:**
- **INITIAL:** značky viditelné šedě (SSR), linka nekreslená.
- **INTRO:** se scrubem pinu se značky postupně „projíždějí“.
- **INTERACTION:** klik nebo klávesa na stanici skočí jako dnes, značky se dopočítají.
- **OUTRO:** v 2027 jsou všechny značky plné a předávka 008A do Příběhů beze změny.
- **REVERSE:** přesná inverze (scrub).
- **MOBIL:** statický seznam dostane nahoře nízký proužek 40 značek s vyznačeným 1998 a 2004, bez animace.
- **REDUCED:** totéž co mobil, koncový stav.

**Riziko:** `qa-handoffs` 03 → 04 (008A) a výpočet `czStart`/`dock` se musí přepočítat na časové měřítko.

### 2.2 B: kamera mapy (doporučeno jen omezeně, P3, nejdřív izolovaný prototyp)

**Narativní účel:** po výběru města se pohled jemně přiblíží k trase, aby byla krátká cesta čitelná, a Evropa přitom zůstane v orientaci.

- **Pravidla:**
  - jen desktop ≥ 1024 s myší, jen po výběru čtenářem (žádná autonomní jízda),
  - viewBox se tweenuje na rámeček trasy + 35 % okraj, s **maximálním zoomem 1,6×**. Rámeček vždy obsahuje Česko i cíl, sever nahoře, bez rotace,
  - po 1,4 s nebo při odjezdu ze sekce se kamera vrátí na přehled,
  - tlačítka měst a seznam zůstávají a `--map-unit` se přepočítá z aktuálního viewBox, aby tap cíle zůstaly ≥ 44 px.
- **Mobil:** vždy celá mapa. **Reduced:** celá mapa a okamžité zvýraznění trasy.
- **Kritérium zamítnutí:** pokud v prototypu zoom zakryje jiná města nebo zhorší orientaci (test: „ukaž Česko“ do 2 s), funkce se zamítne. Detail příběhu už ořez má.

### 2.3 Co se nedělá
- Žádný nový canvas, žádné Three.js, OGL, Rive ani Lottie, žádný druhý smooth scroll.
- Žádné další ∞ mimo spec 014. Velké „40“ jen v přechodu 014.
- Žádné nové piny.

## 3. Postup
1. **Jakub dodá soubory** asset balíčku (SVG + HTML prototyp), aby šlo porovnat jejich hierarchii.
2. Izolovaný prototyp A v `docs/era40-ai/prototypes/015-forty-years/`: časové měřítko, 40 značek, 1998/2004. Screenshoty 1440 a 390.
3. Jakubovo schválení A (a rozhodnutí, zda vůbec B).
4. Produkce A v `HistoryTimeline` → QA na 8 šířkách, normal i reduced, klávesnice, `qa-handoffs`, reverse scroll.
5. B jen jako prototyp, do produkce až po schválení a splnění kritéria.
