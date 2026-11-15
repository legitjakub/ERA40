# ERA40 Motion Design System

**Motion brief (jedna věta):** *Pohyb na ERA40 je jízda: plynulý, směrovaný a souvislý. Nikdy neskáče. Každý pohyb něco veze (člověka, rok, místo) a dojede do klidu, ve kterém se dá číst.*

Tento dokument doplňuje `web/docs/DESIGN.md` §4–7 (ten je závazný a při rozporu má přednost) a `docs/05-motion-design-bible.md` (katalog technik). Neopakuje je, ale definuje jazyk, stavy a pravidla, podle kterých se navrhuje každá nová animace.

## 1. Principy

1. **Pohyb vysvětluje.** Něco cestuje, spojuje, odhaluje nebo srovnává. Když nedělá nic z toho, nepatří tam (DESIGN §4).
2. **Jeden hlavní pohyb na kapitolu**, nejvýš dva podpůrné. Ostatní je klidné.
3. **Směr = čas a cesta.** Vpřed je zleva doprava a shora dolů. Návrat je přesná inverze (scrub). Nic nesmí jet „proti“ Trase.
4. **Trasa je páteř.** Žlutá/modrá linka spojuje kapitoly. Nové přechody mají navazovat na její polohu, ne začínat znovu.
5. **Klidový stav je plakát.** Každý zastavený frame musí být čitelná kompozice (awwwards: „every static frame is a poster“).
6. **Číslo 40 a „navždy“ jsou motiv, ne ornament.** Použít tam, kde nesou význam (rok 1987→2027, počet let, Trasa, která v závěru neskončí). Nevkládat ∞ ani „40“ do každé interakce. Jakub to výslovně odmítl, viz decision-log.
7. **Restrikce před efektem.** Nejdřív odpověz „má se to vůbec hýbat?“ (skill `animate`, krok 1). Často je odpověď ne.

## 2. Tokeny

| Token | GSAP (`lib/gsap/presets.ts`) | CSS (`styles/tokens.css`) | Použití |
|---|---|---|---|
| dur xs | `DUR.xs` 0,3 s | `--dur-xs` | hover, focus, změny stavu UI |
| dur s | `DUR.s` 0,6 s | `--dur-s` | menší vstupy, popisky |
| dur m | `DUR.m` 0,9 s | `--dur-m` | split text, osy písma |
| dur l | `DUR.l` 1,4 s | `--dur-l` | mask reveal, counter, kreslení Trasy |
| ease out | `EASE.out` = power3.out | `--ease-out` (cubic-bezier 0.215,0.61,0.355,1) | vstupy |
| ease inOut | `EASE.inOut` = power2.inOut | — | pohyb po obrazovce, morph |
| ease expo | `EASE.expo` = expo.out | — | jen velké odhalení (maskReveal) |
| scrub | `"none"` + `scrub: 0.45–1` | — | scrollované scény |

Známá nekonzistence: CSS `--ease-out` je easeOutCubic, GSAP `power3.out` je strmější (quart). Sjednocení vyžaduje rozhodnutí (`decisions/decision-log.md`, otevřené D-007). Do té doby pro nové CSS přechody používej `--ease-out` a pro GSAP `EASE.out`.

UI mikrointerakce (nav, menu, formulář, filtry): 150–300 ms, nikdy ease-in, hover pod `@media (hover:hover)`, `:active` scale 0,97 (pravidla Emila Kowalského). Filmové scény mají tempo podle tabulky výše.

## 3. Stavy každé významné animace

Každá specifikace musí vyplnit:

| Stav | Otázka |
|---|---|
| **INITIAL** | Co je vidět před JS a při prvním vykreslení? (SSR = čitelný obsah. Skrývat jen s deadlinem.) |
| **INTRO** | Jak prvek vstoupí? Spouštěč (load / scroll start / interakce), trvání, ease. |
| **AMBIENT** | Co dělá v klidu? Většinou nic. Ambientní smyčka musí mít účel, pauzu mimo obraz a ovládání pauzy (WCAG 2.2.2), pokud trvá přes 5 s. |
| **OUTRO** | Jak odejde a co předá další scéně? (Trasa, barva, poloha.) |
| **REVERSE** | Co se stane při scrollu zpět? (Scrub = přesná inverze. Play-once = zůstává.) |
| **MOBILE** | Zjednodušená varianta, ne vypnutí. Žádný pin nad 100 vh, žádný scroll-hijack. |
| **REDUCED** | Klidový koncový stav ihned. Zachovat informaci, odebrat pohyb. |

## 4. Choreografie kapitol (současný stav → směr)

Stav ✅ = implementováno, 🟡 = částečně, ⬜ = návrh (nevyvíjet bez schválení).

*Aktualizováno 15. 11. 2026 (podle kódu a `docs/orchestration/ERA40_MASTER_SYNTHESIS.md` §14).*

