# Workflow: nová reference od Jakuba

Spouští se, když Jakub pošle URL nebo zmíní web. Vykonává skill `era40-reference-analyst`.

1. **Research.** Otevři skutečný web v Claude in Chrome (externí weby, uživatelův prohlížeč). Když nejde otevřít, napiš to a nic si nedomýšlej. Snippety z vyhledávání nejsou pozorování.
2. **Analyze.**
   - Screenshoty: první obraz, 25/50/75 % scrollu, interakce (hover/klik), mobil (resize na 390), návrat nahoru.
   - Ulož je do `references/screenshots/<slug>/`.
   - Zapiš kompozici, chování scrollu, časování (odhad v s, označ jako odhad), choreografii, přechody obrazu, typografii, interakce, navigaci a responzivitu.
   - Odděl **ověřeno** (viděl jsem) od **předpoklad** (technika odvozená z chování).
   - Technologie zjišťuj čtením (`read_page`, `javascript_tool`: `window.gsap?.version`, canvas/WebGL kontext, `document.fonts`). Nevkládej nic, co by měnilo cizí stránku.
3. **Learn.** Hledej techniku v `SOURCE_INDEX.md`, `technical/`, `motion/`. Když chybí, dohledej oficiální docs a tutoriál, zapiš shrnutí do `tutorials/implementation-notes/` a aktualizuj `SOURCE_INDEX.md`.
4. **Translate.** Jak by princip sloužil ERA40? Nekopíruj layout ani identitu. Musí projít `MOTION.md` §1 a DESIGN §3 (anti-AI pravidla).
5. **Propose.** Předej `era40-motion-director` vstup pro specifikaci (šablona v `motion-development.md`).
6. Výsledek ulož jako `references/reference-analysis/<slug>.md` a přidej řádek do `references/reference-library.md`.

Šablona analýzy:

```md
# <Název webu>
URL · datum návštěvy · prohlížeč/šířky · autor/studio (pokud je známé)
## Ověřená pozorování
## Předpoklady o technice (s důvodem)
## Co přebrat jako princip
## Co nepřebírat (identita, layout, nevhodné pro veřejnou instituci)
## Překlad do ERA40 (kapitola, účel, riziko)
## Odkazy na znalosti (soubory v docs/era40-ai)
```
