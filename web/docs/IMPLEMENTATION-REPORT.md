# Implementace a výsledky kontroly

Dokončený lokální prototyp je dostupný na [localhost:3000](http://127.0.0.1:3000). Kontrola proběhla 13. listopadu 2026 v Chromium. Zdrojová aplikace je ve složce `web/`, předané podklady v Downloads byly použity jako nový vizuální a obsahový základ.

## Obsah a interakce

| Kapitola | Výsledek |
|---|---|
| Hero | Dva vlastní střihy filmu, AVIF postery, pauza a ruční přehrání, maskované řádky, kinetické písmo, desktopový přechod do rámu |
| Prolog | Čtení slov podle scrollu, podtržení Trasou, 88 snímků z okna vlaku s průběžným načítáním |
| Historie | Roky 1987–2027, české připojení 1998 a první výjezdy 1998/1999, dvě linky, proměna roku a fotek, svislá mobilní varianta |
| Příběhy | Osm odlišných modelových příběhů, horizontální desktopový rail, nativní mobilní swipe, společný Flip detail a přímé odkazy |
| Evropa | Lokální vektorový podklad Natural Earth, přesné souřadnice příběhů v obou směrech, body a seznam se stejným detailem |
| Tehdy a teď | Tři tematická porovnání, ovládání šipkami a dotykem, ruční zásah přebírá řízení od scrollu |
| Čísla | Doložené hodnoty, konkrétní období, zdroje a datum kontroly v datech, animované počty a sektorové pruhy |
| Budoucnost | Závěrečná Trasa, zápis a stažení vzpomínky do zařízení, sdílení odkazu a oficiální CTA |

Statistická data za výzvy 1998–2023 byla znovu zkontrolována proti PDF DZS. Rozpočtový údaj patří výzvě 2026. Modelové postavy a jejich citace mají označení MODEL STORY – FICTIONAL PLACEHOLDER. Fotografie i film jsou ilustrativní.

## Výkon

Poslední samostatné mobilní měření s přednačtením posteru je v [Lighthouse reportu](../qa/lighthouse-preload.report.html). Starší reporty zachycují průběh optimalizace, včetně prvního LCP přibližně 6,2 s.

| Metrika | Naměřeno | Cíl |
|---|---|---|
| Lighthouse performance | 98 / 100 | Laboratorní skóre |
| Lighthouse accessibility | 100 / 100 | Automatizovaná kontrola |
| Mobilní LCP | 2.41 s | < 2,5 s |
| CLS | 0.029 | < 0,05 |
| Počáteční moderní JS, gzip | 192,264 B (187.8 KiB) | < 200 kB |
| Písmo Latin + Latin-ext | 85 012 B | Lokální soubory s českými znaky |
| Desktop MP4 | 3,842,466 B | ≤ 4 000 000 B |
| Desktop WebM | 3,171,833 B | ≤ 4 000 000 B |
| Mobil MP4 | 1,632,880 B | ≤ 2 000 000 B |
| Mobil WebM | 1,625,941 B | ≤ 2 000 000 B |

Počáteční JS měří součet souborů deklarovaných v HTML pro moderní prohlížeč. Legacy `nomodule` polyfill je oddělený. Odložené ScrollTrigger, Lenis, Flip, delší texty a WebGL se do tohoto počátečního součtu nezahrnují. Kompletní data jsou v `qa/handoff-checks/initial-js.json`.

Lighthouse je laboratorní měření se simulovaným mobilním prostředím. Výsledek nepředstavuje ověření terénních Core Web Vitals ani formální certifikaci WCAG. Reálný přejímací test na telefonu patří k finálnímu uvedení projektu.

## Funkční testy

- Build, lint a TypeScript prošly.
- 15 kontrol přístupnosti a klávesnice prošlo.
- 13 rozšířených funkčních kontrol prošlo.
- Obrazová sekvence skutečně mění vykreslený obsah canvasu podle scrollu.
- WebGL byl dostupný, shader vykresloval fotografii během pohybu a `gl.getError()` vrátil 0.
- Návrat na začátek obnovil plnou viditelnost úvodního titulku.
- Testovaný fallback bez WebGL ponechal všech osm příběhů a fotografie dostupné.
- Změna reduced motion za běhu odstraňuje piny, zastavuje automatické přehrávání a ponechává ruční ovládání videa.
- Ověřeny byly přímé odkazy na příběhy, browser Back, Escape, návrat fokusu, ruční posuvník, změny orientace, mobilní swipe a skutečné stažení textové vzpomínky.
- Audit produkčních npm závislostí ohlásil 0 zranitelností.

Podklady jsou v `qa/handoff-checks`, `qa/interactions` a `qa/motion`. U automatických pravidel kontrastu zůstávají i ručně posuzované položky nad fotografiemi. Ztmavení hero filmu bylo zvýšeno na 60 %, aby byl čitelný i nad světlým záběrem kufru.

## Vizuální kontrola

Pro každou kapitolu bylo pořízeno pět poloh, návrat na začátek a reduced-motion varianty. Rozsahy pinů pocházejí ze skutečných ScrollTrigger instancí. Kontaktní listy `qa/round-1` a `qa/release` byly prohlédnuty, závěrečné snímky jsou v `qa/handoff`.

| Kapitola | 1440 × 900 | 1024 × 768 | 768 × 1024 | 390 × 844 | 375 × 812 |
|---|---|---|---|---|---|
| Hero | OK, rámování | OK, pin | OK, volný scroll | OK, vlastní střih | OK, vlastní střih |
| Prolog | OK | OK | OK | OK | OK |
| Historie | OK, pin | OK, pin | OK, svisle | OK, svisle | OK, svisle |
| Příběhy | OK, rail | OK, rail | OK, swipe | OK, swipe | OK, swipe |
| Mapa | OK | OK | OK, pod sebou | OK, pod sebou | OK, pod sebou |
| Tehdy a teď | OK, sticky | OK, sticky | OK, ručně | OK, ručně | OK, ručně |
| Čísla | OK | OK | OK | OK | OK |
| Budoucnost | OK | OK | OK | OK | OK |

V posledním automatizovaném průchodu nebyla zjištěna chyba konzole, chybějící asset ani vodorovný přetok celé stránky. Kontrolovaný horizontální posun patří pouze galerii příběhů.

[Desktopový průjezd](../qa/handoff/walkthrough-1440.webm) a [mobilní průjezd](../qa/handoff/walkthrough-390.webm) zachycují postup i návrat.

## Deset zjištěných slabých míst

| Zjištění | Výsledek |
|---|---|
| Překrývání znaků u velkých titulků | Opraveno pevnou optickou velikostí písma a mírnějším trackingem |
| Nesprávný začátek historického pinu | Opraveno prioritami hero → historie → příběhy a refresh po načtení písem |
| Opakování hero nástupu při připravení videa | Odstraněna závislost animace na stavu přehrávání |
| Ztracený fokus po zavření detailu | Opraveno návratem po aktualizaci historie a nativního dialogu |
| Ovládání videa mizelo při změně preference | Opraveno stabilními zdroji a rozlišením chyby media elementu od jednotlivého source |
| Příliš velké písmo ke stažení | Zmenšeno ze zhruba 436 kB na 85 kB |
| Nadměrný počáteční JS a duplicitní geografie | Opraveno odloženým načítáním a samostatným SVG assetem |
| Stejné QA snímky u pinned scén | Opraveno použitím skutečného začátku a konce ScrollTriggeru |
| Chybějící autentické příběhy a finální brand podklady | Zůstávají označené placeholdery podle obsahového zadání |
| Chybějící fyzický iPhone a další enginy | Zůstává přejímací kontrola Safari, Firefox a skutečného zařízení |

## Doladění detailů (13. 11. 2026, druhé kolo)

Revize proti `DESIGN.md` a referencím (Tracing Art: orientace v kapitolách, Paper Planes: spojení míst, Inkwell: souvislá jízda) našla místa, kde motiv Trasa nebo obrazová konzistence nedržely laťku. Upraveno:

| Místo | Problém | Úprava |
|---|---|---|
| Historie, „Dvě linie“ | Česká linka začínala bez stanice a slévala se až před rokem 2004. drawSVG s `non-scaling-stroke` v roztaženém SVG kreslil přerušované úseky | SVG má viewBox ve skutečných pixelech. Evropská linka začíná v roce 1987, česká se v roce 1998 přimkne jako souběžná kolej a jede s ní do 2027. Obě linky mají popisek |
| Historie, fotografie | Čtyři milníky používaly stejné fotky jako modelové postavy (Tereza, Inês, Martin, Lucie a Marta) | Milníky 2004, 2007, 2021–2027 a 2027 mají vlastní, dosud nepoužité snímky z katalogu |
| Příběhy | Rail neukazoval, kde čtenář je. Spodní část pinu zůstávala prázdná | Trasa pod railem: stanice pojmenované podle destinací, žlutý postup, počítadlo 01 / 08 s městem. Stanice jsou tlačítka a vedou na příběh. Na mobilu je řídí nativní swipe |
| Fotografie | Stock snímky z různých zdrojů působily nesourodě | Jednotný jemný grade a statické zrno v rámech fotografií (`[data-grain]`), vypnuto při `prefers-contrast: more` |
| Závěr | Trasa končila uvnitř obrazu | Osm stanic příběhů, ohyb, prázdná stanice „Vaše cesta“ a linka odjíždí za pravý okraj obrazovky |
| Patička | Chyběl pás vydavatele a financování z `DESIGN.md` | Pás s DZS a EU znakem s viditelnou poznámkou, že čeká na potvrzení |
| Hero | Při autoplay před hydratací tlačítko ukazovalo „Přehrát“ | Stav se po připojení načte z elementu videa |

Ověřeno: typecheck, lint, produkční build, `qa-checks` (15/15 včetně axe), průjezd 1440 × 900 a 390 × 844 bez chyb konzole a bez vodorovného přetoku, klik na stanici a mobilní swipe.

## Podstránky a sběr kontaktů (13. 11. 2026, třetí kolo)

Inspirace ověřená živě: 100 Lost Species (archiv s pohledy a filtry), Paper Planes (zapojení návštěvníka vlastním místem), Tracing Art (panel O projektu, obrazy kolem titulku), Persepolis (vstupní rituál). Nic z toho se nekopíruje. Převzaté jsou jen principy.

| Prvek | Řešení |
|---|---|
| Hero | Odjezdová tabule byla po zpětné vazbě odstraněna (působila jako widget nad filmem). Místo ní titulky filmu podle střihu v `docs/HERO-VIDEO-SHOTLIST.md`, linka postupu filmu a rok 2027 nabíhající z 1987 |
| Úvody podstránek | Jazyk hero homepage: fotografie pod ink závojem (Zapojte se: cestovní deník, O projektu: plakát filmu) nebo modrá plocha s pásem fotek příběhů (archiv), žlutá Trasa na spodní hraně, průhledná hlavička |
| `/pribehy` | Archiv s filtry podle typu pobytu a směru, pohledy Fotografie (nepravidelná redakční mřížka) a Rejstřík (typografický seznam s pevným fotografickým panelem), přechod přes View Transitions |
| `/pribehy/[id]` | Samostatné stránky příběhů s mapkou trasy z Natural Earth, fakty, celým textem a odkazem na další cestu |
| `/zapojte-se` | Jeden formulář, tři cesty. Živý náhled osobní jízdenky, stažení jako PNG 1200 × 630, sdílená validace klient i server, skryté pole proti botům, limit odeslání |
| `/o-projektu`, `/ochrana-osobnich-udaju` | Ověřená fakta se zdrojem, pravidla práce s příběhy, návrh informací o zpracování s viditelně označenými místy k doplnění |
| Navigace | Tlačítko Zapojte se v hlavičce, odkazy na podstránky v menu Kapitoly a v patičce, závěrečné CTA vede na formulář |

Ověřeno: typecheck, lint, build (21 stránek, příběhy předrenderované), `qa-checks` 15/15, `qa-interactions` (kromě měření pinů, které vyžaduje build s `NEXT_PUBLIC_ERA_QA=1`), vlastní průchod 43/43 (stavy stránek, přetečení, filtry, prázdný stav, validace, odeslání, stažení jízdenky, ochrana API) a axe WCAG 2.2 AA na všech nových stránkách na desktopu i mobilu bez porušení.

## Před veřejným uvedením

Nahradit nebo schválit modelové příběhy a ilustrativní film. Potvrdit vydavatele, oficiální logo a financování konkrétního webu. Doplnit případné jmenné kredity ze zdrojových stránek. Rozhodnout o ponechání historických statistických období nebo jejich aktualizaci.

Veřejný sběr příběhů potřebuje samostatné redakční a datové řešení. Nynější formulář ukládá kontakty lokálně do `data/kontakty.ndjson` a nabízí stažení vlastní jízdenky jako PNG. CRM ani rozesílka zatím nejsou připojené. P2 prostorová scéna zůstává návrhem v `docs/PLACEHOLDERS.md`.


## Integrace a skilly (13. 11. 2026, Codex + Claude Code)

Nová koordinovaná revize zachovává filmový úvod a závaznou art direction. Claude Code dokončil vizuální sjednocení podstránek a provedl nezávislé review; Codex integroval výsledek a opravil jeho konkrétní nálezy.

- Celoplošné menu s fotografickým náhledem, přímý odkaz Archiv, správná aktivní kapitola jen na homepage a mobilní počítadlo. Nativní dialog drží fokus a vrací ho na tlačítko.
- Skoky mezi kapitolami vycházejí ze stabilních pin spacerů. Posun má jednoho vlastníka, takže se nekříží s automatickými kotvami Lenisu. U nepřipnutých sekcí se respektuje odsazení pod hlavičkou i na mobilu.
- Lenis běží jen na homepage desktopu. Po změně stránky se jeho ticker, listenery a kinetická typografie uklidí. Čtecí stránky a formuláře mají nativní scroll. Přepínač omezeného pohybu platí pro GSAP i CSS.
- Filmové titulky se mění při přechodu na skutečný střih, nikoli React renderem při každém snímku. Postup filmu mění pouze transformaci DOM prvku. Postery filmu se přednačítají jen na homepage.
- Archiv drží filtry a pohled v URL. Zpět z detailu tak obnoví správné rozložení; asynchronní přechod nezahodí mezitím zvolený filtr.
- Přímé odkazy na tři větve formuláře fungují i jako kotvy. Vyplněné údaje zůstávají při chybě odeslání, čekání blokuje dvojí odeslání a povinná pole jsou sémanticky označená. Rok je validovaný skutečně v rozsahu 1987–aktuální rok. Do záznamu se ukládají pouze údaje z vybrané větve.
- Neplatný neobjektový JSON v kontaktním API vrací 400. Ověření úspěšného odeslání a jízdenky používá mock API, osobní ani existující testovací kontakty nebyly změněny.

Na žádost uživatele byly do obou agentů nainstalovány oficiální GSAP skilly, Awwwards, React a Web Interface Guidelines od Vercelu a společný workflow `cinematic-websites`. Seznam zdrojů a způsob vyvolání jsou v `CREATIVE-SKILLS.md`; root `CLAUDE.md` zajišťuje projektový kontext pro další práci. Instalace nerozšiřuje oprávnění k publikování webu.
