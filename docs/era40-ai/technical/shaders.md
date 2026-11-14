# Shadery (GLSL) — poznámky

## Vzory
- **Cover v shaderu:** poměr obrázku vs. kontejneru (`uResolution`, `uContainerRes`) a škálování UV kolem středu (WebGL gallery, ERA40 `crop`).
- **Reveal přes uniform:** `uProgress` 0→1 tweenovaný ScrollTriggerem. Tvar odhalení (mřížka, šum, vlna) v fragment shaderu, např. pixelace přes `floor(uv*uGridSize)/uGridSize` (Codrops WebGL gallery).
- **Distorze rychlostí:** posun UV `sin(uv.y*f)*strength`. Síla z Lenis velocity, vyhlazená `quickTo` (ERA40 distortion.ts).
- **Částice s inercí:** opacity = f(rychlost), momentum s decay ~0,92 (Codrops Cinematic 3D).

## Pravidla
- `precision mediump float` stačí pro image efekty (mobil).
- Kontrolovat `COMPILE_STATUS` / `LINK_STATUS` a při chybě se vrátit k DOM.
- Žádné větvení podle uniform ve smyčkách. Textury NPOT ve WebGL1 jen s CLAMP_TO_EDGE a bez mipmap.
- Shader nesmí nést obsah. Text a informace zůstávají v DOM.
