# ERA40 – předávka PRO-CLAUDE-0321

Sloučil Obecný 1 – Koordinátor, 15. 11. 2026, **03:10** (Europe/Prague). Stav: **pripraveno** pro Grok Bota → Claude (kopie na Mac ve 03:21). Jen design. Do kódu, Gitu ani na Mac se z této předávky nesahelo, nic se neodesílalo ven.

**Kód:** box kopie `/workspace/era40/web-main` je **8a216a7** (`SNAPSHOT-COMMIT`). **Aktuální origin/main je e4de4d7.** Řádky `soubor:řádek` níže platí pro 8a216a7 a zápisy botů; po `git pull` se mohou posunout. **Vše ověřuj proti e4de4d7**, nic z 8a216a7 neprohlašuj za chybějící v aktuálním mainu bez důkazu.

**Cursor má lokálně (bez pushe, stav v e4de4d7 na boxu neověřen):**
- `c711acd` — průhledný header a větší claim (W1, GB 02:24)
- `6230328` — header s wordmarkem Erasmus+ · **rozpracováno Cursorem, neopravovat**

Na soubory, které Cursor zamkl nebo má rozpracované (hlavně `SiteNav.*`, hero/header z těchto commitů), **nesahat**, dokud je Cursor nepushne nebo neuvolní.

**Zahrnuté předávky:** `predavka-O2.md` (03:07), `predavka-O3.md` (03:08), `predavka-O4.md` (~03:10), `predavka-O5.md` (~03:05). Další podklady: `cursor-body-1-16.md`, `SOUHRN.md`, `DESIGN-AUDIT.md`, `VISUAL-GAPS.md`, `texty-tykani-O3.md`, `texty-cisla-O3.md`, `audit-O*.md`, `visual-O*.md`, `reference-analyza-O*.md`, `jakub-rano-O3.md`.

---

## 0. První krok po převzetí

1. `git pull` a ověřit commity Cursoru **od 8a216a7 po e4de4d7** (a případně novější, pokud mezitím přibyly).
2. Zapsat, které body z fronty 1–31 + A–C už e4de4d7 obsahuje. Co je hotové, znovu nezadávat.
3. Nesahat na soubory, které Cursor zamkl nebo má rozpracované. Header s wordmarkem (`6230328`) **neopravovat**.
4. Mobil 360 a 430 px je priorita č. 1. Až bude KROK 1 hotový, teprve ber zaparkované položky.

---

## 1. Co tuto noc udělali Cursor a GB

Fronta „už u Cursora“ je body **1–31 + A–C** (`bots/cursor-body-1-16.md`). W3 je v 8a216a7 (CSS a logika: `Hero.tsx:114` wdth 42–56, `Numbers.tsx`, `HistoryTimeline.tsx`, `ThenNow.tsx`) — texty tím W3 neměnil. Další práce šla do e4de4d7 a do lokálních commitů; box to nemá.

### 1.1 HOTOVO (ověřil GB; Claude ověří na e4de4d7) — do plánu nedávat

| Položka | Poznámka |
|---|---|
| **A–C** | Tap targety loga, „Všechny příběhy“, „Jak to začalo“ (audit GB 02:12) |
| **Logo 44 px** | Tap target loga |
| **Přepínač Tehdy/teď v 06** | `ThenNow.module.css:45–47` (část bodu 30 / VISUAL-GAPS M-N1) |
| **Bod 17** | Žlutá linka na ose předávky (`SceneHandoffs.module.css:28`). O2 R6 je s tím sloučené |

Dříve uzavřené, znovu neotevírat:

