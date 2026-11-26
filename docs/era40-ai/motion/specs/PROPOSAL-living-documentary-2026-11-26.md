# ERA40 — The Living Documentary / After the Film

**Návrh ke kreativní revizi, 26. 11. 2026. Není schválená implementační specifikace.**
Baseline: main 507a959829a77a05a71ebbcd1760948cca355fd6.
Rozsah: kapitoly 02–08. Hero film, jeho soubory, střih, titulky, ovládání a schválená kompozice jsou mimo rozsah. Předávku 016 respektovat; úprava přijímací geometrie v 02 nesmí změnit 01.
Návaznost: DESIGN.md, MOTION.md, D-019–D-029, specs 008/012/015/016. Před novou integrací samostatné prototypy, review a schválení. Tento dokument nepřepisuje decision log ani DESIGN.md.

## 1. Diagnóza a rozhodnutí

Zdrojový audit, nikoli aktuální prohlížečová QA. PeopleIntro má čtecí opacity scrub, podtržení a PeopleRow (8 modelových příběhů s vlnou/slide nástupem). Samostatná fotografie byla z Prologu odstraněna v 507a959; nevracet ji. HistoryTimeline má plynulý rok, fotomasky, časově správné značky a mobilní FortyStrip. PeopleStories má tři střídavé spready, horizontální scroll pin podle délky railu, WebGL efekt a ruční výběr. JourneySequence dnes předává poslední desktopovou fotku do mapy a odděluje ruční výběr mapy. EuropeMap má SVG trasy a aktivní cestu s bodem. ThenNow již má porovnání obrazu/textu a smyčku skládající se do děliče. Numbers už má proporcionalitu větví a příklad dopadu. Future již má otevřenou trasu a CTA.

Rizika k prohlížečovému ověření: opakování stejného čtení obrazu a textu ve spreadu; duplikace galerie v 02 a 04; délka desktopového railu (end podle scrollWidth - clientWidth); vizuální odtržení mezi 05 a 06; na telefonu vysoký počet podobných gest. Nejsou to ověřené vizuální nálezy bez screenshotů.

**Režijní princip:** obraz mění funkci a měřítko, nikoli jen opacity. Rytmus: film → typografický střih → archivní čas → portrét → geografie → důsledek → data → výzva. Jediný hlavní pohyb na scénu, nanejvýš dva podpůrné. Mezi výraznými momenty čtecí klid. Jedna Trasa, žádné nové symboly nebo nepodložené vztahy.

## 2. Zdroje MotionSites a překlad

Prostudován veřejný oficiální upstream katalog a konkrétní recepty, nikoli živé renderované demo. Příklady a média nepřebírat do veřejného ERA40 repo. MCP zde není ověřeně připojen; jeho opt-in konfigurace je v odděleném PR #1. Aktuální veřejná dokumentace https://www.motionsites.ai/mcp uvádí OAuth, https://motionsites.ai/api/mcp. U klienta ověřit aktuální instrukce poskytovatele a jeho souhlas.

