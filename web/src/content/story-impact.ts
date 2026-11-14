import type { Story } from "./types";

export const impactThemes = [
  { id: "uceni", label: "Učení a výuka" },
  { id: "prace", label: "Práce a dovednosti" },
  { id: "vztahy", label: "Vztahy a komunita" },
  { id: "odvaha", label: "Odvaha a samostatnost" },
] as const;
export type ImpactTheme = (typeof impactThemes)[number]["id"];
type Impact = { themes: ImpactTheme[]; summary: string };

// Editorial summaries of the existing fictional stories, never evidence of measured impact.
const modelImpacts: Record<string, Impact> = {
  valencie: { themes: ["odvaha", "uceni"], summary: "Získala odvahu říct vlastní názor i v cizím jazyce." },
  lipsko: { themes: ["prace", "odvaha"], summary: "Ze stáže si odvezl němčinu pro pracovní porady a první zahraniční reference." },
  "praha-in": { themes: ["vztahy", "uceni"], summary: "Dnes pomáhá novým zahraničním studentům zorientovat se v Praze." },
  "porto-sos": { themes: ["prace", "odvaha"], summary: "První zakázka pro skutečného zákazníka a zkušenost, že se lidé domluví i při společné práci." },
  ucitelka: { themes: ["uceni"], summary: "Po návratu z finské školy učí svou třídu venku každý pátek." },
  vymena: { themes: ["uceni", "vztahy"], summary: "Ze společného workshopu vznikl film a skupina, která si píše i po skončení výměny." },
  kariera: { themes: ["prace", "odvaha"], summary: "Zkušenost z Lyonu pokračuje v práci s mezinárodním týmem." },
  pratelstvi: { themes: ["vztahy"], summary: "Z jednoho pobytu vyrostlo přátelství, které pokračuje o deset let později." },
};

/** A real replacement story must not inherit a fictional outcome merely by reusing its ID. */
export function storyImpact(story: Story): Impact | undefined {
  return story.status === "model-story" ? modelImpacts[story.id] : undefined;
}
