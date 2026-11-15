# Kreativní jazyk ERA40

Jak se témata výročí stávají animovanými objekty, přechody a motivy. Platí pro návrhy (`era40-motion-director`). **Nic z toho není schválené k implementaci.** Každý prvek musí projít specifikací a Jakubovým souhlasem.

## Výchozí bod: co už Jakub odmítl
- „40 → ∞“: brána s číslem 40 a nekonečná smyčka Trasy (D-005).
- Odjezdová tabule přes film (D-004), jízdenka a vlak jako vizuální doplňky (D-006).
- Web oslavy s interaktivním plánovačem (D-009).

Z toho plyne pravidlo: **motivy se nevyrábějí jako samostatné ozdoby. Vznikají z prvků, které už na webu jsou** (Trasa, rok, mapa, fotky lidí, srovnání tehdy/teď). Symbol ∞ se nekreslí doslova.

## Gramatika Trasy (jednotící jazyk)

Trasa je jediná linka, která prochází celým webem. Navrhuji jí dát **čas jako gramatiku**:

| Čas | Vzhled | Význam |
|---|---|---|
| Minulost | plná linka, Erasmus+ modrá | ujetá cesta, historie, příběhy, které se staly |
| Přítomnost | žlutý bod (stanice) na čele linky | kde čtenář právě je. Pohybuje se se scrollem |
| Budoucnost | tečkovaná / nenakreslená linka | cesta, která teprve přijde |

Tento jazyk nic nového nepřidává, jen pevně definuje, co už existuje (Trasa, žluté stanice, kreslení DrawSVG). Pomocí něj se dají spojit kapitoly, aniž by se něco přidávalo navíc.

## Motivy

### Číslo 40
- **Kde nese význam:** v rozpětí 1987–2027, které už má hero (rok se počítá). Dál v Historii jako **40 pražců/značek na lince**, jedna za každý rok. Při scrubu se postupně „zaplňují“ a rok 1998 je ten, kde se připojuje česká linka.
- **Kde ne:** velké „40“ jako dekorativní objekt nebo brána. Číslo 40 na tlačítkách, kurzoru a loaderu.
- Objekt: *pražcová osa*, 40 krátkých svislých čárek pod linkou EU v Historii. Bez nového textu.

### Navždy / nekonečno
- **Kde nese význam:** ve finále (08). Trasa odjíždí za okraj a **nikdy se nedokreslí**. Budoucí čas je tečkovaný (gramatika výše). „Navždy“ = cesta pokračuje, ne symbol.
- Volitelně: konec stránky navazuje na začátek. Poslední stanice Trasy je „Další cesta začíná teď“ s odkazem na příběhy, ne smyčka.
- **Kde ne:** ∞ ve tvaru Trasy, smyčky karet, morph 0 → ∞.

### Evropská propojení
- Mapa (05) kreslí trasy **z Prahy ven**. Data ale říkají, že do Česka přijelo cca 450 000 lidí (od 1998, k 31. 12. 2023, `web/docs/CONTENT-FACTS.md`). Objekt: *obousměrné trasy*. Po výjezdech se jemně přikreslí příjezdy opačným směrem (tenčí, světlejší linka). Spojení je oboustranné.
- Přechod: z mapy do čísel (07) linky „spadnou“ do pruhů grafu (DrawSVG + Flip), takže čísla jsou součet tras.

### Cestování a pohyb
- Směr vpřed = doprava a dolů. Rail Příběhů jede ve směru jízdy.
- Pohled z okna vlaku (Prolog) je přechod mezi kapitolami, ne dekorace. Kandidát na frame sequence (DESIGN §7 P1).
- Velocity skew nadpisů = setrvačnost jízdy (už existuje, max 3°).

### Lidé a osobní příběhy
- Každý příběh je **stanice** na Trase (žlutý bod). Fotka se zaostří, když kolem ní jedeme (inspirace Blender camera path, ve 2D).
- Detail příběhu se otevírá Flipem z fotky (existuje). Při zavření se fotka vrací na svou stanici.

### Historická proměna
- Dvě linie (EU 1987, CZ 1998), které se slévají (existuje). Rok 2004 mění pozadí na modré (existuje).
- Typografická proměna: roky jsou v užším a lehčím řezu, s časem se rozšiřují a ztěžkávají (osy Roboto Flex přes `flexAxes`, jen u nezalamovaného čísla). Jemný a čitelný signál, že program rostl.

### Minulost, přítomnost, budoucnost
- Tehdy/teď (06) je jediné místo, kde čtenář **sám** hýbe časem (slider). Nepřidávat autonomní pohyb.
- Gramatika Trasy (plná / bod / tečkovaná) to propojuje s celým webem.

## Mapa motivů na kapitoly (stav 15. 11. 2026)

| Kapitola | Motiv | Stav |
|---|---|---|
| 01 Úvod | — | film a claim (D-002). Bez vlaku a tabule. |
| 02 Prolog | lidé, předávání | PeopleRow „lidé, ne doprava“ (P0). **Okno vlaku zrušeno.** |
| 03 Historie | 40, proměna | ✅ 40 pražců v časovém měřítku (D-020), mobil swipe (D-021), wdth letopočtu |
| 04 Příběhy | lidé | ✅ stanice na Trase, živá karta, distorze |
| 05 Mapa | propojení | ✅ obousměrné trasy. Kamera = 015 B (P3). |
| 06 → 07 | návrat → větvení | ✅ 008B osa → kořen |
| 08 Pokračování | navždy | ✅ tečkovaná Trasa za okraj, ztišení |
| celý web | čas | ✅ gramatika Trasy (plná / bod / tečky) |
| mezi stránkami | 40 let jako tah | ✅ 014 ∞ „40 / 1987–2027“ (D-018), **jediná výjimka** z pravidla „∞ se nekreslí doslova“ |
