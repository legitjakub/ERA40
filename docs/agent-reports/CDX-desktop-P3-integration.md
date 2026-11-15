# Report Codex desktop — P3 integrace 014

## Výchozí stav
Hlavní checkout `/Users/jakubhrncir/ERA40`, základ `f011010`, předání Claudem `53c3217`. První runtime `fc44fc4`, **finální testovaná revize `e2294c1`**, byte-shodná se sestavenými zdroji. Build ID `GY4VaxPlnp4pfjiZhvi19`, náhled http://127.0.0.1:3000/ . Prototyp :3073 byl přepnut na aktuální hlavní checkout.

## Změněné soubory a chování
- `RouteTransition.tsx` + module.css, jediný mount v `app/layout.tsx`, dva timing tokeny: jednosekundový SVG/DOM přechod bez vlastního routeru, canvasu, nové závislosti či rámové smyčky. React dál vlastní SharedPhoto. Žádný preventDefault/push/startViewTransition ani fokus/scroll lock.
- Na přímé doladění Jakuba tah **5 px desktop / 3,75 px mobil**, krátká žlutá špička po čele stejné křivky, bez prodloužení. Reduced OS i menu jen 160ms fade. Query/hash/modified/target/download/externí odkazy se neblokují. Detail ↔ detail či chybějící API má fade, archiv ↔ detail původní fotku.
- Cílený QA skript, brief, spec/decision log, vzor správné SVG délky, report/review. Osm kapitol a jejich obsah, SharedPhoto i osobní úložiště beze změny.

## Technická rozhodnutí a vyřešené chyby
- Skutečná délka tahu se měří jednou jako `getTotalLength() × hypot(CTM.a, CTM.b)`. V ověřeném Chromiu původní normalizace pathLength=1000 s non-scaling-stroke posílala světelnou špičku mimo mobilní křivku. Po opravě viditelnost doložena screenshotem a 88 žlutými pixely na 390 / 314 na 1440.
- Poslední navigace ruší předchozí animace; cleanup/deadline ruší všechny čtyři animace, timeout, root class a listenery. Změna šířky efekt uklidí, změna výšky adresního řádku telefonu jej nepřeruší.
- Ve všech devíti normálních velikostech byla nová URL/routa již aktivní, zatímco předávka stále běžela (`full`): navigace nečeká na efekt.

## Testy a výsledky
Mobil 360/390/430 první, potom 1920/1440/1280/1024/768/375, vše i reduced. Kontaktní API blokováno. Finální full matice a qa-checks běžely proti runtime e2294c1. Impact/handoffs jsou výsledky první integrace fc44fc4 před doladěním samotného tahu; jejich komponenty se poté neměnily.

| Příkaz | Exit | Stav / důkaz |
|---|---|---|
| `npm run typecheck -- --incremental false` | 0 | finální revize |
| `npm run lint` | 0 | finální revize včetně QA skriptu |
| `npm run build` | 0 | 22 stránek, finální TypeScript; restart :3000 pouze podle ověřeného PID |
| `qa-route-transition.mjs --url …:3040 --widths 360,390,430` | 0 | mobilní vývojové průchody 6/6, později +7 kontrol |
| `qa-route-transition.mjs --url …:3000 --out qa/route-transition-bold-final` | 0 | **18/18 + 8/8**, 0 přetečení/chyb; historie, rychlé volby, menu/reduced za běhu, SharedPhoto, skutečně chybějící API i pro detail, query, no-JS SSR, resize |
| `qa-checks.mjs --url …:3000 --out qa/route-transition-bold-checks` | 0 | **15/15**, axe a klávesnice |
| `qa-impact.mjs --url …:3000` (fc44fc4) | 0 | 1440/390/360, 5 dopadových příkladů, manuální srovnání, filtry/reset/návrat; 0 violations a JS chyb |
| `qa-handoffs.mjs --url …:3040` (fc44fc4) | 0 | **6/6**, vpřed/zpět, rychlý exit, resize/reduced, kotvy/Back |
| `git diff --check` + pixel check PNG | 0 | whitespace bez chyby, akcent skutečně vykreslen |

První dev QA skončilo 1: selektor `main h1` zahrnoval i DOM uchovaný App Routerem a test používal option `rok` místo `year`. Opraveno na viditelné role/skutečnou hodnotu, následující běhy prošly. Mizící akcent nebyl maskován computed style; skutečně opraven po vizuálním experimentu a opět otestován.

## Screenshoty a meze
Prohlédnuté skutečné `web/qa/route-transition-bold-final/1440-transition-50.png`, `390-transition-50.png`, reduced i klidové stavy; `report.json` má 18/18 + 8/8. Pixel check potvrzuje modrou plochu 97,4–98 % a viditelný žlutý akcent. Důkazy mimo Git.
Fyzický Android/FPS a field INP **neověřeny**; testy jsou headless Chromium. Ověřena absence umělé navigační prodlevy. Dřívější loading overflow homepage a mobil 07/08 zůstávají další samostatnou dávkou.

## Review a předání
**PŘIJATO vlastní závěrečnou kontrolou hlavního Codexu**, viz `docs/qa/REVIEW-CDX-desktop-P3-integration.md`. Jakub nově určil práci pouze Codexu; rozpracované nezávislé review bylo přerušeno a není vydáváno za provedené. Claude UI 100 %, žádné jeho review se netvrdí. Schválení spec i integrace je přímé a zaznamenané v D-018. Ověřená dávka je připravená k autorizovanému pushi do main. Externí deploy neproběhl.
