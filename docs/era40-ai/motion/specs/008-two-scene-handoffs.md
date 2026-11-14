# 008 — Z roku k člověku. Z rozdílu k dopadu.

15. 11. 2026 · **koncepty i konkrétní integrace výslovně schváleny Jakubem**: „Schvaluji oba přechody i integraci“. Navazuje na směr 005. Integrace je hotová a prošla produkčním prohlížečovým QA; předána Claudovi k finálnímu review. Důkazy a limity jsou v `docs/agent-reports/CDX-desktop-007-008.md`.

Reference byly skutečně prohlédnuté při [analýze 005](../../references/reference-analysis/2026-11-14-chatgpt-motion-synthesis.md): Getty Tracing Art (identita obrazu a klid pro čtení), Inkwell (návaznost scén), Extrafazant / Over (grafický tah přes hranici ploch). Nekopírujeme jejich identitu. Podklady zadavatele podporují návaznost zkušenosti; nejsou pokynem přidat dekorativní nekonečno.

## 008A: Historie → Příběhy

Poslední historický rám změní rozměr a místo. Uprostřed cesty se jeho snímek vystřídá s první příběhovou fotografií. Letopočet odejde před jménem; 2027 se nemění na rok příběhu. Oba snímky zůstávají označené jako ilustrační, Tereza jako modelový příběh.

| Prvek / role | Začátek p | Délka p | Vztah a děj |
|---|---:|---:|---|
| Poslední rok a popisek / support | .08 | .22 | Odejdou před přenesením rámu. |
| Obrazový rám / lead | .12 | .76 | Pravý široký výřez → levý vyšší výřez, `power2.inOut`. Obě fotografie mají vlastní rovnoměrný cover scale. |
| Obsah rámu / support | .50 | střih | Obrazový střih v pohybujícím se rámu oddělí dvě různé ilustrační situace. Bez prolínání nebo slepování dvou tváří. Nejde o tutéž osobu ani archivní důkaz. |
| Nový nadpis a příběh / support | .78 | .22 | Společně, až je rám mimo oblast textu. |
| Fotopopisek / static | 0 | 1 | Stejná čitelná velikost, sleduje spodní hranu rámu. |

## 008B: Tehdy a teď → Čísla

Neinteraktivní pokračování dělicí čáry předá směr horní ose první metriky. Původní slider se během používání neotáčí. V laboratoři lze předem zvolit jeho polohu; předávka respektuje tuto výchozí souřadnici. Bílé porovnání odchází, ink plocha s údaji přichází přirozeným směrem stránky.

| Prvek / role | Začátek p | Délka p | Vztah a děj |
| Porovnání / support | 0 | 1 | Opouští obraz v přirozeném toku, žádný nový pin. |
| Vizuální pokračování děliče / lead | .12 | .76 | Svislý žlutý tah → vodorovná osa první metriky. |
| Nadpis čísel / support | .62 | .20 | Odkryje se až ve chvíli, kdy jej linka nekříží. |
| Hodnota, období a zdroj / static | 0 | 1 | Drží plnou čitelnost a přicházejí s plochou; bez dalšího fade nebo počítání v přechodu. |

## Co se nehýbe

Citace se nedeformují. Rok se nepřepisuje na rok jiné události. Fotografie se nenatahují po osách. Žádný nový kurzor, částice, pin, WebGL canvas ani nekonečný ambientní běh. Kontakty, menu a obsah homepage prototyp nemění.

## Stavy a technika

- **INITIAL:** čitelná výchozí kompozice. Skript čeká na dekódované obrázky a font; při chybě zůstává statický obsah.
- **INTRO / OUTRO:** p řídí posuvník, scroll nebo přehrávač laboratoře. Přehrávání je pomůcka revize, nikoli budoucí časovač homepage.
- **AMBIENT:** žádný samovolný pohyb.
- **REVERSE / INTERRUPTION:** stejná funkce p, okamžité převzetí sliderem, další volba zastaví přehrávač.
- **MOBILE:** dvě přirozeně řazené kompozice bez přeletu a pinu.
- **REDUCED:** dvě hotové kompozice, ovládání přehrávání se vypne; OS i přepínač laboratoře.
- **RESIZE:** geometrie se měří v jednom kroku při resize, ne v každém animačním framu.

Izolované HTML / CSS / GSAP ze stávající instalace, pouze transform, opacity a clip-path. Server zpřístupňuje jen explicitní seznam vlastních souborů a existujících médií. [Prototyp a spuštění](../../prototypes/008-scene-handoffs/README.md).

## Co musí rozhodnout vizuální revize

Při p .5 u 008A nesmí rok nebo nová citace soutěžit s fotografií. U 008B se linka nesmí protáhnout nadpisem. Zpětný průchod musí působit jako návrat stejné scény. Po schválení konceptu je ještě potřeba potvrdit konkrétní integraci s existujícími piny, WebGL/DOM vlastnictvím, hlubokými odkazy a fallbacky podle Fáze 11.

