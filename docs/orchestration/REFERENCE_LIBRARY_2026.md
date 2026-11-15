# Reference Library 2025–2026

15. 11. 2026 · Claude.

**Jak byly reference ověřeny:**
1. Ocenění: každá stránka na awwwards.com otevřena Playwrightem, datum přečteno přímo z ní (`/sites/<slug>`). Text odpovídá stránce Awwwards v den kontroly.
2. Živý web: navštíven v Chromiu 1440 × 900 a 390 × 844, screenshoty na 0 / 30 / 60 % stránky.
3. Detekce technologie: zaznamenány typy `getContext` (webgl/webgl2/webgpu/2d), `window.__THREE__` (revize three.js), třída `lenis`, framework a požadavky na `.glb/.ktx2/.drc`.
4. Druhý průchod za vstupní bránu u klíčových webů (`deep/`).

Screenshoty jsou lokálně v `scratchpad/refs/shots` a `deep/` (mimo Git). Vybrané jsou zkopírované do `docs/era40-ai/references/screenshots/2026-11-15/`.

**Omezení:**
- GSAP je téměř vždy zabalený v bundlu, takže `window.gsap` = null neznamená, že ho web nepoužívá.
- Headless Chromium se SwiftShaderem nedává reálný výkon. FPS se neměřily.
- Weby za vstupní branou byly v prvním průchodu vidět jen u vstupu.

## Knihovna (28 živě ověřených)