### 01 Úvod (hero)
- INTRO ✅: poster je LCP, film (balení → škola → přednáška → večeře → večer → návrat → „A předává to dál.“) s titulky, claim po řádcích, „všechno.“ žlutě (P0b), signatura pevně 1987–2027 (D-022).
- OUTRO ✅: pin 150 vh, film se zmenší do rámu a Trasa pokračuje dolů.
- MOBIL ✅: 100 svh + safe-area (D-021). Film z originálů, 720 × 1280.

### 02 Prolog
- ✅ čtecí zvýraznění slov scrubem („trochu jiní.“ EU modrou). **PeopleRow:** 8 lidí z příběhů stoupá vlnou (desktop scrub), hover ožije přes WebGL, na mobilu swipe, tap otevře příběh. Okno vlaku je odstraněné (P0, D-006).

### 03 Historie
- ✅ desktop: pin, linka v časovém měřítku 1987–2027, 40 pražců, česká linka od 11. značky, 2004 modré pozadí, „Rok N ze 40“ (D-020).
- ✅ mobil, nízké a reduced obrazovky: „Swipe 40 let“, karty milníků a interaktivní pás (D-021).
- OUTRO ✅: předávka 008A, poslední snímek → fotka Terezy.

### 04 Příběhy
- ✅ pin a vodorovný rail, 3 kompozice spreadu (spec 012), WebGL distorze podle rychlosti (jen desktop), dialog nebo detail.
- MOBIL ✅: swipe se snapem, hint gesta (R8), živá karta (aktivní ostrá, sousední ustoupí), tap na fotku otevře příběh.

### 05 Mapa Evropy
- ✅ scrub kreslení skutečných tras (obousměrně, včetně Lisabon → Praha), výběr města nakreslí trasu s cestujícím bodem.
- ⬜ 015 B kamera mapy, P3 (jen desktop, po výběru, max 1,6×, mobil celá mapa).

### 06 Návrat
- ✅ dělič Tehdy/Teď: desktop pin a scroll, mobil scroll (P2 bod 5), prst, tlačítka a klávesnice mají vždy přednost. „Teď“ má druhý hlas se žlutým bodem.
- OUTRO ✅: 008B, dělicí osa → kořen stromu 07, nadpis se píše wipem.

### 07 Rozvětvení
- ✅ 411 400 přes celou šířku (count scrubem) a 8 tváří modelových příběhů (BigCount) → strom 5 oblastí podle skutečných počtů, výběr větve ztlumí ostatní → příklad (na mobilu pod větví, CDX-007) → sekundární čísla se zdroji.

### 08 Pokračování
- ✅ ztišení (pomalá fotka a věta Mgr. Jany) → „Cesta končí. Zkušenost **pokračuje.**“ → Trasa odjíždí tečkovaně → CTA. Jediný doslovný ∞ na webu je přechod mezi stránkami (014, D-018), ne tady.

### Podstránky
- PageIntro: fotka/modrá plocha, Trasa podél spodní hrany. Archiv: fotografie dostupné ihned, hover ožití (WebGL desktop), sticky filtry na mobilu, řazení. Detail: push-in fotografie, čitelná citace a odstavce, kreslená trasa, šipky a swipe mezi příběhy. CDX008 odstranil univerzální fade-up, blur odstavců a opacity0,14 na slovech kvůli čitelnosti a kontrastu. Kvíz: pilulky s potvrzením. Přechod mezi stránkami 014. Další efekty jen po schválení.

## 5. Typografie v pohybu

- SplitText vždy s `mask: "lines"` a `aria` podle GSAP 3.13+. Split až po `document.fonts.ready`. Revert při cleanupu.
- Osy Roboto Flex (`flexAxes`): animovat wdth/wght **jen** na textu, který se nezalamuje, nebo s rezervovanou šířkou. Jinak vzniká layout shift (poučení z Animaxxingu).
- Diakritika: řádkování display nadpisů ≥ 1,0. Háčky (Č, Ř) jinak zasahují do řádku nad nimi (ověřeno 14. 11. 2026 na PageIntro).
- Velocity skew nadpisů max 3° (SmoothScroll), jen desktop s Lenisem.

## 6. Obraz a přechody

Katalog v `transition-library.md`. Pořadí preferencí: **clip-path / maska → Flip → SVG maska → WebGL**. WebGL jen tam, kde 2D nedokáže říct totéž, a vždy s DOM fallbackem.

## 7. Mobil a reduced motion (povinné)

- Mobil (<1024): bez pinů nad 100 vh, horizontální obsah = nativní swipe se snapem, Lenis vypnutý, WebGL vypnuté nebo se sníženou kvalitou.
- Reduced motion (OS nebo přepínač „Omezit pohyb“): koncové stavy ihned, žádné smyčky ani parallax, video nahrazuje poster s tlačítkem přehrát. Ovládání videa zůstává.

## 8. Proces

Žádná nová animace bez: specifikace (motion director) → **Jakubova souhlasu** → implementace → QA na 6 šířkách → refinement. Viz `workflows/motion-development.md`.
