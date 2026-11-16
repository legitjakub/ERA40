# 016 · Living Route: hero → Prolog

Komponenta: `components/hero/Hero.tsx`, `components/people/PeopleIntro.tsx` (zatím beze změny) · **Stav: specifikace schválena v rámci Creative Blueprintu v0.2 (Jakub, 16. 11. 2026); izolovaný prototyp hotový a zrevidovaný (R1–R8 uzavřeny). Produkční integrace NENÍ schválena** a čeká na Jakubovo rozhodnutí o prototypu (fáze 11).
Účel: spojuje · Frekvence: jednou za návštěvu (scroll scéna), REVERSE kdykoli.
Prototyp: lokálně mimo Git v `/private/tmp/era40-living-route-prototype-016-2026-11-16/` (HTML/GSAP, Codex), revize `REVIEW-016.md` tamtéž.

> **Revize 1 (16. 11., po REVIEW-016):** časování desky a obrysu 0,25 → 0,55, kresba boků 0,55 → 1,00 (R2). Barva čáry: dva geometricky shodné path, bílý ořezaný obdélníkem filmu a modrý pod ním (nahrazuje crossfade). h1 `line-height` 1,04 kvůli diakritice. Copy `inert` od 0,15 s focus hold. Podtržení `bottom −0.075em` (R7). Žlutý bod 10 px s prstencem 2 px `--c-eu-blue` i v hero.

**Motion specifikace pro izolovaný prototyp · Claude (era40-motion-director) · 16. 11. 2026.**
Zdroj: schválený `CREATIVE_BLUEPRINT_V02.md` (§3 C2, §4, §9 C1–C5, §10 01→02, §12). Jakub schválil Blueprint v0.2 a přípravu izolovaného prototypu. **Neschválil produkční integraci.** Tato spec platí pro prototyp. Pro integraci se po vizuální revizi doplní a schválí zvlášť (fáze 11).

Účel: **spojuje**. Frekvence: jednou za návštěvu (scroll scéna), REVERSE kdykoli.
Technika: CSS + GSAP 3.15 + ScrollTrigger + (volitelně) DrawSVG z lokálních balíčků. Bez MorphSVG, WebGL, canvasu a nové knihovny.

## 1. Koncept

Film se zastaví v okamžiku, který čtenář právě vidí, a stane se fotografií. Bílá linka pod textem hera je Trasa. Ta se zvedne, obejde fotografii jako její rám a **levým okrajem rámu sestoupí** do Prologu. Tam se ohne doprava a stane se podtržením „trochu jiní.“. Žlutý bod (přítomnost čtenáře) jede celou dobu na čele čáry. Za ním zůstává plná čára (ujetá cesta).

Jedna čára, jeden bod, žádná nová ikona. Zážitek se zastaví, uloží jako vzpomínka a vede k větě o tom, co si lidé přivezli.

## 2. Obsazení

| Prvek | Role |
|---|---|
| Trasa (spodní linka → rám → sestup → podtržení) + žlutý bod | **Lead** |
| Deska filmu (`video`, při chybě/reduced poster) | Support: zastaví se, zmenší se a stane se fotografií |
| Copy C2 (kontext, 40 / let Erasmu+, claim, CTA) | Support: ustoupí jako první |
| Titulky filmu, ovládání ▶/Ⅱ, scrim | Support: odejdou po zastavení |
| Prolog h2 a slova | Static: existující čtecí scrub beze změny, mění se jen podtržení |
| Navigace | Static: jen přepnutí barvy pro čitelnost na bílé |

S04, PeopleRow a další kapitoly nejsou součástí choreografie 016.

## 3. Režimy a prahy

| Režim | Podmínka | Chování |
|---|---|---|
| **RICH** (desktop) | `(min-width:1024px) and (min-height:680px) and (hover:hover) and (pointer:fine)` a bez reduced | pin 150 vh, plná choreografie §5 |
| **COMPACT** (nízký desktop / dotykový desktop) | ≥ 1024 px, ale RICH neplatí, bez reduced | bez pinu, jednoduchý okraj masky, linka se bez objezdu rámu ohne dolů do Prologu (§7) |
| **MOBILE** | < 1024 px, bez reduced | nativní scroll, bez pinu, krátký fotografický okraj, svislá Trasa (§8) |
| **REDUCED** | OS `prefers-reduced-motion: reduce` nebo přepínač „Omezit pohyb“ | vše statické, předkreslené (§9) |