## Konkrétní návrh budoucí integrace — také ke schválení

Rozsah je **jen těchto dvou hranic**. Hero, prolog, osm příběhů a Claudova dokončená předávka 006 se nepřestavují. Bez závislostí, nových pinů a další výšky stránky.

- Nový malý klientský koordinátor předávek obalí stávající historii, `JourneySequence`, porovnání a čísla. Nezavede transformovaný předek pinů. Serverový `MapLand` zůstane předaný jako obsah, ne klientský import.
- 008A: výchozí box = poslední obrazový stack historie vztažený k jejímu pinovanému stage; cílový box = první fotografie příběhů vztažená k jejich sekci a s odečtenou transformací horizontálního railu. Jediný neinteraktivní DOM vizuál se objeví pouze mezi p 0 a 1 a při dostupných dekódovaných snímcích.
- 008A: celý původní figure historie a cílový fotografický rám se během předávky vizuálně skryjí. Tím se neodkryje předchozí snímek stacku. Existující distortion renderer musí tuto první fotografii během předávky uvolnit a pak ji převzít zpět. Obsah, alternativní texty a štítky zůstanou v původním DOM.
- 008B: souřadnice vychází z aktuální ruční polohy slideru. Při odchodu se skryje jen vizuální dělič, ovladač zůstává funkční. Jeho neinteraktivní kopie míří k prvnímu `data-number-stat`; cílový bod se posouvá s přicházející sekcí. Vlastnictví ručního nastavení slideru se nemění.
- Obě předávky využijí již existující hranici sousedních scén: `start: top bottom`, konec na `top <scroll-margin-top>` (současných 64 px pod navigací), bez pinu, `useScene`, `gsap.matchMedia`, stávající setup/presety. Geometrie při refreshi, fontech, načtení obrázku a resize; žádné měření všech karet každý frame ani React state pro průběh. **Upřesnění z integračního QA:** původně navržený konec `top top` nechával nativní skok na kotvu kvůli globálnímu odstupu u p ≈ .93. Cílová geometrie i konec proto respektují stejný skutečný odstup; po předání zbytek 64 px pokračuje přirozeně.
- Desktop ≥1024 px a dostatečná výška scény. Mobil, krátké okno a reduced motion dostanou současný přirozený tok. Otevřený detail, nedostupné médium nebo neplatná geometrie okamžitě obnoví původní vizuály.
- Přímé `#pribehy` a `#cisla` musí načíst hotovou cílovou scénu; návrat Back, resize, rychlý scroll i změna motion preference musí uklidit kopie a všechny ruční styly. Po integraci opět celá QA matice včetně WebGL fallbacku a měření výkonu.

Dotčené cesty při schválené integraci: nový koordinátor + CSS, `web/src/app/page.tsx`, minimální datové značky v `history/HistoryTimeline.tsx`, `people/PeopleStories.tsx`, `then-now/ThenNow.tsx`, `numbers/Numbers.tsx` a jediný respektující guard v existujícím `people/distortion.ts`. Integrace nebude automaticky považována za hotovou podle vizuálního prototypu; rozhodne prohlížečové QA a review.

### Integrační refinement

Nadpis Příběhů přichází v produkci v p .90–1, protože se zároveň přirozeně posouvá do okna a dřívější nástup by křížil rám. Jméno a citace nastupují .78–1 v pravém sloupci. Metadata a popisky porovnání zůstávají čitelné a odcházejí přirozeným tokem. Obrazová kopie dědí dokumentární barevnou úpravu a grain existujících snímků. Při dosažení skutečného konce rozsahu se kopie skryjí ihned i během dobíhání scrub; přímá kotva tedy nezůstane pod překryvem.

### Rozhraní pro navazující 009

008B vybírá cíl **jedním atributem** `[data-handoff-axis-target]`, nyní umístěným na prvním údaji. Zdroj = `[data-handoff-axis-source]`, jeho lokální referenční plocha = `[data-handoff-stage]`, sekce se odvozují z nejbližších `[data-section]`. Barva se čte ze skutečného zdroje/cíle (background/border HTML nebo stroke SVG), případně z `--handoff-axis-color`. Ink plocha ani žlutý konec tedy nejsou součástí algoritmu.

Během předávky cíl dostává `data-handoff-axis-active="true"`; nynější HTML hrana se skryje přes border, budoucí SVG kořen může tímto stavem skrýt vlastní tah. 009 musí dodat měřitelný cílový prvek a příslušné původní styly. Odstranění zdrojových atributů koordinátor bezpečně vypne. Samotné větvení ani redesign 009 nejsou součástí 008.
