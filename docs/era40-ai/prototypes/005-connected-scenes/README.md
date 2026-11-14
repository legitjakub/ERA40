# 005 — Z člověka do Evropy

Izolovaný prototyp k [návrhu propojených scén](../../motion/specs/005-connected-scenes-direction.md). **Není součástí Next aplikace ani schválená produkční integrace.**

```sh
python3 docs/era40-ai/prototypes/005-connected-scenes/serve.py --port 3070
```

Otevřít http://127.0.0.1:3070. Vyžaduje již nainstalovaný `web/node_modules/gsap`; nepřidává závislosti. Lokální server zpřístupňuje pouze tři soubory ukázky a explicitně povolené fonty, dvě fotografie, mapu a GSAP. Kontaktní data nejsou přístupná.

Desktop: nativní scroll, posuvník, tři zastavené kompozice, jednorázové přehrání s pauzou. Dvě osoby ověřují odlišné směry: Olomouc → Valencie a Lisabon → Praha. Mobil a reduced motion ukazují výchozí a koncovou kompozici bez přeletu. Žádný Lenis, WebGL, přebírání událostí kolečka ani kontaktní formulář.

Ukázka začíná zvolenou osobou, aby šel princip posoudit. Produkční návrh musí převzít **skutečně poslední viditelný příběh**, nikoli při opuštění railu tajně vrátit Terezu. Prototyp netestuje předání DOM mezi React komponentami, existující WebGL canvas, popisky všech měst ani souběh s piny homepage. Tyto věci patří do samostatně schváleného integračního pilotu.

Délka scrollu v ukázce slouží revizi. Není návrhem přidat nový pin do homepage. Specifikace navrhuje využít existující konec railu a vstup mapy.