- Fokus ring (`app/globals.css:62–66`)
- Průběh v hlavičce (`SiteNav.module.css:129–132`, EU modrá na světlém)
- Řádek „Co pokračuje dál“ (`PeopleStories.tsx:233–237`, beb39a3)
- `--fs-meta` 0,875 rem / 14 px (`tokens.css:27`, od 5cb80bf)
- Česko na mapě `#007fc7`, kontrast 3,33:1 (O4 P2-7, ověřeno v 8a216a7; pevnina proti papíru zůstává slabší 1,15–1,30:1 — drobnost, ne priorita)
- O5 M3 stažené (křivka v hero je `.trail`, ne handoff; handoffy jsou na ≤ 1023 px `display: none`)
- Piny na mobilu jsou v pořádku (vše od 1024 px) — „neopravovat“

### 1.2 Rozpracováno Cursorem — neopravovat

- **Header s wordmarkem Erasmus+ (`6230328`)** — jen lokálně u Cursora. Nesahat na `SiteNav.*` ani související branding v headeru, dokud Cursor nepushne.
- **`c711acd`** (W1): průhledný header a větší claim. V box kopii 8a216a7 není; zda je část v e4de4d7, ověř až po pulli. Do té doby hero/header z tohoto commitu nepřepisovat.

### 1.3 Ve frontě Cursoru (po pulli jen potvrdit, nezadávat znovu)

Stav v e4de4d7 na boxu **neověřen**. V 8a216a7 řada věcí ještě zbývala (O3 02:13: jízdenka i „Zapojte se“ v kódu). To není důkaz, že v e4de4d7 chybí.

