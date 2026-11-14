# 11 — Page transitions: Next 16 / React / GSAP

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Udržují identitu fotografie mezi archivem a detailem. Flip ponechat pro existující dialog/změnu layoutu; React ViewTransition je kandidát pro skutečnou navigaci. Nepřidávat Barba ani blokovat odkaz do dokončení outra.

## Jak funguje a knihovny
React koordinuje browser snapshots při Transition/Suspense. Lokální Next 16.4.6 guide potvrzuje podporu bez konfigurace, React 19.3 exportuje ViewTransition; experimental.viewTransition byl odstraněn v Next 16.3. Bez podpory browseru má navigace pokračovat normálně.

**Knihovny/verze:** Next 16.4.6, React 19.3.0, GSAP/Flip 3.15.1; Lenis 1.3.27 jen homepage. Three.js/R3F nejsou pro routování třeba.

## Implementace v ERA40
Návrh kolem `web/src/app/pribehy/[id]/page.tsx` musí zachovat params pod Suspense. `web/src/lib/gsap/setup.ts` již poskytuje loadFlip, `useScene` uklidí scény. `SmoothScroll.tsx` se při odchodu z / odpojuje. `people/distortion.ts` musí předat obraz DOM; jeden canvas dle DESIGN §7, nesnapshotovat prázdnou GPU vrstvu.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```tsx
// Koncept stejného wrapperu u miniatury i detailu, bez registrace routeru.
import { ViewTransition } from "react";
<ViewTransition name={`era-story-${story.id}`} share="auto" default="none">
  <img src={story.src} alt={story.alt} />
</ViewTransition>
// GSAP Flip nesmí současně vlastnit transform stejného obrázku.
```

## Limity a rizika
Jedno jméno na identitu; duplicita ve stejném stavu je chyba. Suspending cíl nemusí vytvořit shared pár; zajistit enter/okamžitý fallback. Testovat přímý vstup, back/forward, zrušení navigace, fokus a obnovu pinů. Reduced motion i lokální volbu promítnout do CSS snapshot animací. Ukázka nebyla spuštěna.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [React ViewTransition](https://react.dev/reference/react/ViewTransition) — spouštění a koordinace přechodů.
- **Otevřeno** 15. 11. 2026, relevantní část: [Next: Designing view transitions](https://nextjs.org/docs/app/guides/view-transitions) — App Router, Suspense a sdílené prvky.
- **Interní, přečteno:** [Shared handoff](../../tutorials/implementation-notes/shared-image-scene-handoff.md), [gallery](../../tutorials/implementation-notes/scroll-revealed-webgl-gallery.md); lokální `web/node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` a `.../upgrading/version-16.md` (relevantní pasáž otevřena).
- **❌ Nedostupné:** stará [Next config viewTransition URL](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) vrátila 404; nahrazeno guide výše.
