// "Jaké je tvoje ERA?" — the campaign quiz from the DZS landing-page brief.
// Six ERA types follow the DZS communication concept. Each type has a glyph
// drawn in the Trasa language (solid line = what happened, yellow dot = you,
// dotted line = where it continues), so the card needs no illustrations yet.
// No answers are stored or sent anywhere.

export type EraTypeId =
  | "retez"
  | "propojovac"
  | "menic"
  | "svet"
  | "vecny"
  | "vztah";

export type EraType = {
  id: EraTypeId;
  name: string;
  line: string;
  body: string;
  /** Wording for people who never went ("Na Erasmu: 0 dní"), where the default assumes a stay abroad. */
  zero?: { line: string; body: string };
  /** Glyph in a 200 × 200 box: solid strokes, dotted continuation and the "you" dot. */
  glyph: { solid: string[]; dotted?: string; dot: [number, number] };
};

export const eraTypes: Record<EraTypeId, EraType> = {
  retez: {
    id: "retez",
    name: "Řetězová reakce",
    line: "Tvá zkušenost už dávno není jen tvoje.",
    body: "Zkušenost z cesty dnes předáváš dál: studentům, kolegům, týmu. Většina z nich ani neví, kde to začalo. Funguje to i tak.",
    zero: {
      line: "Dostalo se to k tobě. A jde to dál.",
      body: "Bez jediného dne v zahraničí dnes učíš, vedeš nebo vaříš jinak. Teď to posíláš dalším. Takhle se Erasmus šíří nejdál.",
    },
    glyph: {
      solid: [
        "M18 100 H84",
        "M84 100 C112 100 116 54 146 54 H160",
        "M84 100 H160",
        "M84 100 C112 100 116 146 146 146 H160",
      ],
      dotted: "M160 54 H188 M160 100 H188 M160 146 H188",
      dot: [84, 100],
    },
  },
  propojovac: {
    id: "propojovac",
    name: "Propojovač",
    line: "Lidé se díky tobě potkávají.",
    body: "Máš kontakt skoro do každého evropského města a ochotně ho půjčíš. Když se dva cizí lidé domluví, často za tím stojíš ty.",
    glyph: {
      solid: [
        "M18 56 C70 56 130 144 160 144",
        "M18 144 C70 144 130 56 160 56",
      ],
      dotted: "M160 56 H188 M160 144 H188",
      dot: [89, 100],
    },
  },
  menic: {
    id: "menic",
    name: "Měnič směru",
    line: "Jedna cesta a jiná mapa celého života.",
    body: "Na cestu jeden plán, domů jiný. Obor, práce nebo město: něco se tehdy otočilo a drží to dodnes.",
    zero: {
      line: "Cizí nápad, tvůj nový směr.",
      body: "Někdo přivezl jiný způsob práce a dnes je tvůj. Obor, tým nebo plán: změna začala o kus dál, ale pokračuje u tebe.",
    },
    glyph: {
      solid: ["M18 150 H78 C112 150 112 50 146 50 H160"],
      dotted: "M160 50 H188",
      dot: [95, 100],
    },
  },
  svet: {
    id: "svet",
    name: "Svět doma",
    line: "Evropa sedí u tvého stolu.",
    body: "Recept odněkud z Evropy, slovo, které nejde přeložit, host z ciziny na gauči. Doma máš kus světa a nikdo už si nevzpomene, odkud přišel.",
    glyph: {
      solid: ["M188 100 H140", "M140 100 A40 40 0 1 1 140 99.9"],
      dot: [100, 100],
    },
  },
  vecny: {
    id: "vecny",
    name: "Věčný Erasmák",
    line: "Návrat nebyl tečka.",
    body: "Z neznámého místa máš radost, ne obavy. Pořád zkoušíš nové věci a o další cestě už víš dřív, než ji naplánuješ.",
    zero: {
      line: "Tvoje první cesta už se chystá.",
      body: "K Erasmu tě zatím přivedli druzí. Zvědavost ale máš a ze zkoušení nových věcí radost. Další kapitola tohohle příběhu může být tvoje.",
    },
    glyph: {
      solid: ["M18 134 C62 134 78 72 120 72"],
      dotted: "M120 72 C150 72 160 72 190 72",
      dot: [120, 72],
    },
  },
  vztah: {
    id: "vztah",
    name: "Vztah na dobu neurčitou",
    line: "Pobyt skončil. Přátelství ne.",
    body: "Z lidí, které jsi tehdy potkal(a), jsou dnes kmotři, svědci na svatbě nebo zpráva každé ráno. Vzdálenost to zatím nezkazila.",
    zero: {
      line: "Přátelé napříč Evropou. I bez výjezdu.",
      body: "Z výměny, kterou zažil někdo jiný, máš kamarády, rodinu nebo partnera. Erasmus ti přivezl lidi, bez kterých si to dnes neumíš představit.",
    },
    glyph: {
      solid: [
        "M18 52 C64 52 80 92 124 92 H160",
        "M18 148 C64 148 80 108 124 108 H160",
      ],
      dotted: "M160 92 H188 M160 108 H188",
      dot: [124, 100],
    },
  },
};

/** The type's line and body for the path the reader chose. */
export function eraCopy(type: EraType, path: EraPath) {
  return path === "nevyjel" && type.zero ? type.zero : { line: type.line, body: type.body };
}

