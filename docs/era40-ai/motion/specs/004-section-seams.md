# 004: Přechody pozadí mezi kapitolami
Kapitoly: 02→03, 04→05, 05→06, 06→07, 07→08 · **Stav: návrh**

> **Upřesnění Codexu, 14. 11. 2026:** `SectionPortal` má v současném `src` nedefinované globální třídy; není připravenou přechodovou infrastrukturou. Odhad nízkého rizika níže nebyl potvrzen. Aktuální [návrh 005](005-connected-scenes-direction.md) místo opakování stejné závory rozlišuje předání fotografie, rámu a osy. Oba dokumenty jsou neschválené návrhy, neskládat je automaticky přes sebe.
Účel: zabraňuje skoku · Frekvence: jednou za návštěvu · Reference: Savor + Inkwell (atmosférický přechod), `MOTION-REFERENCE-ANALYSIS.md`

## Koncept
Dnes se pozadí mezi kapitolami mění střihem. Barva další kapitoly by měla **přijet** ve směru jízdy, jako krajina za oknem. Použije se existující `ui/SectionPortal.tsx` (scrub wipe), který zatím na homepage není.

## Stavy
- INITIAL: SSR, dnešní pevné hranice.
- INTRO: na hranici se barva další kapitoly vysune scrubem (scaleY nebo clip-path inset zdola) přes asi 40 vh.
- AMBIENT / OUTRO: žádné.
- REVERSE: scrub.
- MOBILE: kratší přechod (20 vh), stejná technika.
- REDUCED: dnešní střih.

## Technika
`SectionPortal` s parametry `from`/`to` z tokenů, vložit mezi sekce v `app/page.tsx`. Přidaný blok musí mít nulovou výšku v layoutu, nebo se započítat do kotev. Navigace měří ze spacerů, proto ověřit skoky v menu. Nové závislosti: NE.

## Dotčené soubory
`app/page.tsx`, `ui/SectionPortal.tsx` (`--ink` je definovaný v `globals.css` jako alias `--c-ink`), případně CSS kapitol.

## Riziko
Přechody nesmí bojovat s 001 (předávka Trasy). Doporučené pořadí: 001 → 004. Kotvy a `scrollToPosition` po vložení otestovat (`qa-checks` chapters-keyboard).
