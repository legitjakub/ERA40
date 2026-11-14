# Prototyp 010 — M02 smyčka přes nulu (směr A)

Izolovaný prototyp mimo produkci (MOTION_BIBLE M02, 🧪). Hero webu se nemění.

- Spuštění: kořen serveru musí obsahovat `web/public/fonts`, `web/public/media/hero/hero-desktop.avif` a `web/node_modules/gsap/dist`. Claude ho servíruje z minimálního kořene se symlinky (bez `web/data`) na `http://127.0.0.1:3072/docs/era40-ai/prototypes/010-hero-loop/index.html`.
- Co ukazuje:
  - linka vede pod číslem „40“, obkrouží **jen nulu** (cesta tam a zpět) a vrátí se domů,
  - pak pokračuje a odjede za okraj (tečky = budoucnost),
  - letopočet se dopočítá 1987 → 2027,
  - scrub v pinu 260 vh.
- Reduced motion (OS nebo přepínač): linka hned nakreslená.
- Ověřeno Playwrightem 1440 a 390: bez JS chyb. Nalezené problémy (linka přes podtitulek, smyčka přes čtyřku) jsou opravené ve druhé iteraci.
- Otevřené: barva linky na modrém glyfu (kontrast eplus vs. eu-blue); zda má smyčka přecházet ve skutečné ∞ (druhá smyčka), nebo zůstat jednou smyčkou. Doporučení: zůstat u jedné, protože význam je „tam a zpět“.
