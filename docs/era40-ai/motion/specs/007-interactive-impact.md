# 007 — Zkušenost pokračuje: interakce napříč webem

14. 11. 2026 · pokračování Jakubem autorizovaných úprav a průběžného main. Zachovává existující web, osm kapitol, evropskou modrou, Roboto Flex a Trasu.

## Účel

Čtenář má poznat také to, co zkušenost změnila a kde pokračuje. Interakce umožní vybrat téma, propojit číslo s lidským příkladem a pokračovat k příběhu. Pohyb poskytuje okamžitou zpětnou vazbu, obsah nečeká na dokončení animace.

Úplné interní zdroje a jejich rozlišení jsou v lokálním `docs/private/codex-2026-11-14/CONTEXT.md`; v Gitu zůstává pouze tento realizační výtah bez interních rozpočtů, jmen a obrazových materiálů. Podklady jsou zadání obsahu, nikoli další oprávnění k publikování, výdajům či změně identity.

## Konkrétní první dávka

1. **Archiv:** nový filtr „Co pokračuje dál“ — učení a výuka, práce a dovednosti, vztahy a komunita, odvaha. Stav v URL `dopad`, společný s existujícím typem, směrem a pohledem. Obnovitelný po návratu z detailu. Filtry mají čitelný název a dostupný reset, mobil používá přirozený posuvný řádek.
2. **Příběh:** krátké shrnutí pokračování a odkazy do tematického archivu. Metadata se týkají pouze současných modelových příběhů a při nahrazení skutečným příběhem se nesmějí automaticky zdědit bez zdroje.
3. **Čísla:** sloupce oblastí vzdělávání se stanou ovladatelnou volbou. Pod grafem se zobrazí jeden související modelový příklad; přesná čísla, zdroj a období zůstávají. Vzdělávání dospělých bez přítomného příběhu ukáže pravdivou výzvu k doplnění. Žádný výpočet domnělého společenského násobitele.
4. **Tehdy a teď:** přímé volby „Tehdy / Obojí / Teď“ doplní stávající tažení a šipky. Každá ruční volba definitivně převezme dělič od vedeného scrollu. Témata ani ilustrační fotografie se nevydávají za skutečný archiv z konkrétního roku.
5. **Závěr:** plná linka doputuje k otevřené stanici, za ní pokračuje tečkovaně. Už existující CTA a kvíz zůstávají funkční; žádná smyčka, odpočet ani nový pin.
6. **Kvíz:** vizuálně sjednotit téma záhlaví a nezávisle zkontrolovat obě cesty, fokus, návrat, stažení a omezený pohyb. Kvíz je zábavná interpretační aktivita; rozložení výsledků v testových kombinacích není výzkum publika.

## Vztah k referencím

- Getty Tracing Art: data mají čitelný kontext a návaznost na konkrétní příběh.
- Inkwell: další volba pokračuje ve stejné zkušenosti; nové moduly nevytvářejí odlišnou identitu.
- Paper Planes: vztah lidí a míst má význam, nikoli samovolně poletující dekoraci.
- Rozvětvení z koncepčních podkladů: jedna zkušenost může pokračovat různými směry. Pro první dávku jej vyjadřují témata, související příběhy a otevřená Trasa.

## Stavy a choreografie

**INITIAL:** obsah čitelný před animací, výchozí filtr z URL. **INTRO:** žádné nové velké odhalení. **AMBIENT:** žádné smyčky. **INTERACTION:** odezva button/focus do `DUR.xs`, výměna příkladu jen krátkým opacity; existující View Transition archivu zůstává. **REVERSE:** Back obnoví URL a výběr; návrat ze stránky příběhu nevymaže filtr. **MOBILE:** nativní scroll, dostupné cíle alespoň 44 px, bez nových pinů. **REDUCED:** stejný výsledek ihned, bez animace výměny.

Přístupnost: `aria-pressed`, pojmenované skupiny tlačítek, status počtu výsledků a sémantické odkazy. Neoznamovat čtečce všechny měnící se fotografie; oznamovat volbu / počet, celý obsah je dostupný ve čteném pořadí.

Technika: React state pouze při interakci, CSS transition / View Transition v existujícím archivu, současný GSAP pro existující graf a finální linku. Bez závislostí, druhého Lenisu a dalšího canvasu.

## Další pořadí

Po této dávce prototypovat historii → lidi a porovnání → čísla ze směru 005. Redakční CMS, kalendář a partneři potřebují konkrétní obsah a provozní rozhodnutí; nevyplňovat je fiktivním programem. Rozšíření příběhového formuláře o předání zkušenosti, tvorba skutečných ilustrovaných avatarů a zapojená analytika mají samostatný implementační rozsah. Nezaměňovat je za hotové funkce.
