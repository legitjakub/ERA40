import type { Story } from "./types";
import media from "./media-images.json";

/*
 * Model stories, used until real stories are added.
 * Replace with participant stories only after verifying rights and consent.
 * Model stories must render the visible label "MODELOVÝ PŘÍBĚH – ilustrační".
 */
const models = [
  {
    id: "valencie",
    status: "model-story",
    name: "Tereza",
    from: "Olomouc",
    to: "Valencie",
    toCountry: "Španělsko",
    coords: { from: [17.25, 49.59], to: [-0.38, 39.47] },
    mobility: "Studijní pobyt, vysoká škola",
    year: "2019",
    quote: "Poprvé jsem musela říct nahlas, co si myslím, a v cizím jazyce.",
    excerpt:
      "Semestr architektury ve Valencii. Ateliér, kde se kritizuje otevřeně, a kuchyně na koleji, kde se vařilo v pěti jazycích.",
    mediaId: "ph-train-window-woman",
  },
  {
    id: "lipsko",
    status: "model-story",
    name: "Ondřej",
    from: "Brno",
    to: "Lipsko",
    toCountry: "Německo",
    coords: { from: [16.61, 49.2], to: [12.37, 51.34] },
    mobility: "Pracovní stáž",
    year: "2022",
    quote: "Za tři měsíce jsem se naučil víc němčiny než za šest let ve škole.",
    excerpt:
      "Stáž v projekční kanceláři. Ranní vlak, porady v němčině a první pracovní reference ze zahraničí.",
    mediaId: "ph-backpack-station",
  },
  {
    id: "praha-in",
    status: "model-story",
    name: "Inês",
    from: "Lisabon",
    to: "Praha",
    toCountry: "Česko",
    coords: { from: [-9.14, 38.72], to: [14.42, 50.08] },
    mobility: "Studijní pobyt v Česku",
    year: "2023",
    quote: "Praha pro mě nebyla zastávka. Stala se z ní adresa.",
    excerpt:
      "Přijela na jeden semestr a zůstala na magisterské studium. Dnes provází nové zahraniční studenty.",
    mediaId: "ph-prague-street",
  },
  {
    id: "porto-sos",
    status: "model-story",
    name: "Jakub",
    from: "Zlín",
    to: "Porto",
    toCountry: "Portugalsko",
    coords: { from: [17.67, 49.23], to: [-8.61, 41.15] },
    mobility: "Praxe žáka střední odborné školy",
    year: "2024",
    quote: "Mistr v dílně mluvil rukama. Rozuměli jsme si od prvního dne.",
    excerpt:
      "Tři týdny praxe v portugalské dílně. Poprvé letěl letadlem a poprvé pracoval na zakázce pro skutečného zákazníka.",
    mediaId: "ph-workshop",
  },
  {
    id: "ucitelka",
    status: "model-story",
    name: "Mgr. Jana",
    from: "Tábor",
    to: "Tampere",
    toCountry: "Finsko",
    coords: { from: [14.66, 49.41], to: [23.76, 61.5] },
    mobility: "Job shadowing, učitelka ZŠ",
    year: "2023",
    quote: "Vrátila jsem se s jedinou otázkou: proč děti u nás tolik sedí?",
    excerpt:
      "Týden ve finské škole změnil její hodiny. Dnes učí venku každý pátek.",
    mediaId: "ph-classroom",
  },
  {
    id: "vymena",
    status: "model-story",
    name: "Adéla",
    from: "Liberec",
    to: "Krakov",
    toCountry: "Polsko",
    coords: { from: [15.06, 50.77], to: [19.94, 50.06] },
    mobility: "Mládežnická výměna",
    year: "2021",
    quote: "Deset dní, šest zemí, jeden společný film.",
    excerpt:
      "Výměna o médiích a dezinformacích. Z workshopu vznikl krátký dokument a skupina, která si píše dodnes.",
    mediaId: "ph-youth",
  },
  {
    id: "kariera",
    status: "model-story",
    name: "Martin",
    from: "Ostrava",
    to: "Lyon",
    toCountry: "Francie",
    coords: { from: [18.26, 49.82], to: [4.84, 45.76] },
    mobility: "Studijní pobyt, vysoká škola",
    year: "2008",
    quote: "Na pohovoru se mě nikdo neptal na známky. Ptali se na Lyon.",
    excerpt:
      "Erasmus v roce 2008, dnes vede mezinárodní tým. Říká, že nejdůležitější dovednost získal v čekárně francouzského úřadu.",
    mediaId: "ph-library",
  },
  {
    id: "pratelstvi",
    status: "model-story",
    name: "Lucie a Marta",
    from: "Plzeň",
    to: "Bologna",
    toCountry: "Itálie",
    coords: { from: [13.38, 49.75], to: [11.34, 44.49] },
    mobility: "Studijní pobyt, vysoká škola",
    year: "2012",
    quote:
      "Potkaly jsme se ve frontě na kolej. O deset let později jsme si byly za svědkyně.",
    excerpt:
      "Jedna z Plzně, druhá z Valencie. Erasmus v Boloni, přátelství na celý život.",
    mediaId: "ph-friends-evening",
  },
];

const fields = [
  "Architektura",
  "Projektování",
  "Mezinárodní vztahy",
  "Strojírenství",
  "Pedagogika",
  "Mediální gramotnost",
  "Ekonomie",
  "Jazyky a kultura",
];
export const stories: Story[] = models.map((story, i) => ({
  ...story,
  status: "model-story",
  field: fields[i],
  coords: {
    from: story.coords.from as [number, number],
    to: story.coords.to as [number, number],
  },
}));

const photos = new Map(
  media.map((entry) => [entry.id, entry]),
);
export function storyPhoto(story: Story) {
  return (
    photos.get(story.mediaId) ?? {
      file: "/media/ILLUSTRATIVE-campus-study.jpg",
      alt: "Studijní stůl na univerzitě",
    }
  );
}

export function getStory(id: string) {
  return stories.find((story) => story.id === id);
}

/** Groups used by the story archive filters. */
export const storyKinds = [
  { id: "studium", label: "Studium" },
  { id: "praxe", label: "Stáže a praxe" },
  { id: "skoly", label: "Učitelé a školy" },
  { id: "mladez", label: "Mládež" },
] as const;
export type StoryKind = (typeof storyKinds)[number]["id"];

export function storyKind(story: Story): StoryKind {
  const m = story.mobility.toLowerCase();
  if (m.includes("mládež")) return "mladez";
  if (m.includes("stáž") || m.includes("praxe")) return "praxe";
  if (m.includes("učitel") || m.includes("shadowing")) return "skoly";
  return "studium";
}

/** Journeys into Czechia are told from the other side of the route. */
export function isIncoming(story: Story) {
  return story.toCountry === "Česko";
}