export type EraAnswer = { label: string; types: EraTypeId[] };
export type EraQuestion = { id: string; text: string; answers: EraAnswer[] };
export type EraPath = "vyjel" | "nevyjel";

const doing: EraQuestion = {
  id: "jinak",
  text: "Co děláš díky tomu jinak?",
  answers: [
    { label: "Seznamuju lidi, kteří by se jinak nepotkali", types: ["propojovac"] },
    { label: "Učím nebo radím dalším, jak na to", types: ["retez"] },
    { label: "Doma vařím, mluvím a slavím trochu evropsky", types: ["svet"] },
    { label: "Říkám ano i věcem, které neznám", types: ["vecny"] },
  ],
};

const reach: EraQuestion = {
  id: "kam",
  text: "Kam až se to dostalo?",
  answers: [
    { label: "Do celé školy, firmy nebo týmu", types: ["retez"] },
    { label: "Do mé práce a kariéry", types: ["menic"] },
    { label: "Do jiné země, kde mám druhý domov", types: ["propojovac", "vztah"] },
    { label: "Ještě nevím. Pořád to pokračuje.", types: ["vecny"] },
  ],
};

export const eraQuestions: Record<EraPath, EraQuestion[]> = {
  vyjel: [
    {
      id: "dodnes",
      text: "Co z tvého Erasmu žije dodnes?",
      answers: [
        { label: "Lidé, se kterými si pořád píšu", types: ["vztah"] },
        { label: "Jiný pohled na to, jak se dá něco dělat", types: ["retez", "menic"] },
        { label: "Chuť zkoušet nové věci", types: ["vecny"] },
        { label: "Recepty, jazyk a zvyky, které doma používám", types: ["svet"] },
      ],
    },
    {
      id: "zmena",
      text: "Co ti to změnilo?",
      answers: [
        { label: "Směr studia nebo práce", types: ["menic"] },
        { label: "Jak učím, vedu nebo pracuju s lidmi", types: ["retez"] },
        { label: "Okruh přátel napříč Evropou", types: ["vztah"] },
        { label: "Jak se cítím v neznámém prostředí", types: ["vecny", "svet"] },
      ],
    },
    doing,
    {
      id: "komu",
      text: "Komu se to dostalo dál?",
      answers: [
        { label: "Studentům, kolegům nebo týmu", types: ["retez"] },
        { label: "Rodině a dětem", types: ["svet", "vztah"] },
        { label: "Kamarádům, kteří pak taky vyjeli", types: ["propojovac", "vecny"] },
        { label: "Hlavně mně. Dnes dělám něco úplně jiného.", types: ["menic"] },
      ],
    },
    reach,
  ],
  nevyjel: [
    {
      id: "pres",
      text: "Přes koho se to k tobě dostalo?",
      answers: [
        { label: "Přes učitelku nebo učitele", types: ["retez"] },
        { label: "Přes kamaráda nebo spolubydlícího ze zahraničí", types: ["propojovac"] },
        { label: "Přes rodinu nebo partnera", types: ["svet", "vztah"] },
        { label: "Přes kolegu, který přivezl nápad", types: ["menic"] },
      ],
    },
    {
      id: "co",
      text: "Co se k tobě dostalo?",
      answers: [
        { label: "Nový způsob výuky nebo práce", types: ["retez", "menic"] },
        { label: "Přátelé z jiných zemí", types: ["propojovac", "vztah"] },
        { label: "Jídlo, jazyk nebo zvyk, který doma zůstal", types: ["svet"] },
        { label: "Odvaha zkusit něco nového", types: ["vecny"] },
      ],
    },
    doing,
    {
      id: "dal",
      text: "Komu to posíláš dál?",
      answers: [
        { label: "Svým studentům, žákům nebo dětem", types: ["retez", "svet"] },
        { label: "Kolegům v práci", types: ["menic", "retez"] },
        { label: "Kamarádům a blízkým", types: ["vztah", "propojovac"] },
        { label: "Zatím sobě. Chystám se vyjet.", types: ["vecny"] },
      ],
    },
    reach,
  ],
};

// Fallback order for exact ties.
const order: EraTypeId[] = ["vztah", "propojovac", "svet", "menic", "vecny", "retez"];

/**
 * Each answer adds points to its types. A type that appears in fewer answers
 * of the chosen path earns more per pick, so all six results stay comparably
 * likely. Ties go to the type picked most recently, then a fixed order.
 */
export function scoreEra(answers: EraAnswer[], path: EraPath): EraTypeId {
  const offered = new Map<EraTypeId, number>(order.map((id) => [id, 0]));
  eraQuestions[path].forEach((question) =>
    question.answers.forEach((answer) =>
      answer.types.forEach((id) => offered.set(id, (offered.get(id) ?? 0) + 1)),
    ),
  );
  const score = new Map<EraTypeId, number>(order.map((id) => [id, 0]));
  const last = new Map<EraTypeId, number>();
  answers.forEach((answer, i) =>
    answer.types.forEach((id) => {
      score.set(id, (score.get(id) ?? 0) + 1 / Math.max(1, offered.get(id) ?? 1));
      last.set(id, i);
    }),
  );
  const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;
  return [...order].sort((a, b) => {
    const sa = score.get(a) ?? 0;
    const sb = score.get(b) ?? 0;
    if (!close(sa, sb)) return sb - sa;
    return (last.get(b) ?? -1) - (last.get(a) ?? -1) || order.indexOf(a) - order.indexOf(b);
  })[0];
}
