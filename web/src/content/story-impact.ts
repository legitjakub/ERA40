import type { Story } from "./types";

export const impactThemes = [
  { id: "uceni", label: "Učení a\u00a0výuka" },
  { id: "prace", label: "Práce a\u00a0dovednosti" },
  { id: "vztahy", label: "Vztahy a\u00a0komunita" },
  { id: "odvaha", label: "Odvaha a\u00a0samostatnost" },
] as const;
export type ImpactTheme = (typeof impactThemes)[number]["id"];
type Impact = { themes: ImpactTheme[]; summary: string };

// Editorial summaries of the existing fictional stories, never evidence of measured impact.
const modelImpacts: Record<string, Impact> = {
  valencie: { themes: ["odvaha", "uceni"], summary: "Získala odvahu říct vlastní názor i\u00a0v\u00a0cizím jazyce." },
  lipsko: { themes: ["prace", "odvaha"], summary: "Ze stáže si odvezl němčinu pro pracovní porady a\u00a0první zahraniční reference." },
  "praha-in": { themes: ["vztahy", "uceni"], summary: "Dnes pomáhá novým zahraničním studentům zorientovat se v\u00a0Praze." },
  "porto-sos": { themes: ["prace", "odvaha"], summary: "První zakázka pro skutečného zákazníka a\u00a0zkušenost, že se lidé domluví i\u00a0při společné práci." },
  ucitelka: { themes: ["uceni"], summary: "Po návratu z\u00a0finské školy učí svou třídu venku každý pátek." },
  vymena: { themes: ["uceni", "vztahy"], summary: "Ze společného workshopu vznikl film a\u00a0skupina, která si píše i\u00a0po skončení výměny." },
  kariera: { themes: ["prace", "odvaha"], summary: "Zkušenost z\u00a0Lyonu pokračuje v\u00a0práci s\u00a0mezinárodním týmem." },
  pratelstvi: { themes: ["vztahy"], summary: "Z\u00a0jednoho pobytu vyrostlo přátelství, které pokračuje o\u00a0deset let později." },
};

/** A real replacement story must not inherit a fictional outcome merely by reusing its ID. */
export function storyImpact(story: Story): Impact | undefined {
  return story.status === "model-story" ? modelImpacts[story.id] : undefined;
}
