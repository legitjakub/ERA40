# Technické referenční poznámky — CDX-002

15. 11. 2026 · pro fázi 3 / budoucí `TECHNICAL_ARCHITECTURE.md` · základ čtení `01c005103c696ce580bb75241da462f43bec39a3`, hlavní checkout `/Users/jakubhrncir/ERA40`.

Doporučení jsou technický podklad, **ne schválení nového efektu ani integrace**. Produkční komponenty se v CDX-002 nemění. Existující dokumentaci níže nenahrazujeme; poznámky doplňují rozhodovací hranice, přesnost API a integrační rizika. Čten byl pracovní strom, který souběžně mění desktopová session 007/008; popisy nejsou certifikací neměnného commitu.

## Přehled 18 oblastí

| Oblast | Soubor | Doporučení pro ERA40 |
|---|---|---|
| 01 Scroll-driven WebGL | [01-scroll-driven-webgl.md](01-scroll-driven-webgl.md) | Zvážit obrazové rozšíření existující kapitoly až po PoC společného rendereru. |
| 02 Scroll-controlled camera animation | [02-scroll-camera.md](02-scroll-camera.md) | Zvážit jen významový let po Trase, nejprve proti SVG viewBox variantě. |
| 03 DOM ↔ WebGL synchronizace | [03-dom-webgl-sync.md](03-dom-webgl-sync.md) | Použít jako povinný kontrakt každého GPU protějšku DOM fotografie. |
| 04 Shader image transitions | [04-shader-transitions.md](04-shader-transitions.md) | Zvážit místo složitějšího wipe, pokud CSS/SVG pro schválený efekt nestačí. |
| 05 Displacement mapping | [05-displacement.md](05-displacement.md) | Zvážit jemný UV posun; geometrickou deformaci pouze v samostatně schváleném P2. |
| 06 GLSL image masking | [06-glsl-masking.md](06-glsl-masking.md) | Zvážit shader masku až za jednodušší CSS/SVG alternativou. |
| 07 Organic shape morphing: SVG vs. GPU | [07-organic-morphing.md](07-organic-morphing.md) | Zvážit MorphSVG pro Trasu; GPU morf až s připravenou korespondencí bodů. |
| 08 Infinite scroll systems | [08-infinite-scroll.md](08-infinite-scroll.md) | Nepoužívat nekonečný document scroll mezi osmi kapitolami. |
| 09 3D typography: SDF, MSDF, extruze | [09-3d-typography.md](09-3d-typography.md) | Zvážit jen krátký prostorový akcent; čitelný obsah ponechat v DOM. |
| 10 Interactive cursor effects | [10-cursor-effects.md](10-cursor-effects.md) | Nepoužívat vlastní kurzor; drobná odezva CTA může zachovat nativní kurzor. |
| 11 Page transitions: Next 16 / React / GSAP | [11-page-transitions.md](11-page-transitions.md) | Zvážit React ViewTransition pro routy a ponechat Flip pro lokální dialog. |
| 12 Pinned storytelling | [12-pinned-storytelling.md](12-pinned-storytelling.md) | Použít pro existující storytelling v rozpočtu DESIGN, s mobilním seznamem. |
| 13 Horizontal scroll | [13-horizontal-scroll.md](13-horizontal-scroll.md) | Použít pro desktopové příběhy s nativní mobilní variantou a vyřešeným pin budgetem. |
| 14 Three.js performance optimization | [14-three-performance.md](14-three-performance.md) | Použít jako podmínku případného 3D, včetně měření a vlastnictví zdrojů. |
| 15 Mobile WebGL optimization | [15-mobile-webgl.md](15-mobile-webgl.md) | Použít jako podmínku budoucího 3D; současnou mobilní P1 distorzi nezapínat. |
| 16 3D asset optimization: GLB, Draco, Meshopt, KTX2 | [16-3d-assets.md](16-3d-assets.md) | Zvážit pouze pro skutečný schválený model, porovnat přenos i dekódování. |
| 17 Responsive motion design | [17-responsive-motion.md](17-responsive-motion.md) | Použít napříč scénami včetně místního přepínače a změn preference za běhu. |
| 18 WebGL fallback strategies | [18-fallbacks.md](18-fallbacks.md) | Použít vždy, s DOM fallbackem okamžitě při chybě nebo ztrátě kontextu. |

