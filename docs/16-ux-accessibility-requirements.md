# UX & Accessibility Requirements — ERA40

**Úroveň:** závazné požadavky pro budoucí vývoj  
**Související:** `docs/13`, `docs/15`

---

## 1. Scroll filozofie

1. **Přirozený scroll je default.** Kolečko/touch posouvá stránku; animace *reagují*, ne *přebírají*.  
2. **Zákaz agresivního scroll-jackingu.** Zakázáno: full hijack `wheel` → vlastní virtual scroll jako jediná cesta.  
3. **Pin ano, s mírou.** Pin musí mít konec, `pinSpacing`, a obsah musí zůstat čitelný při rychlém scrollu.  
4. **Scrub ano.** ScrollTrigger scrub je OK — stále jde o native scroll pozici.  
5. **Lenis** jen jako progressive enhancement; vypnout při reduced-motion, low-end, nebo user toggle.

### Test acceptance
- Uživatel s trackpadem dokáže rychle „přeskočit“ sekci bez uvíznutí.  
- Focus keyboardem není uvězněn v pin scéně.

---

## 2. Mobile art direction (odděleně)

Desktop choreografie **nesmí** být jen zmenšená.

| Oblast | Desktop | Mobile |
| --- | --- | --- |
| Hero | full-bleed + parallax jemný | stacked image/text, no parallax |
| People | optional horizontal pin | vertical chapters / snap |
| Map | SVG interactive (+ optional 3D) | SVG + select list |
| Then&Now | side-by-side / slider | stacked + range |
| Typography | velké citáty | citáty max 1.6 rem méně než desktop scale |
| Motion length | delší pin OK | pin ≤ ~1.2× vh |

Touch: gesture konflikty (horizontal swipe vs browser back) — carousely s `touch-action` pečlivě.

---

## 3. WCAG considerations (cíl AA)

### Perceivable
- Kontrast textu ≥ 4.5:1 (běžný), ≥ 3:1 large.  
- Text na fotce vždy se scrimem.  
- Ne předávat informaci jen barvou (UNVERIFIED / fiction = text label).  
- Alt u všech obsahových obrazů; dekorace `alt=""`.  
- ILLUSTRATIVE asset: alt začíná „Ilustrativní…“.

### Operable
- Všechny ovladače klávesnicí.  
- Visible focus.  
- Skip link.  
- Žádný obsah neschovaný jen v hover.  
- Časované animace nepředávají unikátní info bez textové varianty.  
- Touch target ≥ 44×44 px.

### Understandable
- Jazyk `lang="cs"`.  
- Jasné labels Then/Now, zdroje čísel.  
- Chybové stavy formuláře (pokud „sdílej příběh“) srozumitelně česky.

### Robust
- Semantické HTML.  
- ARIA jen když nutné.  
- Map panely `role="dialog"` nebo inline region s `aria-live` opatrně (ne spam).

---

## 4. Reduced motion

Při `prefers-reduced-motion: reduce`:
- Vypnout scrub/pin/parallax/particles/WebGL.  
- Zachovat stejný obsah a pořadí sekcí.  
- Count-up → okamžitá finální hodnota.  
- Autoplay video/Lottie → poster.

Poskytnout i **in-page toggle** „Zjednodušený pohyb“ (user preference > OS pokud zapnuto).

---

## 5. Cognitive & content UX

- Jedna úloha na sekci.  
- Hero bez stats clutter.  
- Footnote u každého čísla.  
- Fictional content vždy badge.  
- Nepoužívat „20 let“ jako hlavní claim pro 2027.

---

## 6. Media & vestibular

- Žádné velké flashing.  
- Parallax limity (docs/13).  
- Pause/stop pro looping motion.  
- Respektovat `Save-Data` / low battery pokud detekovatelné (best effort).

---

## 7. Localization & language

- Primární CZ.  
- EN až po copy review.  
- Cizí citáty: zachovat originál + český překlad.

---

## 8. Privacy (UX)

- Žádné skryté trackery v této dokumentační fázi.  
- Až produkce: cookie consent jen pokud reálně potřeba; preference privacy-first.

---

## 9. Acceptance checklist (před launch — budoucí)

- [ ] Keyboard only projde celý web  
- [ ] Screen reader: nadpisy sekcí dávají smysl  
- [ ] Reduced motion = čitelný editorial  
- [ ] Mobil 375×812: žádný horizontal overflow  
- [ ] Lighthouse Accessibility ≥ 90 (cíl 95+)  
- [ ] Všechna čísla mají zdroj nebo UNVERIFIED  
- [ ] Všechny fictious stories mají badge
