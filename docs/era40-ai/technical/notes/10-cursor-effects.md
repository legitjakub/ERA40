# 10 — Interactive cursor effects

CDX-002 · 15. 11. 2026 · **Nepoužívat vlastní kurzor** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Nativní kurzor zůstává dle DESIGN Global UI. Zvažovat lze malou odezvu CTA nebo kontextový popisek mapy; nesmí nést informaci dostupnou pouze hoverem ani honit kurzor přes celou stránku.

## Jak funguje a knihovny
pointer/hover media queries popisují možnosti vstupu, ne šířku zařízení. Reakci omezit na mouse/fine pointer a při pointerleave, blur i ztrátě eligibility resetovat. Focus má ekvivalentní informační obsah.

**Knihovny/verze:** GSAP 3.15.1 quickTo, @gsap/react 2.1.2; Pointer Events/CSS media bez balíčkové verze; Lenis 1.3.27 beze změny. Three.js/R3F nepotřebné.

## Implementace v ERA40
Eventy navázat a odpojit ve `web/src/lib/gsap/useScene.ts`, GSAP z `lib/gsap/setup.ts`; použít `hooks/usePrefersReducedMotion.ts` (OS i místní přepínač). Žádný nový canvas ani zásah do `people/distortion.ts`; pravidlo sdíleného canvasu z §7 platí dál. `SmoothScroll.tsx` nesmí ztratit nativní touch/keyboard chování.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Uvnitř scény, eligible už zahrnuje reduced motion a media query.
const move = gsap.quickTo(icon, "x", { duration: 0.2 });
const enter = (e: PointerEvent) => {
  if (eligible && e.pointerType === "mouse") move(3);
};
const reset = () => move(0);
button.addEventListener("pointerenter", enter);
button.addEventListener("pointerleave", reset);
// Cleanup odstraní oba listenery; tween vlastní kontext useScene.
```

## Limity a rizika
Touch musí fungovat jedním tapem bez sticky hover. Netahat celý klikací cíl pod rukou, nezakrýt focus ring. CSS cursor:none je proti briefu. Bez reduced motion i OS preference nesmí lokální přepínač zůstat ignorovaný. Velké plochy, blikání a trails zde nepřidávají význam.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) — přesnost primárního vstupu.
- **Interní, přečteno:** [Capability map](../capability-map.md) §3, [GSAP](../gsap.md).
