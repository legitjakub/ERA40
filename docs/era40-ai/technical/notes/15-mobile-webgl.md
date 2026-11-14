# 15 — Mobile WebGL optimization

CDX-002 · 15. 11. 2026 · **Použít jako podmínku** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Zjednodušuje schválenou scénu pro omezenou paměť, fill rate a teplotní rozpočet. Dnešní P1 distorze zůstává na mobilu vypnutá dle DESIGN; případný P2 má nejprve SVG variantu, ne automaticky zmenšený desktop.

## Jak funguje a knihovny
Drawing buffer roste s druhou mocninou DPR: DPR 2 znamená 4× pixelů proti DPR 1. Navržený start PoC: DPR 1, bez postprocessingu/stínů, jen viditelné assety; kvalitu určit měřením na telefonu, ne podle user-agent.

**Knihovny/verze:** WebGL1 stávající; Three.js r186 vyžaduje WebGL2, R3F 9.8.1 volitelně. GSAP 3.15.1 / Lenis 1.3.27 beze změny.

## Implementace v ERA40
`web/src/components/people/StoryDistortion.tsx` dnes gateuje desktop/fine pointer, `people/distortion.ts` capuje DPR na 1.5. Nenarušit to bez nové specifikace. `useScene` / `lib/gsap/setup.ts` nastaví lehčí choreografii; `SmoothScroll.tsx` ponechá mobil nativní. Jakékoli 3D využije jeden canvas dle DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Jen pro budoucí schválený renderer, ne příkaz ke změně P1.
const dpr = Math.min(devicePixelRatio, quality.dprCap); // PoC cap = 1
const bw = Math.max(1, Math.round(cssWidth * dpr));
const bh = Math.max(1, Math.round(cssHeight * dpr));
if (canvas.width !== bw || canvas.height !== bh) {
  canvas.width = bw; canvas.height = bh;
  gl.viewport(0, 0, bw, bh);
}
```

## Limity a rizika
Desktopová emulace nenahradí thermal throttling telefonu. Neodvozovat výkon GPU z pointer:fine. Omezit velikost/dekódování fotografií, pozastavit práci při document.hidden a mimo obraz; návrat nesmí skokově rozjet kameru. Navržená akceptace PoC: dlouhý průchod i opakovaný návrat bez zhoršování frame times a paměti.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) — paměť, rozlišení a runtime náklady.
- **Interní, přečteno:** [WebGL](../webgl.md), [Three.js](../threejs.md), [CDX-000](../../../agent-reports/CDX-000-orchestration-check.md).
