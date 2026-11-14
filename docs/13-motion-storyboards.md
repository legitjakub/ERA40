# Motion storyboardy — ERA40

**Pravidlo:** přirozený scroll; pinned scény ano, agresivní scroll-jacking ne.  
**Preferovaný engine:** GSAP + ScrollTrigger. Three.js jen vybrané scény (mapa / future).  
**Reduced motion:** viz `docs/16` — všechny scény mají statickou alternativu.

Každá scéna: **10 scroll-state bullets** + **mobile alt**.

---

# SMĚR A — Human Stories

## A1 Hero
1. 0–8 %: full-bleed portrét fade-in z 0.85 opacity + jemný scale 1.04→1.0  
2. 8–18 %: pracovní název letter-reveal (serif), scrim zespodu  
3. 18–28 %: podnadpis fade; CTA opacity 0→1  
4. 28–40 %: parallax portrét −6 % Y (max)  
5. 40–50 %: scroll hint (štíhlá linka) pulse 1×  
6. 50–62 %: hero text sticky, portrét začíná desaturaci −10 %  
7. 62–75 %: CTA odchází nahoru; objevuje se první jméno příběhu  
8. 75–85 %: crossfade na druhý portrét (preview strip)  
9. 85–94 %: hero unpin; přechod do People peeks  
10. 94–100 %: kompletní exit; residual blur 0  

**Mobile alt:** bez parallax scale; stack: image 55vh → title → CTA; crossfade vypnutý, jen fade.

## A2 History
1. Intro label „Jak to začalo“ fade  
2. Timeline osa draw zleva (SVG stroke)  
3. Uzel 1987 (program EU) — opacity + soft tick *(evropský kontext, ne CZ claim)*  
4. Uzel 1998 (ČR zapojení) — highlight teal, krátký hold  
5. Uzel AY 1998/1999 — první studenti; tooltip text  
6. Uzel 2004 (EU členství) — vizuálně oddělený, caption „nesměšovat s Erasmus CZ výročí“  
7. Uzel 2014 / Erasmus+ — fade-in  
8. Uzel 2021–2027 — současné období  
9. Horizontal scrub dalších milníků (pinned)  
10. Unpin + fade do People  

**Mobile alt:** vertikální timeline, žádný horizontal pin; accordion detail.

## A3 People
1. Sekční headline + 1 věta  
2. První portrét pin; citát fade  
3. Jméno / město / rok metadata slide  
4. Scroll: citát sticky, foto pomalý Ken Burns 1.0→1.06  
5. Transition wipe na příběh 2  
6. Příběh 2 stejný rytmus  
7. Horizontal strip dalších karet (desktop)  
8. Hover/focus: jemné lift 2px + underline  
9. Label **MODEL STORY – FICTIONAL PLACEHOLDER** pokud fictious  
10. Exit do mapy (tečka „odkud/kam“)  

**Mobile alt:** vertikální full-bleed kapitoly; horizontal strip → swipe carousel s snap, bez pin > 1 viewport.

## A4 Europe Map
1. Fade map outline Evropy (SVG)  
2. Node Praha pulse  
3. Draw 3–5 illustrative tras (ne tvrdit přesná %)  
4. Labels měst fade (max 8 najednou)  
5. Click/focus města = panel s lidmi (pokud data)  
6. Jemný camera pan SVG viewBox  
7. Densify nodes (illustrative density, ne falešná statistika)  
8. Toggle Odchozí / Příchozí (stav UI)  
9. Reduced: static map image  
10. Morph do Then&Now  

**Mobile alt:** statická mapa + select města; žádný pan; Three.js vypnuto.

## A5 Then & Now
1. Split intro „Tehdy / Teď“  
2. Levá archivní fotka fade  
3. Pravá současná fotka fade  
4. Slider handle objeví (keyboard accessible)  
5. Scrub compare  
6. Caption 1998/1999 vs současnost (bez falešných stats)  
7. Citát účastníka overlay  
8. Merge split → full now  
9. Bridge text k Numbers  
10. Exit  

**Mobile alt:** stacked then→now; slider jako `<input type="range">` full width.

## A6 Numbers
1. Headline „Co víme (ověřeno)“  
2. Counter 411 400 (odchozí CZ, DZS k 31.12.2023) — count-up při vstupu  
3. Counter ~450 000 příchozí — s vlnovkou / „kolem“  
4. Budget 32,6 → 89,8 mil. € (2014→2024) — bar draw  
5. Source footnote fade  
6. UNVERIFIED blok odděleně (šedý)  
7. Žádné fake awards  
8. Micro-interaction: number hold  
9. CTA „Zdroje“  
10. Fade to Future  

**Mobile alt:** stejné counters, kratší duration; bars full width.

## A7 Future
1. Quiet field (paper)  
2. Otázka / výzva typograficky  
3. Abstract lines (CSS/SVG), ne heavy 3D  
4. Optional light R3F particles **pouze desktop + !reduced**  
5. Form / odkaz „Sdílej svůj příběh“ (placeholder)  
6. Credits  
7. Back to top  
8. Footer legal  
9. Language note (CZ primary)  
10. End state static  

**Mobile alt:** žádné particles; čistá typografie + CTA.

---

# SMĚR B — Europe in Motion