| Bod | Co | Kde (řádky dle 8a216a7) |
|---|---|---|
| 1 | Header na 360 px: logo + CTA + „01/08 ☰“ se vejít, nic se neláme | `SiteNav.module.css` `.brand`, media `:306–319`. Souvisí s 6230328 — neopravovat header, jen ověřit |
| 2 | Průhledný header nad hero i na mobilu; po hero spíš inverze barvy než pruh. O2 R8 (header podle sekce, ne `scrollY`, `SiteNav.tsx:71`) je sloučené s 2 | `SiteNav.module.css:11`. Rozpracováno v c711acd / 6230328 — neopravovat |
| 3 | Filtry /pribehy: `nowrap` usekává slova, skrytý scrollbar | `StoryArchive.module.css:397–401, 504–512` |
| 4 | Patička: odkazy ≥ 44 px | `SiteFooter.module.css` `.inner a` |
| 5 | Hero `.trail` na 360 px ořezává pauzu / titulek filmu — odsunout | `Hero.tsx` trail, `Hero.module.css` |
| 6 | Žlutý hover/active CTA v headeru sjednotit (žlutá jen „jsi tady“) | `SiteNav.module.css:77–81` |
| 7 | Prolog h2: nižší mobilní minimum (~2,2–2,4 rem), wdth 25–60 | `PeopleIntro.module.css` `.body h2` |
| 8 | Hero CTA na ≤ 480 px pod sebe, min-height 44 px, odstup od titulku | `Hero.module.css:87–99` |
| 9 | Stanice railu a checkboxy: klikací plocha ≥ 44 px | `PeopleStories.tsx` `.station`; checkboxy ~18 px |
| 10 | Nezlomitelná mezera po jednopísmenných předložkách; `text-wrap: balance` / `pretty`; sirotek „zdá.“ | `EuropeMap.tsx:92` |
| 11 | Mobilní minima display písma + `overflow-wrap` / `hyphens: auto` (lang cs); `--section-pad` na mobilu ~56–64 px | `tokens.css:22`, `story.module.css:45`, `EuropeMap.module.css:19` |
| 12 | Menu: zavírací křížek a položky ≥ 44 px | `SiteNav.module.css` `.close` |
| 13 | Branding „Erasmus+ navždy“, patička, `<title>`, „Zapoj se“, aria-label. Část (wordmark) je v 6230328 — header neopravovat | viz §2 |
| 14 | Mapa: hit-area měst ≥ 44 px, „Číst příběh“ ≥ 44 px, ořez západu na mobilu | `EuropeMap.tsx:167`, `EuropeMap.module.css:172–179, 209–217` |
| 15 | Kvíz „Zpět“/`.text`, detail „Všechny příběhy“ (`.back a`; A–C už hotové — ověř, ať se nezdvojuje), /zapojte-se po odeslání | `EraQuiz.module.css:97–101, 289–292`, `story.module.css:19–32`, `JoinForm.module.css:346–357` |
| 16 | Tehdy/teď na ≤ 680 px skládat pod sebe (fotka nahoře, text „Dnes“ na plnou šířku). **To není přepínač v 06** — ten je hotový | `ThenNow.module.css` (v zápisech `:316–319`; v starší kopii bylo `:281–283`) |
| 18 | Výjimka pro přechod / průhledný header v DESIGN.md:42 (scrim jen .35–.55) | `docs` / DESIGN.md:42 |
| 19 | Přepis žlutého hero CTA + zbylé `c-yellow` mimo „jsi tady“ | `Hero.module.css:96`, mj. `FilmCaptions.module.css:33` |
| 20 | Rytmus /pribehy na mobilu (O2 R1) | `StoryArchive.module.css:361–372` |
| 21 | Rail 04: osm stejných karet na 360–430 px (O2 R2) | `PeopleStories.module.css:371–386` |
| 22 | Kapitola 04 celá EU modrá (O2 R4). Plochy teď jinak neměnit (spec 009) | `PeopleStories.module.css:3` |
| 23 | Hero: jen jedna signatura, ne „Erasmus v Česku 1987 — 2027“ (věcně špatně, v Česku od 1998). O4 R1 sloučeno: zvětšený claim + jedna signatura, na 360–430 px zalomit jako Floema, ne useknout. Pozor `.title > span { overflow: clip }` | `Hero.tsx:244–270`, `Hero.module.css:29–35, 67–71, 76–81` |
| 24 | Popisky čísel ve `stats.ts` na 2–4 slova. Přesné znění: `texty-cisla-O3.md`. U `:32–33` platí GB: „výjezd přispěl ke spokojenosti“; plná formulace šetření do `period` (`:36`) | `stats.ts:13, 22, 32–33, 43` |
| 25 | Future: jedna hlavní akce (ne dva buttony a tři odkazy) | `Future.tsx:78–86` |
| 26 | /pribehy: citát nad jménem | `StoryArchive.module.css:193/:204` |
| 27 | `clamp(` → tokeny `--fs-*`, **nízká priorita**, jen v souborech, na které se stejně sahá | typografie napříč |
| 28 | Žádný display titulek se na 360 px neořízne | `Hero.module.css:67–71` |
| 29 | Čitelný lead na /o-projektu a /zapojte-se (výrok přes fotku, ne drobný pod titulem 9,6 rem) | `PageIntro.module.css:52–69` |
| 30 | Mobilní tap targety z VISUAL-GAPS. **Přepínač v 06 je hotový — nechat.** Zbývá ověřit: „Číst příběh“ v railu (`PeopleStories.module.css:138–142`, `PeopleStories.tsx:255`) a zdroje v Historii (`HistoryTimeline.module.css:125–127`) | viz VISUAL-GAPS M-N2, M-N3 |
| 31 | `<figcaption>` místo · rok · zdroj pod fotkami /pribehy | `StoryArchive` + `media.json` / `stories.ts` |

Jízdenka (`JoinForm.tsx:13, 190–195, 492`, `Ticket.tsx`) a tykání / „Zapoj se“ jsou u Cursora ve W2 + bod 13. V 8a216a7 ještě byly v kódu; stav v e4de4d7 ověř až po pulli.

### 1.4 Zaparkováno pro Clauda (až po mobilu, nízká priorita)

Z GB 02:18 a 02:27 — do KROKU 1 nepatří:

- **O2 R3:** kvalifikátor „Přibližně/Téměř“ na 360 px ~14 px (`Numbers.module.css:202–209`)
- **O2 R5:** trasy na mapě 1,2 px při opacity 0,28 (`EuropeMap.module.css:46–58`)
- **O2 R7:** v menu kapitol chybí u položky čára průběhu (`SiteNav.tsx:197–204`, `SiteNav.module.css:196–207`) — pozor, `SiteNav` může držet Cursor (6230328); před úpravou ověřit zámek
- **Tři homepage kompozice** z `VISUAL-GAPS.md` §3 (Capitolium okna, FC Porto číslo+fotky, Lando spread 04)

---

## 2. Závazná rozhodnutí (Jakub 01:19–01:37)

Znovu se neotevírají jako otázky.

1. **Mobil 360–430 px = priorita č. 1.**
2. **Všude tykat.** Zdroj `bots/texty-tykani-O3.md` (73 míst, v 8a216a7 všech 73 platilo). „Zapojte se“ → **„Zapoj se“**: `SiteNav.tsx:26, 176`, `SiteFooter.tsx:19`, `zapojte-se/page.tsx:7, 16` (O3 uvádí i `ochrana-osobnich-udaju/page.tsx:21`).
3. **Titulky Roboto Flex `wdth` 25–60.** W3 v 8a216a7 už část posunulo (hero wdth 42–56, `--wdth-display: 56`); zbytek ověř na e4de4d7.
4. **Název „Erasmus+ navždy“** v headeru, patičce i `<title>`. Podpis: **„40 let Erasmu+ · 1987–2027 · v Česku od 1998“**. „Erasmus+“ v **Medium 500** (jedna váha). Aria-label loga sladit (`SiteNav.tsx:161`) na „Erasmus+ navždy, úvod“. Nikdy „40 let v Česku“ — ČR od 1998.
5. **Jízdenka z formuláře pryč** (`JoinForm.tsx:13, 190–195, 492`). Není otázka. Náhrada: úsek Trasy (plná / žlutý bod / tečky), mikro-texty v `SOUHRN.md` bod 4. Žádný jiný suvenýr ani vlaková grafika.
6. **Overlay hero filmu** jen gradient za textem, bílý text **kontrast ≥ 4,5:1**. Plošný scrim `.6` (`Hero.module.css:26–27`) zesvětlit mimo text.
7. **Větší claim** v hero. **Průhledný header** místo pruhu a hezčí logo — rozpracovává Cursor, neopravovat.
8. **Hero film a kapitola „Odjezd“ zůstávají** (`content/chapters.ts:3`).
9. **Žlutá jen pro „jsi tady“** (a tvoje akci); na světlém nikdy sama.
10. **Žádné placené služby, API, fotobanky ani fonty.** Jen zdarma, nebo to, co projekt už má.
11. **Jedno WebGL plátno. Reduced motion vždy. Žádný mobilní pin > 100 vh.**

---

## 3. Co NEdělat

Navrhovat ani vracet:

- odjezdovou tabuli
- „40 → ∞“
- jízdenku a vlak v UI
- `/oslava`
- dekorativní ∞ / lemniskátu
- druhé WebGL plátno
- ignorovat `prefers-reduced-motion`
- mobilní pin vyšší než 100 vh
- vymýšlet fotky ani čísla (chybějící materiál = úkol pro Jakuba)
- cokoli placeného
- přepisovat plochy kapitol proti spec 009 (bod 22 řeší jen EU modrou u 04; jinak plochy neměnit, než rozhodne Jakub)
- sahat na header/wordmark `6230328` a další zamčené soubory Cursoru
- znovu otevírat položky z §1.1

---

## 4. Koordinační plán

Po každém kroku krátký stav (čas · commit · co ověřeno). Nálezy posílej přes GB, ne napsat programátorům napřímo.

### KROK 1 — Mobil 360–430 px (priorita č. 1)

Dokončit a ověřit zbývající mobilní body z fronty Cursoru (1–16, 20, 21, 28, zbylé z 30). **Nedělat znovu:** A–C, logo 44 px, přepínač v 06, bod 17.

Zdroje: `DESIGN-AUDIT.md` §1, `VISUAL-GAPS.md` §1, bod 30 (M-N2, M-N3).

