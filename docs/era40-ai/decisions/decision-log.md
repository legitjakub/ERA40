# Decision log

Formát: ID · datum · rozhodnutí · důvod · kdo. Nová rozhodnutí přidávej nahoru.

## Rozhodnutí

| ID | Datum | Rozhodnutí | Důvod | Kdo |
|---|---|---|---|---|
| D-015 | 15. 11. 2026 | **Orchestrace Claude × Codex:** Claude je kreativní ředitel a orchestrátor, Codex implementuje přes briefy (`docs/orchestration/`). Fáze 0 hotová, fáze 1 zahájena. Motiv **nekonečného pokračování příběhu** je nově povinný jako smysluplný motiv (ne ikona, ne dekorace). Nahrazuje zamítnutí dekorativní verze v D-005. Stávající web se rozvíjí, nepřepisuje. | Jakub: Master Orchestration Prompt | Jakub / Claude |
| D-014 | 14. 11. 2026 | Podle podkladů zadavatele (interní, mimo Git v `docs/private/`) sladěn claim webu („Erasmus+ již 40 let mění životy“, „Cesta končí. Zkušenost pokračuje.“) a přidán kvíz `/tvoje-era` (6 typů v jazyce Trasy, nálepka PNG, bez osobních údajů). Hero titulek beze změny (D-002). Motiv nekonečné linie z KV zadavatele **čeká na Jakuba** (konflikt s D-005). | Jakub: materiály + „udělej plán a udělej to“ | Jakub / Claude |
| D-013 | 14. 11. 2026 | Pilot 005A / spec 006 (fotografie Příběhy → Evropa) dokončen a ověřen na :3000. Opraveny přestavování triggeru, falešné zrušení ruční volby a přímé kotvy kapitol. Specifikace 001–004 se automaticky neimplementují. | Jakub: „Yes, finish 005A“ | Jakub / Claude |
| D-012 | 14. 11. 2026 | Jakub vybral specifikaci 001 k prototypu. Prototyp v1 zveřejněn jako soukromá stránka, produkce beze změny. | Jakub: „001 Gramatika Trasy“ | Jakub / Claude |
| D-011 | 14. 11. 2026 | Fáze 11: mapa schopností, kreativní jazyk (gramatika Trasy), audit přechodů a specifikace 001–004 ve stavu **návrh**. Produkční komponenty beze změny. Vlastní kurzor, druhý WebGL canvas a scrub hero filmu záměrně nenavrženy. | Pokyn Jakuba (Fáze 11), DESIGN §7, Global UI | Claude, čeká na Jakuba |
| D-010 | 14. 11. 2026 | Zřízena znalostní báze `docs/era40-ai/`, projektové skilly a workflow s povinným schválením před produkční změnou | Pokyn Jakuba (AI Creative Development System) | Jakub / Claude |
| D-009 | 14. 11. 2026 | Web oslavy (stránka `/oslava`, řádek akce, registrace, navržený program, interaktivní plánovač) **vrácen** revert commity b22f71b, 4c97a78, 0064e14 | Jakub: „tohle všechno vrať“ | Jakub |
| D-008 | 14. 11. 2026 | Nepoužívat Animaxxing „full treatment“ ani `style-animaxxing` | Jeden hlavní pohyb na kapitolu, vlastní identita | Claude (podle DESIGN §4) |
| D-007 | 14. 11. 2026 | **Otevřené:** sjednotit CSS `--ease-out` (easeOutCubic) a GSAP `power3.out` | Dva easingy pro „out“ | čeká na Jakuba |
| D-006 | 13.–14. 11. 2026 | Odmítnuto kolo „jízdenka a vlak“ (vizuální prvky navíc) | Jakubovi se nelíbilo | Jakub |
| D-005 | 13. 11. 2026 | Odmítnuto kolo „40 → ∞“ (brána 40 a nekonečná Trasa) a vráceno | Efekty navršené na web | Jakub |
| D-004 | 13. 11. 2026 | Odstraněna odjezdová tabule přes hero film | Rušila úvod | Jakub |
| D-003 | 13. 11. 2026 | Podstránky mají vizuálně navazovat na homepage (PageIntro foto/modrá + Trasa) | První generická podoba se nelíbila | Jakub |
| D-002 | 11.–13. 11. 2026 | Úvod (film, „Některé cesty změní všechno.“) zůstává | Jakub je s ním spokojený | Jakub |
| D-001 | 11. 11. 2026 | Identita Erasmus+ modrá, Roboto Flex, Trasa, české texty, označené modelové příběhy | Brief | Jakub |

