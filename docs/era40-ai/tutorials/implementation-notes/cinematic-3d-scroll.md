# How to Build Cinematic 3D Scroll Experiences with GSAP

- **URL:** https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/
- **Autor / datum:** Joseph Santamaria, 19. 11. 2025. Typ: tutoriál (React, R3F). Přečteno celé. ⚠️ Starší než rok, API GSAP 3.13+ ověřit.
- **Technologie:** GSAP (ScrollTrigger, ScrollSmoother, CustomEase, SplitText), OGL (demo 1), React Three Fiber + drei + GLTF (demo 2).

## Technika
- **GSAP jako režisér:** proxy objekt `{x,y,z}` pro kameru a target. Jedna timeline se scrubem mapuje „záběry“ na rozsahy progresu. Render loop jen čte proxy a volá `lookAt`.
- Vlastní easingy (CustomEase) pojmenované podle pocitu, různé pro každý záběr.
- Scroll prostor = prázdný div 500–900 vh. Canvas je fixní za obsahem.
- Typografické „kapitoly“: každý text má vlastní ScrollTrigger s rozsahem `${i*úsek}% top`. SplitText chars x −100 → 0 → +100.
- Částice s inercí: opacity podle rychlosti rotace (momentum × decay 0,92).
- Progres bar přes `gsap.quickSetter` (bez React state).

## Chyby a výkon
- Nastavovat kameru v `useFrame` z refů, ne přes React state.
- Pozice z GLTF škálovat jednou v efektu, ne každý frame.
- Fog zjednoduší vzdálené objekty a dodá hloubku zdarma.

## Pro ERA40
- **Vzor proxy + timeline + render loop** je přenosný na jakoukoli kameru, i na 2D SVG mapu Evropy (kamera = viewBox). To je levná varianta „3D“ letu bez WebGL.
- 3D scéna (R3F) je v DESIGN §7 jen P2 a jen po schválení. Kandidát: let nad mapou Evropy ve finále s DOM/SVG fallbackem.
- `quickSetter` pro progres místo React state: ERA40 to už dělá v SiteNav (transform přes ref).
