# Scroll-Revealed WebGL Gallery

- **URL:** https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/
- **Autor / datum:** Chakib Mazouni, 2. 2. 2026. Typ: tutoriál. Přečteno celé.
- **Technologie:** Astro, Barba.js, Three.js (ShaderMaterial), GSAP ScrollSmoother, ScrollTrigger, SplitText, Flip.

## Architektura
- Jeden fixní `<canvas>` přes celou stránku. Každý `<img>` dostane `PlaneGeometry` mesh, který kopíruje jeho `getBoundingClientRect` přepočtený do world units kamery: výška = 2·z·tan(fov/2).
- Uniformy: textura, rozlišení obrázku a kontejneru (cover v shaderu), `uProgress`, `uGridSize`, barva.
- **Synchronizace scrollu:** nativní scroll a rAF renderu nejsou v lockstepu, proto smooth scroll (ScrollSmoother) a render přes `gsap.ticker`. Mesh se posouvá o delta scrollu.
- Reveal: ScrollTrigger tweenuje `uProgress` 0→1 (1,6 s, linear), `toggleActions: "play reset restart reset"`.
- Text: SplitText `type: lines, mask: lines, autoSplit`, `yPercent 100 → 0`, ease expo. Init až po načtení fontu.
- Přechod stránky: Barba hooks (before/leave/beforeEnter/after), Flip.getState na obrázku → přesun do kontejneru detailu → Flip.from. Při leave se obsah zafixuje s `top: -scrollTop`, aby neposkočil.

## Chyby a výkon
- `querySelectorAll("img")` zachytí i loga. Používat atribut (`data-webgl-media`).
- Při SPA navigaci zabíjet ScrollTriggery, revertovat SplitText, disposovat geometrie, materiály a textury. Odebrání ze scény nestačí.
- Kliknutím řízený přechod nepokryje back/forward ani přímý vstup. Je potřeba fallback podle URL.
- Pixel ratio omezit na 2.

## Pro ERA40
- ERA40 už má vlastní WebGL distorzi v Příbězích (`people/distortion.ts`, jeden canvas, on-demand). Před přidáním three.js rozšířit spíš ji.
- **Převzít:** render přes `gsap.ticker` (Lenis už na něm běží), uniformy tweenované GSAPem, výběr obrázků atributem, cover výpočet v shaderu.
- **Nepřebírat:** ScrollSmoother (máme Lenis, druhý smooth scroll je zakázaný) ani Barba (Next má vlastní router).
- Flip z fotky do detailu už v ERA40 je (StoryDialog). Tutoriál potvrzuje vzor zafixování obsahu proti skoku.
