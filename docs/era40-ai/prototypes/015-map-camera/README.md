# 015 B — skutečná geografická kamera

Izolovaný experiment Codexu z 15. 11. 2026. Žádný import do produkčních komponent, nová závislost ani další renderer. Načítá osm skutečných tras ze `stories.ts`, sdílenou projekci z `lib/geo/europe.ts` a Natural Earth podklad. Postavy zůstávají modelové; „skutečné trasy“ zde znamenají existující projektová data, nikoliv ověřené účastníky.

## Ovládání a choreografie

Výchozí stav je celá Evropa. Na desktopu lze zapnout přiblížení; teprve výběr trasy či zapnutí volby vyvolá 450ms posun `viewBox`, quart-out. Kamera obepne oblouk s rezervou, oba konce zůstanou uvnitř a zoom nepřesáhne 1,6×. Rychlá další volba ruší starý animační frame. „Celá Evropa“ vrací přehled. Mobil, omezený pohyb a přechod pod 1024 px vynutí plnou mapu.

## Ověření

`node docs/era40-ai/prototypes/015-map-camera/build.mjs` obnoví HTML a JSON z projektových dat. Náhled:

```sh
python3 -m http.server 3074 --bind 127.0.0.1 --directory docs/era40-ai/prototypes/015-map-camera
PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers node docs/era40-ai/prototypes/015-map-camera/qa.mjs
```

Chromium: 360/390/430/1440 × normal/reduced, **8/8 kombinací, 64 výběrů**. Oba konce všech tras uvnitř, zoom ≤1,6×, návrat, rychlé volby, resize desktop→mobil, Enter/Space, overflow0, pageerror0. Exit0. Screenshoty `/private/tmp/era40-camera-015-qa/`; Codex skutečně prohlédl `1440-camera.png` a `390-normal.png`.

## Verdikt

**Ponechat jako prototyp, nyní neintegrovat.** Na krátké trase Plzeň–Bologna je přiblížení čitelné a klidné, ale ořízne kontext vzdálených destinací. Pro souvislou výstavu je důležitější vidět všechny evropské vazby. Produkce proto dostává přímé předchozí/další trasy a pohyb cestujícího bodu; zachovává pevnou geografii. Nová kamera v produkci se tímto prototypem nepovažuje za schválenou ani dokončenou.