**Hotovo, když** na **360 px i 430 px**:

- nic nepřetéká (`scrollWidth` = šířka viewportu na `/`, `/pribehy`, detailu, `/zapojte-se`)
- titulky se nesekají ani neořezávají (`overflow: clip` u display, bod 28)
- header nic nepřekrývá (claim, titulek filmu, CTA, první řádek sekce)
- tap targety **≥ 44 px** (zbylé: patička, menu, hero CTA, stanice, checkboxy, mapa, kvíz, „Číst příběh“ v railu, zdroje Historie, odkazy po odeslání)
- žádný pin nad 100 vh
- filtry /pribehy dají najevo posun nebo se sbalí
- Tehdy/teď skládá „Dnes“ pod sebe (bod 16)
- kontrast bílého textu v hero ≥ 4,5:1

**Kontrola:** O4 (vizuál, mobil, typografie, kontrast). Doplňkově O3 u textového zalomení a tykání v UI, O5 u mapy.

- **Oprava D (GB audit 03:08, priorita 2, mobil):** výběrová tlačítka pod mapou jsou moc úzká (Porto 36×44 px). `EuropeMap.module.css:121–130` (`.selection button`): místo `padding: 8px 0` dát `padding: 8px 6px; min-width: 44px`. Kontroluje O5 (mapa) a O4 (mobil).

### KROK 2 — Zaparkované položky O2 (nízká priorita, až po KROKU 1)

1. **R3** — kvalifikátor čísel čitelný na 360 px (`Numbers.module.css:202–209`). **Hotovo, když** „Přibližně/Téměř“ má aspoň ~16 px / `--fs-meta` a neplete se s KP. **Kontrola:** O5 (Čísla).
2. **R5** — trasy na mapě viditelné (`EuropeMap.module.css:46–58`). **Hotovo, když** tah jde na 360 i desktopu rozpoznat bez ztráty hierarchie Česka. **Kontrola:** O5 (mapa).
3. **R7** — čára průběhu u položky v menu kapitol (`SiteNav.tsx:197–204`). Předem ověřit, že Cursor `SiteNav` uvolnil. **Hotovo, když** aktivní kapitola má stejnou gramatiku Trasy (plná / bod / tečky) a cíl ≥ 44 px. **Kontrola:** O4, identita Erasmus+/EU: O2.

Před úpravou znovu ověř řádky proti e4de4d7.

### KROK 3 — Tři homepage kompozice (VISUAL-GAPS §3, až po mobilu)

1. Vstup do Příběhů: řada oken, první (Tereza) se scrubem roztáhne na spread, rail naváže (Capitolium). Pin jen desktop, v rámci stávajících ≤ 250 vh. Mobil: swipe pás, bez pinu. Reduced: statická řada. **Hotovo, když** přechod 03→04 není tvrdý střih, mobil bez pinu > 100 vh, štítek ilustrace zůstane. **Kontrola:** O4.
2. Čísla: jedno připnuté číslo, kolem něj 3–5 fotek s popiskem místo · rok · zdroj (FC Porto). Hodnoty neměnit. **Blokuje materiál od Jakuba** — bez fotek nenasazovat a nic nevymýšlet. Mobil bez pinu. **Hotovo, když** scéna drží na desktopu, reduced je statické číslo + mřížka, čísla se nezměnila. **Kontrola:** O5 + O4.
3. Kapitola 04 na desktopu: tři střídavé kompozice spreadu (Lando). Plochy kapitoly neměnit (bod 22 / spec 009). Mobil řeší bod 21. **Hotovo, když** tři layouty střídají a reduced je bez vodorovného posunu. **Kontrola:** O4.

Další scény z VISUAL-GAPS (popisky filmu N1, otvíráky Historie, nápady /pribehy) až po tomto, nízká priorita. Archivní fotky k 1987/1998/2004 zase blokuje Jakub.

### KROK 4 — Texty a tykání (O3, až po pulli / po W2)

