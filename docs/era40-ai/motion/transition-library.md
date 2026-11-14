# Knihovna přechodů

| Přechod | Kde dnes | Technika | Mobil | Reduced |
|---|---|---|---|---|
| Film → rám | 01→02 | pin, scale + clip-path inset, scrub | bez pinu, statický rám | poster |
| Trasa navazuje | 01→02→…→08 | DrawSVG / scaleX, scrub | kreslí se při vstupu | předkreslená |
| Čtecí zvýraznění | 02 | opacity slov scrubem | kratší scrub | plný text |
| Pin se scénami | 03 | labelled timeline, DrawSVG linií, clip-path fotek | vertikální timeline | statický seznam |
| Horizontální rail | 04 | pin + x tween, distorze | nativní swipe + snap | vertikální seznam |
| Foto → detail | 04 | Flip | celá stránka | bez animace |
| Kreslení tras | 05 | DrawSVG scrub | vše nakreslené při vstupu | nakreslené |
| Tehdy/teď | 06 | slider (uživatel) | drag | drag |
| Sekční portál | `ui/SectionPortal.tsx` | scrub | — | statický |

## Kandidáti (návrh, nevyvíjet bez schválení)

| Přechod | Technika | Pro | Proti |
|---|---|---|---|
| Pražce / žaluzie mezi fotkami | SVG maska + attr | motiv koleje, ostrý, levný | repaint u mnoha obdélníků |
| Kamera po Trase přes mapu | SVG viewBox + path | silné spojení lidí a míst (Paper Planes) | složitá přístupnost a mobil |
| Uniform reveal fotek | WebGL (rozšířit distortion.ts) | filmová kvalita | GPU, fallback, údržba |
