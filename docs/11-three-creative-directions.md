# Tři kreativní směry — ERA40

**Projekt:** Erasmus v Česku — příběhy, které překračují hranice  
**Účel dokumentu:** srovnání kreativních směrů před výběrem finální art direction  
**Jazyk:** čeština (primární)  
**Status:** dokumentace only — žádný produkční web

---

## Anniversary framing (ověřeno — závazné)

| Fakt | Stav |
| --- | --- |
| ČR se zapojila do evropských vzdělávacích programů v **1998** | ověřeno (DZS) |
| První čeští studenti Erasmus: akademický rok **1998/1999** | ověřeno |
| „20 let Erasmu v CZ“ dává smysl ~**2018/2019**, ne pro 2027 | ověřeno |
| Vstup do EU **1. 5. 2004** ≠ 20 let Erasmu | nesměšovat |
| Pracovní název | **ERASMUS V ČESKU — PŘÍBĚHY, KTERÉ PŘEKRAČUJÍ HRANICE.** |

V roce 2027 jde o ~**29 let** od zapojení ČR (1998→2027). Numerické „20“ nepoužívat jako hlavní claim.

---

## Směr A — Human Stories (doporučený)

### Koncept
Web jako **editovaná sbírka lidských příběhů** — odchod, příchod, návrat, změna. Erasmus není „program v číslech“, ale **síť životů**, které hranice překročily. Hero drží pracovní název; návštěvník hned cítí člověka, ne instituci.

### Art direction
Editorial / dokumentární. Velké portréty, autentické prostředí (nádraží, koleje, knihovny, kuchyně bydlení), jemné filmové zrno. Institucionální vizuál DZS/EU **neimitovat** 1:1 — respektovat, ale držet vlastní hlas.

### Barvy
| Role | HEX (návrh) | Poznámka |
| --- | --- | --- |
| Papír / pozadí | `#F3EDE4` | teplý off-white |
| Inkoust | `#1A2330` | téměř navy-ink |
| Accent teal | `#2F6F6A` | klid, Evropa bez „EU blue kliché“ |
| Warm amber | `#C9854A` | odchod / světlo / lidskost |
| Soft line | `#D9D0C4` | oddělovače |

Žádná defaultní „AI purple“. Žádný flat white.

### Typografie
- **Display:** expresivní serif (např. Fraunces / Source Serif 4 / podobný) — citáty a jména
- **UI / body:** moderní grotesk (např. Geist / IBM Plex Sans) — navigace, metadata
- Citáty větší než nadpisy sekcí; jméno člověka = hero-level v příběhové kapitole

### Hero
Full-bleed portrét (ne inset card). Brand/pracovní název hero-level. Jedna věta podpory. Jedna CTA skupina („Číst příběhy“ / „Jak to začalo“). Žádné stats v prvním viewportu.

### Navigace
Minimální sticky: Příběhy · Historie · Evropa · Čísla · Budoucnost. Na mobilu bottom sheet / compact. Aktivní sekce indikována jemnou linkou, ne pill clutter.

### Vizuální jazyk
- Duotone / warm grade na archivech
- Současné fotky: natural color, mírný film look
- Oddělovače jako „dopisní papír“ / tenké linky
- **MODEL STORY – FICTIONAL PLACEHOLDER** jasně označené, dokud nejsou reálné výpovědi

### Motion
GSAP ScrollTrigger: fade/slide portréty, sticky citát při scrollu příběhu, jemný parallax pozadí (max 8–12 %). Bez agresivního scroll-jackingu. Horizontální strip příběhů (pinned) na desktopu; na mobilu vertikální stack.

### Struktura obsahu
1. Hero — název + 1 věta  
2. 3–5 featured příběhů (reálné nebo označené fictious)  
3. Historie ČR × Erasmus (timeline)  
4. Evropa — mapa vztahů (lidé, ne jen země)  
5. Then & Now (osobní „před/po“)  
6. Čísla (ověřená; UNVERIFIED označit)  
7. Budoucnost / výzva

### Pros
- Ideálně sedí na pracovní název „příběhy“
- Emocionální zapamatovatelnost
- Snadno škálovatelné (přidávat lidi)
- Dobré pro PR / sdílení

### Cons
- Závisí na kvalitě a právních souhlasech portrétů
- Bez silných příběhů hrozí „prázdný editorial“
- Méně „wow“ technického spektáklu než B

### Fit
**Nejvyšší** pro brief „příběhy, které překračují hranice“.

---

## Směr B — Europe in Motion

### Koncept
Erasmus jako **pohyb** — trasy, uzly, proudy studentů mezi městy. Česko je uzel v živé evropské síti. Důraz na dynamiku, mapu, kinetic typography.

### Art direction
Motion-first, graphic + cinematic. Tmavší plátno, světelné trasy, typografie v pohybu. Méně intimní portrét, více systémové elegance.

### Barvy
| Role | HEX | Poznámka |
| --- | --- | --- |
| Deep navy | `#0B1526` | scéna |
| Signal teal | `#3BB8B0` | trasy |
| Amber spark | `#E0A04A` | highlight |
| Fog | `#9AA7B8` | secondary text |
| Paper insert | `#E8E2D8` | kontrastní kapitoly |

