# Motion patterns (rozhodovací vzory)

Krátké vzory, které se opakují. Každý má zdroj.

| Vzor | Pravidlo | Zdroj |
|---|---|---|
| Gate „animovat vůbec?“ | 100+×/den → nic. Desítky×/den → skoro neznatelné. Občas → standard. Vzácně → prostor pro „delight“. | Emil `animate`, `find-animation-opportunities` |
| Pojmenuj účel | feedback / prostorová návaznost / indikace stavu / zabránit skoku / vysvětlení / radost (jen vzácné momenty) | Emil `animate` |
| Lead–support–decoration–static | Před časováním rozdělit role. Dekorace jen fade, nebo nic. | Emil `choreograph` |
| Jedna entrance na kontejner | Když vjíždí panel, jeho obsah už je uvnitř. | Emil `choreograph` |
| Nerovnoměrný stagger | Stejné zpoždění působí jako metronom. Zkracující se mezery působí organicky. | Emil `choreograph` |
| Odchod je kratší a současný | Žádný obrácený stagger při zavírání. | Emil `choreograph` |
| Životní cyklus | mount → initial → intro → settled → outro → end → unmount. Back/forward bez outra. | Animaxxing `gsap-nextjs` |
| Deadline proti prázdné stránce | Skrytý obsah se po krátkém limitu ukáže, i když JS selže. | Animaxxing |
| Jeden vlastník transformace | Dva tweeny nesmí psát stejný transform. Před outrem zastavit pointer a ambient efekty. | Animaxxing recipe contract |
| Proxy + timeline + render | Kamera nebo cokoli mimo DOM: GSAP tweenuje proxy, render loop jen čte. | Codrops Cinematic 3D |
| quickTo v loopu | Nikdy nové tweeny v rAF. `quickTo` / `quickSetter`. | Codrops Blender path, gsap-performance |
| Scrub s dojezdem | `scrub: 0.45–1` pro filmové scény. Velké hodnoty (2+) jen pro dekorativní masky. | ScrollTrigger docs, Codrops SVG mask |
| DOM je zdroj pravdy | WebGL/canvas jen kreslí přes `<img>`. Fallback = obrázek. | Animaxxing WebGL, Codrops WebGL gallery |
| Fonty před split | `document.fonts.ready` → SplitText → animace. | Animaxxing, Codrops gallery |
