# The Living Documentary — responsive design review

**26. 11. 2026 — navazuje na schválení kreativního směru uživatelem (v chatu). Detailní storyboard ke kontrole, nikoli schválení konkrétní produkční integrace.**
Baseline main 507a959829a77a05a71ebbcd1760948cca355fd6. Hlavní film, jeho přehrávač, lockup, střih, assety a předávka 016 se nemění. Na hlavní stránce zachovat osm kotev, všech osm příběhů a zdrojovaná data.

Vizuální podklad: [Desktop/mobile storyboard 02–04](visuals/living-documentary-responsive-board.svg). Jde o schematické kompozice s výřezy ze staršího QA 005, nikoli o screenshoty dnešní stránky ani o ověřený render. Typografie ve storyboardu používá systémový fallback; finální návrh pouze s lokálním Roboto Flex a přesnými metrikami. Nejde o nové fotografie nebo nové autentické příběhy.

## 1. Responzivita jako režijní rozhodnutí
| Šířka a režim | Choreografie |
|---|---|
| 320–374 px (stresový test 320, základní 360) | 16 px okraje, nadpisy v přirozených řádcích, jeden dominantní prvek, všechny čtecí bloky v běžném dokumentovém toku. Žádné ořezy diakritiky. |
| 375–479 px (390, 430) | 16–20 px okraje, velké obrazové plochy, nativní vertikální scroll; horizontální swipe výhradně na jasně vymezeném ovládacím prvku, alternativní tlačítka. |
| 480–767 px | Fluidní měřítko, žádný nucený pin; maximální šířka řádku pro čtení. |
| 768–1023 px | Tablet: větší obraz, lokální dvousloupec pouze při dostatečné šířce, nepřebírá desktopový pin. |
| ≥1024 px | Editorial grid a existující pin Historie; výška, fine pointer a preference pohybu rozhodují o rich/compact režimu podle schválených scén. |
| Krátká výška / reduced motion / bez JS | Obsah ve statickém čitelném toku. Bez ztráty přístupnosti, focusu, CTA nebo zdrojů; hero podle stávající specifikace. |

Návrhové minimum pro primární dotykové ovládání 44×44 CSS px; mezery mezi cíli a vizuální focus. Text ≥16 px tam, kde jde o souvislé čtení. Nepřekrývat text ovládáním nebo systémovou safe area. Obrázek musí mít vlastní poměr stran, text nesmí být uvnitř ořezové masky obrázku. Přerušit či ukončit rozběhnutý pohyb při nové volbě; žádné fronty animací. Žádné scroll hijacking ani druhá instance Lenisu.

## 2. Dávka A: Prolog a Historie
### 02 — PeopleIntro, PeopleRow
Předloha: typografický střih, dominantní „Přes 400 tisíc“ (jde o aktuální formulaci v PeopleIntro; výzvy 1998–2023) a „trochu jiní.“. Účelem je přesunout důraz z rozsahu účasti na lidskou změnu, nikoli zavést nový údaj.
- Desktop: 12 sloupců, okraj podle 016; odlišná hierarchie obou vět; pouze jeden hlavní maskovaný přesun, Trasa z 016 zůstává přijímajícím prvkem.
- Mobil: 2–3 typografické bloky v toku. Na 390 px návrhově 56–76 px display, na 360 px přizpůsobit podle reálných metrik; bez horizontálního přetečení a bez úprav šířky písma způsobujících posun řádků. Důležitý obsah čitelný i uprostřed scény. Žádná samostatná fotografie. PeopleRow zůstává jako kompaktní navigační rejstřík, ne druhý filmový rail.
- Scroll: p=0–.20 převzetí Trasy, .20–.48 maskovaný důraz, .48–.72 ustálení druhé věty, .72–1 klid a čtecí část. Žádný nový pin; reduced všechny prvky statické.
- Změny geometrie a měření podtržení vyžadují regresi 016. Podtržení nesmí vést přes písmena ani se odpojit od bodu.
- Kandidátní soubory až pro schválený implementační brief: PeopleIntro.tsx/.module.css, PeopleRow.tsx/.module.css; hero mimo povolenou oblast.

### 03 — HistoryTimeline
- Desktop: archivní rám jako dominantní obraz, 7/12 gridu; rok mění šířku a maskovaný obraz se vymění uvnitř stejného rámu. Jediný existující pin max 250vh; preserve 008A.
- Mobil: časová osa nad aktivním obrazem, přímo volitelná tlačítky/range a swipem. Na šířce 390 px rám cca 350×235, rok 68–80 px, čtecí část v toku, 44 px ovládací plochy. Obrázek a informace se při změně milníku nemění navzájem nezávisle.
- Přechod q=0–.18 klid; .18–.50 maska; .50–.70 text a rok; .70–1 čtení. Pro ruční změnu zkusit 300–450 ms, power2.inOut, ne za cenu odezvy. Scrollová varianta bez vlastního ease. Reverse a rychlý skok deterministické.
- Roky zůstávají z milestones.ts; 1998=27,5 % skutečné osy. Kontrola všech sedmi milníků a 40 ročních značek.
- Kandidátní soubory: HistoryTimeline.tsx/.module.css. Nezavádět nový timeline engine. SceneHandoffs zachovat a testovat.