Prahy 680 px a 1024 px jsou návrhové a ověří je prototyp. Existující prahy 620 a 680 px u 008/JourneySequence se nemění.

Kompozice C2 v COMPACT používá při výšce < 680 px kompaktní řádek (40 = 80 px, claim 80 px). Na výšce ≥ 680 px bez fine pointeru zůstává velká C2, ale bez pinu.

## 4. Geometrie Trasy (RICH)

Všechny souřadnice jsou v px viewportu. Měří se **jen při refreshi** (`invalidateOnRefresh`, `onRefresh`), nikdy ve snímku. Příklad je pro 1440 × 900.

**Vstupy z layoutu:**
- `W, H`: viewport.
- `colLeft`: levý okraj textového sloupce Prologu, tedy levý okraj h2. Při 1440 to je 86 px (`max-width 1440`, padding `clamp(24px,6vw,92px)`).
- `xR = max(16, colLeft − 28)`: **osa sestupu** v levém okraji mimo text, aby svislá čára nikdy neprošla písmeny h2. Při 1440 to je 58.
- `A = (copyLeft, H − 10)` a `B = (stationX, H − 10)`: dnešní bílá linka C2. Při 1440 to je 86 → 1340, žlutý bod v B (svisle pod středem pauzy).
- `g = 12`: mezera mezi čarou a fotografií (paspart).

**Cílová fotografie R1 (konec pinu):**
- `left = xR + g`, `right = W − (xR + g)`;
- `top = navBottom + 12 + g` (při 1440 ≈ 96);
- `bottom = H − 112` (při 1440 to je 788, R1 = 1300 × 692).

Film se do R1 vejde **uniformním zmenšením desky** `s = R1.width / W` s posunem na střed R1. Svislý přebytek oříznout symetrickým `clip-path: inset(...)` jen nahoře a dole. Tváře se tak nezmenšují víc, než je nutné, a neořezávají se do stran.

**Obrys Trasy K(p):** obdélník interpolovaný mezi dvěma stavy:
- `K0`: degenerovaný obdélník = dnešní linka (`left = A.x`, `right = B.x`, `top = bottom = H − 10`);
- `K1 = R1` rozšířený o `g` (`left = xR`, `right = W − xR`, `top = R1.top − g`, `bottom = R1.bottom + g`).

**Cesta (jeden `<path>`, jedno pořadí tahu):**
```
M K.left,K.bottom   H K.right   V K.top   H K.left   V H
```
Dolní hrana zleva doprava, pravá hrana nahoru, horní hrana doleva, pak levá hrana dolů. Ta přímo pokračuje přes levý dolní roh až na spodní okraj hera (`y = H`). **Levá hrana rámu a sestup jsou jedna přímka `x = xR`.**

**Viditelný úsek:** od 0 po `e(p) = Lb + d(p) · (Lr + Lt + Ld)`.
- `Lb, Lr, Lt` jsou délky stran K(p), `Ld = H − K.top`.
- Délky se počítají analyticky, bez `getTotalLength`.
- `stroke-dasharray: e, 99999`. `d(p)` je 0 → 1 lineárně v p **0,55 → 1,00** (po revizi R2: boky se kreslí až na hotovém paspartu).

Protože se `d` během animace mění, nepoužívat DrawSVG na tento path. Dash vypočítat ve stejném `onUpdate` jako `d` (jeden zápis atributů na snímek).

**Žlutý bod** = bod na cestě v délce `e(p)`, tedy čelo čáry. Na začátku sedí v B (dnešní stanice). Pak jede po pravé hraně nahoru, horní hranou doleva a levou hranou dolů. Při p = 1 sedí v `(xR, H)`.

