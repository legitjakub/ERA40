# CLAUDE-008 · Živější pohyb a barva bez generického vzhledu

Vlastník: Claude. 15. 11. 2026. Jakub delegoval drobná rozhodnutí z `PRO_JAKUBA_PODKLADY` (podle Codexe 18:4x) a chce živější motion a barvy, pryč generický „AI“ vzhled.

## Cesty (exkluzivně)
`web/src/styles/tokens.css`, `web/src/lib/gsap/presets.ts`, `docs/era40-ai/prototypes/015-map-camera/` (případný prototyp 015 B). **Komponenty needituji**, dokud Codex nedokončí úklid štítků. Pak navážu po jedné komponentě se zápisem do koordinace.

## Dávka 1 (hned, bez zásahu do komponent)
- **D-007 rozhodnuto:** CSS `--ease-out` = power3.out (`cubic-bezier(0.25, 1, 0.5, 1)`), nové `--ease-in-out` = power2.inOut. Všech 15 CSS přechodů přes `var(--ease-out)` dostane stejnou „jízdu“ jako GSAP: rychlejší rozjezd, klidné dojetí.
- **Presety:** `riseIn` (skupiny, jen opacity a y, a11y bezpečné) a `wipe` (zápis zleva doprava po Trase), aby nové pohyby nevznikaly jako jednorázové.

## Dávka 2 (po Codexově úklidu, komponenty po jedné)
- **Barva jako plocha, ne jen nadpisy.** Kapitoly dnes střídají bílou a EU modrou. Návrh: Erasmus+ `#007FC7` jako **druhá plocha** pro jednu kapitolu (Mapa 05: bílé linky, žluté stanice), takže web dýchá ve třech tónech identity. Kontrast bílého textu na `#007FC7` je 4,3 : 1, proto jen velký text a grafika, malý text bílý tučný ≥ 18,66 px nebo ink.
- **Pohyb s fyzikou cesty:** jednotné nájezdy přes `riseIn` místo fade-up, kurzorová stopa ne, magnetika jen u primárních CTA (už existuje).
- **Proti generickému vzhledu:** méně stejných karet s rámečkem (archiv má 3 tvary, rail 3 kompozice), ostřejší typografický kontrast (display wdth 25–60 podle nočních rozhodnutí), žádné stínové karty ani glass.

## Hotovo, když
360–430 první, 8 šířek, reduced, kontrast ≥ 4,5 : 1 malý text a ≥ 3 : 1 velký text a grafika, `qa-checks` 15/15, `qa-handoffs`, build a push.
