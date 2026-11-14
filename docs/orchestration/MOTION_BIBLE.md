# MOTION BIBLE — směr A „Linka, která se vrací a pokračuje“

15. 11. 2026 · Claude.

**Vztah k ostatním dokumentům:**
- Navazuje na `docs/era40-ai/motion/MOTION.md`: tokeny, principy a gramatika Trasy (plná = ujeto, žlutý bod = tady jsi, tečky = budoucnost).
- Při rozporu má přednost `web/docs/DESIGN.md`.
- Stav každé animace: ✅ běží · 🟡 rozpracováno (Codex 007/008) · ⬜ nová ve směru A · 🧪 jen po PoC.

**Tokeny** (`lib/gsap/presets.ts` / `styles/tokens.css`):

| Token | Hodnota |
|---|---|
| `DUR.xs` | 0,3 |
| `DUR.s` | 0,6 |
| `DUR.m` | 0,9 |
| `DUR.l` | 1,4 |
| `EASE.out` | power3.out |
| `EASE.inOut` | power2.inOut |
| `EASE.expo` | expo.out |

Scrubované scény mají `ease: "none"` a `scrub` 0,45–1.

---

## M01 Odjezd: film → rám ✅
| | |
|---|---|
| Účel | Vstup do výstavy, emoce odjezdu (D-002, beze změny) |
| Vizuál | Celoplošný film s titulky. Při scrollu se zmenší do rámu, text odjede. |
| Start → konec | Film 100 % viewportu → rám (scale 0,86 + clip-path) |
| Spouštěč / rozsah | Scroll, pin 150 vh |
| Easing | Scrub `none` |
| Implementace | DOM/video, GSAP timeline v `Hero.tsx` |
| Reverse | Přesná inverze |
| Mobil | Bez pinu, poster + video, titulky |
| Reduced | Poster s tlačítkem přehrát, žádné zmenšení |

## M02 Smyčka přes nulu ve „40“ ⬜ 🧪 (signature moment, jediná smyčka ∞)
| | |
|---|---|
| Účel | Motiv nekonečna s významem: cesta tam a zpět domů. Pak linka pokračuje. |
| Vizuál | Při odjezdu z hera vyjede ze spodní hrany žlutý bod s modrou linkou, opíše smyčku přes **0** v typografickém „40 let“ a pokračuje dolů do prologu. Číslo 1987 se při tom dopočítá k 2027. |
| Start | „40 let“ jako typografický nápis (Roboto Flex 900, wdth 100), linka nezačatá |
| Konec | Smyčka uzavřená, linka odchází z rámu dolů, „40“ stojí |
| Spouštěč / rozsah | Konec pinu hera, rozsah ~60 vh |
| Easing | Scrub `none`, bod jede po `getPointAtLength` |
| Kamera | Žádná |
| Implementace | **SVG** (`path` + DrawSVG). Glyf „0“ a smyčka mají společnou geometrii. PoC izolovaně před produkcí (CDX-003: M). |
| Interakce | Žádná nutná. Volitelně (Why Zero) lze smyčku na desktopu „dotáhnout“ tažením, jen jako alternativa scrollu, nikdy jako brána. |
| Reverse | Inverze |
| Mobil | Menší „40“, smyčka svisle, bez pinu: animace jednou při vstupu (`DUR.l`) |
| Reduced | Smyčka nakreslená, bod v klidu |

## M03 Prolog: linka okem vlaku ✅/⬜
| | |
|---|---|
| Účel | Předání z hera do příběhu, zvýrazněná slova výroku |
| Vizuál | Linka z M02 vstoupí do okna vlaku (TrainSequence), slova výroku se zvýrazní scrubem |
| Rozsah | Nativní scroll, žádný pin |
| Implementace | SVG + GSAP. Osiřelou linku odstranil CDX-001 a nová navazuje přímo na M02. |
| Mobil / reduced | Svislá linka u levého okraje / výrok zvýrazněný hned |

## M04 Historie: linka jako časová osa 🧪 kamera, ✅ dnes
| | |
|---|---|
| Účel | 40 let jako jízda: EU 1987, Česko se připojí 1998 |
| Dnes | Pin 250 vh, dvě linky (DrawSVG), fotky přes clip-path, 008A předávka fotky do Příběhů |
| Směr A | Mělká 3D kamera po lince skrz dekády. **Jen po PoC** (riziko L, CDX-003). Bez PoC zůstává DOM verze, jen dostane světlo dekád (barevné ladění fotek CSS filtrem). |
| Reverse / mobil / reduced | Inverze / statický seznam stanic / stanice hned |

