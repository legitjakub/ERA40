# WebGL v ERA40

## Co existuje
`components/people/distortion.ts` + `StoryDistortion.tsx`:
- WebGL1 kontext (`alpha:false, antialias:false, powerPreference:"low-power"`), jeden canvas „on demand“ nad viditelnou DOM fotkou v Příbězích,
- fragment shader posouvá UV sinusem podle `strength` (síla od rychlosti scrollu) a crop pro cover,
- selhání kompilace nebo linku → vrátí no-op cleanup a DOM fotka zůstane.

## Kontrakt (z animaxxing-webgl, platí pro každý nový WebGL efekt)
| Podmínka | Výsledek |
|---|---|
| Bez JS | jen DOM obrázky |
| Bez WebGL / reduced motion | žádný canvas, efekty se okamžitě dokončí |
| Obrázek bez CORS / chyba | ten obrázek zůstane DOM |
| Context lost | všechny obrázky se ukážou, kreslení se zastaví, po restore se vše znovu postaví |
| Mimo obraz / skrytý tab | ticker stojí |
| `<img>` zprůhlednit | až když plane nakreslil frame |

## Pravidla
- Max jeden sdílený canvas na stránce (DESIGN §7). Pauza mimo obraz, dispose při unmountu.
- Nikdy distorze na textu (čitelnost, bible T09).
- Mobil: vypnout nebo snížit DPR na ≤ 1,5.
- Uniformy tweenovat GSAPem (plain `{value}` objekty), nikdy přímo objekty knihovny.