## Společný integrační kontrakt

- Zdroj obsahu = DOM/SVG, fotografie s alt a popisky; GPU je dekorativní rozšíření, `aria-hidden`, `pointer-events:none`. Obsah nesmí čekat na shader, model ani loader.
- GSAP importovat z `web/src/lib/gsap/setup.ts`; scény přes `web/src/lib/gsap/useScene.ts`, který čeká na lazy ScrollTrigger a revertuje kontext. GPU dispose, listenery a odložené importy potřebují vlastní cleanup.
- Jediný Lenis vlastní `web/src/components/layout/SmoothScroll.tsx`, jen `/`, desktop/fine pointer a bez reduced motion. Další scroll manager nebo ScrollSmoother nejsou součástí návrhu.
- `web/src/components/people/distortion.ts` nyní vlastní WebGL1 a samostatný RAF; `StoryDistortion.tsx` lazy import/gating. To není již hotový sdílený Three.js renderer. Pravidlo **jednoho sdíleného WebGL canvasu** je závazné dle `web/docs/DESIGN.md` §7.
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) vyžaduje WebGL2 (WebGL1 odstraněn r163); [canvas getContext](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) nepovolí změnit již zvolený typ kontextu. Vlastní WebGL1 a Three.js tedy nelze prostě namontovat na tentýž canvas. Nutný je jeden sjednocený GPU owner a plán náhrady; žádné automatické schválení refaktoru.
- Vysokofrekvenční stav držet v proxy/refu. Nejprve sjednotit pořadí Lenis → animovaná timeline → měření DOM → render. R3F demand/invalidate není zárukou stejného snímku; případnou integraci prokázat měřením odchylky.
- `web/src/hooks/usePrefersReducedMotion.ts` spojuje OS i místní přepínač. Mobilní varianta není jen desktop při nižším DPR. Piny: desktop ≤250 vh, mobil ≤100 vh, bez mobilního horizontal hijacku. Dlouhý dnešní rail je známý nesoulad, ne nový standard.

## Verze a hranice ověření

Lokální `web/package.json`: Next **16.4.6**, React **19.3.0**, GSAP **^3.15.1**, @gsap/react **^2.1.2**, Lenis **^1.3.27**. Poznámky pracují s těmito projektovými verzemi, nikoli s libovolným „latest“. Three.js, R3F ani Troika v runtime závislostech nejsou.

