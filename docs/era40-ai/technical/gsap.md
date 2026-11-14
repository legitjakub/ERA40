# GSAP v ERA40

Verze **3.15.1** (všechny pluginy zdarma od 3.13). React integrace `@gsap/react` 2.1.2. Zdroje: [gsap.com/docs](https://gsap.com/docs/), globální skilly `gsap-*` (greensock/gsap-skills@aed9cfd).

## Pravidla projektu
- Import **jen** z `src/lib/gsap/setup.ts` (`gsap`, `ScrollTrigger`, `registerGsap`, `loadFlip`, `loadSplitText`).
- Scény: `useScene(effect, { scope, dependencies })` z `lib/gsap/useScene.ts`. Spouští se až po načtení ScrollTriggeru a revertují se samy (`revertOnUpdate`).
- Responzivita a preference: `gsap.matchMedia()` uvnitř scény, `mm.revert()` v cleanupu. Reduced motion číst z `usePrefersReducedMotion()` (OS + přepínač), ne jen z media query.
- Presety: `EASE`, `DUR`, `splitReveal`, `maskReveal`, `routeDraw`, `counter`, `flexAxes` (`lib/gsap/presets.ts`).

## Klíčové API (výtah)
- Timeline: pozice `"<"`, `">"`, `"+=0.2"`, labely. Ve scrubované timeline jsou durations jen proporce.
- `gsap.quickTo(target, prop, {duration, ease})` = opakovaně retargetovatelný tween (pointer, kamera, scale v loopu).
- `gsap.quickSetter` = nejlevnější zápis bez tweenu.
- `gsap.context` / `useGSAP` = scope selektorů a revert všeho uvnitř.
- `gsap.ticker.add(fn)` = společný hodinový zdroj (Lenis i případné WebGL).
- `easeReverse` (3.15+) = jiný ease při reverse (Animaxxing ho používá u enter/exit).
- `CustomEase` = vlastní křivky. Nový ease zaveď jako token v presets, ne lokálně.

## Pluginy
| Plugin | Stav v ERA40 | Poznámka |
|---|---|---|
| ScrollTrigger | lazy, všude | viz `scrolltrigger.md` |
| DrawSVG | registrován staticky | Trasa, mapy, linie |
| Flip | lazy (`loadFlip`) | StoryDialog, archiv |
| SplitText | lazy (`loadSplitText`) | `mask: "lines"`, `autoSplit`, `aria` |
| MorphSVG | nenačítá se | kandidát pro morph tvaru Trasy. Lazy přidat do setup.ts jako Flip. |
| Observer | nenačítá se | jen pro gesta. **Ne** pro scroll-hijack obsahu. |
| ScrollSmoother | nepoužívat | máme Lenis, dva smooth scrolly jsou zakázané |
| CustomEase | nenačítá se | přidat, až budou tokeny sjednocené |

## Lenis
- 1.3.27. Instance v `SmoothScroll.tsx`: `lerp 0.1`, `smoothWheel`, `anchors`, `prevent` pro dialogy. Jen `/`, desktop a pointer fine, ne při reduced motion.
- Integrace: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))`. README doporučuje `gsap.ticker.lagSmoothing(0)`. Ověřit, zda ERA40 nastavuje (otevřený bod).
- Omezení: nepodporuje CSS scroll-snap (je na to `lenis/snap`), nefunguje přes iframe, `data-lenis-prevent` na vnořené scrollery, Safari 60 fps.

## Časté chyby
- Vnořené ScrollTriggery v child tweenech timeline. Jedna ScrollTrigger patří na timeline.
- `from()` tweeny, které po revertu/refresh zůstanou na počátku. ERA40 měla tuto chybu u grafu, vyřešilo ji IntersectionObserver + CSS.
- Zapomenutý `split.revert()` nebo `mm.revert()` při navigaci.
- CSS transform jako start pozice, kterou tween také hýbe (GSAP sečte yPercent s px). Používat `gsap.set`/`fromTo` (Animaxxing recipe contract).