## M05 Příběhy: horizontální jízda 🟡
| | |
|---|---|
| Účel | Konkrétní lidé, „co pokračuje dál“ (007) |
| Dnes | Pin + horizontální rail, WebGL1 distorze podle rychlosti, Trasa se stanicemi |
| Směr A | **Bez smyček u příběhů** (CDX-003). Pod každým příběhem řádek „co pokračuje dál“ (007). Žlutý bod = aktuální člověk. |
| Mobil / reduced | Nativní swipe se snapem / bez distorze |

## M06 Předávka fotky do mapy ✅ (005A)
Fotka posledního příběhu přeletí do panelu mapy, mapa převezme osobu a nakreslí cestu (detail ve spec 006).

## M07 Návrat (Tehdy a teď → `#tehdy-ted`) ⬜ spec 009
| | |
|---|---|
| Účel | Co se po návratu změnilo, a to i u lidí, kteří nevyjeli |
| Vizuál | 2–3 dvojice tehdy/dnes z modelového obsahu. Dělicí čára je modrá linka s bodem. |
| Spouštěč | Vstup: dělič vedený scrollem do první ruční interakce, pak ruční (tah, klávesy, Tehdy / Obojí / Teď) |
| Easing | Scrub `none`, ruční `DUR.xs` `EASE.out` |
| Implementace | DOM + CSS clip, žádné GPU |
| Reverse | Inverze do ruční interakce |
| Mobil / reduced | Dvojice pod sebou, tlačítka / pozice „Obojí“ |

## M08 Rozvětvení (Čísla → `#cisla`) ⬜ spec 009
| | |
|---|---|
| Účel | Po návratu se zkušenost větví. Skutečné počty podle oblastí. |
| Vizuál | Kmen 411 400 → 5 větví. Délka podél cesty je lineární k počtu (součet = kmen). Na konci větve číslo, název a modelový příklad. |
| Spouštěč / rozsah | Vstup kapitoly, scrub od „top 70 %“ do „center 50 %“ |
| Easing | Větve `none` (scrub), stagger podle velikosti. Čísla count-up `DUR.l` `EASE.out` po dokreslení. |
| Interakce | Výběr větve (tlačítka, `aria-pressed`) zvýrazní větev (`DUR.xs`) a vymění příklad (opacity `DUR.xs`) |
| Implementace | SVG + DrawSVG, bez GPU. Cíl předávky 008B = kořen větvení. |
| Reverse | Inverze kreslení, čísla zůstávají |
| Mobil | Větve svisle pod sebou |
| Reduced | Vše nakreslené, čísla konečná |

## M09 Pokračování (Budoucnost → `#budoucnost`) ⬜ spec 009
| | |
|---|---|
| Účel | Linka nekončí, divák je další na řadě |
| Vizuál | Nadpis „Cesta končí. Zkušenost pokračuje.“ Linka přejde z plné přes žlutý bod „Vaše cesta“ do teček za pravý okraj. Dvě akce. |
| Spouštěč | Vstup, scrub |
| Implementace | SVG |
| Mobil / reduced | Linka svisle dolů / nakreslená |

## M10 UI mikrointerakce ✅
Podle Emila Kowalského: 150–300 ms, nikdy ease-in, hover jen `@media (hover:hover)`, `:active` scale 0,97–0,98, focus ring viditelný.

## 🧪 P1 GPU ribbon linky (fáze 3)
Linka jako GPU ribbon s gramatikou v shaderu, jen na desktopu, v jednom sdíleném rendereru. Podmínky:
- PoC synchronizace se scrubem a DOM (odchylka < 1 px při forward, reverse a fast scroll),
- jeden vlastník canvasu (WebGL2, migrace `distortion.ts`),
- ztráta kontextu → SVG fallback.

Bez splnění zůstává SVG.

## Zakázané vzory
- Stejný fade-up všude.
- Smyčka ∞ jinde než v M02.
- Částice bez dat.
- Vlastní kurzor.
- Vstupní brána před obsahem (trend z referencí nepřebíráme).
- Piny na mobilu přes 100 vh.
