# 005 — Příběh mění měřítko. Člověk zůstává.

**Stav: směr schválený k postupné realizaci.** 14. 11. 2026, Codex.

Jakub po prohlédnutí návrhu a prototypu zadal: „jinak celkem ok … vše co budeš mít hned dávej do main pushuj … a pokračuj s dalšíma“. Tím autorizoval postupné úpravy homepage i ostatních stránek v tomto směru a průběžný push ověřených dávek do `main`. Níže zůstává původní návrh a jeho technická rizika; integrační podrobnosti se zaznamenají před každou dávkou. Nové knihovny ani zásadní změna identity nejsou součástí tohoto souhlasu.

Rozsah: režie osmi stávajících kapitol a sedmi hranic; jeden izolovaný prototyp předávky Příběhy → Evropa. Účel: **spojuje**. Frekvence: jednou při průchodu, vratně při scrollu zpět.

## Kreativní rozhodnutí

Web má silné samostatné scény. Další úroveň vznikne tím, že obraz, rám nebo směr pohybu přežije hranici kapitoly. Čtenář sleduje jednu cestu: **odjezd → odvaha → společná historie → konkrétní člověk → Evropa → každodenní změna → doložený dopad → vlastní příběh**.

Hravost bude v reakci na čtenáře a v proměně měřítka. Fotografie se přesune do mapového příběhu; výběr místa naváže na tutéž osobu; porovnání odpoví na tah; závěrečná Trasa nechá místo pro další cestu. Jeden výrazný děj v každé scéně. Mezi nimi dost času na čtení.

Vizuální jazyk zůstává: Erasmus+ modrá, ink, bílá/sky, střídmá žlutá, Roboto Flex, Trasa. Žlutý bod označuje aktuální pozici, nikoli další dekoraci. Čtyřicet let se čte z letopočtů 1987–2027; případná roční stupnice má 40 intervalů a 41 hranic. „Navždy“ vyjadřuje pokračující vztah a otevřená závěrečná cesta.

## Co skutečně ukazují podklady

Přečtena širší knihovna a shortlist, historické storyboardy, poznámky implementace, Fáze 11, rozhodnutí, zdrojové komponenty a relevantní chaty ChatGPT „Reference pro web Erasmu“ a „Přenos kontextu projektu“. Nynější živé reference a míra ověření jsou v [referenční syntéze](../../references/reference-analysis/2026-11-14-chatgpt-motion-synthesis.md). Starší návrhy v chatech se podřizují novějším schváleným pravidlům.

