# EXPERIENCE DESIGN — směr A

15. 11. 2026 · Claude.

Navazuje na:
- `CREATIVE_DIRECTIONS.md` (směr A, D-016),
- `MOTION_BIBLE.md`,
- strategii DZS (`docs/private/`).

Popisuje stav po 009 a cílový stav.

## 1. Informační architektura

```
/                     výstava v 8 kapitolách (scroll)
 ├ #hero              01 Odjezd: film, claim (M01, M02 🧪 smyčka)
 ├ #pribehy-intro     02 Prolog: 411 000 lidí, „každý se vrátil trochu jiný“
 ├ #historie          03 Historie 1987–2027 (pin, 2 linie EU/CZ) → 008A
 ├ #pribehy           04 Příběhy (8 modelových, horizontální rail)
 ├ #mapa              05 Mapa Evropy (005A předávka fotky)
 ├ #tehdy-ted         06 Po návratu (Tehdy / Dnes) → 008B ✅ 009
 ├ #cisla             07 Rozvětvení (411 400 → 5 oblastí) ✅ 009
 └ #budoucnost        08 Pokračování (Vaše cesta, 2 akce) ✅ 009
/pribehy              archiv příběhů (filtry, „co pokračuje dál“, rejstřík)
/pribehy/[id]         detail příběhu (pokračování, mapa, metadata)
/tvoje-era            kvíz „Jaké je tvoje ERA?“ (2 cesty, 6 typů, nálepka PNG)
/zapojte-se           zapojení: příběh / chci vyjet / škola či organizace
/o-projektu           o výročí, ověřené vs. modelové
/ochrana-osobnich-udaju, /credits, /placeholders
```

**Chybí vůči zadání DZS** (čeká na podklady, viz `MISSING_INPUTS.md`):
- `/akce`: kalendář (termíny akcí 2027),
- `/partneri` (ZEK, ESN, kraje… po potvrzení),
- sekce „Erasmus+ kolem nás“ (dopad na školy a regiony): kandidát na rozšíření 07 až budou data DZS podle krajů,
- CMS a analytika.

## 2. User journey podle publika

| Publikum (DZS) | Vstup | Cesta | Cíl |
|---|---|---|---|
| Široká veřejnost 20–60 (primární) | hero → scroll | 01 → 06 „Po návratu“ → 07 „větví se“ | Pochopí, že se Erasmus týká i jeho: „dostává se to k žákům, kolegům…“. Případně kvíz „Na Erasmu: 0 dní“. |
| Absolventi | kampaň, sociální sítě | hero → 04 Příběhy → `/tvoje-era` | Nálepka ERA a sdílení, pak `/zapojte-se#pribeh` |
| Mladí a budoucí účastníci | sítě, školy | 04 Příběhy (různé typy pobytů) → 08 | „Vyrazit s Erasmus+“ (DZS) |
| Školy a organizace | e-mail DZS, Erasmus Days | 07 Rozvětvení (oblasti) → `/zapojte-se#organizace` | Příběh organizace |
| Média, partneři | tisková zpráva | `/o-projektu`, 07 (čísla se zdroji) | Ověřená data s obdobím, kontakt |

## 3. Wireframe homepage (desktop, po 009)

```
[01 Odjezd]   film ─────────────── claim „Erasmus+ již 40 let mění životy“, CTA
   │ (pin 150 vh, film → rám)          [🧪 M02: linka obkrouží 0 ve „40“]
[02 Prolog]   „Od roku 1998 vyjelo … přes 411 000 lidí. Každý se vrátil trochu jiný.“  + okno vlaku
[03 Historie] ════ EU 1987 ══╦══ CZ 1998 ═══ 2004 ═══ … ═══ 2027   (pin 250 vh)
   └─ 008A: poslední rám → první portrét
[04 Příběhy]  ← Tereza · Ondřej · Inês · … · Lucie a Marta →   (horizontální rail)
[05 Mapa]     mapa Evropy │ panel osoby (005A převezme fotku)
[06 Po návratu] [ Tehdy: fotka | Dnes: „…učí svou třídu venku“ ]  Jana · Inês · Martin
   └─ 008B: dělič → kmen
[07 Rozvětvení] 411 400 ┃━━━━━━━━━━━━━━━━━━━━━━━ VŠ 178 700
                        ┣━━━━━━━━━━━━━ mládež 111 000
                        ┣━━━━━━━━ odborné 68 900
                        ┣━━━━━ školní 43 800   → příklad: Mgr. Jana
                        ┗━ dospělí 9 000
                 450 000 · 86 % · 103 mil. €  (se zdroji)
[08 Pokračování] „Cesta končí. Zkušenost pokračuje.“ ━━━● Vaše cesta · · · · →
                 [Zapsat svůj příběh] [Jaké je tvoje ERA?]
[patička]
```

## 4. Mobilní koncept (samostatný, ne zmenšený desktop)

- Žádné piny nad 100 vh. Příběhy jako nativní swipe se snapem.
- Linka vede **svisle podél levého okraje**: prolog, 07 (větve pod sebou), 08 (bod a tečky dolů).
- Předávky 005A a 008 se na mobilu vypínají. Nahrazuje je datová návaznost stejné osoby.
- Kvíz a formulář jsou primárně mobilní (velké cíle ≥ 44 px, jedna otázka na obrazovku).
- Hover-only interakce nejsou žádné. Každá animace má koncový stav a lze ji přeskočit scrollem.

## 5. Interakce (přehled)

| Interakce | Kde | Klávesnice | Reduced |
|---|---|---|---|
| Posuvník Tehdy/Dnes | 06 | šipky + tlačítka Tehdy / Obojí / Teď | stejný, bez vedení scrollem |
| Výběr větve | 07 | tlačítka `aria-pressed` | ano |
| Filtry „co pokračuje dál“ | `/pribehy` | ano, stav v URL | ano |
| Kvíz | `/tvoje-era` | fokus na otázku, Zpět | bez kreslení glyfu |
| Kapitoly | menu „Kapitoly“ | dialog, Esc | ano |
