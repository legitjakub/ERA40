# Quality evaluation — kreativní směry ERA40

**Metoda:** vážené skóre 1–10; váhy = priorita briefu  
**Hodnotitel:** Creative Director (dokumentační fáze)  
**Datum:** 2026-11-11

---

## Váhy

| Kritérium | Váha | Proč |
| --- | --- | --- |
| Fit na pracovní název / příběhy | 20 % | název je „PŘÍBĚHY…“ |
| Korektnost anniversary framingu | 15 % | riziko „20 let“ chyby |
| Emocionální dopad | 15 % | zapamatovatelnost |
| Originalita vs. typické výroční weby | 10 % | odlišení |
| Realizovatelnost (čas/tech) | 15 % | dokumentace → budoucí build |
| Performance / mobile | 10 % | přístupnost zařízení |
| Accessibility risk (invertováno*) | 10 % | nižší riziko = vyšší skóre |
| Škálovatelnost obsahu | 5 % | další příběhy |

\*Skóre 10 = nízké a11y riziko.

---

## Skórovací tabulka

| Kritérium | Váha | **A Human Stories** | **B Europe in Motion** | **C Then/Now/Next** | **D Letter Home** |
| --- | --- | --- | --- | --- | --- |
| Fit na název / příběhy | 0.20 | **9.5** | 6.5 | 7.0 | 8.5 |
| Anniversary framing | 0.15 | 8.5 | 7.5 | **9.5** | 8.0 |
| Emocionální dopad | 0.15 | **9.0** | 7.0 | 7.0 | 8.0 |
| Originalita | 0.10 | 7.5 | **9.0** | 7.0 | 8.0 |
| Realizovatelnost | 0.15 | **8.5** | 6.0 | 8.0 | 7.0 |
| Performance / mobile | 0.10 | **8.5** | 5.5 | 7.0 | 7.5 |
| Accessibility (nízké riziko) | 0.10 | **8.5** | 5.0 | 7.5 | 8.0 |
| Škálovatelnost | 0.05 | **9.0** | 7.0 | 7.5 | 8.0 |
| **Vážený součet** | 1.00 | **8.73** | **6.68** | **7.58** | **7.85** |

### Výpočet A (ukázka)
`0.2*9.5 + 0.15*8.5 + 0.15*9.0 + 0.1*7.5 + 0.15*8.5 + 0.1*8.5 + 0.1*8.5 + 0.05*9.0 = 8.725 ≈ **8.73**`

---

## Kritický komentář (ne marketing)

### A — 8.73 (vítěz)
Nejsilnější alignment s briefem. Riziko je **obsahové** (souhlasy, kvalita portrétů), ne konceptuální. Emocionálně poráží C; technicky poráží B. Anniversary framing je dobrý, ale musí si „půjčit“ časovou kázeň z C (žádné „20 let“).

### B — 6.68
Nejvyšší originalita, nejvyšší riziko. Snadno se stane tech demem, kde lidé jsou body na grafu. Pro mobil a a11y nejdražší. **Nedoporučit jako master direction**; vybrat 1 scénu (mapa) do A.

### C — 7.58
Nejlepší na korektní čas. Slabší emoce a mobilní split. Ideální jako **struktura historie + Then&Now modul** uvnitř A.

### D — 7.85
Hezký hybrid, ale závisí na artefaktech dopisů/razítek, které projekt zatím nemá. Bez nich vítězí A čistěji. Nechat jako tone overlay (citát jako „dopis“), ne jako samostatný směr.

---

## Verdikt

**Doporučený směr: A — Human Stories (8.73/10).**  
**Hybridní absorpce:** B-mapa (SVG-first) + C-timeline framing.  
**Nevolit B jako celek** — skóre jasně nižší, rizika vyšší.

Žádný směr „jasně“ nepřekonal A po vážení briefu. C by vyhrálo jen pokud by stakeholder priorita byla „edukační timeline“ > „příběhy“ — to brief neříká.