| Reference | Konkrétní princip pro tento návrh |
|---|---|
| [Getty Tracing Art](https://www.getty.edu/tracingart/) | Zůstává rozpoznatelný obraz; kontext a měřítko se mění kolem něj. Čtení střídá obrazové přesuny. |
| [Inkwell](https://inkwell.tech/) | Stejné fotografie projdou několika prostorovými kompozicemi. Přechod vypráví, nemusí začínat nová animace od nuly. |
| [Extrafazant / Over](https://www.extrafazant.nl/over) | Grafický tah přesáhne hranici světlé a tmavé sekce. U ERA40 přebíráme návaznost směru, nikoli cizí modrý ornament. |
| [Floema](https://floema.com/) | Obrazy přebírají plochu a text si drží opakovatelnou klidovou pozici. Vhodné pro rytmus historie a příběhů. |
| [Persepolis](https://persepolis.getty.edu/) | Filmový celek, omezené množství textu v jeden okamžik. ERA40 už má vlastní filmový vstup. |
| [The Watch](https://thewatch.60fps.fr/) | Udržení jednoho objektu při změně měřítka. Pro ERA40 fotografický rám; 3D hodinky nejsou návrhem obsahu ani technologie. |
| Paper Planes | Význam propojení lidí a míst z existujícího briefu. Nový průchod se nedostal za úvod; nová detailní choreografie se z něj nevyvozuje. |

## Současný stav a největší příležitosti

Kontrola běžícího webu na :3000 při 1440 × 900 a 390 × 844 a čtení aktuálních zdrojů:

1. Hero už má film, titulky, pohyb písma i změnu do rámu. Další hlavní efekt by soupeřil se schváleným úvodem.
2. Historie už používá milníky a odhalování fotografií; smysl má sjednotit jejich rytmus a závěrečnou předávku.
3. Desktopové příběhy tvoří osm velmi dlouhých panelů. `PeopleStories.tsx` připíná na `scrollWidth - clientWidth`; při 1440 px je za rail vyhrazeno přibližně 10 080 px posunu. To je zásadní téma tempa. Zrychlit všech osm textů na několik obrazovek by čitelnost zhoršilo; změna railu vyžaduje vlastní návrh.
4. Příběhy a mapa už sdílejí fotografie, ale předání obrazu není souvislé. To je nejvhodnější pilot.
5. Mapa už kreslí skutečné `coords.from → coords.to`, včetně Lisabon → Praha. Starší popis „všechno z Prahy“ je nepřesný. Nová práce má zpřehlednit existující směry a skutečné výchozí město vybrané osoby.
6. `ThenNow.tsx` už při scrollu posouvá dělič 84 → 16 %, dokud čtenář nepřevezme ovládání. Vlastnictví po ruční interakci je důležité zachovat. Dělič nemá představovat průběžný historický letopočet.
7. Čísla mají odpočty i pruhy. Další stovky pohybujících se jednotek by zhoršily soustředění na údaj, období a zdroj.
8. `SectionPortal.tsx` existuje jako nepoužitá komponenta; její globální třídy nemají v současném `src` odpovídající styly. Není hotovou přechodovou infrastrukturou. Sedm stejných barevných závor není cílem.

Drobný viditelný detail pro další schválené úpravy: současné příběhy zobrazují anglický status „MODEL STORY – FICTIONAL PLACEHOLDER“. Zachovat jeho jednoznačný význam, ale sjednotit jej s českým označením „Modelový příběh · ilustrační“ a s českým prostředím webu. Prototyp už používá českou podobu; produkční text se v tomto kole neměnil.

## Režie všech osmi kapitol

| Kapitola | Hlavní děj | Doporučená úprava | Klid / odezva |
|---|---|---|---|
| **01 Odjezd** | Film se stává rámovanou vzpomínkou. | Zachovat. Titulek odejde dřív, než se rám výrazně zmenší. Případné doladění časování se opře o současnou sekvenci. | Film má vlastní play/pause. Žádný nový vstupní rituál. |
| **02 Prolog** | Slova skládají osobní rozhodnutí vyjet. | Dokončit zvýraznění věty před výrazným pohybem okenní sekvence. Poslední rám držet pro přechod do historie. | Při čtení se nerozjíždí další text ani titulky. |
| **03 Historie** | Rok a fotografie přibližují jeden milník. | Každému milníku vyhradit přibližně 70–75 % jeho úseku na čtení a zbytek na přechod. Fotografie odhalovat stejným směrem, rok odmaskovat po číslicích jako jeden blok. | Rok, zdroj a označení fotografie zůstávají stabilní. |
| **04 Příběhy** | Lidé procházejí vodorovnou cestou. | U fotografií jemný pohyb uvnitř výřezu, nejvýše cca 4 % rozměru. Zachovat stávající detail přes Flip. Na konci nechat poslední skutečně viditelnou fotografii přejít do mapy. | Citace se nedeformuje; distorze jen ve fotografii a zklidní se po zastavení. Zkrácení railu řešit zvlášť. |
| **05 Evropa** | Zkušenost dostává konkrétní zeměpisný rozsah. | Převzít osobu z příběhů. Vykreslit její trasu od skutečného počátku k cíli a jednou po ní vést žlutý bod. Při výběru další osoby přepnout mapu, fotografii a popisek společně. | Po dojetí vše stojí. Ruční výběr zůstává prioritní, žádný samovolný kolotoč osob. |
| **06 Tehdy a teď** | Čtenář sám odhaluje rozdíl. | Existující vedený vstup zklidnit, po prvním dotyku či klávese už řízení nevracet scrollu. Při změně tématu nejprve vyměnit oba snímky, pak krátce usadit popisky. | Dělič odpovídá prstu a šipkám, nikoli souběžné autonomní animaci. Fotografie jsou ilustrační, ne fingované archiválie z roku 1998. |
| **07 Čísla** | Osobní zkušenost se opře o doložený dopad. | Před počítáním ukázat název metriky a její období. Jedno dopočítání a jeden růst pruhů; držet čitelnost zdrojů. Předávka z děliče viz níže. | Zastavené hodnoty zůstávají finální i při návratu; čtečka čte konečný údaj. |
| **08 Budoucnost** | Dosavadní cesta vytváří prostor pro čtenáře. | Nechat baseline po číslech pokračovat otevřenou Trasou; žlutý bod se usadí u funkčního CTA. Poslední část linky přejde do tečkované budoucnosti. | Text a CTA stojí, linka neběží v nekonečné smyčce. |

Pohyb stránky určuje čtenář. Doporučené poměry nejsou odpočet, který by mu zavíral obsah.

## Sedm předávek mezi kapitolami

`p` označuje místní průběh přechodu 0–1, nikoli procento celé homepage. Výchozí návrh: 40–70 vh již dostupného odchodu/vstupu sousedních scén na desktopu; nepřidávat sedm nových pinů. Přesné rozsahy se změří v integračním pilotu. Každá další významná předávka dostane vlastní prototyp a schválení.

| Hranice | Co přežije střih / choreografie | Mobil a reduced |
|---|---|---|
| **01 → 02: Z filmu do vzpomínky** | Stávající filmový rám. `p 0–.25` titulek odchází; `.2–.75` rám ustoupí; `.65–1` věta prologu získá místo. Film zůstane obrazově dominantní, dokud text není pryč. | Stávající poster a přirozené pořadí sekcí. |
| **02 → 03: Stejné okno, jiný čas** | Předává se obdélníkový výřez a jeho hrana. `.0–.35` dočtení; `.35–.7` okno přejde do geometrie historického snímku; `.65–1` objeví se první rok. Obsah snímku se vystřídá, nevzniká tvrzení, že dnešní záběr je archivní rok 1987. | Dva statické snímky ve čteném pořadí. |
| **03 → 04: Z roku k člověku** | Historický obrazový rám převezme první portrét, plocha přejde do modré. `.0–.25` poslední milník dočíst; `.25–.65` změna rámu a obrazu; `.55–.85` nástup jména; `.85–1` citace. Letopočet 2027 se nemění v rok osobního příběhu 2019 jako by šlo o pokračování chronologie. | Fotografie a nová kapitola v přirozeném toku; krátký fade do 0,3 s pouze při běžném pohybu. |
| **04 → 05: Z člověka do Evropy** | Tatáž fotografie přejde do mapového doprovodu, původ a cíl se stanou skutečnou trasou. **Prototypováno níže.** | Dvě hotové kompozice, bez přeletu a bez pinu. |
| **05 → 06: Z místa do zkušenosti** | Mapa odjede jako plocha; výřez prvního tématu porovnání převezme stejnou oblast obrazovky. Krátká svislá Trasa naváže na dělicí čáru. `.0–.3` dopovědět osobu; `.3–.7` předat rám; `.65–1` ukázat oba tematické popisky. Nepřevádět skutečnou trasu konkrétní osoby na tvrzení o datu ilustrační fotografie. | Mapa, pak porovnání. Zachovat nativní dotykové ovládání. |
| **06 → 07: Z rozdílu k dopadu** | Hrana porovnání předá osu první metriky. Původní interaktivní dělič se NEOTÁČÍ pod rukou; až po opuštění scény se jeho neinteraktivní vizuální pokračování stáhne do osy. `.0–.25` dozní téma; `.25–.6` tmavá plocha získá rám; `.5–.75` osa; `.7–1` první údaj s obdobím. | Svislá kapitola s konečnými čísly; nepřidávat pin. |
| **07 → 08: Z výsledku k vaší cestě** | Spodní baseline grafu pokračuje do otevřené Trasy. `.0–.3` zůstávají údaje čitelné; `.3–.7` linka změní kontext; `.6–.85` závěrečný claim; `.85–1` bod a CTA. Žádný skok, který by vynechal porovnání v kapitole 06. | Konečná linka a CTA ihned; smysl zůstává bez kreslení. |

## Pilot 005A — Z člověka do Evropy

**Jednovětý koncept ke schválení:** Tatáž fotografie přejde z osobního příběhu do mapového doprovodu a současně se otevře jeho skutečná evropská cesta.

Ukázka: [lokální náhled](http://127.0.0.1:3070) · [zdroj prototypu](../../prototypes/005-connected-scenes/README.md). Tereza a Inês slouží revizi obou směrů. Produkce musí převzít poslední viditelný příběh, nyní v pořadí Lucii a Martu / Bologna; nesmí po railu bez vysvětlení vrátit první Terezu. Návrat z mapy musí vrátit tutéž fotografii i stejnou pozici railu.

### Obsazení

- **Lead:** jediný obrazový rám. Na desktopu mění polohu a rovnoměrné měřítko, fotografie se nedeformuje.
- **Support:** přesná trasa a jednou projíždějící žlutý bod; nástup cílové kompozice.
- **Static:** jméno, citace, zdroje, modelový status a popisek snímku po usazení.
- Bez ambientní dekorace. Text není shaderová textura.

### Stavy

| Stav | Úplné chování |
|---|---|
| **INITIAL** | SSR produkce zachová čitelný příběh a mapu. Enhancement se aktivuje teprve po dostupné fotografii, fontech a změřené geometrii. Při chybě zůstane přirozený tok. |
| **INTRO** | Rail dokončí poslední stanici. Osobní citace má prostor na dočtení; nepřepíná se osoba. |
| **AMBIENT** | Žádný pohyb. Výběr místa, fokus a otevření detailu zůstávají použitelné. |
| **OUTRO** | Citace odchází, stejný snímek se přesune do doprovodu mapy, mapa a její nadpis převezmou plochu. Zdrojové město a cíl se připojí k projekci skutečných souřadnic. |
| **REVERSE** | Deterministický scrub vrací tutéž osobu, fotografie nezmizí a nevykreslí se podruhé. Ruční výběr mapy po předávce se při vracení respektuje nebo přehledně resetuje až mimo aktivní interakci; přesné pravidlo musí potvrdit integrační pilot. |
| **MOBILE** | Pod 1024 px bez létající fotografie a bez scroll pinu. Mapa převezme zvolenou osobu datově; obrazové kompozice následují za sebou. V izolované revizi je lze přepínat tlačítky. |
| **REDUCED** | Stejné informace a finální trasa, bez přesunů, parallaxu a dopočítávání. Přímé odkazy ani ovládání se nevynechávají. |

### Choreografie pilotu

| Prvek / role | Začátek p | Délka v p | Pohyb a vztah |
|---|---:|---:|---|
| Čtený příběh / static | 0 | .13 | Výchozí kompozice stojí. |
| Původní citace / support | .13 | .17 | Opacity 1 → 0, y 0 → −28 px. Odejde před průchodem fotografie. |
| Podklad / support | .21 | .24 | Modrá přejde do schválené sky. Dokončit včas, aby mezisnímek neměl slabý kontrast. |
| Sdílený rám / lead | .25 | .44 | Do cílového rámu přes rovnoměrný scale + x/y, `EASE.inOut`. Bez rotace a bez natažení obličeje. |
| Mapa / support | .34 | .21 | Opacity 0 → 1, jemné 1.08 → 1; nevynucuje kamerovou jízdu celé Evropy. |
| Nadpis mapy / support | .32 | .18 | Odmaskování / krátký posun, dokončené před koncem cesty fotografie. |
| Trasa / support | .35 | .27 | Změní geometrii ze spojnice na přesnou mapovou křivku. Rovnoměrný základ zůstává čitelný, aktivní stopa se před kreslením ztiší. |
| Bod a aktivní stopa / support | .62 | .27 | Jednou od skutečného původu k cíli. Inês jede Lisabon → Praha. |
| Popisek mapového příběhu / static | .74 | .19 | Krátký nástup po usazení fotografie. |
| Finální kompozice / static | .93 | .07 a dál | Fotografie, mapa, údaj a příběh stojí. |

Tyto desetinné hodnoty jsou **podíly jedné scrollové osy**, nikoli nové trvání tokenů. UI nadále `DUR.xs`, text `DUR.s/m`, velké reveal `DUR.l`, `EASE.out/inOut`; scrub bez časového easing na celém průběhu. Jednorázové 5,6s přehrání v laboratoři je pouze ovladač revize s pauzou, nikoli časovač homepage.

### Technika a dotčené soubory při budoucí integraci

Bez nových runtime závislostí. Existující GSAP, ScrollTrigger, SVG a DOM fotografie. Flip má smysl pro změnu layoutu při otevření detailu; u vratného průchodu mezi dvěma piny je spolehlivější předem změřená geometrie a jediná scrub timeline. `Flip.from()` při každém `onUpdate` by byl chybný návrh. Viz [technické poznámky](../../tutorials/implementation-notes/shared-image-scene-handoff.md).

Budoucí zásahy: `web/src/components/people/PeopleStories.*`, `web/src/components/map/EuropeMap.*`, případný malý koordinátor předávky v homepage a jeho CSS. GSAP jen z `src/lib/gsap/setup.ts`, životní cyklus přes `useScene`, jeden Lenis. Sdílený stav musí být nejméně `{storyId, phase}`; geometrie zůstává v refs, nikoli v React state na každý frame.

V produkci může být fotografie právě vlastněna existujícím WebGL distortion rendererem. Nutné nejprve po dobu předávky uvolnit jeho obraz a určit jediného vlastníka DOM vizuálu. Prototyp tuto integraci neověřuje. Při nedekódovaném médiu, resize nebo otevřeném detailu přejít bezpečně na přirozený tok, nezadržovat navigaci.

### Přístupnost a výkon

- Skutečné odkazy, výběr mapy a modelové označení zůstávají v DOM; vizuální duplikát bude `aria-hidden` a bez fokusovatelných potomků. Nezavádět falešný dialog ani fokus přesouvat při scrollu.
- Refresh na `#mapa`, přímé odkazy, návrat z detailu, změna velikosti i Back/Forward musí dát hotovou mapu bez vynuceného přehrání celé předávky.
- Číst geometrii při vstupu/resize/refresh, ne `getBoundingClientRect()` všech karet každým framem. V běhu transform a opacity; jedna krátká SVG cesta. Žádná nová permanentní ticker smyčka.
- Target ≥55 fps na desktopu je **cíl pro integraci**, zatím není tvrzením o produkčním výkonu. Žádná nová knihovna Three/R3F, shaderová typografie ani další canvas.

## Pořadí další práce

1. **Vizuálně rozhodnout o 005A** v samostatném náhledu: drží stejný člověk pozornost i při změně měřítka? Je průchod vlevo → vpravo příjemný? Rozumíme mapě bez návodu?
2. Po potvrzení směru připravit přesný integrační pilot: konec existujícího railu, handoff WebGL/DOM, synchronizace osoby, kotvy a zpětný chod. Neprodlužovat stránku. Samostatné výslovné schválení před změnou produkce.
3. Následně prototypy **03 → 04** a **06 → 07**. Ty odstraní nejsilnější zbývající střihy a různorodostí doplní fotografickou předávku.
4. Teprve potom řešit tempo osmipanelového railu a malé změny uvnitř mapy/historie. Žádné souběžné přestavění všech kapitol.
5. 3D a shadery ponechat jako výzkum, pokud se neobjeví příběhový problém, který SVG a DOM neumí vyřešit. Přečtený tutoriál není ověřená schopnost ani důvod technologii instalovat.

## Vizuální revize a hranice ověření

Výsledky prototypu jsou v [QA reportu](../../prototypes/005-connected-scenes/QA.md). Prototyp ukazuje kompozici a průběh jedné předávky, nikoli hotové spojení React scén, ověřený WebGL handoff nebo schválení zbývajících šesti přechodů. Produkční komponenty, runtime závislosti a kontaktní data zůstaly beze změny.
