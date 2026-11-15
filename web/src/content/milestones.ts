const infographic = {
  label: "Infografika DZS (PDF)",
  url: "https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf",
};
const anniversary = {
  label: "DZS o\u00a0historii Erasmu (PDF)",
  url: "https://www.dzs.cz/sites/default/files/press_release/2022-10/Erasmus%2B%20slav%C3%AD%2035.%20narozeniny.pdf",
};

interface TimelineMilestone {
  year: number;
  endYear?: number;
  line: "eu" | "cz";
  title: string;
  text: string;
  status: "verified" | "proposal";
  source: typeof infographic;
  mediaId: string;
}

export const milestones: TimelineMilestone[] = [
  {
    year: 1987,
    line: "eu",
    title: "Začíná Erasmus",
    text: "Na zahraniční pobyt mohou poprvé vyjet vysokoškoláci s\u00a0programem Erasmus. Na začátku se zapojuje jedenáct evropských zemí.",
    source: anniversary,
    mediaId: "ph-diary",
    status: "verified",
  },
  {
    year: 1998,
    line: "cz",
    title: "Česko se připojuje",
    text: "Česko se zapojuje do evropských vzdělávacích programů včetně Erasmu. První čeští studenti vyjíždějí v\u00a0akademickém roce 1998/1999. Do vstupu země do Evropské unie zbývá šest let.",
    source: infographic,
    mediaId: "ph-map-pins",
    status: "verified",
  },
  {
    year: 2004,
    line: "cz",
    title: "Vstup do Evropské unie",
    text: "Česko se stává členem Evropské unie. Studenti z\u00a0českých vysokých škol už mají za sebou první roky zahraničních pobytů.",
    source: infographic,
    mediaId: "ph-scrapbook",
    status: "verified",
  },
  {
    year: 2007,
    line: "eu",
    title: "Celoživotní učení",
    text: "Erasmus se stává součástí evropského Programu celoživotního učení. Vedle něj v\u00a0programu působí také Comenius, Leonardo da Vinci a\u00a0Grundtvig.",
    source: infographic,
    mediaId: "ph-dorm",
    status: "verified",
  },
  {
    year: 2014,
    line: "eu",
    title: "Vzniká Erasmus+",
    text: "Erasmus+ spojuje dosavadní vzdělávací programy. Vedle vysokoškoláků se mohou zapojit také školy, učni, pracovníci s\u00a0mládeží nebo sportovní organizace.",
    source: anniversary,
    mediaId: "ph-group",
    status: "verified",
  },
  {
    year: 2021,
    endYear: 2027,
    line: "eu",
    title: "Nové období Erasmu+",
    text: "Na sedmileté období od roku 2021 do roku 2027 má evropský program rozpočet 26,2 miliardy eur.",
    source: anniversary,
    mediaId: "ph-lisbon-tram",
    status: "verified",
  },
  {
    year: 2027,
    line: "eu",
    title: "Čtyřicet let Erasmu",
    text: "Od vzniku evropského programu uplyne čtyřicet let. České zapojení má v\u00a0témže roce za sebou dvacet devět let.",
    source: infographic,
    mediaId: "ph-library",
    status: "verified",
  },
];
