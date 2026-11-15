# ERA40 — Master Synthesis (společný zdroj pravdy)

15. 11. 2026, 16:45 · Claude (kreativní ředitel). HEAD na začátku práce `24ee4d6`.
Tento dokument **nic neimplementuje**. Sjednocuje znalosti z repozitáře, rozhodnutí, koordinace a ověřených referencí. Při rozporu platí pořadí: `decision-log.md` → `web/docs/DESIGN.md` → tento dokument → starší reporty.

**Co jsem neměl k dispozici (nevymýšlím):**
- **ChatGPT chaty:** *aktualizace 16:42.* Codex desktop k nim má přístup a 3 poslední projektové chaty přepsal do `docs/private/chatgpt/2026-11-15/` (mimo Git). Rozdíly jsou v `CHATGPT_CONTEXT_SYNC_2026-11-15.md`. Claude z nich přečetl Jakubovy vlastní požadavky a závěrečné souhrny. Původní, nejstarší master prompt v přepisech není.
- **Interactive Assets v1** existují jen jako ZIP ke stažení v chatu „Interaktivní prvky ERA40“, na disku nejsou. Podle přepisu má SVG 40 rovnoměrných značek 1988–2027 a rok 1998 na 11. značce, což odpovídá implementaci D-020. Soubory už nejsou blokující.
- **Higgsfield 3D Jutsu:** ověřený model neexistuje (timeout podle Jakubova shrnutí).

---

## 1. Executive Summary

ERA40 je funkční filmová digitální výstava (Next 16, React 19, GSAP 3.15, Lenis, jeden WebGL1 shader) o 8 kapitolách s jednotícím motivem **Trasy**: linka, která se vrací a pokračuje (směr A, D-016).
- Je hotová celá dějová osa: úvodní film → prolog s lidmi → Historie 1987–2027 → Příběhy → Mapa → Návrat → Rozvětvení → Pokračování.
- Hotové jsou také podstránky (archiv, detail, kvíz, zapojení, o projektu) a schválený globální přechod (014).

**Hlavní slabiny dnes:**
1. **Mobil není rovnocenný desktopu.** Hero má 88 svh místo plné scény, Historie je na mobilu 4 154 px dlouhý statický seznam a kamera, distorze a scrub běží jen na desktopu.
2. **Obraz je ilustrační stock.** Mobilní film je viditelně měkký (720p zdroje), lidé nejsou skuteční, příběhy jsou modelové.
3. **Identita výročí není potvrzená** (lockup, loga, povinné texty EU).

**Doporučení na další 2–3 dávky (detail v §16 a §18):**
- **P0 Mobil:** plnohodnotná scéna hera (100 svh, safe area) a **interaktivní Historie na mobilu** (swipe milníků synchronizovaný s pásem 40 let, bez pinu).
- **P1:** výměna stock obrazu za skutečné příběhy, jakmile je DZS dodá. Do té doby zkvalitnit mobilní film (1080p zdroje).
- **P2:** knihovna pohybových presetů (pevné API) a zjednodušení vícenásobných efektů tam, kde se překrývají.

Žádné nové knihovny (Three.js, R3F, Rive, Lottie, OGL) nejsou dnes potřeba. Kandidát na budoucí PoC je jen GPU ribbon Trasy, s DOM/SVG fallbackem.

---

## 2. Projektový kontext a strategie

- **Událost:** 40 let programu Erasmus (1987–2027), Česko od 1998. Vydavatel je DZS, hlavní identita je Erasmus+.
- **Insight DZS:** hodnota vzniká **po návratu a pokračuje dál**. ZÁŽITEK → ZKUŠENOST → ZMĚNA → DOPAD. Cílová skupina zahrnuje i lidi s „0 dní na Erasmu“: kvíz má cestu „nevyjel“ a prolog říká „i k lidem, kteří nikdy nevyjeli“.
- **Claim a signatura:**
  - claim „Některé cesty změní všechno.“ (D-002),
  - „Erasmus+ již 40 let mění životy“,
  - „Cesta končí. Zkušenost pokračuje.“,
  - název „Erasmus+ navždy“,
  - signatura „40 let Erasmu+ · 1987–2027 · v Česku od 1998“.
- **Integrita (závazné):** modelové příběhy a ilustrační fotky jsou viditelně označené. Žádná vymyšlená čísla dopadu, termíny akcí ani partneři. Data jen ze `src/content/stats.ts` se zdrojem DZS.

---

