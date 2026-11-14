# Scroll-Driven 3D Gallery Using a Blender Camera Path

- **URL:** https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/
- **Autor / datum:** Gaspard Hedde, 7. 7. 2026. Typ: tutoriál. Přečteno celé.
- **Technologie:** Blender (Bezier křivka + Python export), Three.js (`CatmullRomCurve3`, MeshBasicMaterial, Fog), GSAP (`quickTo`, Observer).

## Technika
- Křivka z Blenderu se exportuje do JSON. Přemapování os: Blender Z-up → three Y-up (x, z, −y).
- `CatmullRomCurve3(points, closed=true, 'catmullrom', 0.5)`. `getPoint(t)` a `getTangent(t)`, normála v rovině XY pro boční offset.
- 500 rovin rovnoměrně po t, náhodnost jen v offsetu a velikosti. Textury se načtou jednou a sdílejí se.
- **Kamera:** `targetT` se mění vstupem (GSAP Observer: wheel, touch, pointer), `camProxy.t` je vyhlazené přes `gsap.quickTo` (1 s, power3.out). Wrap do [0,1).
- **Focus:** cílové měřítko podle vzdálenosti (f³ pro lokálnost), aplikované přes `quickTo` na každou rovinu. Žádné nové tweeny v každém framu.

## Chyby a výkon
- Nevytvářet tweeny v render loopu (500 × 60 fps). Vždy `quickTo`.
- Na uzavřené křivce počítat nejkratší vzdálenost (`dt > 0,5 → 1 − dt`).
- Observer místo nativního scrollu = scroll-hijack. Pro veřejný web s textem je to rizikové (přístupnost, kotvy).

## Pro ERA40
- **Myšlenka „cesta jako křivka, kamera jede po ní“ je jádro motivu Trasa.** Kandidát na signature: kamera (nebo SVG viewBox) jede po Trase přes mapu Evropy (05), fotky příběhů leží podél ní a zaostří se, když kolem nich projíždíme.
- Pro ERA40 bez scroll-hijacku: řídit `t` ScrollTriggerem (scrub) v pinu, ne Observerem.
- 2D varianta bez three.js: SVG path + `getPointAtLength` + DOM fotky. Nejdřív prototypovat tuto variantu.
