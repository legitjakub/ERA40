# Kreativní směry ERA40 — fáze 1

15. 11. 2026 · Claude (kreativní ředitel). Podle Jakubova pokynu („vyhodnoť sám, dělej autonomně“) **směr vybírá Claude**. Volba a důvody jsou v §4 a v decision logu (D-016).

**Vstupy:**
- strategie DZS (`docs/private/`): insight „hodnota vzniká až po návratu“, řetěz ZÁŽITEK → ZKUŠENOST → ZMĚNA → DOPAD, publikum i lidé s 0 dny na Erasmu, KV s linkou a smyčkou,
- master prompt (motiv nekonečného pokračování, awards-level, skutečné WebGL),
- stávající web (8 kapitol, Trasa, schválený hero D-002),
- ověřené reference 2025–26 (`REFERENCE_LIBRARY_2026.md`),
- technická rizika z CDX-000.

**Společné pro všechny tři směry:**
- osm kapitol a kotvy zůstávají, mění se jejich režie,
- Roboto Flex (variabilní osy jsou součást pohybu), Erasmus+ modrá, žlutá jen jako „tady jsi“, ink, bílá a sky,
- žádná rotující ikona ∞, žádné náhodné částice, žádný druhý Lenis ani druhý WebGL canvas (DESIGN §7),
- mobil má vlastní pohybový koncept a reduced motion vlastní klidovou verzi.

---

## Směr A — „Linka, která se vrací a pokračuje“ (doporučený)

**Myšlenka:** Trasa, kterou web už má, dostane jednu jedinou smyčku. **Smyčka ∞ je cesta tam a zpátky domů.** Linka odjede z Česka, obkrouží zážitek, vrátí se domů a teprve tam se **rozvětví k dalším lidem**: studentům, kolegům, rodině, škole. Nekonečno tu není ornament. Je to přesně insight briefu: hodnota vzniká po návratu a pokračuje dál.

| | |
|---|---|
| Art direction | Dokumentární editorial: velká typografie, fotografie lidí, jedna modrá linka jako vypravěč. Klid, vzduch, přesnost (Getty Tracing Art, Floema). |
| Vizuální princip | Linka je jediný grafický prvek a nese čas. Plná = ujeto, žlutý bod = tady jsi, tečkovaná = co teprve přijde (gramatika spec 001). |
| Barevnost | Erasmus+ modrá na sky/bílé, ink pro filmové scény, žlutá jen pro bod „tady jsi“ a výzvy |
| Typografie | Roboto Flex. Titulky se „natahují“ osou `wdth`, když jimi linka projíždí, a čísla 1987→2027 se kinetic-countují. Text maskovaný linkou (odhalení po trase). |
| Motiv nekonečna | Jedna smyčka ve hře o 40 letech: hero (40 → linka tvoří smyčku z nuly), návrat v kapitole Příběhy („Domů se vrací někdo trochu jiný“), rozvětvení v Číslech a otevřený konec v Budoucnosti |
| Hero | Schválený film zůstává (D-002). Při odjezdu z hera vyjede ze spodní hrany linka a nakreslí smyčku přes **0** ve „40 let“. Pak plynule pokračuje do prologu. |
| Kapitoly | 01 odjezd · 02 prolog (linka vede okem vlaku) · 03 historie (linka jako časová osa v prostoru, dekády mění světlo) · 04 příběhy (každý příběh = smyčka tam a zpět, fotka letí do mapy, 005A) · 05 mapa (smyčky lidí po Evropě, Česko jako uzel) · 06 tehdy/teď (linka je dělicí čára slideru) · 07 čísla (návrat se **rozvětví**: oblasti vzdělávání jako větve s počty) · 08 budoucnost (linka nekončí, tečkovaně za okraj, „Vaše cesta“) |
| Přechody | Linka přejíždí přes hranici kapitol a předává polohu (spec 001 + 004). Fotografie přechází z rámu do rámu (005A, 008). Maska po trase odhaluje další scénu. |
| WebGL koncept | **Jeden sdílený renderer** (rozšíření `distortion.ts` → Three.js nebo zůstat u WebGL1 podle PoC). Linka jako GPU ribbon podél Catmull-Rom křivky (uniform `progress`: plná / bod / tečky v shaderu). Fotografie jako texturované plochy synchronizované s DOM (displacement při přechodu). Mělká 3D kamera **jen v Historii** (průlet dekádami). Jinde 2,5D. |
| Mobil | Bez kamery a bez 3D. Linka zůstává SVG (dnešní systém), smyčka a větvení vertikálně podél levého okraje. Fotografické předávky jako crossfade + maska. Žádné piny delší než 100 vh. |
| Reduced | Linka je hned celá nakreslená a smyčky statické. Obsah stejný. |
| Riziko | Nízké až střední. Navazuje na hotový kód (Trasa, 005A, 008). Nejrizikovější je synchronizace ribbonu se scrubem (PoC ve fázi 3). |

**Storyboard (desktop, scroll):**
1. Film → rám (stávající). Ze spodní hrany vyjede žlutý bod a modrá linka.
2. Linka napíše smyčku přes „0“ v čísle 40. Číslo 1987 se dopočítá k 2027.
3. Prolog: linka vede přes okno vlaku. Slova se zvýrazňují, když jimi projede.
4. Historie: kamera letí po lince skrz pět dekád. Každá dekáda má jiné světlo fotografie. Česko se připojí v roce 1998 druhou linkou.
5. Příběhy: horizontální jízda. U každého člověka linka udělá smyčku (tam → domů) a pod ní věta „co pokračuje dál“ (spec 007).
6. Fotka posledního příběhu přeletí do mapy (005A). Mapa ukáže smyčky všech lidí.
7. Tehdy/teď: dělicí čára slideru je ta samá linka.
8. Čísla: linka se po návratu rozvětví do oblastí vzdělávání. Délka větví = skutečné počty DZS.
9. Budoucnost: linka odjede tečkovaně za pravý okraj. Bod „Vaše cesta“ a kvíz „Jaké je tvoje ERA?“.

