# 014 — route přechod: izolovaný prototyp

Stav: návrh k vizuálnímu review, **není integrovaný v aplikaci**. Spec: `../../motion/specs/014-route-transitions.md`.

Spuštění z kořene tohoto worktree:

```sh
python3 docs/era40-ai/prototypes/014-route-transitions/serve.py
```

Náhled: http://127.0.0.1:3073/ . Veškeré assety/fonty jsou lokální. Žádné závislosti, kontaktové úložiště ani produkční proces.

- Navigace ukáže běžný přechod, archiv ↔ příběh má místo něj původní sdílenou fotografii (pokud prohlížeč podporuje View Transition API).
- Přehrát + průběh 0–100 %: samotná choreografie bez čekání na navigaci.
- Omezit pohyb: pouze 160 ms fade. Respektuje i OS, včetně změny za běhu.
- Bez nativních přechodů: ověření DOM/SVG fallbacku.
- Back/forward a opakované kliky jsou funkční v lokálně simulované historii `?view=...`.

**Meze:** nejedná se o skutečný App Router ani React SharedPhoto. Vanilla prototyp může volat `document.startViewTransition`; produkce musí použít již existující React ViewTransition bez druhého vlastníka. Produkční streaming/prefetch/historie/INP vyžadují samostatné integrační QA. Texty a fotografie jsou výběr ze současného projektu, modelové příběhy jsou označené.
