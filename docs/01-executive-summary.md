# Executive summary — ERA40

**Projekt (pracovní):** ERASMUS V ČESKU — PŘÍBĚHY, KTERÉ PŘEKRAČUJÍ HRANICE.  
**Fáze:** documentation only (žádný production web, žádný deploy)  
**Jazyk:** čeština primárně

---

## Anniversary — závěr (ověřeno)

Česká republika se do evropských vzdělávacích programů (včetně Erasmu) zapojila v **roce 1998**; první čeští studenti vyjeli v akademickém roce **1998/1999**.  

V roce **2027** to odpovídá zhruba **29 letům** od zapojení — **ne** „20 letům Erasmu v Česku“. Rámec „20 let Erasmu v CZ“ byl smysluplný přibližně v **2018/2019**.  

**Nesměšovat** s výročím **20 let členství v EU** (vstup **1. 5. 2004** → kulaté 20 v roce 2024). DZS komunikace typu „20 let vzdělávání se s EU“ se váže k EU členství, ne k prvnímu Erasmu 1998.

**Komunikační doporučení:** držet příběhový pracovní název; numerické výročí („~30 let“) jen po stakeholder rozhodnutí a s přesným wordingem.

---

## Kreativní doporučení

| Položka | Hodnota |
| --- | --- |
| **Směr** | **A — Human Stories** |
| **Skóre** | **8.73 / 10** |
| Runner-up hybrid | C (7.58) timeline + B mapa jako modul |
| D Letter Home | volitelný tone, ne master |

A vyhrává, protože brief je o **příbězích překračujících hranice**, ne o tech demu sítě (B) ani čistě pedagogické ose (C).

Detail: `docs/11`, evaluace `docs/17`, finále `docs/18`.

---

## Tech doporučení

**Next.js + React + TypeScript + GSAP/ScrollTrigger + SVG-first + optional Lenis + optional R3F (1–2 scény).**  

GSAP řídí scroll choreografii; Three.js jen vybrané key scenes. Natural scroll, mobile art direction odděleně, WCAG AA.  

Detail: `docs/14`, handoff `docs/15`, UX `docs/16`.

---

## Co je hotové

- `docs/01`–`docs/19` — research, content, creative směry, tech handoff, open questions  
- Reference trinity (live): Tracing Art · Inkwell/Persepolis · Paper Planes + 100 Lost Species → `docs/04`  
- `prompts/future-ai-coding-agent-master-prompt.md` — **DO NOT start development now**  
- `assets/ref-*.png` + `assets/moodboards/` — live screenshots + ILLUSTRATIVE tiles  
- `research/raw-notes-erasmus-czechia.md` — fact-check podklady  

---

## Další krok

1. Stakeholder schválí směr A (nebo přehlasuje).  
2. Získat reálné příběhy + rights.  
3. Fact lock / aktualizace čísel po 31.12.2023 dle potřeby.  
4. Teprve poté použít master prompt pro coding agenta.
