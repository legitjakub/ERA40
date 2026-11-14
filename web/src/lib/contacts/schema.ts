/**
 * Contact collection for the ERA40 anniversary.
 * Four paths share one record shape so they can be exported to a single
 * table and later imported into the publisher's CRM.
 */
export const contactPaths = [
  {
    id: "oslava",
    label: "Přijdu na oslavu",
    lead: "Zaregistrujte se na oslavu 40 let Erasmu. Pošleme vám datum, místo a program, jakmile je zveřejníme.",
  },
  {
    id: "pribeh",
    label: "Byl(a) jsem na Erasmu",
    lead: "Sdílejte svou cestu. Vybrané příběhy se po redakční úpravě a vašem schválení mohou objevit na webu.",
  },
  {
    id: "vyjet",
    label: "Chci vyjet",
    lead: "Pošleme vám, jak se zapojit, a upozorníme na výzvy a akce k výročí.",
  },
  {
    id: "organizace",
    label: "Za školu nebo organizaci",
    lead: "Chystáte akci, projekt nebo setkání absolventů? Ozvěte se, rádi vás propojíme s výročím.",
  },
] as const;

export type ContactPath = (typeof contactPaths)[number]["id"];

export const mobilityOptions = [
  "Studium na vysoké škole",
  "Pracovní stáž",
  "Odborná praxe (SŠ, učni)",
  "Výuka nebo job shadowing",
  "Mládežnická výměna nebo dobrovolnictví",
  "Vzdělávání dospělých",
  "Jiné",
] as const;

export const audienceOptions = [
  "Student(ka) střední školy",
  "Student(ka) vysoké školy",
  "Učeň / učnice",
  "Pedagog(ka)",
  "Pracuji s mládeží",
  "Jiné",
] as const;

export type ContactRecord = {
  id: string;
  receivedAt: string;
  path: ContactPath;
  name: string;
  email: string;
  // pribeh
  from?: string;
  to?: string;
  year?: string;
  mobility?: string;
  story?: string;
  publishConsent?: boolean;
  // vyjet
  audience?: string;
  destination?: string;
  // organizace
  organisation?: string;
  role?: string;
  phone?: string;
  message?: string;
  // oslava
  guests?: number;
  // all
  newsletter: boolean;
  privacyConsent: true;
  privacyVersion: string;
};

/** Bump when the privacy notice text changes, so each record shows what was agreed to. */
export const PRIVACY_VERSION = "navrh-2026-11-13";

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  from: 120,
  to: 120,
  year: 9,
  mobility: 80,
  story: 6000,
  audience: 80,
  destination: 160,
  organisation: 200,
  role: 120,
  phone: 40,
  message: 3000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Result =
  | { ok: true; record: Omit<ContactRecord, "id" | "receivedAt"> }
  | { ok: false; errors: Record<string, string> };

function text(input: Record<string, unknown>, key: string) {
  const value = input[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, LIMITS[key] ?? 200) : undefined;
}

/** Shared by the form (instant feedback) and the API route (the authority). */
export function validateContact(input: Record<string, unknown>): Result {
  const errors: Record<string, string> = {};
  const path = input.path;
  if (
    path !== "oslava" &&
    path !== "pribeh" &&
    path !== "vyjet" &&
    path !== "organizace"
  )
    errors.path = "Vyberte, co je vám nejblíž.";
  const name = text(input, "name");
  const email = text(input, "email");
  if (!name) errors.name = "Napište, jak vám můžeme říkat.";
  if (!email || !EMAIL.test(email)) errors.email = "Zkontrolujte e-mail.";
  if (input.privacyConsent !== true)
    errors.privacyConsent = "Bez souhlasu vám nemůžeme odpovědět.";

  const story =
    typeof input.story === "string"
      ? input.story.trim().slice(0, LIMITS.story)
      : undefined;
  const message =
    typeof input.message === "string"
      ? input.message.trim().slice(0, LIMITS.message)
      : undefined;

  if (path === "pribeh") {
    if (!text(input, "to")) errors.to = "Kam jste vyjeli?";
    const year = text(input, "year");
    if (year && (!/^\d{4}$/.test(year) || Number(year) < 1987 || Number(year) > new Date().getFullYear()))
      errors.year = "Rok mezi 1987 a dneškem.";
    if (!story || story.length < 20)
      errors.story = "Pár vět stačí, alespoň jednu myšlenku.";
  }
  const guests = Number(input.guests ?? 1);
  if (path === "oslava" && (!Number.isInteger(guests) || guests < 1 || guests > 4))
    errors.guests = "Počet osob 1 až 4.";
  if (path === "organizace" && !text(input, "organisation"))
    errors.organisation = "Doplňte název školy nebo organizace.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    record: {
      path: path as ContactPath,
      name: name!,
      email: email!.toLowerCase(),
      from: path === "pribeh" ? text(input, "from") : undefined,
      to: path === "pribeh" ? text(input, "to") : undefined,
      year: path === "pribeh" ? text(input, "year") : undefined,
      mobility: path === "pribeh" ? text(input, "mobility") : undefined,
      story: path === "pribeh" ? story : undefined,
      publishConsent: path === "pribeh" ? input.publishConsent === true : undefined,
      audience: path === "vyjet" ? text(input, "audience") : undefined,
      destination: path === "vyjet" ? text(input, "destination") : undefined,
      organisation: path === "organizace" ? text(input, "organisation") : undefined,
      role: path === "organizace" ? text(input, "role") : undefined,
      phone: path === "organizace" ? text(input, "phone") : undefined,
      message: path === "organizace" ? message : undefined,
      guests: path === "oslava" ? guests : undefined,
      newsletter: input.newsletter === true,
      privacyConsent: true,
      privacyVersion: PRIVACY_VERSION,
    },
  };
}
