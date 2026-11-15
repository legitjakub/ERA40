# Codex desktop — P3 integrace / schválená spec 014

Zadal: Jakub přímým schválením v Codex chatu · 15. 11. 2026 · Režim: workspace-write po Claudově výslovném předání `53c3217`.
Základ: `f011010`, hlavní checkout `/Users/jakubhrncir/ERA40`. Vlastník runtime/build/:3000/:3040: Codex desktop. Claude dál pouze dohled/review.

## Cíl a rozsah
Integrovat přesně choreografii 014 do stávající aplikace. Pouze `web/src/components/transitions/RouteTransition.tsx`, module.css, import/mount v `app/layout.tsx` a dva UI timing tokeny v `styles/tokens.css`; vlastní cílený QA skript, brief/report/review a schválení ve spec/decision logu/koordinaci. Žádné nové knihovny, router, Lenis, canvas, obsahové změny ani zásah do SharedPhoto/scén.

## Technika
DOM/SVG překryv + WAAPI, klik pokračuje bez preventDefault a bez čekání. Nativní přechody vlastní stávající React SharedPhoto, žádný vlastní startViewTransition. Běžné stejné-origin změny pathname, programové navigace a historie; ne kotvy/query-only/modified/target/download/externí odkazy. Reduced OS i menu ruší prostorový pohyb, fade ≤160 ms; bez Web Animations běžná navigace. Lifecycle, rychlá opakovaná navigace, deadline a cleanup při hidden/unmount.

## Ověření
Nejdřív skutečný browser 360/390/430, poté celá matice normálně/reduced, 1440×900 a 390×844 screenshoty. Klik → změna URL nezávislá na konci kresby, historie/dvojkliky, dialog menu, filtry a kotvy, React SharedPhoto bez nového překryvu, skutečně chybějící nativní API, přepnutí preference uprostřed. Konzole, axe, typecheck/lint/build a relevantní qa-checks/qa-impact/qa-handoffs. Formulář neposílat, web/data ani docs/private nečíst/necommitovat. Výkonové důkazy pouze poctivě v mezích simulace.

## Předání
Report podle `docs/agent-reports/_TEMPLATE.md`. Jakub následně výslovně určil „už jsi na to vše sám, už jsi jen ty“; vývoj i závěrečnou kontrolu provede hlavní Codex bez další delegace. Claude má ověřeno 100 % limitu, žádné jeho review se netvrdí. Kontrola bude označena jako vlastní, nikoli nezávislá. Ověřená přijatá dávka do main, push povolen Jakubem. Mobil 07/08 a dočasný loading overflow jsou další samostatná dávka.