---

## Směr B — „Štafeta“

**Myšlenka:** Erasmus jako předávání. Každá scéna končí tím, že člověk **předá zkušenost dalšímu** (učitelka → studenti → jeden z nich vyjede → …). Nekonečno = řetěz, který se uzavře zpátky u diváka. Poslední „štafetový kolík“ dostane návštěvník (kvíz, vlastní příběh).

| | |
|---|---|
| Art direction | Filmová fotografie na celou plochu, portréty ve dvojicích tehdy/teď. Ruční poznámky (moodboard 1 zadavatele) jen jako titulky, ne dekorace. |
| Vizuální princip | Rám fotografie se nepřerušuje: jeden obraz se proměňuje v další (Inkwell, The Watch). |
| Barevnost | Převaha fotografie, modrá jen v typografii a v rámech předávky |
| Typografie | Obří jména a slovesa předávky („předala“, „naučil“) v `wdth` 60–100 přes fotografii, maskovaná obrazem |
| Motiv nekonečna | Uzavřený řetěz: poslední scéna se vrací k první, ale s divákem uvnitř („příběh, který končí tam, kde začal“, IVRESS) |
| Hero | Film → první portrét. Jméno vyjede z rámu. |
| Kapitoly | Každá kapitola je „článek“ (historie = první vyjíždějící generace, příběhy = předávky, mapa = kam se předávka dostala, čísla = kolik článků) |
| WebGL | Fotografické přechody v GLSL (displacement, dissolve podle hloubkové mapy), 2,5D paralaxa z depth map, jeden renderer |
| Mobil | Vertikální příběhový feed: swipe mezi články, přechody crossfade + maska |
| Riziko | **Vysoké.** Stojí na skutečných fotografiích lidí, které zatím nemáme (`MISSING_INPUTS` #4). S ilustračním stockem by působil falešně. Hlavní scroll choreografie by se musela postavit znovu. |

---

## Směr C — „Souhvězdí dopadu“

**Myšlenka:** 12 hvězd EU (KV varianta 1 zadavatele) se rozprostře do mapy Evropy. Každá zkušenost je světelný bod a dopad se šíří jako světlo k dalším bodům. Hvězdy nakonec opíší ∞.

| | |
|---|---|
| Art direction | Tmavá prostorová scéna, data jako světlo, typografie v prostoru |
| Vizuální princip | Body a spojnice. Jejich počet a jas odpovídá **skutečným** datům DZS (oblasti, roky), nikdy náhodě. |
| WebGL | Instanced points, scroll-controlled kamera přes 3D mapu Evropy, bloom, morph z kruhu hvězd do ∞ |
| Mobil | Snížený počet bodů, 2D mapa, bez bloomu |
| Riziko | **Vysoké.** Snadno sklouzne k „náhodným částicím bez významu“ a „gradientní dekoraci“, které master prompt výslovně zakazuje. Odklání se od dokumentárního tónu i od schválené světlé identity. Data DZS nejsou dost granulární na tisíce bodů, hrozí vymýšlení. |

---

## Hodnocení

| Kritérium (váha) | A Linka | B Štafeta | C Souhvězdí |
|---|---|---|---|
| Strategie DZS: hodnota po návratu, dopad na další (3) | 5 | 5 | 3 |
| Motiv nekonečna s významem (2) | 5 | 4 | 3 |
| Navazuje na schválené (hero, Trasa, 005A, 008, kvíz) (3) | 5 | 2 | 1 |
| Proveditelnost s dnešními podklady (stock, bez reálných fotek) (2) | 4 | 1 | 3 |
| Awards-level potenciál (WebGL, choreografie) (2) | 4 | 5 | 5 |
| Riziko „AI šablony“ / samoúčelnosti (2, víc = lépe) | 4 | 4 | 2 |
| Mobil a výkon (1) | 5 | 3 | 2 |
| **Vážený součet** | **69** | **52** | **40** |

## 4. Rozhodnutí: směr A

**Proč:**
- Jako jediný splňuje současně strategii (insight po návratu), motiv nekonečna s významem, Jakubovo „zlepšovat, ne restartovat“ i reálné podklady.
- Klientův KV stojí na téže lince se smyčkou. Web a kampaň tak budou mluvit stejným jazykem bez kopírování moodboardu.

**Co přebíráme z B:** fotografické předávky mezi scénami (005A a 008 už běží) a dvojice tehdy/teď. Až DZS dodá skutečné fotky, zesílí se.

**Co přebíráme z C:** jen princip „čísla jako větve s délkou podle skutečných dat“ v kapitole Čísla. Částice ani tmavou prostorovou scénu nepřebíráme.

**Hlavní signature moment:** smyčka přes nulu ve „40“ v hero a rozvětvení po návratu v Číslech. Obojí nese význam, ne dekoraci.

## Další krok (fáze 2–3)

1. `MOTION_BIBLE.md` pro směr A (každá animace podle šablony master promptu).
2. `EXPERIENCE_DESIGN.md`, `COMPONENT_SYSTEM.md`, `ASSET_PLAN.md`.
3. `TECHNICAL_ARCHITECTURE.md` + review Codexu + **PoC 1: GPU ribbon linky synchronizovaný se scrubem a DOM** (rizika CDX-000 #1–3).
4. Nezávislé review tohoto dokumentu Codexem (CDX-003, read-only).
