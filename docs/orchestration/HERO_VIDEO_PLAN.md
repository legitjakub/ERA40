# Nové úvodní video — plán

**Stav 15. 11. 11:20: hotovo.** Střih je v `web/scripts/build-hero.sh`, titulky ve `FilmCaptions.tsx`. Záběr 5 (večer s přáteli) a balení pochází z předchozího filmu, ostatní z Mixkit Free. ffmpeg byl použit jako `ffmpeg-static` mimo projekt (`FFMPEG=… bash scripts/build-hero.sh`).

15. 11. 2026, 04:10 · Claude. Jakubův úkol (01:40): „udělat lepší video ve vibu jako cestování, parta, zážitky, vzdělání… ve stylu Erasmu“.

## Proč současný film nestačí
- Desktopový střih trvá 36 s. Asi 40 % z toho tvoří vlak, nádraží a tabule „ODJEZD“ (tou film začínal i končil). Parta a vzdělávání jsou jen ve dvou záběrech (knihovna 19,5–23,5 s, večer s přáteli 23,5–28,5 s).
- Brief DZS: hodnota Erasmu vzniká **po návratu** a předává se dál. Film končí návratem, ale „předání“ v něm chybí.
- **Dočasně vyřešeno (`b745d0f`):** poster s partou a smyčka mimo záběry tabule. Obsahově je to ale pořád stejný film.

## Koncept nového filmu (desktop ~32 s, mobil ~28 s, 9:16)
Tempo: klidné dokumentární záběry 3–4 s, žádné rychlé střihy, žádné texty v obraze (titulky dělá web, `FilmCaptions`).

| # | Záběr (obsah) | Titulek (web) |
|---|---|---|
| 1 | Balení batohu / kufru doma, ruce, ranní světlo | „Do kufru se vejde semestr.“ |
| 2 | Příjezd do nového města (ulice, tramvaj, nádraží **bez tabulí**) | „Nové město. První adresa.“ |
| 3 | Přednáška nebo dílna (studenti, učni, učitel) | „Přednáška v jiném jazyce.“ |
| 4 | Parta při společném vaření / večeři | „Večeře v pěti jazycích.“ |
| 5 | Parta venku: smích, výlet, město v noci | „Lidé, které ráno ještě neznáš.“ |
| 6 | Návrat: okno vlaku nebo letadla, zamyšlení | „Domů se vrací někdo trochu jiný.“ |
| 7 | **Předání:** ta samá osoba učí, vede tým nebo ukazuje něco dalším (třída, dílna, kancelář) | „A předává to dál.“ |

Záběr 7 je nový a nese hlavní myšlenku briefu. Na konci smyčky naváže záběr 1.

**Nepoužívat:** odjezdové tabule, jízdenky, vlak jako hlavní motiv, dekorativní ∞, rozpoznatelná loga a značky, děti bez souhlasu, záběry, které by předstíraly skutečné účastníky (všechno je „Ilustrační video“).

## Zdroje (zdarma, bez placených služeb)
1. **Nejlepší:** vlastní nebo DZS záběry (hero video je v plánu kampaně, `MISSING_INPUTS` #5). Až budou, nahradí vše níže.
2. **Do té doby** volně použitelné klipy:
   - [Pexels Videos](https://www.pexels.com/videos/), licence Pexels: zdarma, bez uvedení zdroje,
   - [Mixkit](https://mixkit.co/free-stock-video/), licence Mixkit Free.
   - Hledat: „students friends cooking together“, „friends laughing city night“, „university lecture students“, „vocational workshop apprentice“, „teacher classroom explaining“, „packing suitcase“, „looking out train window“.
   - Každý klip zapsat do `src/content/media.json` (zdroj, licence, URL), jako dnes.

## Technika
- Pipeline už existuje: `web/scripts/build-hero.sh`. Výstupy:
  - desktop 1920 × 1080 a mobil 720 × 1280,
  - MP4 + WebM + AVIF poster,
  - limit 4 MB / 2 MB, 24 fps, jednotný grade.
- Na tomto Macu chybí **ffmpeg**. Instalace: `brew install ffmpeg` (zdarma).
- Po výměně přečasovat titulky ve `FilmCaptions.tsx` (střih tabule už nebude potřeba, zmizí i okno 3,0–32,2 s).
- QA: kontrast bílého textu ≥ 4,5:1 na nejsvětlejším snímku (měření Cursoru z 02:50), LCP mobilu < 2,5 s, 8 šířek.

## Co potřebuju od Jakuba (jedno „ano“)
1. Souhlas se **stažením ~8–12 volných klipů** (Pexels/Mixkit, celkem asi 150–300 MB, jen do lokální cache mimo Git) a s **instalací ffmpeg** přes Homebrew.
2. Případně vlastní nebo DZS záběry: ty mají přednost.

Pak střih, export, přečasování titulků, QA a push zvládnu sám.
