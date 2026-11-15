# 012 — Tři homepage kompozice (KROK 3, VISUAL-GAPS §3)

Stav:
- **3.3 hotovo** (15. 11. 2026, Claude). Jde o rozvržení bez nové animace, schválené Jakubovým stálým pokynem „rozhoduj sám podle koordinace“.
- **3.1 SCHVÁLENO** Jakubem 15. 11. 2026 v Claudově sezení („Yes, do 3.1“). Implementace odložena za audit Interactive Assets v1 (stejný přechod 03 → 04).
- **3.2 blokováno** (fotky od Jakuba).

## 3.3 Střídavé kompozice spreadu v kapitole 04 (desktop ≥ 1024 px)
- Spready se střídají ve třech rozvrženích (`data-layout` podle `i % 3`):
  - **photo-left:** fotka 1.08fr, text 1fr, svisle na střed,
  - **photo-right:** zrcadlově,
  - **plate:** široká nižší fotka 1.55fr (`clamp(280px, 50svh, 560px)`) zarovnaná nahoru, text 1fr na účaří. Jako štítek v katalogu.
- Plocha kapitoly, pin railu, Trasa, stanice i štítek „Ilustrační snímek“ se nemění (bod 22, spec 009).
- Mobil < 1024 px: jeden sloupec, swipe pás bez pinu, `plate` má 380 px jako ostatní.
- Reduced motion: statický svislý sled, bez vodorovného posunu.
- Citát je na `--fs-lead` / 400 (O4).

## 3.1 Vstup do Příběhů — návrh
- **Desktop:** řada oken s 8 fotkami. První okno (Tereza) se scrubem roztáhne na spread a rail naváže. Pin zůstane v rámci dnešních ≤ 250 vh. Přechod 03 → 04 tak nebude tvrdý střih.
- **Mobil:** swipe pás, bez pinu.
- **Reduced:** statická řada a pod ní spready.
- **Technika:** Flip z okna na `.photo` prvního spreadu (`data-flip-id` existuje), jedna ScrollTrigger timeline přes `useScene`.
- **Riziko:** handoff 03 → 04 ze spec 008 (`qa-handoffs`). Musí projít 6/6.
- **Postup:** izolovaný prototyp → vizuální revize → schválení → produkce.
