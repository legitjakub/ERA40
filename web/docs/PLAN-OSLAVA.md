# Plán: z výstavy na web oslavy (návrh, 14. 11. 2026)

## Co se mění

Web dosud vyprávěl Erasmus jako digitální výstava. Nově je to **web akce**: výroční oslava s koncertem a vystoupeními, a zároveň oslava toho, co Erasmus za 40 let dokázal. Návštěvník musí do 3 sekund pochopit **co, kdy, kde a jak se dostanu dovnitř**. Příběhová část zůstane jako důvod, proč se slaví.

Poučení z minulých kol: Jakub nechtěl efekty navršené na web (tabule, ∞, jízdenky). Tento plán proto přidává hlavně **obsah a funkce akce**. Vizuální energie přijde z typografie line-upu a z fotek účinkujících, ne z nových animačních triků.

## Rámec výročí (k potvrzení)

- **Správně:** „40 let Erasmu“ (evropský program 1987–2027). Oslava se koná v Česku, které je v programu od roku 1998.
- **Nepoužívat:** „40 let Erasmu v Česku“ ani „40 let ČR v EU“. Obojí je fakticky špatně (Česko je v Erasmu 29 let a v EU od roku 2004).
- **Navržený claim:** „40 let Erasmu. Slavíme v Česku.“

## Struktura

### 1. Úvod homepage (film zůstává)

Film a „Některé cesty změní všechno.“ zůstávají. Přibude **řádek akce**, který je vidět hned:
- datum, místo, čas začátku,
- dvě tlačítka: „Program a účinkující“ a „Chci přijít“,
- odpočet do akce (dny/hodiny) jako klidný textový údaj, ne efekt. Po akci se sám změní na „Děkujeme. Podívejte se, jak to vypadalo.“

### 2. Nová stránka `/oslava` (srdce akce)

1. **Úvodní plakát:** datum, místo, hlavní jména. Line-up vysázený jako festivalový plakát přímo v Roboto Flex (velká zúžená jména, menší jména níž). Žádný obrázek s textem, takže je to přístupné a dobře se to překládá.
2. **Účinkující:**
   - **Karta:** fotka, jméno, žánr a čas vystoupení.
   - **Detail:** krátký medailonek a odkaz na poslech (Spotify nebo YouTube).
   - **Vztah k Erasmu, pokud existuje:** „sama studovala v Lisabonu“. Jen ověřené informace, je to silné propojení s tématem.
3. **Program:** časová osa dne podle scén, například hlavní pódium, debaty s absolventy, stánky škol a DZS, „Erasmus příběhy živě“. Filtr podle scény, přehledné i na mobilu.
4. **Místo a doprava:** mapa místa, MHD, přístupnost pro vozíčkáře, co si vzít a co je zakázáno.
5. **Vstup:** zdarma s registrací, nebo vstupenky. Kapacita, otevření bran.
6. **Časté otázky.**
7. **Pro média a partnery:** kontakt, tiskové materiály, loga partnerů.

### 3. Registrace „Chci přijít“

Rozšířit `/zapojte-se` o čtvrtou cestu **„Přijdu na oslavu“**:
- údaje: jméno, e-mail, počet osob, případně souhlas s novinkami,
- potvrzení na obrazovce,
- tlačítko **„Přidat do kalendáře“** (soubor .ics vygenerovaný v prohlížeči, žádná externí služba).

Formulář i úložiště už fungují. Je potřeba jen nová cesta a pole. Kapacitu a potvrzovací e-maily umí až skutečný systém pořadatele, prototyp to nepředstírá.

### 4. Navigace

Hlavička: „Oslava“ jako první odkaz a výrazné „Chci přijít“, které nahradí „Zapojte se“. Kapitoly příběhu zůstávají v menu.

### 5. Po akci

Sekce **Galerie a aftermovie** a výzva „Byli jste tam? Pošlete fotku nebo vzpomínku“ (napojení na sběr příběhů).

### 6. Sdílení

OG obrázek s datem a hlavními jmény, sdílecí texty pro sítě. Strukturovaná data `Event` (schema.org), aby Google ukázal datum a místo.

## Vizuální směr akce

- Identita zůstává (Erasmus+ modrá, Roboto Flex, Trasa).
- Na stránce `/oslava` navrhuji výjimku pro **víc žluté**: plakát akce na modré ploše. Pravidlo „méně než 5 % žluté“ by platilo dál pro zbytek webu.
- Jediný případný pohyb: line-up jmen jemně reagující na scroll. Jen po Jakubově souhlasu a s možností ho kdykoli vypnout.

## Co potřebuji od Jakuba (bez toho jen označené placeholdery)

