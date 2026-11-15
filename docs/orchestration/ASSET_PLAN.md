# ASSET PLAN

15. 11. 2026 · Claude. Co máme, co je ilustrační a co je potřeba od DZS.

| Asset | Dnes | Stav | Potřeba pro směr A | Od koho |
|---|---|---|---|---|
| Hero film | `media/hero/*` (avif, mp4, webm) | ilustrační | Hero video kampaně (podklady DZS ho plánují) | DZS + produkce |
| Fotky lidí v příbězích | `media/placeholders/*`, stock Pexels | ilustrační, modelové postavy | Skutečné portréty **tehdy + dnes** se souhlasem (pro 06 Po návratu) | DZS, alumni, ESN |
| Historické fotky (03) | stock | ilustrační | Archiv DZS 1998–2004 | DZS |
| Mapa Evropy | `content/europe-map.json` (Natural Earth) | OK, licence PD | — | — |
| Fonty | Roboto Flex woff2 (OFL) | OK | Výroční font, pokud existuje, s webovou licencí | DZS |
| Loga | `brand/dzs.svg`, `brand/eu.svg` | nepotvrzené | Oficiální SVG DZS, Erasmus+, „Spolufinancováno EU“ | DZS |
| Glyfy kvízu | SVG v `content/era-quiz.ts` | vlastní | Ilustrované avatary 6 typů (zadání DZS) | ilustrátor |
| 3D / GLB | — | nic | Jen pokud PoC směru A prokáže přínos. Pak GLB + Draco/KTX2 (pozn. CDX-002 #16). | Claude/Codex |
| Ikona, OG obrázky | výchozí | chybí | OG obrázek pro sdílení (claim + linka) | Claude (vygenerovat z SVG) |

**Výkonový rozpočet (z měření 007/008):** simulovaný telefon (LCP 692 ms, CLS 0,002) a desktop 60 fps. Nový asset nesmí posunout LCP mobilu nad 2,5 s. Video jen s posterem, obrázky přes `next/image` (avif/webp).
