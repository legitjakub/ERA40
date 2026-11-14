# 001: Gramatika Trasy (jedna cesta přes celý web)
Kapitola / komponenta: globální (Hero trail, HistoryTimeline, PeopleStories, EuropeMap, Future) · **Stav: návrh, prototyp v1 hotový (14. 11. 2026), čeká na Jakubovo posouzení**
Účel: spojuje · Frekvence: jednou za návštěvu (scroll) · Reference: Inkwell (návaznost scén), Tracing Art (orientace), `creative-language.md`

## Koncept
Erasmus je jedna dlouhá cesta, kterou za 40 let ujely statisíce lidí. Pět dnešních linek proto bude mluvit **jedním jazykem**: plná modrá = ujeto, žlutý bod = tady jsi, tečkovaná = ještě před námi. Na konci každé kapitoly linka **předá** svou polohu další kapitole.

## Stavy
- INITIAL: SSR vykreslí všechny linky v klidovém stavu „ujeto“ (plné), aby bez JS nic nechybělo.
- INTRO: při vstupu do kapitoly se linka kreslí od místa, kde skončila předchozí (levý / horní okraj podle kapitoly).
- AMBIENT: žádný. Žlutý bod se hýbe jen se scrollem.
- OUTRO: linka dojede k okraji v místě, kde začíná linka další kapitoly (stejná výška / x). Tečkovaný úsek „budoucnost“ ukazuje směr.
- REVERSE: scrub, přesná inverze.
- MOBILE: zachovat jazyk (plná / bod / tečkovaná), předávky jen vertikálně podél levého okraje. Žádné nové piny.
- REDUCED: vše nakreslené jako „ujeto“, bez bodu v pohybu. Tečkovaná budoucnost jen ve finále.

## Choreografie
| Prvek | Role | Start | Délka | Pohyb | Vztah |
|---|---|---|---|---|---|
| Linka kapitoly | Lead | vstup kapitoly | scrub | DrawSVG 0→100 % | navazuje na OUTRO předchozí |
| Žlutý bod | Support | s linkou | scrub | `motionPath` po lince / x podle progresu | drží čelo linky |
| Tečkovaný úsek | Decoration | OUTRO | scrub | opacity 0→1 | spolu s dojezdem linky |

## Technika
DrawSVG (je registrovaný), `motionPath` (MotionPathPlugin, lazy, zdarma, **nový plugin, ne závislost**), tokeny `EASE`/`DUR`. Sdílený preset `trasaHandoff()` v `lib/gsap/presets.ts`, aby linky kreslila jedna funkce. Nové runtime závislosti: **NE**.

## Dotčené soubory
`lib/gsap/presets.ts` (+ preset), `lib/gsap/setup.ts` (lazy MotionPath), `styles/tokens.css` (tloušťka, dash token), `hero/Hero.tsx` (jen trail OUTRO), `history/HistoryTimeline.tsx`, `people/PeopleStories.tsx`, `map/EuropeMap.tsx`, `future/Future.tsx`. Rozdělit do kroků: nejdřív tokeny + preset + jedna kapitola (Historie), schválit, pak ostatní.

## Přístupnost
Linky jsou `aria-hidden`. Informace nesou stávající texty a seznamy. Navigace kapitolami beze změny.

## Výkon
Jen SVG stroke a transform bodu. Žádné nové piny. Měřit FPS při scrollu přes 03–05.

## Riziko a co nevíme
Feel předávky na hranici kapitol se nedá posoudit ze statiky. Prototyp: izolovaná HTML stránka se třemi kapitolami a scrubem, posoudit při 0,25× rychlosti. Velký zásah do 5 komponent, proto po krocích.

## Prototyp v1 (14. 11. 2026)
- Soubor: `docs/era40-ai/prototypes/001-trasa-grammar.html`, soukromá stránka: https://claude.ai/artifact/FwqfqCxhgRvy52cABKusNq
- Pět zástupných kapitol (Odjezd, Historie, Příběhy, Mapa, Budoucnost) jako sticky scény. Přepínač **Dnes / Návrh 001** a „Omezit pohyb“.
- Technika v prototypu:
  - jen GSAP + ScrollTrigger (scrub 0,45),
  - linka přes `stroke-dashoffset` a `getPointAtLength` pro bod, takže MotionPath ani DrawSVG nejsou potřeba,
  - předávka = esíčko u spodní hrany kapitoly, které končí vlevo nahoře další kapitoly,
  - mapa je ekvirektangulární schéma (Praha leží na ose).
- Ověřeno Playwrightem na 1440 a 390 px: bez přetečení a chyb. Pohled na scrub jen ze snímků. Plynulost musí posoudit Jakub v prohlížeči.

### Poučení z prototypu
- Google Fonts vrací Roboto Flex jako statický řez 400, proto se osy wdth/wght neuplatní. Pro věrnost vložit vlastní woff2 projektu.
- Na 390 px se popisky 7–8 stanic na ose překrývají. Ukázat jen první, poslední a aktuální.
- Ovládací prvky nesmí zakrýt spodní okraj kapitoly, tam se odehrává předávka.

### Otevřené otázky pro produkci
1. Hero má pin (film → rám) a Příběhy horizontální rail. Předávka musí počítat s pin-spacery (měřit konec scény, ne sekce).
2. Esíčko u každé kapitoly může při 5 opakováních působit mechanicky. Zvážit odlišné tvary předávky (oblouk, rovný sjezd) podle obsahu kapitoly.
3. Jestli bod „tady jste“ nahradí nebo doplní progres v hlavičce (SiteNav).
