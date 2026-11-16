# Chybějící podklady

15. 11. 2026. Seřazeno podle toho, co nejvíc blokuje kvalitu výsledku. Sloupec „Od koho“ je odhad podle podkladů DZS (MAR/KOM), nikoli potvrzené přidělení.

## Blokuje kreativní směr a vizuální kvalitu

| # | Co chybí | Proč to vadí | Od koho |
|---|---|---|---|
| 1 | **Finální výroční vizuální identita** (logo/lockup „40 let Erasmus+“, barevná paleta, typografie, pravidla pro motiv nekonečna) | Zadání LP: „bude upřesněno“. Moodboardy jsou podle podkladů „pouze směr“. Bez identity riskujeme přepracování. | DZS MAR |
| 2 | **Oficiální brand assety** Erasmus+ a DZS (SVG loga, ochranné zóny, povinné texty spolufinancování EU) | Patička má nepotvrzené logotypy (`web/docs/PLACEHOLDERS.md`) | DZS |
| 3 | **Firemní / výroční font**, pokud existuje, s webovou licencí | Master prompt chce skutečný font, ne generický. Dnes Roboto Flex (OFL). | DZS |
| 4 | **Skutečné fotografie a video lidí** se souhlasy (tehdy + dnes) | Všechna média jsou ilustrační stock. Awards-level web stojí na autentickém obrazu. „Then & Now“ potřebuje skutečný archiv. | DZS, alumni, ESN |
| 5 | **Hero video** (podklady zmiňují produkci hero videa) | Hero dnes běží na ilustračním filmu | DZS + produkce |
| 6 | **Skutečné příběhy** (aspoň první sada z „40 let, 40 příběhů“) s řetězem dopadu a souhlasem | Web má 8 modelových příběhů. Dopadové počty nesmíme vymýšlet. | DZS KOM |

## Blokuje funkce z MVP

| # | Co chybí | Od koho |
|---|---|---|
| 7 | Seznam akcí 2027 (datum, místo, popis, odkaz), aspoň Q1 a Erasmus Days | DZS |
| 8 | Partneři a jejich assety (ZEK, ESN, kraje, MŠMT…), co lze zveřejnit | DZS |
| 9 | Rozhodnutí o CMS a hostingu (stávající prostředí DZS?), doména (era40.cz?) | DZS IT / MAR |
| 10 | Analytika: nástroj a souhlas (cookies) | DZS |
| 11 | Veřejná výzva: termín, proces schvalování příspěvků, kdo spravuje kontakty (dnes lokální JSON, ne CRM) | DZS |
| 12 | Ilustrované avatary pro kvíz (6 typů) | DZS / ilustrátor |
| 13 | Ověřený počet českých účastníků k roku 2027 (pracovní „500 000“ je neověřené) | DZS STA |

## Technické vstupy pro WebGL / 3D (fáze 3)

| # | Co chybí | Poznámka |
|---|---|---|
| 14 | 3D assety (pokud směr nějaké vyžaduje): GLB, textury, licence | Bez nich jen procedurální / fotografická 3D |
| 15 | Cílová zařízení a minimální výkon (podíl mobilu, staré Androidy?) | Určuje rozpočet WebGL |
| 16 | Přístupnostní standard (WCAG 2.1 AA / 2.2?) a jazykové mutace | Zadání: „asi jen česká“ |

## Co můžeme dělat bez nich

Kreativní směry, motion bible, technický PoC a QA systém. Vše s ilustračními médii a viditelně označeným modelovým obsahem, připravené na výměnu za skutečné podklady.

## BLOKUJE SPUŠTĚNÍ · licence čtyř záběrů hero filmu (zjištěno 16. 11. 2026)

Stránky Mixkitu dnes uvádějí u čtyř použitých klipů **Stock Video Restricted License**, tedy jen osobní nekomerční použití. Katalog je dosud vedl jako Free:
- `x-lecture` (48165): přednáška;
- `x-dinner-garden` (23131): večeře na zahradě;
- `x-lab` (24232): laboratoř, závěr „A předává to dál.“;
- `x-meadow` (36084): louka.

Free licenci mají `x-campus-walk` (4503) a `x-dinner-home` (12134). Ty jsou nově ve 4K a 1080p.

Kampaňový web DZS není osobní použití. Před veřejným spuštěním je proto potřeba jedno z:
1. licencovat tyto klipy (Envato Elements);
2. nahradit je Free / Pexels záběry se stejným významem;
3. nechat DZS dodat vlastní záběry.

Web je zatím `noindex` a nenasazený. Rozhoduje Jakub a DZS.