## Poučení (nikdy neopakovat)

1. **Jakub nechce efekty navršené na hotový web.** Tři kola odmítnuta (D-004–D-006) a čtvrté vráceno (D-009). Nové věci jen přes specifikaci a schválení. Malé, řemeslné a s důvodem.
2. Nepředstírat fakta: data akcí, účinkující, čísla bez zdroje. Návrh vždy viditelně označit.
3. Před buildem ověřit, že CSS Module selektory obsahují lokální třídu (`[data-x]` samotný neprojde Turbopackem).
4. Restart produkce: ukončit proces **podle PID** z `lsof -tiTCP:3000`. `pkill -f "next start"` nechal starou instanci nad novým buildem, a ta vracela chyby 500.
5. Display nadpisy s diakritikou: line-height ≥ 1,0 (háček Č zasahoval do řádku nad).
6. Klikání Playwrightem během Lenis/hash scrollu je nespolehlivé. Pro formuláře používat `focus()` + klávesu.

7. Google Fonts nedodá variabilní osy Roboto Flex (vrací statický 400). V prototypech vkládat woff2 projektu.

## QA nálezy (výchozí stav 14. 11. 2026, `qa-viewports.mjs` na :3000)

- ✅ 0 page errors, 0 chyb konzole, 0 horizontálního přetečení na 1440/1280/1024/390/375/360 a v reduced motion.
- ⚠️ 360 px: CTA „Objevovat příběhy“ v hero se zalamuje na dva řádky (`360-down-000.jpg`).
- ℹ️ Štítek modelových příběhů „MODEL STORY – FICTIONAL PLACEHOLDER“ je **záměrný integritní štítek** a neodstraňovat ho. Zda ho počeštit, je otázka pro Jakuba.
- ⚠️ 1440 px uprostřed railu Příběhů: text předchozího příběhu je ořezaný u levého okraje (`1440-down-050.jpg`). Ověřit, zda je to záměr přechodu.
- ⚠️ PageIntro na podstránkách má `line-height: 0.95`, háček Č se dotýká řádku nad (pozorováno 14. 11.).
- ℹ️ Lenis + ScrollTrigger: chybí `gsap.ticker.lagSmoothing(0)` doporučené v README Lenisu. Ověřit, zda je to záměr.
- ℹ️ `networkidle` na desktopu trvá 7–13 s kvůli stahování videa. Neznamená to LCP, změřit `shoot.mjs`.
# Vizuální návrh 005 — poznámky Codexu, 14. 11. 2026

**Není schváleným designovým rozhodnutím.** Návrh všech kapitol a izolovaná předávka Příběhy → Evropa jsou v `motion/specs/005-connected-scenes-direction.md`; čekají na Jakubovu vizuální revizi. Produkční komponenty se neměnily.

Poučení z prototypu: podklad je nutné usadit dříve než nadpis, jinak mezisnímek ztrácí kontrast; popisek fotografie nesmí škálovat do nečitelné velikosti; na mobilu se nesmí původní linka nechat procházet přes citaci. Scroll a resize mají oddělené plánování a měření musí resetovat vlastní transformaci mapy. Důkazy a limity: `prototypes/005-connected-scenes/QA.md`.

Věcná oprava podkladů: mapa už obsahuje skutečné příchozí i odchozí cesty. Původní návrh 002 má pozastavenou implementaci do opravy koncepce; nevymýšlet návrat ke každému příběhu. Aktuální výrazně dlouhý desktopový rail potřebuje samostatný návrh tempa, nikoli prosté několikanásobné zrychlení textů.