1. Datum, čas a místo akce.
2. Seznam účinkujících, jejich oficiální fotky a souhlas s použitím, hlavní jména.
3. Program (časy, scény).
4. Vstup: zdarma s registrací, nebo vstupenky (a kde)? Kapacita?
5. Pořadatel, partneři a jejich loga.
6. Kontakt pro média a pro veřejnost.
7. Potvrzení claimu „40 let Erasmu. Slavíme v Česku.“

## Pořadí prací

| Fáze | Obsah | Závisí na podkladech |
|---|---|---|
| 0 | Commit současného stavu, aby šlo cokoli vrátit jedním příkazem | ne |
| 1 | Kostra `/oslava`, řádek akce v hero, cesta „Přijdu na oslavu“, .ics, navigace (vše s viditelnými placeholdery) | ne |
| 2 | Line-up plakát, karty účinkujících, program, místo | ano (1–3) |
| 3 | OG obrázek, schema.org Event, FAQ, média | částečně |
| 4 | Po akci: galerie, aftermovie, „Byli jste tam?“ | po akci |

Každá fáze se ukáže Jakubovi na :3000 před pokračováním.

## Návrh akce (14. 11. 2026, k potvrzení pořadatelem)

Jakub požádal o domyšlení všech údajů podle veřejných informací. Na webu je všechno označené jako **návrh** (`event.confirmed = false`). Do potvrzení zůstává vypnutý soubor .ics i strukturovaná data Event a jména účinkujících jsou jen formáty, ne skutečné kapely.

| Údaj | Návrh | Proč |
|---|---|---|
| Datum | sobota 12. 6. 2027, 14–22 h | Program vznikl 15. 6. 1987, to je úterý. Sobota je nejbližší víkendový den. Francouzská národní agentura chystá akce v červnu „kolem data výročí“. Konec ve 22 h kvůli nočnímu klidu na náplavce. |
| Místo | Náplavka, Rašínovo nábřeží, Praha 2 | Veřejné prostranství pro festivaly a trhy, tisíce lidí, tramvaj Výtoň, metro B Karlovo náměstí, cyklotrasa A2. Podmínky pronájmu a kapacitu potvrdí správce (TCP / Pražské náplavky). |
| Vstup | zdarma s nepovinnou registrací | Oslava programu z veřejných peněz. Registrace slouží k odhadu počtu lidí a získání kontaktů. |
| Program | 14:00 stánky, 15:00 debata „Odjezd 1998“, sbor, Příběhy živě, studentské kapely, debata o Erasmu+ od 2014, kapela absolventů, evropský host, společná fotka, hlavní host, DJ set 1987–2027 | Spojuje koncert, absolventy a nábor na výjezdy. |
| Účinkující | formáty: hlavní host (CZ pop/indie), evropský host, kapela absolventů, studentské kapely (výzva pro školy), mezinárodní sbor, DJ | Skutečná jména až po smlouvách. Vazbu na Erasmus uvádět jen ověřenou. |
| Čísla | 15. 6. 1987, 1998, 446 200 účastníků z ČR (výzvy 1998–2024, DZS 2/2025), 2014 Erasmus+ | DZS Mozaika jaro 2025, DZS infografika 2024 |

### Zdroje
- [DZS, Mozaika jaro 2025](https://www.dzs.cz/sites/default/files/mosaic/2025-03/Mozaika_2025-JARO.pdf): 446 200 účastníků 1998–2024
- [Agence Erasmus+ France, Les 40 ans d’Erasmus+](https://agence.erasmusplus.fr/2026/07/09/les-40-ans-derasmus-se-preparent/): 15. 6. 1987, plán oslav 2027 (leden, květen, červen, říjen Erasmus Days, prosinec)
- [DZS, 35 let Erasmu](https://www.dzs.cz/clanek/oslavte-s-nami-35-narozeniny-programu-erasmus): oslavy přes Erasmus Days
- [prague.eu, Náplavka Rašínovo nábřeží](https://prague.eu/cs/objevujte/naplavka-rasinovo-nabrezi/): vymezení a akce
- [Echo24, až 22 tisíc lidí na náplavce](https://www.echo24.cz/a/wycxc/na-naplavku-chodi-slavit-az-22-tisic-lidi-krnacove-se-omezeni-moc-nezda)

### Před potvrzením ověřit
1. Termín u DZS a MŠMT, aby nekolidoval s evropskými akcemi k výročí.
2. Zábor náplavky, hluk, pódium, elektřina, bezbariérovost a toalety se správcem.
3. Rozpočet a booking hlavního hosta.
4. Poté nastavit `confirmed: true`. Zapne se odpočet, .ics a schema.org Event.