Z `predavka-O3.md` a `reference-analyza-O3.md`:

1. Po pushi W2 (tykání, jízdenka, „Zapoj se“) grep v `src/`: `Zapojte|Vaše|Váš|vám|Vás|jste|můžete`. Má být 0, kromě právních textů, pokud je Jakub nechce tykat. Soupis 73 míst: `texty-tykani-O3.md`. Viditelné nápisy mimo formulář: `Future.tsx:67, 75` „Vaše cesta“, `Numbers.tsx:121–122`, `JoinForm.tsx:184` (O3 R6).
2. Ověřit bod 24 na 360 px (každý popisek na jednom řádku, znění z `texty-cisla-O3.md`) a bod 23 (v hero není „Erasmus v Česku 1987 — 2027“, jen rozhodnutá signatura).
3. Textové body po mobilu: **R3** jedna sada názvů kapitol (`chapters.ts:3–10` vs `Pathfinder.tsx:6–15`; SOUHRN bod 3 navrhuje Návrat · Rozvětvení · Pokračování — sladit jednu sadu, kotvy `id` neměnit); **R5** CTA rozkazem a tykáním (`Hero.tsx:265` „Objevovat příběhy“ → „Objev příběhy“, „Číst příběh“ → „Čti příběh“, `Future.tsx:79, 83`); **R9** řazení archivu: tři volby včetně „Podle roku“, pod kartou vždy jméno; **R10** detail: titul je trasa a jméno, `figcaption` místo a rok (navazuje na bod 31), title s „Erasmus+ navždy“. Dále R8 (jedna věta k gestu u railu, pak zmizí) a R12 (kickry sentence case, signatura s tečkami jen na určených místech).

**Hotovo, když** grep tykání je čistý, signatura a popisky čísel sedí, názvy kapitol jsou jedna sada na 360 i desktopu. **Kontrola:** O3.

Jízdenka: pokud po pulli v e4de4d7 ještě je, dokončit odstranění (W2 / `SOUHRN.md` bod 4). **Kontrola:** O3 + O4.

### KROK 5 — Zbytek z předávek O4 a O5 (po KROCÍCH 1–4, nízká priorita)

Ověřit proti e4de4d7, ať se nezdvojuje práce Cursoru.

Z O4 (`predavka-O4.md`, `audit-O4.md`):