Referenční větev pro případný PoC je **Three.js r186**; [otevřený manifest tagu r186](https://raw.githubusercontent.com/mrdoob/three.js/r186/package.json) uvádí **0.186.1**. [Dev manifest](https://raw.githubusercontent.com/mrdoob/three.js/dev/package.json) uvádí 0.187.0: vývojová větev není důvod k upgradu. Živá API dokumentace není version-pinned; před implementací porovnat API i addons s přesně zvoleným balíčkem.

[R3F manifest master](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/packages/fiber/package.json) uvádí **9.8.1**, [Troika manifest main](https://raw.githubusercontent.com/protectwise/troika/main/packages/troika-three-text/package.json) **0.53.1**. Jde o skutečně otevřené manifesty větví, nikoli ověřené npm instalace, kompatibilitní test s ERA40 nebo finální dependency lock. Meshopt/msdfgen nejsou verzově vybrané; bez PoC se výběr neuzavírá.

Ukázky jsou **vlastní schematické fragmenty**, ne převzatý kód z tutoriálů. JS/TS předpokládají client lifecycle, existující DOM refs, GSAP ze setup a větvení podle preference; shader fragmenty předpokládají deklarované uniformy/varyings a vytvořený program. Jména `renderShared`, `requestSharedFrame`, `rebuildResourcesAndDraw`, `quality` aj. označují **navrhované adaptéry**, které dnes v ERA40 nejsou. Fragmenty nejsou kompletní komponenty, nebyly kompilované ani spuštěné. Licence cizí implementace se neuvádí, protože se žádná nekopíruje; licence fontů/modelů a nových balíčků se ověří až při jejich konkrétním výběru.

## Návaznost a zpřesnění starších podkladů

- [GSAP](../gsap.md), [ScrollTrigger](../scrolltrigger.md), [Three.js](../threejs.md), [WebGL](../webgl.md), [Shadery](../shaders.md), [Playwright](../playwright.md), [mapa schopností](../capability-map.md): stávající základy, nikoli nový výstup CDX-002.
- [Galerie DOM/WebGL](../../tutorials/implementation-notes/scroll-revealed-webgl-gallery.md), [camera path](../../tutorials/implementation-notes/blender-camera-path-gallery.md), [cinematic 3D](../../tutorials/implementation-notes/cinematic-3d-scroll.md): převzaté interní rozbory; externí Codrops články v tomto běhu nově neotevřeny.
- [SVG masky](../../tutorials/implementation-notes/svg-mask-transitions.md), [sdílená předávka](../../tutorials/implementation-notes/shared-image-scene-handoff.md), [frame sekvence](../../tutorials/implementation-notes/scroll-video-frame-sequence.md), [Animating with Agents](../../tutorials/implementation-notes/animating-with-agents.md): použít stávající poznámky, nepřebírat jejich router/scroll stack.
- [CDX-000 §4](../../../agent-reports/CDX-000-orchestration-check.md), [SETUP-VERIFICATION](../../SETUP-VERIFICATION.md): hlavní rizika jsou synchronizace, životní cyklus a jeden canvas. [Orchestrace §7–8](../../../orchestration/ORCHESTRATION.md): osm šířek a přidělení souborů.
- Zpřesnění: stav „přečteno“ není „postaveno“. Fog nezaručuje levnější scénu/nižší draw calls. Univerzální počty draw calls ani DPR nejsou naměřený budget. Větvení v GLSL a mediump nejsou absolutní pravidla; přesnost a fill rate ověřit na konkrétním zařízení. GSAP context neřeší GPU zdroje automaticky.
- Next 16.4.6 má lokální `web/node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`; import ViewTransition potvrzen v instalovaném Reactu. Nepřenášet staré rady o experimentálním flagu do této verze.

## Evidence zdrojů a mezery

**Otevřeno** znamená úspěšně zpřístupněný dokument a přečtenou relevantní část při CDX-002, nikoli celé API, demo nebo video. U každé poznámky je rozsah a odkaz; úplný seznam úspěšně otevřených URL je v [SOURCE_INDEX — Codex — technické poznámky 15. 11.](../../SOURCE_INDEX.md#codex--technické-poznámky-15-11). **Neotevřeno** = známá existence či interní rozbor, bez nového přístupu k originálu. **❌** = pokus nedostupný; nic z něj se nevydává za přečtené.

❌ Při tomto běhu: Three.js `manual/en/cleanup.html` a `manual/en/how-to-dispose-of-objects.html` vrátily 404; varianty bez `.html` byly nástrojem nedostupné. Dispose ověřen přes API Geometry/Material/Texture. Staré hash docs URL vrátily jen rozcestník a kliknutí na `/docs/Curve.html`, `/docs/PerspectiveCamera.html`, `/docs/BufferGeometry.html` 404; funkční detaily nalezeny přes `/docs/pages/…`. Stará Next config `viewTransition` URL vrátila 404, funkční je guide. WebGL Fundamentals `webgl-context-lost.html` byl nedostupný; pro context loss použity MDN události a extension.

**Neotevřeno:** veřejná dema, nové Codrops články a placený obsah Three.js Journey. Žádný WebGL PoC ani fyzický mobil nebyl testován. Runtime výkon, vizuální kvalita a licence konkrétních assetů zůstávají podmínkou dalšího schváleného briefu.
