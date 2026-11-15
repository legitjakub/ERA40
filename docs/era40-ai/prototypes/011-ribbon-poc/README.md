# PoC 1 — GPU Trasa synchronizovaná se scrollem a DOM

15. 11. 2026 · Claude · `TECHNICAL_ARCHITECTURE.md` §3 · izolované, mimo produkci. three.js r170 a GSAP 3.12.5 se načítají z CDN v pevné verzi, do projektu se nepřidává žádná závislost.

## Princip
- Jeden fixní canvas a ortografická kamera v CSS pixelech (osa y dolů). Ribbon je vlastní pásová geometrie podél `SplineCurve` přes středy DOM stanic, DPR ≤ 1,5.
- Gramatika Trasy v shaderu:
  - plná linka do `uProgress × délka`,
  - za tímto bodem kulaté tečky každých 14 px,
  - žlutý bod jako samostatný mesh v čele linky.
- Pořadí v jednom `gsap.ticker`: scroll → ScrollTrigger (scrub 0,5) → posun skupiny o `-scroll` → render. Žádný vlastní RAF.
- `webglcontextlost` → `html[data-gl=off]` → SVG fallback ze stejných bodů. Klávesa L ztrátu kontextu simuluje.

## Výsledky (Playwright, Chromium + SwiftShader, 1440 × 900)

| Test | Výsledek |
|---|---|
| Pixely canvasu ve středech viditelných DOM stanic: vpřed 0,35 a 0,7, zpět 0,45, konec | alfa 255 ve všech případech, linka prochází každou stanicí |
| Model souřadnic (dokumentové body − scroll vs. DOM rect) při scrollu, rychlých skocích a resize | 0,00 px |
| Ztráta kontextu | canvas skrytý, SVG fallback viditelný |
| Počet canvasů / JS chyby | 1 / 0 |

**Poučení:**
1. První verze nevykreslila nic a „odchylka 0 px“ to zakryla. Kamera s osou y dolů obrací pořadí vrcholů a three zahazuje odvrácené plochy. Řešení: `side: DoubleSide`.
2. Test souřadnic nestačí, nutné je číst skutečné pixely canvasu. Zapsáno do znalostní báze.

## Limity a co zbývá
- Barva vychází tmavší než `#007fc7`. ShaderMaterial a správa barevného prostoru three (sRGB → lineární) to způsobují. V produkci nastavit `ColorManagement` a výstup tak, aby odpovídal SVG tokenu.
- Tečky budoucnosti jsou za hlavou vidět jen krátce (rozestup a anti-aliasing doladit).
- FPS na fyzickém zařízení neměřeno, SwiftShader je softwarový. Mobil v PoC neřešen, podle architektury tam GPU vrstva nebude.
- Integrace se stávajícím `distortion.ts` (WebGL1) je PoC 2.

**Závěr:** synchronizace GPU linky s DOM a scrubem je proveditelná přesně. Pro produkci zbývá PoC 2 (sdílený renderer) a review architektury Codexem.