- Zbylé hex a scrimy na tokeny (`Hero.module.css:27`, `PageIntro.module.css:27`, hranice polí `JoinForm.module.css:152` #9fb2c6, 2,17:1). Bod 27 jen v souborech, na které se stejně sahá.
- Citát ve spreadu Příběhů stáhnout na `--fs-lead` / 400 (DESIGN §6.04; řádek dopadu je hotový).
- Animační nápady až potom: N1 (ustoupivší věta + kurzor v popiscích filmu / kvízu), N2 (odpovědi kvízu jako pilulky ≥ 44 px), M10 (kvíz s Trasou), pak M4 a M6+M7+M8 (spec 009 — větve a smyčka v 06/07). SOUHRN body 1–2 a 6–9 jsou podklad, ne souběžný zásah do toho, co Cursor ještě drží.
- O4 N5 (logo, titul a claim jednou bílou) souvisí s headerem — počkat na push 6230328.

Z O5 (`predavka-O5.md`, `audit-O5.md` N1–N6): audit je proti 2ef276a / částečně 5cb80bf — **před zadáním přeověřit** na e4de4d7 (velikosti mohly změnit tokeny a W3). Platí-li dál: vybraná větev v 07 se má poznat bez dalšího obrysu (ztlumit ostatní, žlutý bod „tady jsi“; stanice už má 3px EU rámeček), měřítko větví, dvojí odhalení 411 400, hierarchie KPI vs. doprovod, význam kmene, `<h4>` pod `<h2>` (`Numbers.tsx:119, 182, 190`). D10 v DESIGN-AUDIT. **Kontrola:** O5.

Z O3 auditu: **N5** platí dál v 8a216a7 — `.nowReach` typograficky vedlejší (`ThenNow.module.css:270–275, 289–291`). **Kontrola:** O3 + O4.

**Hotovo, když** nálezy buď sedí v e4de4d7, nebo mají ověřenou opravu a kontrolu příslušného bota.

---

### Kontrola po každém Claudově pushi (schválil GB 03:10)
Mobil O4, texty a tykání O3, identita Erasmus+/EU O2, Čísla a mapa O5, vždy proti nové kopii main. GB výsledky ověří a předá dál.

## 5. Otevřené otázky a úkoly pro Jakuba

Rozhodnuté věci (tykání, jízdenka, název webu, wdth, claim, průhledný header) sem nepatří.

**Otázky** (z `DESIGN-AUDIT.md` §4; nyní neblokují KROK 1):

1. Má web působit víc jako součást rodiny Erasmus+ (blue i jako plocha), nebo jako samostatná výstava s minimem značky? Teď plochy podle spec 009 neměnit.
2. Kvízová karta má `border-radius: 28px` (`EraQuiz.module.css:167`), DESIGN povoluje 0/2/4 px: je „samolepka“ záměrná výjimka?
3. Podoba podpisu „navždy“ vedle značky: menší (O4), nebo stejně velký (O3)? Váha je rozhodnutá: Medium 500, bez žluté a bez kurzívy. Na mobilu podpis skrýt, pokud se nevejde.
4. Volitelně: odsouhlasit podobu loga na náhledu (O5; O4 může připravit 2 varianty, až bude 6230328 venku).

**Materiál — nic nevymýšlet, nic z fotobanky, nic placeného** (`jakub-rano-O3.md`):

1. 3–5 vlastních nebo volně použitelných fotek pro sekci Čísla (scéna s protékajícími fotkami, KROK 3.2).
2. Archivní fotky ke stanicím Historie 1987, 1998 a 2004 (celoplošné otvíráky).
3. Volitelné a neblokující: heslo k referenci champions4good.com — bez něj reference odpadá.

Právní texty: zda tykat i zásady ochrany osobních údajů, neověřeno / ať rozhodne Jakub.

---

- **Otázka (GB 03:08):** poster hero filmu pořád ukazuje zamítnutou tabuli ODJEZD. Vyměnit poster za snímek bez tabule? Jaký?
- **Otázka (GB 03:08):** `TrainSequence` v `PeopleIntro.tsx:105` (v e4de4d7; v box kopii 8a216a7 `:102`) je pod otázkou kvůli zamítnutému motivu vlaku v UI. Ponechat, nebo odstranit? Do rozhodnutí Jakuba neměnit.

## 6. Poznámky ke zdrojům a jistotě

- Box nemá e4de4d7. Co GB označil za hotové, ber jako hotové a po pulli jen ověř. Co je ve frontě Cursoru, neoznačuj za chybějící, dokud to nevidíš v e4de4d7.
- `DESIGN-AUDIT.md` je k c48165a (01:52). `VISUAL-GAPS.md` a předávky O2–O5 jsou proti 8a216a7, s výjimkou staršího auditu O5 (N1–N6). Řádky po dalších commitech ověř znovu.
- `SOUHRN.md` (01:35) je interaktivní podklad (spec 007–009, mikro-texty). Bod 10 je hotový. Bod 4 (jízdenka pryč, potvrzení na Trase) platí. Body 1–3 a 5–9 ber až po mobilu a po uvolnění souborů.
- MotionPath není zapnutý. Bod po lince přes `path.getPointAtLength()` (už `EuropeMap.tsx:65–78`).
- Reference, které se nenačetly (Ivress jen loader, noomo, část WebGL referencí O2, champions4good heslo), nenesou nález jako živý důkaz.

---

*Konec předávky. Čas dokončení: 15. 11. 2026, 03:10 Europe/Prague. Zahrnuté předávky: O2, O3, O4, O5.*