| # | Web | Ocenění (ověřeno na Awwwards) | Typ | Technologie (detekce) | Co se naučit pro ERA40 |
|---|---|---|---|---|---|
| 1 | [Hubtown](https://hubtown.co.in/) — Unseen Studio | SOTD 10. 6. 2026 | živý web | WebGL2, three r179, GLB | **40 let** firmy jako filmová 3D scéna. Loader jako časová osa teček. Ukazuje, jak výročí 40 let vyprávět budoucností, ne nostalgií. |
| 2 | [OceanX 2025](https://2025.oceanx.org/) — Unseen | SOTD 23. 2. 2026 | výroční přehled roku | WebGL2, three r181, GLB | Rok jako imerzivní časová osa, „Enter experience“, partneři jako součást úvodu. Instituce prezentuje dopad, ne sebe. |
| 3 | [Why Zero](https://why.zero.university/) — Sindhur Dutta | SOTD 7. 9. 2026 (+ SOTM) | narativní kampaň (vzdělávání) | WebGL2, three r160, GLB | **Uživatel nakreslí nulu gestem** a tím odemkne příběh. Přímá inspirace pro smyčku přes „0“ ve 40 (směr A): interakce místo dekorace. |
| 4 | [Ten Years Away](https://ten.375.studio/en) — Studio375 | SOTD 26. 6. 2026 | výročí 10 let | WebGL2, three r182, Lenis, Next | Kinetické číslo letopočtu (2025 → 2028) jako vstup, komiksová kamera ve fixed canvasu (R3F). Výroční čísla jako typografický pohyb. |
| 5 | [FC Porto Memorial](https://memorial.fcporto.pt/) — Significa | SOTD 22. 3. 2026 | memorial / dokument | 2D, video, Lenis | Dokumentární tón, portrét a velká serifová typografie, kapitoly života. Lidský příběh nese střídmost, ne efekty. |
| 6 | [21 hrs on the Moon](https://www.21hrs.space/) — Studio 28K | SOTD 10. 7. 2026 | historický dokument | WebGL2, three r159 | Historická událost jako průzkum terénu s hotspoty archivu. Data a archiv jako prostor, kterým se pohybujete. |
| 7 | [The Tuscan Journey Begins](https://weekend-mm-2026-pasticcino-bag-master.monogrid.io/en/) — MONOGRID | SOTD 13. 9. 2026 | kampaň „cesta“ | WebGL2, three r183, GLB | **Interiér vlaku a okno jako rám cesty**, „Skip intro“. Stejný motiv jako ERA40 prolog. Potvrzuje, že vlakový rám funguje, ale musí mít možnost přeskočit. |
| 8 | [20 años inspirados por personas](https://inspiring.nk.studio/es) — /nk | SOTD 7. 8. 2026 | **výročí 20 let** | WebGL + WebGL2, three r183, Lenis | „Antes de inspirar, fuimos inspirados“: výročí jako poděkování lidem a „archiv inspirace“. Tónem nejblíž ERA40 (lidé, ne instituce). |
| 9 | [The Power of Storytelling](https://storytelling.noomoagency.com/) — Noomo | SOTD 8. 6. 2026 | storytelling experience | WebGL2, three r179 | Storytelling jako téma, dlouhý loader s ilustrovanou postavou. Varování: dlouhé načítání před obsahem. |
| 10 | [IVRESS — Spin a Tale](https://brand.ivress.co.jp/) — Laugh Mind | SOTD 28. 6. 2026 (+ FWA SOTM dle zdroje) | brand příběh | **WebGPU**, three r182, Lenis | „Příběh, který končí tam, kde začal“ = kruhová struktura (směr B). Technologicky nejnovější (WebGPU), pro ERA40 zatím nevhodné kvůli podpoře. |
| 11 | [Unseen Studio 2025 Wrapped](https://2025.unseen.co/) | SOTD 24. 3. 2026 | přehled roku | WebGL2, three r162, 32 videí | Rok jako „wrapped“ formát (paralela ke kvízu ERA). Hodně videa, dlouhý loader. |
| 12 | [AI in Design Report 2026](https://stateofaidesign.com/) — ++hellohello | SOTD 26. 8. 2026 | **datový report** | 2D, Framer, video | Data a dopad čitelně: kapitoly 01 Tools…, citace lidí z firem. Vzor pro kapitolu Čísla (data + lidé, ne dashboard). |
| 13 | [Hollywood Exhibit 2026](https://www.hollywoodexhibit2026.com/) — OSMOS | SOTD 2. 8. 2026 | výstava / archiv | WebGL2, three r182 | Archiv obálek v 3D poli, „Choose which gallery“. Archiv jako prostorová galerie, inspirace pro archiv příběhů. |
| 14 | [Decathlon Yestalgia](https://decathlonyestalgia.com/) — index | SOTD 28. 8. 2026 | heritage kampaň | WebGL2 + 2D, Lenis | „Origins 2000“: práce s dekádami a minulostí bez sentimentu. Hravá typografie dekád. |
| 15 | [Miu Miu — A House That We Shaped](https://immersivebags.miumiu.com/) — Merci Michel | SOTD 25. 8. 2026 | imerzivní produkt | WebGL2, GLB | Typografická kompozice s rozvolněnými mezerami. Imerze za vstupní bránou se zvukem. |
| 16 | [Ruinart Digital Fresco](https://fresque.ruinart.com/) — makemepulse | SOTD 21. 4. 2026 | participativní dílo | (age-gate) | **Participativní freska**: lidé přispívají do společného díla. Paralela k Erasmus Walls (aktivace DZS). |
| 17 | [Squarespace Foundations](https://brand.squarespace.com/) — Resn | SOTD 1. 9. 2026 | brand systém | WebGL2, three r180, ScrollTrigger, Lenis | Typografie jako prostorový objekt (glyf „g“ s body). Typografie integrovaná do pohybu. |
| 18 | [Capitolium](https://www.collabcapitolium.fr/) — Supercolor | SOTD 18. 5. 2026 | město / kolaborace | WebGL, Nuxt, Lenis, video | Letecký pohled na město jako úvod, místo jako identita. Paralela k mapové kapitole. |
| 19 | [Trionn](https://trionn.com/) | SOTD 27. 7. 2026 | agentura | WebGL2, three r128, Lenis | Technická reference (Codrops: koordinace GSAP + three + Lenis + Web Audio). Architektura synchronizace. |
| 20 | [The Lookback](https://tlb.betteroff.studio/) — Better Off | SOTD 27. 3. 2026 | roční ohlédnutí | 2D, Nuxt | Ohlédnutí jako index měsíců, typografický archiv. |
| 21 | [L.I.S.A.](https://lisa.locomotive.ca/en) — Locomotive | SOTD 16. 9. 2026 | experiment | WebGL2, three r165 | Postava s TV hlavou, „click to start“. Konceptuální 3D, pro ERA40 jen jako řemeslo. |
| 22 | [GQ × AP The Extraordinary Lab](https://www.gq.com/sponsored/story/the-extraordinary-lab) — Immersive Garden | SOTD 26. 3. 2026 (+ SOTM) | sponzorovaný příběh | WebGL2, three r172, Nuxt | Editorial v médiu jako 3D laboratoř. |
| 23 | [Floema](https://www.floema.com/en) — Bürocratik | SOTD 13. 5. 2026 (SOTM) | katalog | three r181, Lenis | Už v knihovně (2025). Rytmus obraz/text, kategorie. |
| 24 | [Extrafazant](https://www.extrafazant.nl/) — Dylan Brouwer | SOTD 8. 11. 2026 | studio | Webflow, Lenis, video | Už v knihovně. Grafický tah přes hranici sekcí. |
| 25 | [Champions for Good](https://www.champions4good.club/) — Double Play | SOTD 6. 4. 2026 | komunita / síť | Webflow, Lenis | Komunita jako „síť“, plakátová typografie. Nebezpečně blízko „AI šabloně“ s vtipnými ilustracemi. |
| 26 | [depart inc. 10th anniversary](https://depart-inc.com/10th-anniversary/) | Honorable Mention 31. 10. 2025 | výročí | WebGL2, three r164, Next | Výročí jako hravý 3D svět. Opačný tón než ERA40 (hračkovitý). |
| 27 | [Buzzvel turns five](https://five.buzzvel.com/) | Honorable Mention 1. 2. 2026 | výročí 5 let | Lenis, 22 videí | Výročí přes fotky týmu a rok po roku („Born to make an impact 2020/2021“). |
| 28 | [BOYD](https://boyd.ae/) | SOTD 25. 3. 2025 | kultura / umění | Nuxt, Lenis | Klidná serifová vstupní obrazovka, „click to enter“. |

**Neověřeno:** Cartier Le Chœur des Pierres (SOTD 20. 10. 2026) vrátil „Access Denied“. Into the Amazon (NatGeo, CommArts) nemá nalezenou živou URL. Výsledek „Women at Work“ (Awwwards SOTY 2025 podle vyhledávání) stránka nepotvrdila.

**Zjištění napříč:**
- 17 z 28 webů používá three.js (r128–r183), vesměs WebGL2.
- 13 z 28 má Lenis.
- 1 web používá WebGPU (IVRESS).
- Dominuje vstupní brána („Enter“, zvuk, loader).

To je trend, který **ERA40 nepřebírá**: hero s filmem okamžitě a bez brány je pro veřejnou instituci a SEO lepší. Výjimkou je volitelný zvuk.

## TOP 10 pro ERA40 (směr A)

| Pořadí | Web | Proč |
|---|---|---|
| 1 | Why Zero | Interakce s nulou (nakreslit nulu) = přesný precedens pro smyčku přes 0 ve „40“. Význam místo ikony. |
| 2 | Hubtown | 40 let jako pohled dopředu. Filmová 3D scéna s jednou dominantou. |
| 3 | /nk 20 años | Výročí = poděkování lidem. Tón a „archiv inspirace“. |
| 4 | Ten Years Away | Kinetický letopočet a kamera ve fixed canvasu nad DOM (technický vzor pro GPU ribbon). |
| 5 | AI in Design Report 2026 | Data + lidé, čitelné kapitoly. Vzor pro přepracovaná Čísla (spec 009). |
| 6 | OceanX 2025 | Instituce ukazuje dopad roku. Partneři a data uvnitř zážitku. |
| 7 | FC Porto Memorial | Dokumentární střídmost a portrét. Vzor pro příběhy a detail. |
| 8 | The Tuscan Journey | Vlakový rám cesty a „Skip intro“. Potvrzení a varování pro prolog. |
| 9 | 21 hrs on the Moon | Historie jako prostor s hotspoty archivu. Vzor pro kameru v Historii (směr A, krok 4). |
| 10 | Squarespace Foundations | Typografie jako prostorový objekt. Vzor pro „40“ a čísla. |

Starší knihovna (Getty Tracing Art, Persepolis, Inkwell, Paper Planes, The Watch) dál platí jako principy (`docs/04-top-10-references.md`).

## Druhý průchod za vstupní bránou (ověřená pozorování)

- **Hubtown:** svítící **linky (ribbony) protékají scénou** jako „síť“ („We work with a network of experts“). Kamera jede, kostka je dominanta. Přímý precedens pro GPU ribbon Trasy (MOTION_BIBLE P1): jedna linka jako vypravěč ve 3D.
- **Why Zero:** gesto opravdu kreslí kružnici (nulu) kolem ostrova a tím posouvá příběh. Potvrzuje M02 jako interakci, ne dekoraci.
- **/nk 20 años:** „archiv inspirace“ = prostorová stěna karet lidí (portrét, jméno, krátký titulek) v mírné perspektivě. Precedens pro archiv příběhů a pro „40 let, 40 příběhů“.
- **FC Porto Memorial:** velké číslo („2594 títulos“) s dokumentární fotografií a jedna věta na obrazovku. Vzor typografie pro Čísla (spec 009): číslo + člověk, ne graf.
- **Ten Years Away:** obálka komiksu mezi letopočty 2015 / 2025 přes celou šířku. Letopočty jako rám kompozice (pro 1987 / 2027).
- **21 hrs on the Moon:** terén s hotspoty archivu a lištou kapitol dole. Navigace kapitolami ve 3D prostoru.
- **OceanX, Tuscan Journey:** po kliknutí se v headless prohlížeči nepohnuly dál (brána se zvukem nebo vyžaduje skutečnou interakci). Pozorování je omezené na vstup.

## Doplnění 15. 11. 2026, 16:30: Jakubovy původní inspirace (ověřeno živě a na awwwards.com)

| Web | Ocenění (awwwards.com) | Technologie (detekce) | Pro ERA40 |
|---|---|---|---|
| [Sleep Well Creative](https://sleep-well-creatives.com/) (Victor Work) | **SOTD 28. 1. 2026** | Webflow, three r180, WebGL2, Lenis jen desktop | kapitoly s jedním tvrzením, interaktivní „insights“; vstupní brána ne |
| [Tabasco — Interactive 3D](https://tabasco.hilostudiolab.com/) (Hilo Studio) | nenalezeno (`/sites/tabasco` = 404) | three r165, GLB, HDR, Lenis | dědictví značky jako časový příběh (1868 →), precedens pro Historii. **„Tabasco“ je reference, ne font.** |
| [Event Horizon](https://fade.run/) (cleanlystudio) | **HM 25. 3. 2026** | web dnes „Deployment Paused“ (402) | nelze studovat |

Screenshoty: `docs/era40-ai/references/screenshots/2026-11-15/sleepwell-1440-0.jpg`, `tabasco-1440-1.jpg`, `tabasco-390-1.jpg`.
