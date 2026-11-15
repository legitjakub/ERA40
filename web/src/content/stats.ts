import type { Stat } from "./types";

export const participationSource = {
  label: "DZS, 20 let vzdělávání se s EU (PDF)",
  url: "https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf",
};

export const participationPeriod = "Výzvy 1998–2023, stav k 31. 12. 2023.";

export const stats: Stat[] = [
  {
    id: "outgoing-cz",
    label: "vyjelo z Česka",
    value: 411400,
    period: participationPeriod,
    status: "verified",
    checkedAt: "2026-11-13",
    sources: [participationSource],
  },
  {
    id: "incoming-cz",
    label: "přijelo do Česka",
    value: 450000,
    prefix: "Přibližně",
    period: "Od roku 1998 do 31. 12. 2023.",
    status: "verified",
    checkedAt: "2026-11-13",
    sources: [participationSource],
  },
  {
    id: "satisfaction",
    label: "výjezd přispěl ke spokojenosti",
    value: 86,
    suffix: " %",
    period:
      "Podle účastníků výjezd přispěl k jejich spokojenosti se životem. Šetření DZS a STEM/MARK, 2022.",
    status: "verified",
    checkedAt: "2026-11-13",
    sources: [participationSource],
  },
  {
    id: "budget-2026",
    label: "rozpočet pro Česko",
    value: 103,
    prefix: "Téměř",
    suffix: " mil. €",
    period: "Výzva pro rok 2026.",
    status: "verified",
    checkedAt: "2026-11-13",
    sources: [
      {
        label: "DZS, rozpočet výzvy 2026 (PDF)",
        url: "https://www.dzs.cz/sites/default/files/press_release/2025-11/TZ_V%C3%BDzva_Rozpo%C4%8Det_Erasmus_26_DZS.pdf",
      },
    ],
  },
];

export const sectorBreakdown = [
  { id: "he", label: "Vysoké školy", value: 178700 },
  { id: "youth", label: "Neformální vzdělávání mládeže", value: 111000 },
  { id: "vet", label: "Odborné vzdělávání", value: 68900 },
  { id: "school", label: "Školní vzdělávání", value: 43800 },
  { id: "adult", label: "Vzdělávání dospělých", value: 9000 },
];