## 3. Přehled zjištění z dosavadních konverzací

| Téma | Kde vzniklo | Stav dnes |
|---|---|---|
| Úvod a film, claim | Claude, 11.–13. 11. | Schváleno (D-002). Film 15. 11. přestříhán (parta, studium, předání, bez vlaku). |
| Odjezdová tabule, 40 → ∞ brána, jízdenky, /oslava | 13.–14. 11. | **Odmítnuto** (D-004/005/006/009). |
| Znalostní báze, skilly, workflow se schválením | 14. 11. | Platí (D-010, D-011). |
| Podklady DZS (prezentace, brief, kvíz) | 14. 11. | Zpracováno do `docs/private/` (mimo Git), claim a kvíz (D-014). |
| Orchestrace Claude × Codex | 15. 11. | Platí (D-015). Codex v noci a odpoledne převzal P3 a mobil 07/08, Claude zbytek. |
| Tři kreativní směry A/B/C | 15. 11. | **Vybrán A** (D-016). |
| Spodní kapitoly 06–08 | 15. 11. | Hotovo (D-017, spec 009) a doladěno P2 0/5/6/7. |
| Globální přechod ∞ 40 / 1987–2027 | Codex, 15. 11. | Schváleno a implementováno (D-018, spec 014). |
| Vlaky pryč všude | Jakub 11:44 (přes Grok) | Hotovo (P0, `ecb91d1`), včetně filmu. |
| Brand zvýraznění slov | Jakub 11:44 | Hotovo (P0b, `.hl`/`.hl-dark`). |
| Detail příběhu „deep“, archiv, lidé místo dopravy | Jakub 11:36 | Hotovo (P1, P0). |
| Interactive Assets v1: A 40 let, B kamera mapy | Jakub 15:50 | A hotovo (D-020). B návrh. |
| 20 kreativních konceptů, Blender, Extrafazant | ChatGPT (nedostupné) | Jen ze shrnutí, viz §11 a §12. |
| „Tabaco/Tabasco“ | starší chat | **Vyřešeno:** jde o referenční web Tabasco (Hilo Studio), ne o font (§5). |

---

## 4. Source of Truth

| Stav | Položky |
|---|---|
| **Schváleno a hotovo (doplněno 16:42)** | P0 mobil: hero 100 svh, Historie „Swipe 40 let“ (D-021, `a7ee795`) · P1 film z originálů Pexels (`6738261`) · D-001 identita · D-002 úvod · D-003 podstránky navazují · 006 integrace · 007 dopad (filtr, příklady) · 008 předávky 03 → 04 a 06 → 07 · 009 spodní kapitoly · 012 / 3.3 střídavé spready · 014 přechod (D-018) · 015 A 40 let na lince (D-020) · P0, P0b, P1 (detail, archiv), P2 0/5/6/7 · N1–N12, T1–T5, R3–R12 · nové úvodní video |
| **Schváleno, nerealizováno** | 3.1 řada oken (D-019, cíl už plní 008A) |
| **Pouze návrh** | 001 gramatika Trasy (v praxi z velké části naplněna) · 002 obousměrné trasy (mapa už příjezdy má, upravit nebo zavřít) · 003 vazby 40 let (**nahrazuje 015 A**, zavřít) · 004 švy sekcí (částečně 008) · 015 B kamera mapy · GPU ribbon PoC 011 |
| **Odmítnuto** | tabule (D-004) · brána 40 → ∞ jako samostatný objekt (D-005) · jízdenky, vlaky, nádraží, okno vlaku (D-006, P0) · /oslava (D-009) · Animaxxing full treatment (D-008) · WebGL distorze děliče 06 (čitelnost) |
| **Otevřené** | D-007 easing · hero CTA „Objevovat“ vs „Objev“ · 015 B · loga a lockup od DZS · **mobilní interaktivita Příběhů a podstránek** (Jakub v chatu „Moderní řešení přechodů“: „příběhy… všechny sekce jsou hrozně statické… a všechny podstránky“) |
| **Neaktuální** | `MOTION.md` §4 (02 „sekvence z okna vlaku“, 07 „countery a scrub sloupců“) · `creative-language.md` tabulka (Prolog = okno vlaku, 01 „Odjezd“) · statický pás Historie jako finální řešení · hlavička 0xx specifikací 001–004 |
| **Rozporné (a rozhodnutí)** | `creative-language.md` „∞ se nekreslí doslova“ vs D-018: **platí D-018** pouze pro přechod 014, jinde ne. · `MOTION.md` „hero 88 svh mobil“ vs Jakubovo „fullscreen“: **platí Jakub**, řešit v P0. |