## B1 Hero
1. Navy field  
2. Network nodes spawn (stagger)  
3. Paths draw Praha ↔ uzly  
4. Title kinetic slide from Y 40  
5. Subline mono fade  
6. Camera dolly-in (SVG/WebGL)  
7. Amber spark pulse na CZ node  
8. CTA appear  
9. Paths accelerate opacity flicker (subtle)  
10. Morph network → History spine  

**Mobile alt:** pre-rendered video/Lottie loop 4s max + static title; no dolly.

## B2 History
1. Spine line vertical→horizontal  
2. Years as kilometer markers  
3. 1987 tick  
4. 1998 CZ join — route unlock animation  
5. 1998/1999 first travelers icons  
6. 2004 EU — side annotation (separate track)  
7. 2014 Erasmus+  
8. 2021–27  
9. Speed lines wipe  
10. Into People as „passengers“  

**Mobile alt:** years list + progress bar.

## B3 People
1. People as avatars on routes  
2. Focus one traveler path highlight  
3. Quote dock bottom  
4. Swap traveler  
5. Trail residual  
6. Photo expand from node  
7. Collapse  
8. Multi-select max 3 paths  
9. Fiction label if needed  
10. Exit to full map  

**Mobile alt:** list travelers; map miniature.

## B4 Europe Map *(Three.js candidate)*
1. Load low-poly / flat plane map  
2. Lights on  
3. Routes tube/line  
4. Orbit limited 15°  
5. Select country  
6. Stats panel (ověřené only)  
7. Filter mobility type  
8. Performance: pause offscreen  
9. Fallback SVG if GPU weak  
10. Transition density → Then&Now  

**Mobile alt:** SVG only; no WebGL default.

## B5 Then & Now
1. Sparse network (then)  
2. Crossfade denser (now)  
3. Overlay diff color  
4. Toggle  
5. Caption  
6. Hold  
7. Numbers peek  
8. Merge  
9. Route to Numbers  
10. Exit  

**Mobile alt:** two static images + toggle button.

## B6 Numbers
1. Numbers along a route  
2. Count-up at stations  
3. 411 400 station  
4. 450k station  
5. Budget elevation graph  
6. Footnotes  
7. UNVERIFIED siding  
8. Continue  
9. Brake  
10. Future tunnel  

**Mobile alt:** vertical stations list.

## B7 Future
1. New dashed routes appear  
2. Question typography  
3. Soft particle drift (optional)  
4. CTA  
5. Reduce intensity  
6. Credits  
7. Legal  
8. Static end  
9. Prefers-reduced: no particles  
10. Done  

**Mobile alt:** dashed SVG + text.

---

# SMĚR C — Then / Now / Next

## C1 Hero
1. Archive image left 50 %  
2. Now image right 50 %  
3. Diagonal wipe idle  
4. Title center fade  
5. Subline  
6. Scrub-linked wipe with scroll  
7. CTA  
8. Labels TEHDY / TEĎ  
9. Compress to timeline bar  
10. Enter History  

**Mobile alt:** then full → swipe to now; no diagonal.

## C2 History
1. Decade chapters  
2. Pin chapter 1990s  
3. 1998 detail card  
4. 1998/1999 students  
5. 2000s  
6. 2004 EU callout (separate)  
7. 2010s Erasmus+  
8. 2020s  
9. Overview zoom out  
10. To People  

**Mobile alt:** accordion decades.

## C3 People
1. „Hlas Then“ archival quote  
2. „Hlas Now“ contemporary  
3. Pair compare  
4. Portrait swap  
5. Meta years  
6. Fiction labels  
7. Gallery  
8. Focus mode  
9. Bridge  
10. Map  

**Mobile alt:** tabs Then/Now.

## C4 Europe Map
1. Map Then (few nodes)  
2. Map Now (more)  
3. Crossfade maps  
4. Legend  
5. Select  
6. Panel  
7. Annotation 1998 start  
8. No fake %  
9. Fallback  
10. To Then&Now deep  

**Mobile alt:** segmented control Then/Now maps.

## C5 Then & Now
1. Big compare module  
2. Image A  
3. Image B  
4. Range input  
5. Captions  
6. Fact strip (verified only)  
7. Quote  
8. Hold  
9. Next tease  
10. Numbers  

**Mobile alt:** stacked + range.

## C6 Numbers
1. Then baseline numbers (if verified; else hide)  
2. Now numbers DZS 2024  
3. Bars grow  
4. Footnote  
5. UNVERIFIED box  
6. No awards  
7. Source links  
8. Pause  
9. Future CTA  
10. Exit  

**Mobile alt:** same, simpler bars.

## C7 Future (Next)
1. Empty paper  
2. „Next“ label  
3. Speculative shapes (outline)  
4. Prompt question  
5. Optional soft 3D (desktop)  
6. Contribute CTA  
7. Credits  
8. Legal  
9. Reduced static  
10. End  

**Mobile alt:** typography only.

---

## Společné implementační poznámky

| Téma | Pravidlo |
| --- | --- |
| Pin duration | max ~200–300 % viewport výšky na scénu; ne nekonečné držení |
| Scroll jacking | zakázáno (žádné hijack wheel → custom timeline exclusive) |
| Lenis | volitelný smooth; vypnout na `prefers-reduced-motion` a low-end |
| Lottie/Rive | micro UI only; ne celé kapitoly |
| Video | poster + play; autoplay jen muted loop ≤5s hero fallback |
| Copy | CZ primary; fakta jen ověřená / UNVERIFIED |
