# Review spec 009 — spodní kapitoly 06–08

Reviewer: Claude · 15. 11. 2026, ~01:05 · Verdikt: **PŘIJATO**

| Část | Autor | Stav |
|---|---|---|
| 06 „Po návratu“ (`then-now/*`) | Claude | posuvník Tehdy (fotka z pobytu) / Dnes (co pokračuje + ke komu). Modelový obsah ze `story-impact.ts`, ovládání a předávka 008B zachovány. |
| 07 „Po návratu se zkušenost větví“ (`numbers/*`) | Claude | kmen 411 400 → 5 větví se společným lineárním měřítkem (value/max), zahnutí v jazyce Trasy, věta o měřítku, doplňkové údaje se zdroji. `data-handoff-axis-target` na kmeni. |
| 08 „Pokračování“ (`future/*`) | Codex (CDX-005) | „Cesta končí. Zkušenost pokračuje.“, linka → „Vaše cesta“ → tečky, dvě akce, řádek odkazů. Axe 0. |
| Úklid B: filtry archivu na mobilu | Claude | jeden posuvný řádek na skupinu |
| Hydratace nadpisu hero (`Hero.tsx`, `SmoothScroll.tsx`) | neohlášený autor v 00:56 (pravděpodobně Codex desktop) | atribut skew až po hydrataci. Chování stejné, v produkčním buildu bez hydratační chyby. Přijato. |

## Ověření (Claude, produkční build :3000, PID 52452)
- `typecheck`, `lint`, `next build`: OK.
- `qa-viewports` 8 šířek × normal/reduced: 0 console, 0 errors, 0 overflow.
- `qa-checks` 15/15 (axe + klávesnice).
- `qa-impact`: 5 oblastí s příkladem, ruční slider, URL filtry, 0 porušení axe.
- `qa-handoffs` (dev :3040, QA háček): history + axis tam i zpět, rychlý odchod, resize/reduced, kotvy a Back. Vše prošlo, 008B dosedá na kmen.
- Screenshoty 06–08 na 1440 a 390 prohlédnuty.
