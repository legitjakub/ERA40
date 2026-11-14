# Sdílený obraz mezi scénami — technické poznámky

14. 11. 2026 · Codex · pro izolovaný návrh 005, bez instalace závislostí.

Primární zdroje načtené přes Firecrawl: [Jérémie Nallet, Atelier UI: Mixing WebGL and the DOM](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/) a [oficiální GSAP Flip dokumentace](https://gsap.com/docs/v3/Plugins/Flip/). Článek a podstatné části API byly přečteny; vložené externí CodePen projekty nebyly samostatně spuštěny.

## Co je užitečné

- Jeden sdílený canvas dovoluje více efektům použít společný renderovací kontext. ERA40 už vlastní canvas používá; další provider kvůli jedné předávce nedává smysl.
- DOM musí zůstat zdrojem obsahu, alt textu a klávesnicového ovládání. Článek to řeší DOM prvkem pod grafickým protějškem; pro náš efekt je ještě jednodušší využít samotnou DOM fotografii.
- Souřadnice měřit při usazení layoutu a změně velikosti. Při pouhém scrollu lze pracovat s uloženou geometrií a aktuálním posunem. Transformovaný rodič však mění geometrii vůči plátnu — to se týká našeho horizontálního railu.
- Jedna hlavní časová osa musí koordinovat obraz a scroll. Článek používá Motion; to není důvod přidávat Motion k existujícímu GSAP + Lenis. Převzít princip synchronizace, ne další clock.
- Flip měří stav před změnou DOM a animuje kompenzační transformace. U změn React layoutu je nutné počkat na commit skutečného cílového layoutu. Při změně viewportu uprostřed animace nemusí být původní geometrie platná.
- `Flip.from()` / `Flip.fit()` mohou pomoci s cílovou geometrií; nesmějí se znovu vytvářet každý frame scrollu. Pro dva trvale existující cíle a vratný scrub je vhodná jedna změřená timeline. Pro kliknutí do detailu zůstává vhodný současný Flip.

## ERA40 integrační rozhodnutí

Předávka musí mít **jediného vlastníka viditelné fotografie**. Původní rail, WebGL textura a mapový snímek se nesmějí vykreslit současně na třech místech. Pokud renderer neumí předat snímek beze skoku, první verze použije přirozený střih / statický DOM fallback.

Během předávky animovat pouze x/y, rovnoměrné scale a opacity; zachovat proporce fotografie. SVG křivka má málo bodů a vychází z existující projekce souřadnic. Text má samostatný klidový stav. Popisek „Ilustrační snímek“ se nesmí zmenšit na nečitelnou velikost spolu s celou fotografií.

Izolovaný prototyp dokládá jen tuto 2D choreografii. Nedokládá správné odpojení produkčního WebGL rendereru, Next navigaci, obnovu pinů ani výkon na fyzickém telefonu. R3F, Three.js, fluid simulation a shaderový text z článku nebyly nainstalovány ani označeny za zvládnutou produkční schopnost.
