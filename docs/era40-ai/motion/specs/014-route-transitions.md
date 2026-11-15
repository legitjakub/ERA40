# 014 — Jedna cesta pokračuje mezi stránkami

Komponenta: globální změna routy · **Stav: implementováno a ověřeno, včetně Jakubova doladění silnějšího tahu a světelné špičky. Spec i integrace výslovně schváleny 15. 11. 2026.**
Účel: spojuje · Frekvence: při změně stránky, nikdy při prvním načtení ani kotvě.
Zadání: Grok Bot → Codex, P3 (15. 11. 2026; zápis označený 11:55). Nový požadavek na ∞ se vztahuje pouze na krátký přechod; stará brána „40 → ∞“ se nevrací. Jde o výjimku k návrhu, ne plošnou změnu vizuální identity.

## Koncept
Jedna kreslená Trasa oběhne dvě smyčky: čtyřicet let a pokračování za jejich hranici. Na krátké modré ploše se objeví „40“ a „1987–2027“, pak se plocha odsune a nechá návštěvníka pokračovat. Žádné čekání na dokončení kresby před navigací, počítadlo ani smyčka loaderu.

## Reference a technický rozbor
- [Inkwell](https://inkwell.tech/), živě prohlédnuto 15. 11. v prohlížeči: nejprve horizontální řada fotografických fragmentů, po scrollu kruhová kompozice a změna kapitoly INTRO → VISION. Přenášíme **kontinuitu jednoho prvku při změně kompozice**, nikoli kruh, fotografie, text ani jeho identitu. Samotný route přechod reference jsem netestoval.
- [React ViewTransition](https://react.dev/reference/react/ViewTransition) a lokální Next 16.4.6 `dist/docs/01-app/02-guides/view-transitions.md`: navigace App Routeru už vytváří React Transition; sdílené fotografie vlastní React. Nepřidávat vedle něj ruční `document.startViewTransition`.
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API): snapshots jako postupné vylepšení, běžná navigace musí fungovat samostatně.

## Zvažované provedení
1. **Doporučený návrh:** jeden lehký DOM/SVG překryv 1 s; React dál vlastní nativní snapshots i SharedPhoto. Funguje i bez View Transition API, nezdržuje router.
2. SVG maska jako jediné odhalení celé stránky: větší repaint a citlivější koordinace se sdílenou fotografií, proto nepoužito.
3. WebGL přechod: pro jediný tah nepřináší potřebný význam, proto nepoužito.
Volbu 1 Jakub výslovně schválil odpovědí „Schvaluji specifikaci 014 i integraci“ na otázku s konkrétním popisem ∞ / 40 / 1987–2027 a náhledem :3073.

## Stavy
| Stav | Chování |
|---|---|
| INITIAL | SSR obsah a odkazy jsou vidět; překryv je skrytý, `aria-hidden`, bez pointer events, žádná animace při mountu. |
| INTRO | Klik ihned pokračuje do routeru. Plocha vyjede zdola během 160 ms; kresba začíná v 120 ms a dokončí se v 640 ms. |
| AMBIENT | Žádný loop ani trvalé pozadí. Jen krátký čitelný frame „40 / 1987–2027“. |
| OUTRO | Od 700 ms plocha odjede vzhůru, do 1000 ms zcela zmizí. Překryv má vždy deadline, nezávisí na síti. |
| REVERSE | Zpět/vpřed používá stejnou kontinuitu bez obráceného psaní číslic. Nová navigace předchozí efekt zruší; poslední navigace má přednost. |
| MOBILE | Stejná 1s choreografie, SVG se vejde do 92 vw, žádný pin, blur, filtr, canvas ani skrytí scrollbaru. Ovládání min. 44 px. |
| REDUCED | ∞ a „40“ se nekreslí. Jen opacity fade 160 ms; přepnutí preference za běhu vše prostorové okamžitě ukončí. Respektuje OS i přepínač webu. |

## Choreografie
| Prvek | Role | Start | Délka | Pohyb / vztah |
|---|---|---:|---:|---|
| Nová routa | obsah | 0 | bez umělé prodlevy | Router ihned; efekt není loading state. |
| EU modrá plocha | podpora | 0 | 160 ms / výstup 300 ms | `translateY(100% → 0)`, klid do 700 ms, pak `→ -100%`; stejné `--ease-out`. |
| Jediný tah ∞ | hlavní | 120 ms | 520 ms | Skutečná vykreslená SVG délka, `stroke-dashoffset`; bílý tah, slabá modrá vodicí linka. |
| 40 / 1987–2027 | podpora | 200 ms | 180 ms | Opacity; žádný morph 40 → ∞. Roboto Flex, stejný tvar v obou smyčkách. |
| Nová stránka | obsah | 700 ms | 300 ms | Odkryje ji odchod plochy; její vlastní motion nesmí zůstat trvale skryté. |

## Technika a vlastnictví
- Žádná nová závislost. DOM/SVG + Web Animations API/CSS; pokud bude nutný GSAP, jen stávající `lib/gsap/setup.ts`.
- Produkční kandidát `RouteTransition.tsx` je pouze koordinátor překryvu, **není vlastní router**. Nevolá preventDefault/router.push, nečeká na completion animace, nevkládá druhý scroll engine.
- Nativní přechody zůstávají React `<ViewTransition>`; žádné soupeřící `document.startViewTransition` (React cizí přechod přerušuje). Prototyp bez Reactu používá nativní API jen k ilustraci snapshotu, není důkazem integrace App Routeru.
- Ověřit interní běžný odkaz: stejné origin, jiné pathname; ignorovat Ctrl/Cmd/Shift/Alt klik, download, target, externí URL, mail/tel, hash a query-only filtry. Programové navigace a historie přes změnu pathname bez duplikace efektu. Navigace neblokuje posun ani fokus.
- **SharedPhoto:** archiv ↔ detail a detail ↔ detail vždy jen rychlý fade / původní sdílená fotka; bez modré plochy a ∞. Nevkládat dodatečný snapshot, nerušit pojmenování `story-*`. `SharedPhoto.tsx` zůstává Claudův.
- Cancel/restart při další navigaci; konečný cleanup i při chybě, skrytí tabu, změně preference a unmount. Nová stránka má vlastní fokus; překryv na něj nesahá.

## Dotčené soubory
Nyní pouze tento dokument a `docs/era40-ai/prototypes/014-route-transitions/**` v izolovaném worktree `/private/tmp/era40-p3-route`.
Po schválení: `web/src/components/transitions/RouteTransition.tsx`, `RouteTransition.module.css` a jediný import/mount v `web/src/app/layout.tsx` (zapojí Claude nebo po výslovném uvolnění). Případné globální pseudo selektory musí být lokalizované přes předka/třídu CSS Module.

## Přístupnost a výkon
- Žádný fokus, zámek dokumentu, `inert`, odstranění obsahu, zvuk nebo formulářová akce. Čtečka překryv nečte. JS fail znamená běžné odkazy.
- Jedno SVG, jeden panel, pouze transform/opacity a dashoffset. Po 1 s žádné aktivní animace. GPU canvasů nula. Stroke repaint je vědomý, malý SVG; fyzický mobil ověřit, neslibovat 60 fps z emulace.
- Po technickém review Claude: tah používá `vector-effect:non-scaling-stroke` a token Trasy (2 px desktop / 1,5 px mobil), takže s SVG nemizí. Doprovodná věta „Zkušenost pokračuje.“ platí i mimo příběhy. Frekvence plné předávky je otevřený feel-check: Claude doporučuje jen první změnu stránky v session a potom krátký fade; prototyp zatím ukazuje plnou variantu pro posouzení.
- CSS/JS je lokální. Prototyp načítá fonty a existující ilustrační fotografie z projektového `web/public`, žádné nové stahované assety.

## Akceptace a limity prototypu
- 360/390/430 první, dále všech osm šířek QA matice; přetečení 0, kontrast bílé/žluté na EU modré.
- Klávesnice, back/forward, rychlé opakované kliky, zrušení a reduced za běhu; poslední routa i obsah dostupné, překryv nikdy nezůstane.
- Prototyp simuluje routy lokálně přes `?view=...`; **neověřuje Next prefetch, streaming, skutečný SharedPhoto ani produkční INP**. To je povinné integrační QA až po schválení.
- Lighthouse neprodukuje věrohodné reálné INP bez uživatelských dat. V integraci zaznamenat Event Timing/long tasks a responsivitu při dvojkliku; neoznačovat skóre Performance za INP.
- Izolovaný náhled: `http://127.0.0.1:3073/`. Scrubber dovolí posoudit frame 0–100 % a varianta „Bez nativních přechodů“ ověří fallback.

## Schválení
### Řemeslné doladění na přímý pokyn Jakuba
15. 11. 2026: „tučnější ty radiusy té nuly nekonečné … a nějak efekty“ — tah nyní 2,5× token Trasy: **5 px desktop / 3,75 px mobil**, oblé zakončení i spoje. Krátký žlutý světelný úsek sleduje čelo kresby ve stejných 120–640 ms a do 760 ms zmizí. Je to podpůrná fáze původní kresby, bez další smyčky, prodloužení navigace, změny layoutu, blur filtru či nového rendereru. User zároveň výslovně potvrdil „už jsi na to vše sám“; implementaci, koordinaci i závěrečnou kontrolu nyní dělá Codex bez další delegace.

Ke schválení: „Jedna modrá předávka s jedním tahem ∞ a označením 40 let, 1 s při změně stránky, bez efektu na sdílené fotografii; následná integrace podle specifikace 014.“
**Schváleno:** Jakub, 15. 11. 2026, přímá odpověď v Codex chatu: „Schvaluji specifikaci 014 i integraci“. Souhlas zahrnuje konkrétně popsaný route motiv ∞ s 40 a letopočtem, takže v tomto rozsahu nahrazuje dřívější odmítnutí motivu. Neobnovuje samostatnou sekci/bránu 40 → ∞. Scope, mobil, reduced i ochrana SharedPhoto zůstávají podle této specifikace.
