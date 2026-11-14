# Mapa schopností (Fáze 11)

Pro každou disciplínu: technika → jak ji v ERA40 postavit → stav znalostí → kde už v projektu je. Stav: ✅ ověřeno v projektu nebo přečtené zdroje · 🟡 znalost ze skillů a dokumentace, ještě nepostaveno v ERA40 · ⬜ mezera, nejdřív studovat.

## 1. Scroll choreografie
| Technika | Postup v ERA40 | Stav | Kde / zdroj |
|---|---|---|---|
| Scrubovaná sekvence | timeline + `scrollTrigger.scrub` v `useScene` | ✅ | Hero, Historie, Mapa |
| Pinned storytelling | `pin:true`, labely, animovat děti | ✅ | Hero, Historie, Příběhy |
| Horizontální scroll | pin + `x` tween `ease:none`, vnitřní triggery přes `containerAnimation` | ✅ | Příběhy |
| Multi-layer parallax | `yPercent` ±8 % (DESIGN), vrstvy s různým koeficientem, jen desktop | 🟡 | animaxxing `scroll-effects.md` |
| Scroll-controlled video | canvas frame sequence (ne `currentTime`) | 🟡 | `tutorials/implementation-notes/scroll-video-frame-sequence.md` |
| Vícefázové timeline | labely + `tl.addLabel`, `snap: "labels"` | ✅ | Historie |
| Synchronizace více vrstev | jedna timeline vlastní vše v pinu. Externí vrstvy (WebGL) čtou progress, nemají vlastní trigger | 🟡 | Codrops Cinematic 3D |

## 2. Filmové přechody
| Technika | Postup | Stav | Zdroj |
|---|---|---|---|
| Fullscreen přechod obrazu | clip-path inset/circle scrub, scale uvnitř | ✅ | Hero film → rám, `maskReveal` |
| SVG maska | `<mask>` + generované `<rect>`, `attr` tween | 🟡 | Codrops SVG mask |
| Distorze / displacement | WebGL UV posun, uniform z velocity | ✅ | `people/distortion.ts` |
| Fluid transition | shader (noise threshold) nebo animaxxing `liquid-image` | ⬜ | animaxxing-webgl `liquid-image.md` (nečteno) |
| Morph tvarů | MorphSVG (lazy), `convertToPath`, zafixovat `shapeIndex` | 🟡 | gsap docs MorphSVG |
| Typografický přechod | SplitText lines/chars, osy Roboto Flex | ✅ | `splitReveal`, `flexAxes` |
| Seamless section → section | předávka Trasy, barvy (`data-act` + CSS vars), sdílený prvek | 🟡 | MOTION-REFERENCE-ANALYSIS (Savor+Inkwell) |
| Vrstvené odhalení obrazu | 2–3 vrstvy clip-path s odstupem, parallax uvnitř | 🟡 | Lando Norris (technika) |

## 3. Motion design
| Technika | Postup | Stav | Zdroj |
|---|---|---|---|
| Kinetická typografie | osy wdth/wght, velocity skew, split | ✅ | Hero, SmoothScroll |
| SplitText / stagger | `SplitText.create`, `mask`, `aria`, `autoSplit`, nerovnoměrný stagger | ✅ | presets, Emil `choreograph` |
| Animované SVG | DrawSVG, MorphSVG, `motionPath` | ✅ / 🟡 | Trasa, mapa |
| Magnetické interakce | `quickTo` x/y, jen `(pointer:fine)` | ✅ | Hero CTA |
| Vlastní kurzor | **DESIGN zakazuje** (nativní kurzor). Případně jen kontextový štítek u mapy, za `(hover:hover) and (pointer:fine)`, ne při reduced motion, nativní kurzor zůstává | ⬜ rozhodnutí: ne | DESIGN Global UI, a11y zdroje |
| Kurzorem reaktivní prvky | `quickTo` na pointer, max malý rozsah, focus zrcadlí hover | 🟡 | animaxxing `pointer-effects.md` |
| Hover efekty | label roll, underline draw, weight hover bez posunu | 🟡 | awwwards `motion.md`, animaxxing `hover-effects.md` |
| Animovaná navigace | kapitolový index, progres Trasy, hide on scroll | ✅ | SiteNav |
| Mikrointerakce | `:active` scale .97, 150–250 ms, ease-out | 🟡 | Emil `animate` |
| Ambientní pohyb | jen s účelem, pauza mimo obraz, ovládání po 5 s | ✅ | Hero film |

## 4. WebGL a 3D
| Technika | Postup | Stav | Zdroj |
|---|---|---|---|
| Three.js základy, scéna, kamera | — | 🟡 | Codrops gallery/cinematic/Blender |
| React Three Fiber | `frameloop="demand"`, sdílené zdroje, instancing | 🟡 | R3F docs |
| GLSL vertex/fragment | cover UV, reveal uniform, distorze | ✅ (fragment) / 🟡 (vertex) | `shaders.md` |
| 3D model animace (GLTF) | `useGLTF`, škálovat jednou | 🟡 | Codrops cinematic |
| Kamera řízená scrollem | proxy + timeline, nebo `t` po křivce | 🟡 | Codrops cinematic, Blender path |
| Částice | buffer geometry + uniform opacity podle rychlosti, GPU morph (animaxxing `particle-morph`) | 🟡 / ⬜ | — |
| 3D morph | morph targets, nebo částice mezi tvary | ⬜ | — |
| Optimalizace renderu | DPR ≤ 2, pauza mimo obraz, dispose, instancing, draw calls stovky | 🟡 | `performance-rules.md` |

## 5. Mezery a další studium (v tomto pořadí)
1. animaxxing-webgl `references/recipes/liquid-image.md`, `particle-morph.md`, `webgl-stage.md` (už jsou v projektu, přečíst před prvním WebGL návrhem).
2. Codrops fronta v `tutorials/tutorial-library.md`.
3. three.js docs přes Context7 (aktuální API r18x) před jakoukoli 3D prací.
