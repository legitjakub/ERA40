# 03 — DOM ↔ WebGL synchronizace

CDX-002 · 15. 11. 2026 · **Použít** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Drží grafický protějšek přesně nad fotografií. Nutný kontrakt pro existující distorzi i případný prostorový upgrade. Nepoužívat GPU jako zdroj textu, odkazů nebo alt popisů.

## Jak funguje a knihovny
DOMRect je v CSS pixelech vůči viewportu. Pro ortografickou kameru s jednotkou = CSS px převést střed a obrátit osu Y; DPR patří pouze do drawing bufferu. Perspektivní varianta potřebuje přepočet podle vzdálenosti a FOV.

**Knihovny/verze:** GSAP 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; WebGL1/GLSL ES 1.00 nyní; Three.js r186 a R3F 9.8.1 pouze kandidáti (viz verze v README).

## Implementace v ERA40
`web/src/components/people/distortion.ts` dnes měří obdélníky fotografie i sekce a kopíruje clipPath. Transformovaný rail v `people/PeopleStories.tsx` znemožňuje slepě cachovat souřadnice jen z document scrollu. Návrh: číst po aktualizaci animací, seskupit reads před writes. `useScene` a `lib/gsap/setup.ts` koordinují stav; `SmoothScroll.tsx` ponechat s jedním Lenisem; canvas sdílený (§7 DESIGN).

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Ortografická kamera: left=-w/2, right=w/2, top=h/2.
const r = image.getBoundingClientRect();
plane.position.set(r.left + r.width / 2 - w / 2,
  h / 2 - r.top - r.height / 2, 0);
plane.scale.set(r.width, r.height, 1); // unit PlaneGeometry
// cover UV, clip a border řešit zvlášť; toto nekopíruje CSS masku.
```

## Limity a rizika
DOMRect je obalový obdélník, nestačí pro rotaci/perspektivní CSS transform. Fotografie potřebuje shodný crop, barevný převod a orientaci UV. Canvas nezakrývá focus ring. QA: odchylka rohů při forward/reverse/fast scroll, resize, fonts.ready a přímém #mapa; DOM zůstává viditelný při selhání.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) — geometrie vůči viewportu.
- **Interní, přečteno:** [Shared handoff](../../tutorials/implementation-notes/shared-image-scene-handoff.md), [WebGL](../webgl.md), [CDX-000](../../../agent-reports/CDX-000-orchestration-check.md) §4.1.