**Úkol pro údržbu:** aktualizovat `MOTION.md` §4, `creative-language.md` (kapitoly) a uzavřít 002/003 (P2 dokumentace).

---

## 5. Reference Library a TOP 10

Úplná ověřená knihovna (28 webů, každé ocenění přečteno přímo na awwwards.com, živý průchod 1440 i 390, detekce technologií): `REFERENCE_LIBRARY_2026.md`. Starší principy (Getty Tracing Art, Persepolis, Inkwell, Paper Planes, The Watch): `docs/04-top-10-references.md`.

**Doplněno dnes (16:30), Jakubovy původní inspirace:**

| Web | Ověření | Technologie | Co si vzít / co ne |
|---|---|---|---|
| [Sleep Well Creative](https://sleep-well-creatives.com/) (Victor Work) | **Awwwards SOTD 28. 1. 2026** (stránka awwwards.com/sites/sleep-well-creative) | Webflow, three r180, WebGL2, Lenis jen desktop | Kapitoly „01 Sleep isn't a luxury“ s jedním velkým tvrzením a interaktivní hledání „insights“. **Nebrat:** vstupní bránu „Enter Site“. |
| [Tabasco — Interactive 3D](https://tabasco.hilostudiolab.com/) (Hilo Studio) | živý web OK. **Ocenění nenalezeno** (awwwards.com/sites/tabasco… = 404) | three r165, GLB (lahev, sud, chilli), HDR, Lenis | **Dědictví značky jako časový příběh** („The root of a legacy… In 1868…“). Precedens pro Historii: jeden fyzický objekt provází časem. **Nebrat:** 3D produktový objekt (ERA40 nemá produkt, jen lidi). |
| [Event Horizon](https://fade.run/) (cleanlystudio) | Awwwards HM 25. 3. 2026. **Živý web dnes nedostupný** („Deployment Paused“, HTTP 402) | — (nelze ověřit) | Jen jako záznam. Nedá se studovat. |
| [Why Zero](https://why.zero.university/) | SOTD 7. 9. 2026 (už v knihovně) | three r160 | Gesto nakreslí nulu = interakce místo ikony. |
| [Extrafazant](https://www.extrafazant.nl/over) | SOTD 8. 11. 2026 (už v knihovně) | Webflow, Lenis, video | Grafický tah přes hranici sekcí = precedens pro přechody Trasy (realizováno ve 014 a 008). |

**TOP 10 (platí z `REFERENCE_LIBRARY_2026.md`, beze změny pořadí):**
1. Why Zero
2. Hubtown (40 let, Unseen)
3. /nk 20 años (výročí jako poděkování lidem)
4. Ten Years Away (kinetický letopočet)
5. AI in Design Report 2026 (data + lidé)
6. OceanX 2025
7. FC Porto Memorial (dokumentární střídmost)
8. The Tuscan Journey (dnes už jen varování: vlakový rám ERA40 vyřadila)
9. 21 hrs on the Moon (historie jako prostor)
10. Squarespace Foundations (typografie jako objekt)

**Kandidát nahoru:** Tabasco pro Historii. Kvůli chybějícímu ocenění zůstává mimo TOP 10.

---

## 6. Trendy 2025–2026 (z 31 ověřených webů)

1. **three.js je standard u oceněných imerzivních webů** (17 z 28, r128–r183, WebGL2). WebGPU je zatím 1 web (IVRESS).
2. **Lenis** v polovině webů. Na mobilu ho často vypínají (Sleep Well), stejně jako ERA40.
3. **Vstupní brána, zvuk a loader** dominují. **ERA40 nepřebírá:** veřejná instituce, SEO a mobil mají přednost před okamžitým obsahem.
4. **Výročí vyprávěná dopředu a přes lidi** (Hubtown, /nk, Buzzvel), ne jako nostalgie.
5. **Data s lidskou kotvou** (AI in Design Report, FC Porto). Realizováno v 07 (`BigCount`).
6. **Jedna dominanta na obrazovku**, velká typografie, dokumentární fotka.

---

## 7. Finální kreativní směr

**A — „Linka, která se vrací a pokračuje“** (D-016) platí beze změny. Z B (Štafeta) bereme princip **předávání** (prolog, 08 „A předává to dál“, větve 07). Z C (Souhvězdí) jen **síť lidí v datech** (tváře pod číslem v 07), nikdy hvězdné nebe ani částice.

Jedna věta pro všechny: *Návštěvník jede po jedné lince 40 let. V roce 1998 se k ní připojí Česko, v Evropě se linka rozvětví k lidem, doma se zlomí na tehdy a teď, větví se k dalším lidem a na konci odjíždí tečkovaně za okraj obrazovky.*

---

## 8. Vizuální identita a gramatika Trasy

- **Barvy** (DESIGN.md §2):
  - EU modrá `#004494` je plocha a nadpisy na světlém,
  - Erasmus+ `#007FC7` jen pro velký text a grafiku, malý text v `#006BA8`,
  - ink `#0B1B33`, sky `#EAF3FA`, bílá,
  - **žlutá `#FFED00`** pro „jsi tady“ a zvýraznění slov **jen na tmavém** (P0b, `.hl-dark`).
- **Typografie:** jen Roboto Flex (lokálně), osy `wght`/`wdth`. Nadpisy wdth 25–60, display line-height ≥ 1,0 (diakritika).
- **Gramatika Trasy (P0 celého webu):** plná modrá = minulost, žlutý bod = tady, tečky = budoucnost. Dnes konzistentně v Historii, kvízu, menu kapitol (R7), stanicích Příběhů, 08 Future a přechodu 014.
- **Fotografie:** dokumentární, s viditelným štítkem „Ilustrační snímek“, dokud nejsou skutečné. Žádné děti bez souhlasu (týká se hlavně výměny stock fotek).
- **Zakázáno:** glassmorphism, neon, částice, 3D koule, dekorativní ∞ mimo 014, generické karty, jednotný fade-up všude.

---

## 9. Forever a systém přechodů

- **Forever = otevřená Trasa** (08 tečkovaně za okraj) a **návrat, který pokračuje** (06 → 07 větve).
- **Jediný doslovný ∞** je přechod 014: 1 s, modrá plocha, „40 / 1987–2027“, navigace nečeká, reduced = fade 160 ms, SharedPhoto má přednost. Žádný druhý ∞ objekt.
- **Systém přechodů (stav):**

| Hranice | Řešení | Stav |
|---|---|---|
| 01 → 02 | film se zmenší do rámu, Trasa pokračuje | ✅ |
| 03 → 04 | 008A: poslední snímek Historie se promění ve fotku Terezy | ✅ |
| 04 → 05 | spec 006: fotka příběhu → mapa | ✅ |
| 06 → 07 | 008B: dělicí osa se stane kořenem stromu, nadpis se píše wipem | ✅ |
| stránka ↔ stránka | 014 ∞ přechod. Archiv ↔ detail přes SharedPhoto | ✅ |
| 02 → 03, 05 → 06, 07 → 08 | klidný střih, jen Trasa | záměrně klid (jeden hlavní pohyb na kapitolu) |

---

## 10. Motion Design Bible (závazná pravidla)

Úplná verze: `docs/era40-ai/motion/MOTION.md` + `MOTION_BIBLE.md`. Výtah:
- **Pohyb je jízda:** plynulý, směrovaný, nikdy neskáče. Vpřed = doprava a dolů. Návrat = přesná inverze.
- **Jeden hlavní pohyb na kapitolu**, nejvýš dva podpůrné.
- **Tokeny:** `DUR` xs 0,3 / s 0,6 / m 0,9 / l 1,4 s. `EASE.out` = power3.out (CSS `--ease-out` je zatím cubic, D-007 otevřené). Scrub 0,45–1.
- **Stavy povinné u každé animace:** INITIAL (SSR čitelné), INTRO, AMBIENT (většinou nic), OUTRO, REVERSE, MOBILE (zjednodušení, ne vypnutí), REDUCED (koncový stav ihned).
- **Technika:** GSAP jen přes `lib/gsap/setup.ts`, scény přes `useScene`, `gsap.matchMedia`, jeden Lenis, animovat transform/opacity/clip-path, žádný React state po framech.
- **Poučení z dneška:**
  - unikání `visually-hidden` z ořezu bez pozičního kontejneru způsobí přetečení před JS,
  - `data-*` hooky se nesmí krýt mezi komponentami (`data-count` vs `data-big-count`),
  - text skrytý `autoAlpha` mizí čtečkám, proto pro odhalení používat jen `opacity`,
  - axe kontrast se měří i během animace.

---

## 11. Interaktivní Object & Asset Library (ERA40, ne generická)

Z 20 konceptů ChatGPT brainstormingu (Infinity Ribbon … Evolution) zůstávají jen ty, které jdou přeložit do Trasy, času, lidí a dat. Formát: význam · stavy · mobil/reduced · technologie · priorita.

| # | Objekt (původ) | Význam | Stav | Mobil / reduced | Tech | Priorita |
|---|---|---|---|---|---|---|
| R1 | **Trasa: plná / bod / tečky** (Journey Paths, Forever Threads) | čas a pozice | ✅ všude | stejné / statické | SVG + DrawSVG | P0 udržovat |
| R2 | **Route transition ∞** (Infinity Ribbon, Möbius) | 40 let jako jeden tah | ✅ 014 | ✅ / fade | SVG, View Transitions | hotovo |
| R3 | **Větvení** (Human Connections, Evolution) | dopad po návratu | ✅ 07 | vertikální / statické | SVG | hotovo |
| T1 | **40 pražců let** (Living 40) | 40 let jako skutečný čas | ✅ desktop, mobil statický | **P0: interaktivní** (§13) | SVG | P0 |
| T2 | **Rostoucí řez letopočtu** (Evolution) | program roste | ✅ (wdth v Historii) | — | CSS var. font | hotovo |
| T3 | **Archivní fragment** (Memory Fragments) | skutečný archiv 1987/1998/2004 | ⬜ čeká na archivní foto | clip-path reveal | CSS/GSAP | P2 (asset) |
| S1 | **Stanice příběhu** (Story Capsules) | člověk na Trase | ✅ rail 04 | swipe + hint | DOM + GSAP | hotovo |
| S2 | **Lidé místo dopravy** (Floating Memories, zkroceno) | „tohle jsou lidé“ | ✅ PeopleRow | swipe / statické | DOM + WebGL hover | hotovo |
| S3 | **Hlas na konci** (Letters from Europe) | jedna věta člověka | ✅ 08 hush | ✅ / statické | CSS/GSAP | hotovo. Rozšířit o skutečné citace, až budou. |
| P1 | **Foto ožití (WebGL distorze)** | fotka „dýchá“ | ✅ 04 scroll, archiv a prolog hover | vypnuto | WebGL1 shader | hotovo |
| P2 | **SharedPhoto karta → detail** | kontinuita člověka | ✅ | ✅ / instant | React ViewTransition | hotovo |
| M1 | **Mapa tras příběhů** (Europe Network, Bridges) | geografie cest | ✅ | celá mapa | SVG | hotovo |
| M2 | **Kamera mapy** | čitelnost krátké trasy | ⬜ 015 B | celá mapa | SVG viewBox | P3 (riziko orientace) |
| D1 | **Velké číslo s lidmi** (Constellation, zkroceno) | číslo = lidé | ✅ 07 BigCount | ✅ / finální hodnota | DOM + GSAP | hotovo |
| F1 | **Otevřená Trasa** (Beyond, Possibilities) | navždy = pokračuje | ✅ 08 | vodorovná / statická | SVG mask | hotovo |
| N1 | **Menu kapitol s gramatikou Trasy** | kde jsem | ✅ R7 | ✅ | CSS | hotovo |
| MP | **Motion presety** (`lib/gsap/presets.ts`) | jednotné tempo | 🟡 částečně | — | GSAP | **P2: sjednotit** (wipe, reveal, count, draw do pevných presetů) |
| SH | **Shader collection** | — | 1 shader (distorze) | — | WebGL1 | jen pokud vznikne nová potřeba |

**Vyřazeno z brainstormingu:** Liquid Infinity, Time Particles, Four Layers, Constellation jako hvězdy, The Portal, Floating Memories jako plovoucí 3D. Důvod: dekorace bez dat, rozpor s D-005 a s DESIGN „zakázáno“.

---

## 12. Blender, WebGL a technologický stack

| Vrstva | Použití | Rozhodnutí |
|---|---|---|
| **SVG** | Trasa, mapa, strom 07, 40 let, přechod 014 | Zůstává základ všeho lineárního. |
| **GSAP + ScrollTrigger + DrawSVG/Flip/SplitText** | veškerá choreografie | Jediný animační systém. |
| **CSS** | UI mikrointerakce, hover (jen `(hover: hover) and (pointer: fine)`, N12), clip-path | Přednost před JS, kde stačí. |
| **WebGL1 (vlastní shader)** | distorze fotek (scroll, hover) | Jeden renderer. Kontext jen u aktivní sekce, mobil a reduced vypnuto. |
| **View Transitions (React)** | SharedPhoto, 014 | Žádný ruční `startViewTransition` vedle Reactu. |
| **Three.js / R3F / OGL** | — | **Ne teď.** Jen pokud PoC GPU ribbonu (011) prokáže hodnotu, kterou SVG neunese. |
| **Rive / Lottie** | — | **Ne.** Nemáme vektorové postavy ani ikony, které by to potřebovaly. |
| **Blender + Geometry Nodes** | — | **Ne pro web teď.** Má smysl jen jako nástroj pro statický renderovaný obraz nebo video (např. 3D Trasa nad mapou do hero filmu). Licence assetů (BlenderKit, Poly Haven CC0, Sketchfab) ověřovat jednotlivě. |

**Výkon a přístupnost:** jeden aktivní WebGL kontext, DPR cap 1,5, pauza mimo obraz. Reduced motion (OS i přepínač „Omezit pohyb“) = koncové stavy. Všechny interakce mají klávesnici a tap alternativu (N12). Bez JS je obsah kompletní (ověřeno 15. 11.: přetečení bez JS 0).

---

## 13. Mobile-first UX a Motion Strategy

**Audit (dnes, 390 × 844, produkce `:3000`, skutečné chování):**

| Sekce | Výška | Dnes | Problém | Návrh (P) |
|---|---|---|---|---|
| 01 Hero | ✅ 844 px (100 svh) | film, titulky, CTA | ✅ vyřešeno (D-021). Film z originálů (`6738261`), na 3× displejích ještě lehce měkký (720 × 1280, 2 MB). | P1 dál: skutečný 1080p střih nebo DZS záběry, pokud se zvedne rozpočet. |
| 02 Prolog | 1 043 px | čtecí zvýraznění, PeopleRow swipe | OK | — |
| 03 Historie | ✅ ~850 px | „Swipe 40 let“ | ✅ vyřešeno (D-021) | — |
| 04 Příběhy | 1 414 px | swipe rail + hint | Jakub: „příběhy hrozně statické“. Swipe existuje, ale karta se jen posune. | **P1: „živá karta“:** aktivní karta (IO, jako v Historii) zostří fotku a podtrhne Trasu, stanice dole sleduje swipe. Tap na fotku otevře detail přes SharedPhoto. Bez WebGL na mobilu. |
| 05 Mapa | 1 243 px | celá mapa, tlačítka | OK, interakce tapem | — |
| 06 Návrat | 1 008 px | scroll i prst (P2 5) | OK | — |
| 07 Rozvětvení | 2 595 px | velké číslo, strom, příklad | dlouhé | **P2:** příklad sektoru sbalit do karty pod vybranou větví |
| 08 Pokračování | 1 343 px | hush, Trasa, CTA | OK | — |
| Podstránky | — | archiv (filtry sbalené, řazení), detail (deep), kvíz (pilulky), zapojte-se | OK (QA 15/15, tap ≥ 44 px) | **P2:** PageIntro na mobilu s Trasou kreslenou při vstupu |

**P0 „Swipe 40 let“ (Historie na mobilu, bez pinu, bez scroll-hijacku):**
- **INITIAL:** pás 40 let (už existuje) a pod ním vodorovný pás 7 milníků (`scroll-snap`), každý s fotkou, rokem a textem. Bez JS je to čitelný seznam.
- **INTRO:** při vjezdu do obrazu se pás 40 let jednou nakreslí do roku prvního milníku (0,9 s).
- **INTERACTION:** swipe milníků posune žlutý bod a plnou linku na pásu 40 let na rok daného milníku. Tap na rok v pásu = `scrollTo` na milník. Velké číslo roku se změní plynule (tween 0,6 s). Česká linka se objeví při 1998, modré pozadí při 2004.
- **OUTRO:** po posledním milníku (2027) je pás plný. Předávka do Příběhů zůstává klidná.
- **REVERSE:** swipe zpět = linka ubývá.
- **REDUCED:** okamžité změny, bez tweenu.
- **Tech:** stávající data `milestones.ts`, IntersectionObserver na kartách, GSAP jen pro tween čísla. Odhad 1 dávka.

---

## 14. Storyboard osmi kapitol

Formát: INITIAL → INTRO → INTERACTION → OUTRO → REVERSE · MOBILE · REDUCED. ✅ = funguje dnes, ⬜ = návrh.

1. **01 Úvod.** ✅
   - Poster (parta večer) → film (balení, škola, přednáška, večeře, večer, návrat, „A předává to dál.“) + titulky + claim po řádcích + „všechno.“ žlutě.
   - Pauza a play.
   - OUTRO: pin 150 vh, film se zmenší do rámu a Trasa pokračuje dolů. REVERSE: inverze.
   - MOBILE: ⬜ 100 svh. REDUCED: poster a tlačítko přehrát.
2. **02 Prolog.** ✅
   - Věta se zvýrazňuje scrubem, „trochu jiní.“ EU modrou.
   - PeopleRow: 8 lidí stoupá vlnou (scrub, desktop), hover ožije (WebGL), tap otevře příběh.
   - MOBILE: swipe. REDUCED: statické.
3. **03 Historie.** ✅ desktop
   - Pin 250 vh, linka v časovém měřítku 1987–2027, 40 pražců, česká linka od 11. značky, 2004 modré pozadí, „Rok N ze 40“, fotky clip-path.
   - OUTRO: 008A předání fotky do 04. REVERSE: inverze.
   - MOBILE: ⬜ Swipe 40 let. REDUCED: statický pás a seznam.
4. **04 Příběhy.** ✅
   - Pin a vodorovný rail, 3 kompozice spreadu, distorze podle rychlosti, stanice dole, „Přečti si příběh“ → dialog nebo detail.
   - MOBILE: swipe a hint. REDUCED: svislý sled.
5. **05 Mapa.** ✅
   - Trasy se kreslí scrubem, výběr města nakreslí trasu s cestujícím bodem.
   - ⬜ 015 B kamera (P3). MOBILE: celá mapa. REDUCED: okamžitě.
6. **06 Návrat.** ✅
   - Tehdy/Teď dělič: desktop pin a scroll, mobil scroll, prst má vždy přednost. „Teď“ má druhý hlas se žlutým bodem.
   - OUTRO: 008B osa → kořen stromu, nadpis 07 se píše wipem.
7. **07 Rozvětvení.** ✅
   - 411 400 přes celou šířku (count scrubem) a 8 tváří → strom 5 oblastí podle skutečných počtů, výběr větve ztlumí ostatní, příklad příběhu → sekundární čísla.
   - MOBILE: vertikálně (⬜ zkrátit). REDUCED: finální hodnoty.
8. **08 Pokračování.** ✅
   - Hush (pomalá fotka a věta Mgr. Jany) → „Cesta končí. Zkušenost pokračuje.“ → Trasa odjíždí tečkovaně → CTA.
   - MOBILE: vodorovná Trasa. REDUCED: statické.

---

## 15. AI workflow a skills

- **Role:** Claude = kreativní ředitel, orchestrátor a review. Codex = implementace přes briefy (`docs/agent-briefs/`), report (`docs/agent-reports/`) a QA. Grok Bot = dohled v `web/docs/CLAUDE-COORDINATION.md`. Cursor se nepoužívá (Jakub 11:28).
- **Postup:** audit → spec (`docs/era40-ai/motion/specs/`) → **Jakubovo schválení** → izolovaný prototyp (při riziku) → review → produkce → QA (mobil 360–430 první, 8 šířek, reduced, klávesnice, `qa-checks`, `qa-impact`, `qa-handoffs` na dev, `qa-route-transition`) → push → zápis do koordinace.
- **Skilly:**
  - projektové `.claude/skills/era40-*` (reference-analyst → motion-director → creative-developer → visual-qa → creative-refinement),
  - `cinematic-websites`, `gsap-*`, `awwwards`, `react-best-practices`, `web-design-guidelines`.
  - Nové neinstalovat bez důvodu (`web/docs/CREATIVE-SKILLS.md`).
- **Limity:**
  - Claude měří `get_usage`. Při **96 % 5h limitu** předá vše Codexu (`HANDOFF-96`, automaticky v 10min dohledu).
  - Codex pak pokračuje podle §16 a materiály dohledá v Jakubových ChatGPT chatech.

---

## 16. Roadmap priorit

| P | Položka | Přínos | Náročnost | Riziko | Závislost / asset | Schválení |
|---|---|---|---|---|---|---|
| **P0 ✅** | Hero 100 svh na mobilu + safe area (hotovo 15. 11., D-021). Scroll cue vědomě vynechán: „Jak to začalo“ a titulky už zvou dál. | Jakubův hlavní požadavek | S | nízké (LCP poster) | — | schváleno |
| **P0 ✅** | Historie mobil „Swipe 40 let“ (hotovo 15. 11., D-021) | interaktivita i na mobilu | M | střední (synchronizace) | — | schváleno |
| **P1 ✅** | Mobilní film z originálů Pexels, 540 kb/s (`6738261`). Dál jen s vyšším rozpočtem nebo DZS záběry. | kvalita obrazu | S–M | nízké | — | — |
| **P1 ✅** | Mobil Příběhy „živá karta“ (`016d9d7`) | Jakub: příběhy statické | M | nízké | — | schváleno |
| **P1 ✅** | (`1fabb77`: kvíz potvrzení, detail šipky + swipe, archiv sticky filtry; formulář už vyhovoval) Mobilní audit podstránek: archiv (gesta filtrů, aktivní stav), detail (swipe na další příběh), kvíz (haptika není, ale jasná zpětná vazba výběru), zapojte-se (validace a focus) | Jakub: „všechny podstránky“ | M | nízké | — | dílčí návrhy ke schválení |
| **P1** | Výměna stock za skutečné příběhy, fotky a video | důvěryhodnost, awards | M | nízké | **DZS podklady** | Jakub/DZS |
| **P1** | Identita: lockup, loga, povinné EU texty | právní a brand | S | nízké | **DZS** | DZS |
| **P2** | Sjednotit motion presety (draw, wipe, reveal, count) a D-007 easing | konzistence, údržba | M | nízké | — | D-007 Jakub |
| **P2** | 07 na mobilu zkrátit (příklad pod větev) | méně scrollu | S | nízké | — | ne |
| **P2** | Dokumentace: MOTION.md §4, creative-language, zavřít spec 002/003 | pravda v dokumentech | S | — | — | ne |
| **P2** | Archivní fragmenty 1987/1998/2004 | autenticita Historie | S | nízké | **archivní foto** | ano |
| **P3** | 015 B kamera mapy (izolovaný prototyp) | čitelnost krátkých tras | M | **orientace** | asset prototyp | ano |
| **P3** | GPU ribbon Trasy (PoC 011 → rozhodnutí) | „wow“ vrstva | L | výkon, mobil | — | ano |
| **P3** | Blender render (3D Trasa nad mapou do filmu) | filmový obraz | L | čas | Blender | ano |

---

## 17. Otevřené otázky

1. ~~Historie na mobilu~~ schváleno a hotovo (D-021).
2. Hero CTA: „Objevovat příběhy“ (nyní), nebo „Objev příběhy“?
3. D-007: sjednotit easing na `power3.out` i v CSS?
4. 015 B: prototyp kamery, nebo odložit?
5. Kdy dodá DZS skutečné příběhy, fotky, video a identitu? Bez nich zůstává „ilustrační“ vrstva.
6. ~~Obsah ChatGPT chatů~~ vyřešeno: Codex je přepsal (16:30). Jen pokud existuje nejstarší původní master prompt v jiném chatu, uveď kde.
7. ~~Mobilní „živá karta“ a podstránky~~ schváleno a hotovo (`016d9d7`, `1fabb77`).

---

## 18. Finální kreativní doporučení

Jako kreativní ředitel bych **nepřidával žádný nový efekt na desktop**. Desktop má dnes plnou a souvislou dějovou linii a každá další vrstva by porušila „jeden hlavní pohyb na kapitolu“ a Jakubovo poučení D-004 až D-009. Úsilí patří do tří věcí, v tomto pořadí:

1. **Mobil jako rovnocenný zážitek** (P0): hero přes celou obrazovku a interaktivní Historie swipem. Tady návštěvník nejvíc ztrácí pocit jedné souvislé cesty.
2. **Pravdivý obraz** (P1): jakmile DZS dodá skutečné lidi, vyměnit stock. Awards-level kvalitu ERA40 neudělá další shader, ale skutečná tvář a skutečná věta.
3. **Řemeslná konzistence** (P2): presety pohybu, easing, dokumenty. Tím se web udrží, až na něm budou pracovat další lidé a agenti.

Three.js, Rive, Lottie ani Blender dnes nedoporučuji. Jediný technologický experiment, který stojí za čas, je GPU ribbon Trasy jako izolovaný PoC (P3), a to jen pokud po P0–P1 zůstane kapacita.

*One continuous route. Forty years. Experiences that keep moving forward.*
