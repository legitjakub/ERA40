# Dvě návaznosti scén — prototyp 008

Izolovaná vizuální revize, **neintegruje** nové předávky do homepage.

```sh
python3 docs/era40-ai/prototypes/008-scene-handoffs/serve.py --port 3071
```

Otevřít http://127.0.0.1:3071. Vybrat předávku, posouvat průběh nebo přehrát v obou směrech. Kolečko v samotné scéně posouvá ukázku; zbytek stránky se chová přirozeně. Na telefonu a při omezeném pohybu se zobrazí obě hotové kompozice bez přesunů.

Technický rozbor a kompletní stavy jsou ve [specifikaci 008](../../motion/specs/008-two-scene-handoffs.md). Média a Roboto Flex se načítají z existujícího `web/public`, GSAP ze stávající instalace. Žádné přidané závislosti, formuláře, ukládání dat ani externí požadavky. Výsledek schválení prototypu ještě není schválením produkční integrace.