### Typografie
- Display: geometrický sans s charakterem (např. Syne / Space Grotesk)
- Mono pro souřadnice / metadata tras
- Serif jen pro citáty (menší role než A)

### Hero
Full-bleed „síť Evropy“ (SVG/WebGL lines) + název. CTA: „Sledovat pohyb“ / „Vstoupit do mapy“. Žádné karty, žádné badge stickers.

### Navigace
Sekce pojmenované verbálně: Odcházet · Přicházet · Spojovat · Měřit · Směřovat. Ikony tras minimal.

### Vizuální jazyk
- Line network, dashed routes, pulse nodes
- Motion blur stills (vlak, letiště) jako texture
- Data jako elegantní overlay, ne dashboard clutter

### Motion
Silnější choreografie: path-draw mapy, camera dolly přes uzly (Three.js jen ve vybrané scéně), horizontal journey. Vyšší riziko performance a a11y.

### Struktura obsahu
1. Hero network  
2. Historie jako „zapínání uzlů“ (1998→…)  
3. People jako body na trase  
4. Interaktivní mapa Evropy  
5. Then&Now jako změna hustoty sítě  
6. Numbers jako counters podél trasy  
7. Future jako nové větve

### Pros
- Silný „experience“ wow
- Dobře vizualizuje Evropa × ČR
- Odlišuje se od klasických výročních microsites

### Cons
- Snadno sklouzne do tech-demo
- Příběhy lidí mohou být druhořadé
- Nákladnější na WebGL / QA mobilu

### Fit
Vysoký pro „Evropa v pohybu“; střední pro „příběhy“ jako primární claim.

---

## Směr C — Then / Now / Next

### Koncept
Tři časové roviny: **tehdy** (1998/1999), **teď** (současnost), **dál** (budoucí generace). Erasmus v CZ jako kontinuum, ne jednorázové výročí „20 let“.

### Art direction
Archiv × soudobý kontrast. Split screens, wipe transitions, dual typography (starší metafora vs. současná). Klidnější než B, strukturovanější než A.

### Barvy
| Role | HEX | Poznámka |
| --- | --- | --- |
| Archive olive | `#6B6A4E` | „tehdy“ |
| Now blue-gray | `#4A5E73` | „teď“ |
| Next lime-ink | `#2E5C4F` | „dál“ (ne neon) |
| Paper | `#F0EBE3` | |
| Ink | `#1E1E1C` | |

### Typografie
- Then: mírně kondenzovaný serif / „catalogue“ feel  
- Now: čistý grotesk  
- Next: stejný grotesk + větší tracking / open spacing

### Hero
Split nebo wipe: archivní koridor × současný kampus. Nadpis přes střed. Jedna věta: časová osa, ne stats.

### Navigace
Then · Now · Next jako primární; podsekce vnořené. Riziko: navigace působí jako časová osa (to je záměr).

### Vizuální jazyk
- Duotone archive
- Clean present
- Outline / speculative forms for Next (bez falešných „future UI“ kliché)
- Explicitní label u neověřených archivních claimů

### Motion
Crossfade / wipe pinned sekce; scrub timeline; before/after sliders (přístupné i bez drag). Three.js volitelně pro „Next“ abstrakci — ne nutně.

### Struktura obsahu
1. Hero Then/Now  
2. Historie (Then deep-dive)  
3. People (Now voices)  
4. Map (Now network)  
5. Then&Now comparative  
6. Numbers (ověřený růst — bez spekulace)  
7. Future (Next)

### Pros
- Perfektně řeší anniversary framing (ne „20 let“)
- Pedagogicky srozumitelné
- Silný editorial rytmus

### Cons
- Může působit akademicky / méně emocí než A
- Split UI na mobilu je těžké
- Hrozí opakování „before-after“ únavy

### Fit
Vysoký pro korektní časový narativ; mírně nižší než A pro lidský claim v názvu.

---

## Volitelný směr D — Letter Home (hybrid, jen pokud A+C)

### Koncept
Formát **dopisu domů**: každý příběh je „dopis“ (text + razítko města + datum). Spojuje Human Stories s Then/Now metaforou korespondence.

### Kdy zvolit
Jen pokud stakeholder chce silnější artefaktovou metaforu a má obsah (skeny, citáty). Jinak **nedoporučeno** — tříští rozhodnutí.

### Fit
Doplněk A, ne samostatný winner bez obsahu.

---

## Shrnutí směrování

| Směr | Primární emoce | Riziko | Doporučení |
| --- | --- | --- | --- |
| **A Human Stories** | blízkost, důvěra | závislost na portrétech | **primární volba** |
| B Europe in Motion | úžas, systém | tech-demo, a11y | runner-up / vybrané scény do A |
| C Then/Now/Next | porozumění času | chlad, mobilní split | prvky timeline do A |
| D Letter Home | nostalgie | potřebuje artefakty | volitelný hybrid |

**Pracovní verdikt:** postavit projekt na **A**, přenést z B mapovou scénu a z C časovou korektnost (bez „20 let“ claimu).
