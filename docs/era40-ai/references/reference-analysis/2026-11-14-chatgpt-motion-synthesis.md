# Reference z ChatGPT a živá revize — 14. 11. 2026

Codex · Chromium / Playwright · desktop 1440 × 900, mobil 390 × 844.

## Rozsah čtení

- `docs/03-reference-library.md`: širší knihovna 25 referencí; `docs/04-top-10-references.md`: priorita pro Erasmus a veřejnou instituci.
- `web/docs/REFERENCE-NOTES.md`: předešlá živá kontrola z 13. 11.; `web/MOTION-REFERENCE-ANALYSIS.md`: historický technický rozbor. Technická tvrzení z těchto dokumentů nebyla automaticky přijata jako popis aktuální implementace.
- Fáze 11: motion systém, dosavadní specifikace 001–004, kreativní jazyk, audit, capability map a rozhodnutí.
- Přes konektor Codexu otevřeny relevantní ChatGPT chaty **„Reference pro web Erasmu“** a **„Přenos kontextu projektu“**. Konektor vracel nanejvýš 10 tahů a 20 000 znaků výstupu; dlouhé zprávy byly zkrácené. Nejde o tvrzení, že byly přečteny všechny osobní chaty nebo každý znak dlouhých vložených podkladů.
- Pro aktuální návrh znovu otevřeny živé weby níže. Další odkazy z ChatGPT jsou rozlišené jako kontext, nikoli předstíraná nová vizuální pozorování.

## Nově zachycené odkazy z ChatGPT

