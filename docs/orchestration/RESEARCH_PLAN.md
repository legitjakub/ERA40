# Rešerše — fáze 1 (zahájeno 15. 11. 2026)

Cíl podle master promptu:
- ≥ 20 realizovaných webů s prioritou 2025–2026, z nich TOP 10,
- poznámky k 18 technickým oblastem,
- tři kreativní směry (`CREATIVE_DIRECTIONS.md`), po kterých **zastavujeme a Jakub vybírá**.

Stávající knihovna má 33 URL (`docs/03`, `docs/04`, `docs/era40-ai/references/`), převážně z let 2017–2024. Doplňujeme, nenahrazujeme. Postup každé reference:
1. `era40-reference-analyst`,
2. skutečný průchod v prohlížeči (desktop i mobil),
3. screenshoty do `docs/era40-ai/references/screenshots/`,
4. ověření ocenění přímo na awwwards.com / thefwa.com,
5. zápis.

## Kandidáti 2025–2026 (zatím jen z vyhledávání, ověřit živě)

| Kandidát | Proč pro ERA40 | Ocenění podle zdroje (neověřeno) | Zdroj nálezu |
|---|---|---|---|
| OceanX 2025 (Unseen) | imerzivní časová osa jednoho roku, three.js | Awwwards (stránka), CommArts Webpick | awwwards.com/sites/oceanx-2025, commarts.com |
| Hubtown (Unseen) | „40 let portfolia“ filmově a ve 3D. Přímá paralela výročí 40 let. | SOTD červen 2026 (podle roundupu) | utsubo.com, hontran.dev |
| Why Zero | vzdělávání, narativní scroll | SOTD 7. 9. 2026 | awwwards.com/sites/why-zero |
| The Power of Storytelling (Noomo) | storytelling jako téma | SOTD 8. 6. 2026 | awwwards.com |
| IVRESS | „příběh, který končí tam, kde začal“ (smyčka / pokračování) | SOTD 28. 6. 2026 | awwwards.com |
| Into the Amazon (NatGeo) | dokumentární lineární scrollytelling | CommArts Webpick | commarts.com/webpicks/into-the-amazon |
| depart inc. 10th anniversary | výročí, R3F + Blender | Awwwards HM 31. 10. 2025 | awwwards.com/sites/depart-inc-10th-anniversary |
| Ten Years Away (Studio375) | výročí, scroll komiks, three.js, making-of na Codrops | — | tympanus.net/codrops/2026/07/08/… |
| Buzzvel 5 years | výroční imerzivní příběh | — | awwwards.com/sites/buzzvel-5-years |
| Trionn | **technická reference:** koordinace GSAP + Three.js + Lenis + Web Audio | — | tympanus.net/codrops/2026/07/15/… |
| Aurel's Grand Theater | making-of od návrhu po kód | — | tympanus.net/codrops/2025/05/20/… |
| Readymag Websites of the Year 2025 | impact report jako scrollytelling (data + dopad) | Readymag WOTY 2025 | blog.readymag.com/websites-of-the-year-2025 |

Přehledové zdroje k projití (sekundární, jejich tvrzení neověřena):
- utsubo.com „Best Three.js websites 2026“ a „Immersive storytelling guide“,
- hontran.dev „Best award-winning websites 2026“,
- psychoactive.co.nz (agentury).

Statistiku „61 % SOTD Q1 2026 jsou imerzivní 3D“ (digitalstrategyforce.com) nepoužívat. Má jediný neověřený zdroj.

## Technické oblasti (18) — kde začít

Řada už existuje v `docs/era40-ai/technical/` a `tutorials/implementation-notes/`. Chybí hlavně:
- DOM ↔ WebGL synchronizace ve stylu Trionn,
- displacement / maskování v GLSL,
- organický morphing,
- infinite scroll systémy,
- 3D typografie,
- page transitions s Next 16 (`ViewTransition`),
- context loss a fallbacky,
- mobilní WebGL rozpočet,
- 3D asset pipeline (GLB, Draco, KTX2).

Každá poznámka obsahuje: co / kdy / jak / knihovny / implementace / limity / odkaz / licence ukázky.

## Další krok

1. Projít kandidáty v prohlížeči a zapsat ověřené.
2. Doplnit na ≥ 20 se zaměřením na motiv „pokračování“ a na datový dopad.
3. Navrhnout `CREATIVE_DIRECTIONS.md` (3 směry, každý s motivem nekonečného pokračování, hero, kapitolami, přechody, WebGL konceptem a mobilní podobou).
4. **Stop, výběr na Jakubovi.**
