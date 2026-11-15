# CURSOR-CONTEXT — kontext pro Cursor agenta (ERA40)

Sestavil Grok Bot (dohled) 15. 11. 2026 v 01:00 SEČ z CLAUDE.md, AGENTS.md, web/AGENTS.md, web/docs/*, docs/orchestration/*, docs/agent-briefs/*, specifikací 001–009, decision logu, Jakubových zpráv v Claude a Codex sezeních a souhrnu podkladů DZS. Soubor je netrackovaný, **negituj ho** (žádné `git add`).
Při rozporu platí: **nejnovější Jakubův pokyn > decision-log > JAKUB_TASKS > CLAUDE.md/AGENTS.md > DESIGN.md > starší rešerše.** DESIGN.md je místy zastaralý (hero „departure board ticker“ v §1 a ink pozadí 07 v §6 už neplatí).

## 1. Co je ERA40 a hlavní příběh

- Digitální výstava / microsite ke **40 letům evropského programu Erasmus (1987–2027)**. Česko je v programu **od roku 1998**. Vydává DZS (Dům zahraniční spolupráce). Identita = **Erasmus+**, ne DZS.
- **Nikdy:** „40 let Erasmu v Česku“, „40 let ČR v EU“, „30 let“. Správně „40 let Erasmu“, „Česko je u toho od roku 1998“.
- Insight zadavatele (Strategický brief DZS, souhrn `JAKUB-SUMARIZACE-1511` §1): hodnota Erasmu **vzniká až po návratu** a předává se dál, i lidem, kteří nikdy nevyjeli.
  - Narativní osa: **ZÁŽITEK → ZKUŠENOST → ZMĚNA → DOPAD**.
  - Klíčová věta briefu: „Jedna zkušenost může změnit stovky dalších životů.“ Web má vyprávět: „Jedna zkušenost se vrací domů a pokračuje v životech dalších lidí.“ (§15)
  - U každého příběhu je nejdůležitější otázka „Co se stalo potom? Komu jsi to předal/a?“, ne „Kde jsi byl/a?“.
- Čemu se vyhnout (§2): nostalgii jako hlavnímu sdělení, studentským klišé jako jediné rovině, oslavě čísla 40 bez významu, webu jako institucionálnímu archivu, sebechvále.
- Claimy nejsou finálně uzavřené (§3), je potřeba **jedna hierarchie**:
  - Web dnes používá „Erasmus+ již 40 let mění životy“ (podpis/metadata), „Některé cesty změní všechno.“ (hero titulek, schválený D-002) a „Cesta končí. Zkušenost pokračuje.“ (závěr 08).
  - Pracovní „500 000“, „16 milionů“ ani násobitele dopadu **nejsou ověřené** údaje.
- **Nekonečno** je dnes povinný motiv (D-015), ale **jen s významem**: přenos zkušenosti a pokračování. Nesmí to být ikona ani dekorace (§3, §15).
  - Zvolený kreativní **směr A, „Linka, která se vrací a pokračuje“** (D-016, `docs/orchestration/CREATIVE_DIRECTIONS.md`): Trasa odjede z Česka, obkrouží zážitek, vrátí se domů a tam se **rozvětví k dalším lidem**. Smyčka ∞ = cesta tam a zpět.
  - Gramatika Trasy (spec 001): plná = ujeto, žlutý bod = tady jsi, tečkovaná = budoucnost.
- Osm kapitol (`content/chapters.ts`, kotvy povinné): `#hero` Odjezd · `#pribehy-intro` Prolog · `#historie` · `#pribehy` · `#mapa` · `#tehdy-ted` · `#cisla` · `#budoucnost`. Podstránky: `/pribehy`, `/pribehy/[id]`, `/zapojte-se` (sběr kontaktů a příběhů), `/tvoje-era` (kvíz), `/o-projektu`, `/ochrana-osobnich-udaju`.

## 2. Co Jakub chce od hlavní stránky a co zamítl

Citace jsou doslovné (bez diakritiky, jak psal). Časy v SEČ. Zdroj: C = Claude sezení `~/.claude/projects/-Users-jakubhrncir-ERA40/c71e376a…jsonl`, X = Codex Desktop sezení `~/.codex/sessions/2026/11/13/rollout-…19-10-51…jsonl`.

**Chce:**
- 13. 11. 18:57 (C): „da se rici ze jsem spokojenej celkem ale jeste k tomu chybi par detailu veci at je to top!“ → **zlepšovat, ne restartovat** (CLAUDE.md „Co Jakub chce“).
- 13. 11. 20:35 (C): „Uvod se mi libi ale potrebuju tam dat dalsi nejake hezke prvky … podstranky … sber novych kontaktu“.
- 13. 11. 21:52 (C): „nevidim tam ale nejaky moderni design je to takove vse ai … dej tam nejake pohybujici prvky … 40 let … pojdme to udelat fakt moderni“.
- 13. 11. 22:15 (C): „spodni sekce ty jsou divne … nejsou hrave moc popremyslej vse poradne“.
- 14. 11. 21:00 (X): „jak bychom to mohli vice rozhybat jednotlive sekce prechody mezi sekcemi at je to hrave hezke a dle zameru“.
- 14. 11. 21:28 (X): „a co hlavni stranka … vyuzij fakt vsechny prostredky … davej do main pushuj“.
- 14. 11. 23:33 (X): „chceme proste interaktivni web totalne tedy udelej prvky ktere tam vsude budou a proste at je to top“.
- 14. 11. 23:48 (X): „nelibi se mi ale jak pracoval claude je to divne vsechno chci proste aby web byl vice interaktivni … aby vychazel ze skillu … bylo to totalne interaktivni“.
- 15. 11. 00:12 (C): „procisti i nasi sablonu od nesmyslnych prvku … chci to mit ciste a hezke“.
- 15. 11. 00:31 (C): „nelibi ty spodni sekce na hlavni strance tak klidne at se ty sekce nejak pozmeni nemusime pracovat s tim co mame ted muzeme to uplne nejak premenit dle planu“ → spec 009 (D-017).
- 15. 11. ~01:00 (Grok Bot, Jakub): hlavní stránka **pořád neodpovídá jeho požadavku**. Cursor má pokračovat na homepage.

**Zamítl (nevracet):**
- 13. 11. 21:01 (C): „ta tabule na hlavnim banneru taky divny“ a podstránky. → **Odjezdová tabule zrušena** (D-004, i na `/o-projektu`). Podstránky mají navazovat na homepage (D-003).
- 13. 11. 22:28 (C): „tohle se mi nelibi vrat tyhle zmeny a i ty predchozi“. → Vráceno kolo **„40 → ∞“** (brána 40, lemniskáta, roll hover; D-005) a kolo **„jízdenka a vlak“** (jízdenky, vlaky na mapě, jednotkový graf, FutureTicket; D-006).
- 14. 11. 19:46 (C): „tohle vsechno vrat a udelej tohle: ERA40 ADVANCED AI CREATIVE DEVELOPMENT SYSTEM…“ → vrácena vymyšlená **`/oslava`**, řádek akce v hero, registrace a program (D-009). Event/koncert tedy **nedávat** na homepage bez nového pokynu.
- Obecně: efekty navršené na web, „AI look“, dekorativní ∞ (D-005, PLAN-OSLAVA „Poučení“).

**Platí a nesahat bez pokynu:** úvodní film + „Některé cesty změní všechno.“ (D-002), identita Erasmus+ modrá / Roboto Flex / Trasa (D-001), označené modelové příběhy.

## 3. V čem současná homepage NEsplňuje požadavek (prioritně)

Stav kódu: `cc3f6d1` + necommitovaná práce Clauda (06/07) a CDX-005 (08). `app/page.tsx`: Hero → PeopleIntro → SceneHandoffs[HistoryTimeline → JourneySequence[PeopleStories → EuropeMap] → ThenNow → Numbers] → Future.

1. **P0 — Homepage končí u zážitku, ne u dopadu.**
   - `people/PeopleStories.tsx` ukazuje jen citát (`<blockquote>„{story.quote}“`, ř. ~230). Obsah „co pokračuje dál“ z `content/story-impact.ts` (spec 007) používá jen archiv (`archive/StoryArchive.tsx:17`), na homepage ne.
   - Prolog (`people/PeopleIntro.tsx:11–12`) končí „Každý se vrátil trochu jiný.“, tedy změnou jednotlivce, ne předáním dál.
   - Rozporuje to hlavní insight (souhrn §1, §15; AGENTS.md „Klíč“; směr A krok 5 „pod ní věta co pokračuje dál“).
   - Návrh: v pásu Příběhů ke každému člověku dopadová věta (lead velikost) a smyčka tam → domů; v prologu pointa o předání.
2. **P0 — Lidé, kteří nikdy nevyjeli, jsou na homepage skoro neviditelní.**
   - Cesta „Na Erasmu: 0 dní“ existuje jen v kvízu (`content/era-quiz.ts`, `/tvoje-era`) a nově jednou větou v 08 (CDX-005).
   - Brief i spec 009 („Perspektiva neúčastníků a institucí“) chtějí ukázat pokračování ke studentům, kolegům, škole, rodině. Souhrn §2: „Erasmus ovlivňuje i lidi, kteří nikdy nevyjeli.“
3. **P0 — Smysluplné nekonečno / „vrací se a pokračuje“ na homepage chybí.**
   - D-015 ho dělá povinným, směr A ho definuje (smyčka tam a zpět, větvení po návratu).
   - Hero má jen rovnou Trasu (`hero/Hero.tsx` `data-hero-track`, `trail`). M02 „smyčka přes nulu ve 40“ je jen prototyp 010 mimo produkci (`16b83e5`, MOTION_BIBLE M02 ⬜🧪) a **vyžaduje Jakubovo schválení**, protože vizuálně se blíží zamítnutému D-005.
   - Příběhy a mapa smyčky (cesta tam a zpět) nemají.
4. **P1 — Málo skutečné interaktivity a „vše AI“ dojem.**
   - Jakub opakovaně chce „totalne interaktivni“ a „hrave“. Většina homepage je ale přehrávání při scrollu.
   - Návštěvník aktivně volí jen v dialogu příběhu, na destinacích mapy a v posuvníku tehdy/teď.
   - Chybí, aby návštěvník sám rozvinul řetěz pokračování (např. vybrat člověka → ukázat, komu zkušenost předal; vlastní bod „Vaše cesta“ až na konci).
   - Interakce musí nést příběh, ne efekt (DESIGN §3–4, D-008).
5. **P1 — Design nekonzistentní (ověřený audit botů 15. 11. 00:54).**
   - Claim nemá hierarchii: v hero je „Erasmus+ již 40 let mění životy.“ jen malý intro řádek (`Hero.tsx` ř. ~258, `Hero.module.css` claim ≈ velikost data), „Cesta končí. Zkušenost pokračuje.“ až v 08.
   - Typografie: ~19 hodnot `font-weight` a ~17 `wght` (820/830/840/845/850), tokeny škály používá jen zlomek `font-size`, `--fs-meta` je 13 px a DESIGN chce 14–15 px.
   - Trasa mění barvu mezi kapitolami (modrá / Erasmus+ modrá / žlutá / sky / bílá), takže nečte jako jedna linka.
   - Žlutá dělá ~5 rolí. Má mít jen „tady jsi / tvoje akce“.
   - Česko na mapě je `#a9c6df` na `#d6e4ef` (`map/EuropeMap.module.css:47/53`), tedy slabý kontrast „domova“.
   - Fokus `#007fc7` na EU modré má ~2,2:1 (`globals.css:62`).
   - Plný audit sestavuje Obecný 1 do 01:45 jako `DESIGN-AUDIT.md`.
6. (Info) **06–08** se právě přestavují podle spec 009 (Claude 06/07, CDX-005 08). Tohle **není práce pro Cursor**.

## 4. Pravidla práce

- **Porty:** `:3040` dev (HMR, veškerá QA). `:3000` produkce `next start`. **Build a restart :3000 vlastní Claude**, Cursor nikdy nerestartuje ani nebuildí souběžně.
- **Koordinace:** jediný seznam přidělení je `web/docs/CLAUDE-COORDINATION.md` (`Codex-COORDINATION.md` je jen alias).
  - Před prací tam zapiš „Cursor (Grok Bot) — přidělení“: úkol, přesné cesty, rezervace.
  - Po práci zapiš report a „soubory uvolněny“.
  - Jeden zapisovatel na soubor. Cizí soubory jen po výslovném „soubory uvolněny“.
- **Postup animace (fáze 11):** reference → rozbor → ERA40 choreografie → izolovaný prototyp → revize → **výslovné schválení specifikace** v `docs/era40-ai/motion/specs/` (stav „schváleno“) → produkce → QA → poučení do `docs/era40-ai/decisions/decision-log.md`.
  - Bez schválené spec na produkční komponenty nesahat. Schválený prototyp neznamená schválenou integraci.
  - Spec 001–004 jsou „návrh“, 005 je schválený směr, 006–008 hotovo, 009 schváleno.
- **QA před předáním:** `npm run typecheck`, `npm run lint`, prohlížeč na 8 šířkách: 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 390×844, 375×812, 360×780 (`ORCHESTRATION.md` §7, `web/scripts/qa-viewports.mjs`).
  - Vždy otestovat i reduced motion, scroll vpřed/zpět/rychle, kotvy + Back, klávesnici, konzoli, přetečení, axe a u pohybu FPS/LCP/CLS.
  - Screenshoty **skutečně prohlédnout**.
- **Push:** do `main` jen ověřené dávky po review (Jakub 15. 11. 00:39: „Yes, allow pushes“). Přesný seznam souborů, nikdy `git add -A`. Neověřené nepushovat. **Nenasazovat/nepublikovat.**
- **Technika:** GSAP jen z `src/lib/gsap/setup.ts`, scény přes `useScene`, **jedna** instance Lenisu, **jeden** WebGL canvas (`people/distortion.ts`), Flip/DrawSVG/SplitText z GSAP.
  - Zachovat osm kapitol, `data-section`, kotvy, `scroll-margin-top` 64 px.
  - Video ovládání i při reduced motion. Podstránky nesahají na GSAP scény homepage.
  - `web/AGENTS.md`: tohle **není Next.js z tréninku**. Před kódem čti `node_modules/next/dist/docs/`.
- **Data a pravdivost:** `web/data/` = osobní údaje, nikdy commit/mazání. `docs/private/` nikdy do Gitu.
  - Nevymýšlet statistiky, příběhy, citace, místa, partnery, termíny ani násobitele dopadu.
  - Modelové příběhy mají viditelný štítek „Modelový příběh – ilustrační“. Stock/AI média mají štítek „Ilustrační snímek/video“.
  - Čísla vždy s obdobím a zdrojem (411 400 = DZS, výzvy 1998–2023; nikdy „aktuálně“).
- **Design tokeny** (`web/src/styles/tokens.css`, DESIGN §2):
  - `--c-eu-blue #004494`, `--c-eplus #007fc7` (jen text ≥24 px a grafika), `--c-eplus-ink #006ba8` (odkazy/malý text), `--c-yellow #ffed00` (jen akcent na modré/ink, **nikdy text na bílé**, <5 % plochy), `--c-ink #0b1b33`, `--c-paper #fff`, `--c-sky #eaf3fa`, `--c-mute #4f5b6e`, `--c-line #c9d6e3`.
  - Poměr ploch ~60 % bílá/sky, ~30 % modrá.
  - Písmo jen Roboto Flex (`--font-brand`). Display `wght` 800–900, `wdth` 25–60, text 400/100, meta 14–15 px 600 sentence case. Grid 12 sloupců, max 1440. Radius obrázky 0, ovládací prvky 2 px. Trasa 2 px (mobil 1,5), stanice 10 px.
- **Tvrdé zákazy** (DESIGN §3, §9; PLAN-SUMMARY §4): obrysová/průhledná obří čísla, glow/neon/bokeh, přechody a gradient text, glassmorphism, karty v kartách, tři stejné karty, ikonové dlaždice, emoji, dekorativní ∞/částice/3D bloby, anglické mikro-labely, ALL-CAPS eyebrow, „A · B · C“ meta, šipka za každým odkazem, uniformní fade-up, vlastní kurzor, loader, serif, krémové pozadí.
  - Dále: odjezdová tabule, jízdenky, vlaky na mapě, FutureTicket, roll hover, `/oslava`.
  - Nepřidávat efekt jen proto, že ho skill umí. Platí jeden hlavní pohyb na kapitolu a max. dva podpůrné.

## 5. Kdo teď drží které soubory (stav 15. 11. 00:59) — Cursor na ně NESMÍ sahat

| Vlastník | Cesty | Stav |
|---|---|---|
| **Claude** (spec 009, 06 Návrat + 07 Rozvětvení) | `web/src/components/then-now/**`, `web/src/components/numbers/**`, `web/src/components/scenes/SceneHandoffs*` (cíl 008B) | rozpracováno, necommitováno |
| **Claude** (necommitované, mimo tabulku přidělení) | `components/hero/Hero.tsx` (opt-in velocity skew), `components/layout/SmoothScroll.tsx`, `components/archive/StoryArchive.module.css` (úklid B, filtry 390 px) | upraveno v posledních 10 min. **Hero a SmoothScroll brát jako Claudovy.** |
| **Claude** | build a restart `:3000`, `docs/orchestration/JAKUB_TASKS.md`, `web/docs/CLAUDE-COORDINATION.md` (Cursor tam smí jen připsat svou sekci) | trvale |
| **Codex exec CDX-005 → převzal Claude** | `web/src/components/future/**` | Codex hotov (report 00:57, necommitováno), čeká na Claudovo review. Claude v 00:54 převzal veškerou zbývající práci Codexu. |
| Codex desktop | nic | vše uvolnil (007/008 pushnuto `cc3f6d1`) |

- **Codex limit:** `tools/codex-usage.sh` v 00:59 hlásil primary **96 %** (reset 04:32). Nové úkoly pro Codex se nezadávají.
- **Volné pro homepage práci Cursoru (po zápisu přidělení):** `components/people/PeopleStories.*`, `people/PeopleIntro.*`, `people/JourneySequence*`, `history/**`, `map/**`, `content/story-impact.ts` (jen čtení/rozšíření bez vymýšlení), `styles/tokens.css` (opatrně, sdílené).
- **Riziko překryvu:**
  - `app/page.tsx` a `scenes/SceneHandoffs*` obalují i Claudovy kapitoly 06/07. Strukturu stránky **neměnit** bez dohody s Claudem.
  - Změny tokenů a `globals.css` ovlivní i Claudovy 06/07 a CDX-005 08. Ohlásit je předem v koordinaci.
  - Hero je Jakubem schválený (D-002) a právě v něm má Claude necommitovanou změnu. **Nesahat.**

## 6. Které skilly kdy použít (`~/.cursor/skills`, symlinky na `~/ERA40/.agents/skills` a Codex/Claude skilly)

Projektové pořadí (CLAUDE.md „Kreativní vývoj“):
1. `era40-reference-analyst`: když je nová reference nebo URL. Otevře web v prohlížeči a oddělí ověřené od domněnek. Kód nemění.
2. `era40-motion-director`: návrh pohybu nebo přechodu **před kódem**. Výstup je spec se stavy INTRO/AMBIENT/OUTRO/REVERSE/MOBILE/REDUCED a choreografií do `docs/era40-ai/motion/specs/`, ke **schválení Jakubem**.
3. `era40-creative-developer`: implementace **jen schválené** spec v Next 16 + GSAP 3.15 + Lenis, bez nových závislostí.
4. `era40-visual-qa`: po každé změně layoutu nebo pohybu. 8 šířek, vpřed/zpět/rychle, reduced, klávesnice, axe, výkon, prohlédnuté screenshoty.
5. `era40-creative-refinement`: po QA, nebo když Jakub řekne „generické / AI / ploché / moc“. Výsledek je kritika a konkrétní úpravy či škrty (česky).

Řemeslné skilly (CREATIVE-SKILLS.md):
- `cinematic-websites`: načíst **první** u filmové/immersive práce.
- `awwwards`: laťka kvality a návaznost scén.
- `frontend-design`: redakční kompozice bez AI klišé.
- `gsap-core/timeline/scrolltrigger/react/plugins/utils/performance/nextjs`: implementace a cleanup.
- `react-best-practices`: výkon React/Next.
- `web-design-guidelines`: přístupnost, formuláře, review UI.
- `animate`, `choreograph`: rozhodnutí, zda a jak animovat, a koordinace více prvků.
- `find-animation-opportunities`, `improve-animations`, `review-animations`: audit a review pohybu, jen čtení.
- `animation-performance`: rozpočet snímků.
- `playwright`: prohlížečové QA a screenshoty.
- `animaxxing*`: **nepoužívat** (D-008).

## 7. Stack

- Next.js **16.4** (App Router, Partial Prefetching, `next dev` přepisuje `web/AGENTS.md`), React **19.3**, TypeScript, CSS Modules, `@fontsource-variable/roboto-flex`.
- GSAP **3.15** (ScrollTrigger, SplitText, DrawSVG, Flip) přes `src/lib/gsap/setup.ts` + `useScene.ts`. Lenis (`layout/SmoothScroll.tsx`, `lerp 0.1`, vypnuto při reduced). Jeden WebGL1 canvas (`people/distortion.ts`).
- Obsah v typovaných souborech `src/content/*.ts` (stories, story-impact, milestones, stats, chapters, era-quiz), připravený pro headless CMS.
- Média: `media.json` (licence a původ), `media-images.json`, SVG mapa (`scripts/rebuild-vector-assets.mjs`).
- Kontakty: `src/lib/contacts/schema.ts` + `store.ts` → `data/` (lokálně, ne CRM).
- Kód je ve `~/ERA40/web`, dokumentace v `~/ERA40/docs` (orchestrace, briefy, reporty, `era40-ai` znalostní báze).
- Spuštění Cursoru: `agent -p --model claude-opus-5-5-max --force "<brief>"` v `~/ERA40`.

## Ověřený design audit (Grok Bot, 15. 11. 01:48, proti origin/main 5cb80bf)
Viz CLAUDE-COORDINATION.md: zápisy 01:44, 01:47 (mobil 1–10) a 01:48 (minima display písma, dělení slov, --section-pad na mobilu, křížek menu ≥ 44 px). Rozhodnutí z 01:22 a 01:31 platí. Hotovo a vyřazeno: --fs-meta 14 px, focus ring, progress bar, rail.

## Vizuální návrhy z referencí (Grok Bot, 15. 11. 02:20, VISUAL-GAPS O1 ověřené na origin/main 8a216a7)
V CLAUDE-COORDINATION.md: zápis 02:27, bod 30 (tap targety 06/04/Historie ≥ 44 px) a bod 31 (/pribehy figcaption „místo · rok · zdroj“, nic nevymýšlet). Pro Clauda zaparkované až po mobilu: okna 03→04 rozbalená do railu, připnuté číslo v 07 s proudem fotek (fotky dodá Jakub), střídavé spready 04 na desktopu. Vzor headeru je Floema (bez pruhu, jen přebarvení, na mobilu menu v pilulce). Platí: jedno WebGL plátno, reduced motion, na mobilu žádný pin nad 100 vh.