| Odkaz | Role v návrhu / stav |
|---|---|
| [Extrafazant / Over](https://www.extrafazant.nl/over) | Jakubův konkrétní podnět k přechodu. Živě prohlédnuto, včetně velkého modrého tahu přes hranici do tmavého závěru. |
| [Floema](https://floema.com/) | Živě prohlédnuté střídání obrazových ploch, textu a kategorií. |
| [The Watch](https://thewatch.60fps.fr/) | Živě zobrazen 3D objekt a velká typografie po loaderu. Princip kontinuity objektu; v této revizi ne kompletní rozbor všech 3D fází. |
| [Telefónica 100](https://www.telefonica100.com/) | URL dnes vedla na běžný korporátní web Telefónica. Historický výroční zážitek proto nebyl znovu vizuálně ověřen. |
| [Stanford GSB Centennial Timeline](https://gsbhistory.stanford.edu/) | Viditelný úvod, stupnice desetiletí a pokyny pro přístupnost. Kolečko v tomto průchodu neposunulo úvod; nepřisuzujeme mu neviděnou choreografii. |
| [100 CGU](https://100.cgu.edu/) | Kontext výročního projektu; v tomto kole bez nové živé vizuální kontroly. |
| [Braun 100 years — case study](https://camelweb.com/en/case-studies/braun-100-years-of-design-in-motion) | Kontext výroční prezentace; bez nové vizuální kontroly. |
| [Pendragon Cycle](https://pendragoncycle.com/) | Filmový kontext; bez nové vizuální kontroly. |
| [GQ — The Extraordinary Lab](https://www.gq.com/sponsored/story/the-extraordinary-lab) | Redakční / produktový kontext; bez nové vizuální kontroly. |
| [Ponpon Mania](https://ponpon-mania.com/) | Kontext hravosti; bez nové vizuální kontroly. Nezakládá přidání herního světa do ERA40. |
| [100 Lost Species](https://www.100lostspecies.com/) | Nový pokus vrátil prázdnou scénu. Historické hodnocení zůstává historickým podkladem. |
| [Atelier UI — Codrops](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/) | Článek načten přes Firecrawl. Technické principy DOM/canvas synchronizace; nikoli pokyn instalovat jeho poskytovatele a Motion do projektu s GSAP. |
| MagicPath `peaceful-flood-5117`, `daringly-space-4939` | Starší konceptové odkazy z předání kontextu. Nepovažovány za nově schválený design ani aktivní implementaci. |

Historický návrh v ChatGPT pracoval také s jinými fonty a motivem 40 → ∞. Přednost má aktuální DESIGN a novější Jakubova rozhodnutí. Nejde o oprávnění tyto odmítnuté podoby obnovit.

## Živá pozorování — ověřeno

Snímky: `../screenshots/2026-11-14-motion-synthesis/`. Přípony `wheel-25/50/75` označují **tři pořadové kontrolní body po dávkách skutečných událostí kolečka**. Nejde o změřené procento celé stránky; některé reference mají vlastní vnitřní scroll nebo časované intro. `reverse` zachycuje návrat a `mobile` nový vstup při menší šířce. Ne všechny uložené snímky jsou novou analýzou celé reference.

| Web | Co bylo skutečně vidět | Důkaz / pozorovaná technická stopa |
|---|---|---|
| **Extrafazant** | Světlý úvod s typografií, rozvolněné fotografie týmu, velký modrý tah překračující přechod do černé kontaktní sekce. Návrat a mobil byly zachyceny. | `extrafazant-ready.jpg`, `extrafazant-wheel-25.jpg`, `extrafazant-reverse.jpg`, `extrafazant-mobile.jpg`. Ve window dostupné GSAP 3.15.0 a 9 ScrollTrigger instancí, třída Lenis, bez canvasu. |
| **Floema** | Kategorie přebírají velké fotografické plochy. Přes vodorovnou hranici je vidět předchozí a následující obraz; stejná oblast hostí text a navigaci kategorie. | `floema-wheel-25.jpg`, `floema-wheel-50.jpg`, `floema-mobile.jpg`. Třída Lenis, 3 canvasy; konkrétní rendering backend tím není prokázán. |
| **Inkwell** | Stejné malé fotografie se ze vstupního rozptýlení uspořádají do vodorovné řady a pak kruhu kolem textu. Kontinuita prvků je čitelná. | `inkwell-ready.jpg`, `inkwell-wheel-25.jpg`, `inkwell-wheel-50.jpg`, `inkwell-reverse.jpg`. Třída Lenis a jeden canvas; nevyvozujeme konkrétní interní knihovnu. |
| **Getty Tracing Art** | Skupina obrazů přejde k jednomu hlavnímu obrazu s popiskem, vysvětlením a časovou linkou. Obraz a text mají odlišné fáze důrazu. | `tracing-art-ready.jpg`, `tracing-art-wheel-50.jpg`, `tracing-art-mobile.jpg`. 15 dostupných ScrollTrigger instancí, třída Lenis, jeden canvas. |
| **Persepolis** | Po načítání a vstupu se objeví široký filmový pohled na místo; text „Getty presents“ je chvíli jedinou textovou vrstvou. | `persepolis-ready.jpg`, `persepolis-wheel-50.jpg`. Jeden canvas. Tato revize nedokládá všechny další kapitoly ani přesné řízení kamery. |
| **The Watch** | Po loaderu se objevil plastický model hodinek s velkou typografií a drobnými vysvětlujícími bloky. | `the-watch-start.jpg`, `the-watch-scroll.jpg`. Jeden canvas; samotná přítomnost nedokládá Three.js. |
| **Stanford** | Pevná typografická plocha vedle fotografie, výroční časový index, dostupné klávesnicové instrukce. | `stanford-ready.jpg`, `stanford-wheel-50.jpg`. Žádný canvas ani dostupné globální GSAP. Scroll se v tomto pokusu nepohnul. |
| **Paper Planes** | Světlomodré úvodní pole s malou vlaštovkou. V dostupném čase se nepodařilo projít celou zkušenost. | `paper-planes-ready.jpg`. Jeden canvas; propojení lidí/míst přebíráme z předchozího projektového rozboru, ne z tohoto nedokončeného průchodu. |

## Předpoklady o technice — odděleně

- Přeskupení fotografií v Inkwell lze pro ERA40 napodobit principem jednoho měřeného rámu, transformací a GSAP. To **neznamená**, že stejné řešení používá Inkwell.
- Přesah tahu v Extrafazant může být pro ERA40 inspirací návaznosti Trasy nebo hrany rámu. Přesný originální SVG/maska/DOM mechanismus zde nebyl izolován. Pro náš hlavní pilot není morph ornamentu potřeba.
- Floema ukazuje zajímavý vztah obrazové plochy a klidné pozice textu. U ERA40 může být proveden levně přes DOM a masku. Nedokládáme tím kopírování jejich renderovacího systému.
- Časy originálních efektů nebyly změřeny. Časové poměry v návrhu 005 jsou původní ERA40 choreografie, nikoli tvrzení o originálech.

## Překlad do ERA40

1. **Příběhy → mapa:** jeden snímek změní měřítko a pozici, nese stále stejnou osobu; naváže přesná cesta. Inkwell + Tracing Art jako princip kontinuity, Paper Planes jako význam spojení.
2. **Historie → příběhy:** geometrie fotografie vytvoří most mezi společným vývojem a osobní zkušeností. Vývoj obsahu nepředstíráme změnou letopočtu na nesouvisející rok.
3. **Tehdy/teď → čísla:** ze způsobu porovnání přejít k důkazu dopadu, vizuálně navázat hranou a osou. Neanimovat dělič proti ruční interakci.
4. **Čísla → závěr:** baseline pokračuje jako otevřená Trasa, která nechává prostor dalšímu příběhu. Žádné povinné logo ∞ ani nový obřad v hero.

Nepřebíráme cizí palety, serifové identity, ilustrace, hodinky, zakázané přeskočení kapitol, loadery, kurzory, masivní 3D ani celý nový scroll/provider stack. Výsledná [specifikace 005](../../motion/specs/005-connected-scenes-direction.md) navrhuje jeden produkční pilot po samostatném schválení.