**Barva čáry:**
- bílá, dokud leží na filmu;
- `--c-eplus` (#007fc7), jakmile je na bílém paspartu.

Barvu řeší dva geometricky shodné path: bílý ořezaný obdélníkem filmu (`clipPath` podle aktuální desky) a modrý pod ním. Úsek nad filmem je tak vždy bílý, úsek na paspartu vždy modrý, bez crossfade a bez výpočtu průsečíku. Žlutý bod dostane na bílé prstenec 2 px `--c-eu-blue` (žlutá na bílé jinak nemá kontrast).

**Navázání v Prologu (S2, druhé SVG uvnitř Prologu):**
```
M xR,0   V uy − r   Q xR,uy  xR + r,uy   H ux2
```
- `uy` a `ux2` jsou y a pravý konec dnešního podtržení `<i data-underline>` (2 px, `--c-eplus`, `bottom −0.015em`). Měří se z jeho rectu.
- Poloměr ohybu `r = 16`.
- Horizontální úsek **je** podtržení: v režimech s Trasou je `<i data-underline>` skrytý, tloušťka a barva jsou stejné.
- Šev mezi hero a Prologem je bez mezery: konec pinu = `y = H` hera = `y = 0` Prologu, obě osy `x = xR`. Tolerance spoje ≤ 1 px na všech testovaných šířkách.

**Jediná typografická změna Prologu (desktop ≥ 1024 px, všechny desktopové režimy včetně reduced):** „trochu jiní.“ začíná na vlastním posledním řádku h2 (`.ending` jako blok).
- Jinak by vodorovný úsek z okraje podtrhl i předchozí slova.
- Mobil se nemění.
- Patří do schváleného rozsahu „napojení Trasy“ (§10 01→02) a posoudí se ve vizuální revizi.
- **Záloha B**, pokud by zalomení v revizi neobstálo: S2 končí bodem v okraji (`xR`) na úrovni posledního řádku a podtržení zůstává samostatný dnešní scrub. Směr pak navazuje, geometrie ne.

## 5. Choreografie RICH (p = progress pin timeline, scrub 0,45, ease none)

| Prvek | Role | p start | p konec | Pohyb | Vztah |
|---|---|---:|---:|---|---|
| Copy C2 (`[data-film-copy]`) | support | 0 | 0,15 | `yPercent 0 → −6`, `opacity 1 → 0` | Dnešní pohyb, beze změny. Focus výjimka §10 |
| Video | support | **0,15** | – | `pause()` při průchodu vpřed, **bez seeku**. `pausedByScene = true` jen pokud předtím hrálo a nebylo ručně pozastaveno | Zastavený snímek = fotografie |
| Titulky filmu | support | 0,15 | 0,22 | `opacity → 0` | Až po pauze |
| Ovládání ▶/Ⅱ | support | 0,15 | 0,25 | `opacity → 0`. V ≥ 0,25 `inert`, jen pokud v něm není focus | Pauza nastane dřív, než ovládání zmizí |
| Scrim | support | 0,15 | 0,40 | `opacity → 0` | Bez textu už fotografie nemá být ztmavená, vrací se denní světlo |
| Deska → R1 | support | 0,25 | **0,55** | uniformní `scale` + posun + svislý `clip-path` (§4) | Střízlivé zmenšení, žádná rotace |
| Obraz uvnitř desky | support | 0,25 | **0,55** | `yPercent 0 → −3` | Jemná vrstevná paralaxa, max. 3 % |
| Navigace | static | 0,22 | 0,28 | barva bílá → ink | Nad bílým paspartem musí být čitelná |
| Obrys K | **lead** | 0,25 | **0,55** | K0 → K1 | Linka se zvedá a stává se dolní hranou rámu |
| Barva Trasy | lead | p× − 0,05 | p× + 0,05 | bílá → `--c-eplus` | p× = výpočet průsečíku |
| Kresba + žlutý bod | **lead** | **0,55** | 1,00 | `d 0 → 1`, bod na čele | Obejde rám a sestoupí levým okrajem |
| *(konec pinu)* | | 1,00 | | hero odjíždí nativně | Bod v `(xR, H)` |
| S2 v Prologu | **lead** | Prolog `top bottom` | h2 `bottom 42%` | dash 0 → délka S2, bod na čele | **Stejný konec jako dnešní scrub slov**, takže podtržení se dokreslí s posledním slovem |

**Předání bodu:** dokud je postup S2 = 0, je vidět bod hera. Od prvního pixelu S2 je vidět bod S2 (stejná poloha na švu), bod hera je skrytý. Bod je jeden vizuální objekt.

**Tokeny:** scroll vazby `ease: "none"` (jako dnes); intro `EASE.out` / `DUR`. Nový ease se nepřidává.

## 6. Stavy

| Stav | RICH |
|---|---|
| **INITIAL** | SSR plakát: poster (LCP), C2 sazba, CTA, bílá linka A→B a žlutý bod v B. Rezervované boxy §11. Bez loaderu. Titulky skryté až do prvního `playing`. |
| **INTRO** | Jednou při mountu, celkem ≤ 1,85 s, až po `document.fonts.ready` (timeout 1 s; po timeoutu žádné intro, rovnou koncový stav). Pořadí: kontext `opacity` 0 → 1 (0 s, 0,3 s) · „40“ vyjede z masky `yPercent 100 → 0` + `wdth 64 → 78` (0,05 s, 0,9 s, `EASE.out`) · „let Erasmu+“ opacity (0,45 s) · claim po řádcích (od 0,18 s, stagger 0,09, existující pohyb) · linka se kreslí A → B (0,5 s, 1,1 s) · bod se objeví v B (`scale 0 → 1`, 1,55 s, 0,3 s). Bez sessionStorage. Při prvním scroll vstupu se intro okamžitě dokončí (`progress(1)`), nikdy nezůstane napůl. |
| **AMBIENT** | Hraje film a mění se titulky. Sazba, linka i bod stojí. Žádný pulz, kurzorový efekt ani scroll-seek. |
| **OUTRO** | Tabulka §5. Fotografie je stále tentýž `<video>` element v pauze. Žádná výměna za jiný obraz. Při chybě videa je fotografií poster. |
| **REVERSE** | Vše zpět po stejné ose. Ovládání: `inert` se ruší při p ≤ 0,25 (nejpozději do 0,15), viditelné jsou do 0,15. **Přehrávání se obnoví při p ≤ 0,10 jen při `pausedByScene && !manual && !reduced && inView && !document.hidden`.** Odmítnuté `play()` ponechá klidný snímek a ▶. S2 se odkresluje se scrollem. |
| **MOBILE** | §8 |
| **REDUCED** | §9 |

**Ruční pauza má vždy přednost:** pokud čtenář pozastavil film, scéna ho nikdy nespustí, ani po návratu. Ruční ▶ po návratu je běžné přehrání.

## 7. COMPACT (≥ 1024 px bez RICH)

- Bez pinu, scroll nativní (nebo jediný Lenis podle prototypu, viz brief).
- Hero odjíždí normálně. Scrubem na `hero bottom: bottom → 40%` dostane deska jednoduchý okraj `clip-path: inset(0 → 0 xR+g xR+g xR+g)`.
- Linka se **neobchází rámem**: její levý konec se ohne v `xR` dolů (`M B.x,H−10 H xR V H`, kreslí se od B doleva, pak dolů) a navazuje na S2 Prologu stejně jako v RICH.
- Video se mimo obraz pozastaví existujícím IntersectionObserverem. Pauza v 0,15 zde neexistuje.
- Výška < 680 px: kompaktní C2 (40 = 80 px, claim 80 px, „let Erasmu+“ na stejném řádku).

## 8. MOBILE (< 1024 px)

- Nativní scroll, bez pinu, bez paralaxy, bez automatického nastavování času videa, bez létající fotografie.
- **V klidu žádná vodorovná Trasa** (C2 mobil). Ovládání a titulky zůstávají a odjíždějí s herem.
- Odjezd: scrub na `hero bottom: bottom bottom → bottom 40%`.
  - Deska dostane fotografický okraj `clip-path: inset(0 16px 16px 16px)` (bílý okraj se ukáže).
  - Ze spodního levého rohu fotografie (`x = 16` = levý okraj sloupce Prologu) se kreslí **krátká svislá Trasa** `--c-eplus` dolů do horního paddingu Prologu. Končí 12 px nad horní hranou h2 a bod tam zůstává jako vstupní stanice.
- Podtržení „trochu jiní.“ je na mobilu **beze změny** (dnešní `<i>` a scrub) a zalomení se nemění. Svislá čára nesmí projít textem, proto končí nad h2.
- Video se mimo obraz pozastaví (IO).
- Velikosti C2: 360: 88/44, CTA ve sloupci 48 a 44 px · 390: 96/48 · 430: 96/54, CTA v jednom řádku 48 px. Titulek filmu ≥ 16 px pod CTA.

## 9. REDUCED

- Bez autoplay, `preload="none"`, bez intro, pinu, masky, scrubu a paralaxy.
- Desktop: linka A→B s bodem staticky. Prolog: S2 **předkreslená** (sestup + podtržení, bod na konci „jiní.“), `<i>` skrytý, „trochu jiní.“ na vlastním řádku. Hero a Prolog se nespojují animací. Statická linka hera se ohne v `xR` dolů jako v COMPACT, takže je spojení vidět i bez pohybu.
- Mobil: dnešní stav Prologu, statická krátká svislá Trasa.
- Film jen po kliknutí na ▶. **IntersectionObserver ho nikdy znovu nespustí.** Po návratu do obrazu zůstává v pauze, dokud čtenář znovu neklikne.
- Přepnutí preference za běhu: okamžitě revertovat všechny scény, pauza videa bez obnovení, koncové statické stavy.

## 10. Focus a přístupnost

- **Focus výjimka:** pokud je `:focus-visible` uvnitř copy (CTA) nebo ovládání, hero dostane `data-focus-hold`. CSS s `!important` drží tyto prvky viditelné (`opacity:1`) bez ohledu na inline styly GSAP.
  - `inert` se nastaví až po odchodu focusu a jen pokud p ≥ 0,25.
  - Žádná neviditelná tab zastávka.
- Focus nikdy nespouští scroll scény a scéna nikdy nepřesouvá focus.
- Titulky jsou `aria-hidden` (dnes). Video: `aria-label` C3, `aria-describedby` → skrytý odstavec C4.
- Řádek „40 / let Erasmu+“ a kontext jsou vizuální (`aria-hidden`). Čtečka dostane jednu větu: „40 let Erasmu+, 1987–2027, v Česku od roku 1998.“ h1 = claim.
- Obě SVG Trasy jsou `aria-hidden`. Poster alt podle C3 (desktop a mobil se liší).

## 11. Rezervované typografické boxy (proti CLS)

- Font: lokální `roboto-flex-latin(-ext).woff2`, `preload`, `font-display: swap`. Každý blok má explicitní `font-size` a `line-height`, claim je předem rozdělený na dva řádky (dva spany), „40“ má `min-height` = 0,8 em. Výměna písma tak nemění výšky bloků.
- Cíl CLS v hero < 0,02.

| Viewport | 40 (840/78) | „let Erasmu+“ (600) | Claim (840/56, lh 0,96) | Kontext |
|---|---|---|---|---|
| RICH plynule | `min(13.9vw, 22.2vh)` | 0,17 × 40 | `min(6.25vw, 10vh)`, `max-width` tak, aby konec ≤ x 700 při 1440 | 16 px |
| 1440 × 900 | 200 | 34 | 90 | 16 |
| 1280 × 640 (kompakt) | 80 | 29 | 80 | 16 |
| 430 × 932 | 96 | 21 | 54 | 13 |
| 390 × 844 | 96 | 21 | 48 | 13 |
| 360 × 740 | 88 | 21 | 44 | 13 |

Hodnoty jsou ze statických studií. Prototyp je změří v prohlížeči a odchylky > 4 px nahlásí.

## 12. Výkon a technika

- Jeden pin, jedna scrub timeline pro hero, jeden ScrollTrigger pro S2. Žádný vlastní rAF ani scroll listener, vše přes GSAP ticker / ScrollTrigger.
- Na snímek se zapisuje: `d` a `stroke-dasharray` jednoho pathu, `transform` bodu, `transform` + `clip-path` desky, `opacity`. Žádné čtení layoutu ve snímku.
- `clip-path` jen svisle, zmenšení přes `transform`.
- Mimo hero / Prolog se nic nepřepočítává.
- Kontrola: desktop scroll ≥ 55 fps (headless je jen orientační), bez long tasků > 50 ms při scrubu.

## 13. Zakázáno

Žádné tabule, jízdenky, brána 40 → ∞, ∞ smyčka, neon, glow, fade-up kapitol, nové badge přes fotografie. Žádný MorphSVG, WebGL, canvas ani nová knihovna. Žádné změny 03–08, 008, 014, PeopleRow ani S04 v rámci 016. Žádné nové texty mimo copy C1–C5 schváleného Blueprintu.

## 14. Co posoudí vizuální revize (Claude)

1. Čte se linka jako Trasa, která se stane rámem, a ne jako rámeček UI?
2. Šev hero → Prolog bez skoku bodu (≤ 1 px), roh S2 do podtržení.
3. Zalomení „trochu jiní.“ (A) vs. záloha B.
4. Okamžik pauzy: zastavený snímek bez rozmazání a bez prázdného přechodu.
5. Barva čáry v průsečíku film/paspart, kontrast bodu.
6. Navigace na bílém, focus výjimka, REVERSE s obnovou přehrávání.
7. Mobil 360/390/430: okraj fotografie, svislá Trasa nad h2, titulek ≥ 16 px pod CTA.
8. COMPACT 1280 × 640 a REDUCED na desktopu i mobilu.