## 3. Dávka B: Příběhy a Evropa
### 04 — PeopleStories
Doporučený koncept k vizuálnímu ověření: stabilní obrazový stage, který začíná na již dokončené předávce 008A. Všech osm příběhů dostupných přímou volbou; pro desktop testovat kratší čtecí sekvenci (nejvýše tři scrollové beaty) proti variantě bez pinu. Neodsouhlasovat konkrétní počet vybraných příběhů jako novou obsahovou politiku.
- Desktop: dominantní obraz cca 750×510 na 1440; jméno, metadata, citace a odkaz v odděleném sloupci. Náhled dalšího příběhu je směrový orientační prvek, nepřekrývá aktivní text.
- Mobil 390: 20 px okraje, dominantní obraz cca 330×350 (upravit crop k reálnému zdroji), krátký náhled dalšího snímku pouze pokud nezmenšuje aktivní obsah. Volba swipe, tlačítka a přímý výběr; vertikální scroll zůstává nativní. Text jména a citace pod obrazem, CTA nikdy uvnitř clip-path; žádná fixní výška pro dlouhou citaci. Na 360 nechat text pod obrazem přetéct svisle, nikoli jej zmenšovat pod čitelnost.
- Přechod: klid → nový rám na hraně → přerámování 0,6 s návrhově → změna textu při identifikovatelnosti obrazu → klid. Přeskočení do libovolné stanice bez fronty. Bez časovače a bez dodatečné WebGL vrstvy.
- Zachovat stávající ID modelových příběhů, dialog, všechny anchor/deep link a čestné vysvětlení modelového obsahu. Nevracet opakované badge přes fotografie.
- Důležitá závislost: JourneySequence má dnes zdroj fotky z posledního prvku pole. Před implementací nového stage navrhnout transakci aktivního story ID a předávky 04→05; nelze změnit jen PeopleStories bez posouzení JourneySequence. Manual map selection nesmí být přepsán refreshí stejné stanice.
### 05 — EuropeMap
- Mobil nejdřív mapa ve stabilním rámu (celá čitelná geografie), potom kompaktní vybraný příběh a šipky; žádný požadavek na pinch, drag mapy nesmí pohltit vertikální scroll. Destinace dostupné i mimo překrývající se mapové body.
- Desktop aktivní trasa a bod, přerámování max 1.12× jen pokud jsou všechny ovládací prvky a relevantní labely dostupné. Noční barvy D-023. Reduced předkreslené trasy.
- Nikdy nepřidávat smyšlený směr návratu. Ověřit incoming/outgoing.

## 4. Dávka C: Návrat, Rozvětvení, Pokračování
| Kapitola | Desktop | Mobil a interakce |
|---|---|---|
| 06 Návrat | Stávající dělič → odhalení důsledku; zachovat předávku 008B. | Foto a důsledek ve svislém toku, range s 44px ovládací plochou a tlačítky; při ruční volbě scroll hodnotu nepřepisuje. Žádná falešná dvojice před/po. |
| 07 Rozvětvení | Stávající proporcionální větve a konkrétní příklad dopadu. | Jedna svislá datová osa, rozbalení příkladu přímo pod zvolenou větví; hodnoty i období čitelné bez animace. Žádný pin. |
| 08 Pokračování | Velká závěrečná typografie, Trasa otevřená návštěvníkovi. | 2–3 čitelné řádky hlavního sdělení, viditelné CTA s dostatkem prostoru pro safe area, žádný nekonečný loop ani automatický scroll na hero. |

## 5. QA a review brány (dosud neprovedeno)
- Skutečné screenshoty desktop 1440×900, 1280×720, 1024×768; mobil 360×800, 375×812, 390×844, 430×932, tablet 768×1024; landscape, 200% zoom a reduced motion.
- Na každé významné animaci počátek, střed, konec, reverse a rychlý skok. Ověřit po resize a návratu z detailu příběhu.
- Zero horizontální overflow dokumentu, překryvy a ořez české diakritiky; kontrast WCAG AA, viditelnost focus, Tab/Enter/Escape, range/šipky, dotyk i ovládání bez gesta. Nevyžadovat dokončení animace k přístupu k obsahu.
- Zachovat všechny současné CTA, zdrojované statistiky a období, příběhy i statusy. Žádný nový runtime dependency.
- Prototyp musí být vizuálně posouzen před produkční integrací, následně samostatný brief pro jednotlivé soubory, build/lint/typecheck, existující testy handoffs 016/008A/JourneySequence/008B.
- Původní fotografie ve storyboardu pocházejí z historických QA snímků a jsou ilustrativní; skutečný živý web nebyl v tomto kroku spuštěn. Nejde o doklad hotové responzivity. MCP MotionSites není ověřeně připojený v tomto chatu.

## 6. Další krok
Vizuální review této dávky. Po schválení konkrétní kompozice připravit izolovaný prototyp a prohlížečové ověření. Současný projektový režim je kreativní výzkum/design; produkční soubory, package.json, main a deploy zůstávají beze změny.