- [Scroll](https://github.com/Motionsites-AI/claude-skill/blob/main/plugins/motionsites-web-builder/skills/motionsites-web-builder/references/techniques/scroll.md), §2: lokální scrollová okna řídí nezávislé vrstvy a střihy. Převod: HistoryTimeline, existující ScrollTrigger. Ne kopírovat dlouhý runway, blur, tint či dekorativní cutouts.
- [Type](https://github.com/Motionsites-AI/claude-skill/blob/main/plugins/motionsites-web-builder/skills/motionsites-web-builder/references/techniques/type-and-text-motion.md), §4 a §10: maskované řádky a progressové segmenty; převod: 02 typografická změna hierarchie, ne generický fade-up nebo text pod kontrastem.
- [Depth](https://github.com/Motionsites-AI/claude-skill/blob/main/plugins/motionsites-web-builder/skills/motionsites-web-builder/references/techniques/depth-and-interaction.md), §1: role aktivního/vedlejšího obrazu; převod: 04 editorial stage bez rozmazaných tváří, barevného chaosu a automatického cyklu. §3: relativní hloubka; volitelné maximálně subtilní transformace, ne další pointer efekt nad StoryDistortion. §8: dissolve odmítnout (částice, náklady, čitelnost).
- [Media](https://github.com/Motionsites-AI/claude-skill/blob/main/plugins/motionsites-web-builder/skills/motionsites-web-builder/references/techniques/video-and-media.md), §7: scroll jako časová osa; nepřebírat frame cache ani video v tomto rozsahu. Paměť dekódovaných snímků je riziko, nový video pipeline nemá důvod.
- [3D/WebGL](https://github.com/Motionsites-AI/claude-skill/blob/main/plugins/motionsites-web-builder/skills/motionsites-web-builder/references/techniques/3d-and-webgl.md): model a shader jsou samostatné signature techniky. Odmítnout v této dávce: nemáme objekt, který má vysvětlit příběh lépe než fotografie či SVG.

Všechny níže uvedené rozměry, časování a easing jsou návrhové parametry ERA40, nikoli změřené hodnoty cizích webů.

## 3. 02 Prolog — Typografický střih

Lead: dvě navazující typografické kompozice mění důraz z rozsahu účasti na lidskou změnu.
Desktop 1440×900: bílá, okraj textu podle 016, číslo „přes 400 tisíc“ jako solidní display 128–180 px (nikoli nová statistika; text a zdroj 1998–2023 z aktuálního PeopleIntro). Zbytek věty v samostatném čtecím bloku. „trochu jiní.“ ve druhé kompozici 112–144 px, Trasa zachová podtržení. Úvodní údaj a poznámka jsou v DOM přístupné i bez JS. Žádná samostatná fotka.
Storyboard lokální progress p (nativní scroll, žádný nový pin):
- 0–.20: vstup existující Trasy z 016, čitelný údaj a kontext.
- .20–.48: první výrazný řádek ustoupí maskovaným posunem max 0,35em; statický text zůstává čitelný v proudu. Typografický důraz se přesune k návratu.
- .48–.72: klíčová věta „trochu jiní.“ se usadí a podtržení doběhne. Nepřekrývat animované texty.
- .72–1: klid, dopad na neúčastníky, zdroj, kompaktní PeopleRow. Návrh: z osmi fotografií vytvořit krátký rejstřík, který zůstane ovladatelný; bez druhé galerie animací. Nepřidávat nové fotky.
Mobile 390×844: dvě samostatné čitelné kompozice, 56–76 px hlavní výraz, žádný pin, přirozená vertikální Trasa, nativní swipe rejstříku. Reduced: všechny texty staticky, podtržení hotové. Přesný reverse u scrollových masek. Nepodmiňovat dostupnost textu animací.
Riziko M (016 geometrie). Prototyp má ověřit přijímací pozici podtržení, nikoli přepsat hero.

## 4. 03 Historie — Archivní průhled

Lead: jeden velký obrazový rám mění proporce a odhaluje další archivní vrstvu při skutečné změně roku. Zachovat 40 ročních značek, české napojení 1998, aktuální milníky a zdroje; žádné nové historické fotky bez ověření.
Desktop: obrazový rám 7/12 sloupců (cca 690–810 px), typografický blok 4/12, 96–180 px rok, 24 px mezery. Ve vybraném milníku může rám expandovat do 9/12 a zpět; nejvýše dva současné obrazy. Žádné přebarvování podle fotografie; stávající bílá/EU modrá.
Použít existující pin max 250vh. Pro skutečný čas year→progress mapovat (year−1987)/40; 1998=.275, 2004=.425, 2027=1. Pás ovládá stejný stav. U každého přechodu milníku normalizované q (ne nové roky):
- q 0–.18: starý rám v klidu, text čitelný.
- .18–.50: starý obraz se posune uvnitř rámu max 8 %, nový vstupuje vodorovnou clip maskou 0→100 %; směr času L→R, reverse inverzní.
- .50–.70: změna roku a titulku v oddělených typografických oknech, bez nezáměrného reflow; nový text se zobrazí v okamžiku, kdy je obraz rozpoznatelný.
- .70–1: stabilní rám, metadata a zdroj plně čitelné. Geometrii poslední fotky zachovat pro 008A.
Mobile: FortyStrip zůstává, swipe či volba roku přepne skutečný obsah; maska 300–450ms, nativní scroll, žádný pin. Reduced statický přehled. Riziko M. V prototypech ověřit rychlý skok i 1998 přesně; žádná konkurence s 008A.

## 5. 04 Příběhy — Obrazový střih namísto dlouhého railu

Největší navrhovaná změna. Lead: jeden stabilní editorial stage, který přerámovává aktivní fotografii; sousední snímek je navigační náhled. Ne nový vstup z osmi oken (již odmítnut D-019 / 012), ale změna uvnitř kapitoly PO dokončení 008A.
Desktop 1440×900: modrý stage, aktivní fotka cca x=86,y=180,w=750,h=510; text vpravo x=900,w=450. Kontaktní index dole; sousední náhled jen mimo textovou plochu. Při změně příběhu se role obrazu přesune, místo posunu celé dlouhé stránky. Všech osm modelových příběhů zůstává přístupných přes stanice, tlačítka a archiv. Žádná automatická změna na časovač.
Navrhovaný pilot: scroll hlavní sekvencí nejvýše tří editorial beatů (vybrat z existujícího obsahu po kontrole; různé typy mobility), další příběhy přímým výběrem. Zatím nerozhodnuto, zda redukovat scroll na 3 beaty nebo ponechat 8 přímo volitelných stavů bez pinu. Zachovat všechny příběhy a kotvy. Nepřekročit 250vh pin. Výběr 3 není schválená obsahová změna.
Storyboard jednoho střihu q:
- 0: aktivní foto a citace v klidu, trasa vybraného člověka.
- .0–.24: nový snímek se objeví jako rám na hraně, starý text ustoupí až po odchodu z čtecí fáze.
- .24–.58: nový rám z náhledu do dominantní plochy (měřená x/y/w/h geometrie, FLIP nebo CSS transform + clip; žádné roztahování tváří).
- .58–.80: nový text vstoupí maskou nejvýše 0,6em, nový index a metadata; jedna konzistentní story ID.
- .80–1: fotografie stabilní, čitelná citace a dopad, CTA.
Pro klik/swipe návrhově 0,6 s, ease power2.inOut; pro scroll scrub none s existujícím vyhlazením. Rychlý skok rozhoduje jediný aktivní stav, žádná fronta animací.
Mobile: nativní swipe se snapem, obrázek 4:5 nebo 3:4 dle ořezu existujícího média, text níže, samostatný výběr a CTA, žádná blokace vertikálního scrollu. Reduced: všechny spready dostupné v klidu. WebGL jen stávající efekt, pokud nepřekáží; v pilotu nejdřív vypnout a porovnat.
**Kritická vazba:** JourneySequence nyní hardcoduje poslední foto railu. Pokud zvolíme volitelný stage, musí zdroj předávky 04→05 vycházet ze skutečně aktivní story ID při odchodu, nikoli z posledního prvku pole. Zachovat manuální volbu mapy při refreshi, zachovat směr příchozí/odchozí. Bez schválené technické revize tuto variantu neintegrovat. Riziko H.

## 6. 05 Evropa — Geografie jedné zkušenosti

Lead: jedna aktivní cesta mění prostorový důraz mapy, ne plošná animace všech tras.
0–.25: přijmout foto a ID z existující JourneySequence. Tmavá mapa D-023.
.25–.62: aktivní trasa narůstá podle skutečné geometrie a bod putuje od zdroje k cíli; ostatní trasy čitelné jako kontext. Vybraný příběh se nemění.
.62–.85: jemné přerámování SVG kolem koncových bodů (max 1.12×, navržené; jen pokud zůstanou dostupné všechny cíle a labely). Pokud ne, ponechat viewBox statický. Bez druhého canvasu.
.85–1: cíl a související informace v klidu. Přepínače příběhů mají stejný stav jako mapa.
Manual: latest choice wins, bez opakování všech tras při změně. 0.6–0.9s stávající tokeny. Mobile stabilní celková mapa + ovládání palcem; žádný nutný zoom či pinch, hit targets ≥44 px nebo ekvivalentní tlačítka. Reduced: hotové trasy. Příchozí/odchozí směr testovat. Předávka do 06 pouze grafický střih Trasy, neslibovat totožného účastníka, pokud vybraný příběh v 06 nemá odpovídající data. Riziko M.

## 7. 06 Návrat — Od zkušenosti k důsledku

Lead: dělič odhalí konkrétní změnu. Současná 06 už srovnává foto a text; **neprezentovat dvě ilustrační fotografie jako autentické před/po**. Důraz na změnu v praxi a na koho dopadá.
Desktop 1440: velká foto/text deska v rámci 12 sloupců; stabilní čitelný text; dělič se pohybuje v rozsahu 25–75 % při scroll vstupu (návrh, ověřit, aby neomezil ruční 0–100 %). Po převzetí slideru už scroll nepřepisuje hodnotu. Přepnutí člověka používá skutečná existující data; všechny informace dostupné mimo masku.
0–.35: připomenutí zkušenosti a existující smyčka se skládá do děliče.
.35–.70: ruční či scroll vstup odhaluje důsledek; aktivní panel má stabilní kontrast.
.70–1: stav „co pokračuje dál“ a klid; zachovat stávající předávku děliče do kmene 008B.
Mobile: foto + čitelný důsledek, range a tlačítka, nepřebírat vertikální gesto. Reduced: obě informace dostupné. Riziko L–M.

## 8. 07 Rozvětvení — Od jednoho k mnoha

Lead: větev z jednoho zdrojovaného počtu do pěti existujících oblastí. Již existuje skutečná geometrie větví; nevytvářet nový dekorativní diagram. Délky musí nadále odpovídat počtům účastníků, nikoli fiktivnímu počtu zasažených lidí.
0–.22: dělič z 06 přistane na počátku kmene (008B); celkový počet a období staticky čitelné.
.22–.65: růst kmene a větví v pořadí, jeden průběh. Hodnoty neskrývat za animaci a nezaměňovat počet výjezdů s dopadem.
.65–1: všechny větve stabilní. Výběr jedné větve zvýrazní její cestu a zobrazí konkrétní modelový příklad nebo chybějící skutečný příběh. Ostatní čísla zůstanou čitelná.
Mobile: jeden svislý diagram, stávající panel přímo pod aktivní větví, bez pinu, výběr tlačítkem; žádné generické countery jako lead. Reduced předkresleno. Riziko L–M.

## 9. 08 Pokračování — otevřený konec

Lead: Trasa dojede k návštěvníkovi, pak otevřeně pokračuje. Nový kompoziční důraz, ne nový ornament nekonečna.
0–.30: klidná čtecí pauza / současný lidský hlas s řádným označením modelového obsahu.
.30–.65: typografický střih „Cesta končí. Zkušenost pokračuje.“ do modré kompozice, v rámci barevné distribuce DESIGN.md. Ověřit kontrast a přechod s footerem.
.65–1: bod u „Tvoje cesta“, plná linka přejde do tečkované, CTA viditelné a skutečně ovladatelné. Žádný automatický návrat na hero, žádné nekonečné loopování.
Mobile: klidná plnohodnotná závěrečná kompozice, nativní scroll, CTA minimálně 44 px; reduced statická. Zachovat funkční odkazy /zapojte-se a /tvoje-era. Riziko L.

## 10. Pořadí a vizuální brány

A — 02→03: typografický střih a archivní průhled. Připravit izolované kompozice a storyboardy desktop/mobile, porovnat s baseline. Nevracet fotografii a nezasáhnout do 01.
B — 04→05: nejvyšší dopad, nejvyšší integrační riziko; samostatný motion PoC teprve po schválení této koncepce. Přezkoumat výběr příběhů, pin a aktivní ID.
C — 06→07→08: menší řemeslné úpravy existujících funkcí, žádné nové závislosti.
Před každým návrhem otevřít skutečnou referenci v dostupném browseru, zaznamenat snímky a ověřit zdroj. Tento zdrojový rozbor nenahrazuje požadovanou vizuální revizi.

## 11. Akceptační kritéria (budoucí implementace)

- Identický hero film i soubory, CTA, ovládání, význam a 8 kotev; žádná produkční změna v tomto návrhu.
- Screenshoty výchozího, středního a konečného stavu každé scény desktop 1440×900 a mobile 390×844; kontrola 360/375/430/1024/1280 a nižší desktop výšky dle QA.
- 0 horizontálního přetečení dokumentu, žádný nečekaný překryv textu, WCAG AA kontrast, funkční Tab/Enter/Escape a ovládání range.
- Délka desktop pinu ≤250vh a mobil bez dlouhých pinů/hijacku; reverse, rychlý skok, resize, deep links a Back/Forward.
- 1998 přesně 11/40 na evropské časové ose, původní zdrojovaná data a označení modelového obsahu.
- Handoff 016, 008A, JourneySequence a 008B regresně otestovat. Výběr mapy nesmí být přepsán refreshí stejné stanice.
- Bez druhého Lenisu, nového runtime balíku, dalšího canvasu nebo duplicitních triggerů. Změny přes useScene/cleanup a stávající GSAP setup. Měřit výkon proti aktuální baseline; výsledky nevymýšlet.
- V integračním kole build, lint, typecheck, existující QA skripty; skutečné browser snímky a reduced-motion test.
- Zdroje skutečných fotek, souhlasy a licence jsou otevřená obsahová brána. Hero obsahuje dříve zjištěné Restricted Mixkit klipy (D-029); před zveřejněním vyřešit práva, nikoli v tomto návrhu měnit video.

## 12. Rozhodnutí k review

Doporučení: přijmout režijní princip a začít A. Pro B rozhodnout mezi kratším stage s třemi scrollovými beaty a přímou volbou všech osmi; nesmí se ztratit žádný příběh. Prověřit skutečné vizuální baseline a reference. Aktuální práce je dokumentační návrh bez browser QA, bez spuštění kódu a bez potvrzené MotionSites OAuth session. Žádná integrace ani nasazení.
