/*
 * The anniversary celebration. Everything marked `placeholder` waits for
 * the organiser's confirmed details (docs/PLAN-OSLAVA.md, "Co potřebuji").
 * Fill in `start`, `end` and `venue` and the countdown, calendar file and
 * structured data switch on by themselves.
 */

export type Performer = {
  id: string;
  name: string;
  /** Headliners are set large on the poster. */
  headliner?: boolean;
  genre?: string;
  time?: string;
  photo?: string;
  listen?: string;
  /** Only a verified Erasmus link, e.g. "studovala v Lisabonu". */
  erasmus?: string;
  placeholder?: boolean;
};

export type ProgramItem = {
  time?: string;
  stage: string;
  title: string;
  text: string;
  placeholder?: boolean;
};

export const event = {
  claim: "40 let Erasmu. Slavíme v Česku.",
  title: "Oslava 40 let Erasmu",
  lead: "Koncert, setkání absolventů a den plný cest, které mění životy. Evropský program slaví 40 let a Česko je u toho od roku 1998.",
  /** ISO date-time with offset, e.g. "2027-06-12T16:00:00+02:00". */
  start: null as string | null,
  end: null as string | null,
  dateLabel: "Datum oznámíme brzy",
  venue: {
    name: "Místo oznámíme brzy",
    address: null as string | null,
    placeholder: true,
  },
  entry: {
    label: "Vstup a registraci upřesníme",
    text: "Zaregistrujte se a pošleme vám datum, místo i program, jakmile je zveřejníme.",
    placeholder: true,
  },
  performers: [
    { id: "headliner-1", name: "Hlavní host", headliner: true, placeholder: true },
    { id: "headliner-2", name: "Hlavní host", headliner: true, placeholder: true },
    { id: "guest-1", name: "Host", placeholder: true },
    { id: "guest-2", name: "Host", placeholder: true },
    { id: "guest-3", name: "Host", placeholder: true },
    { id: "guest-4", name: "Host", placeholder: true },
  ] as Performer[],
  /** A proposed shape of the day; times and names follow with the programme. */
  program: [
    {
      stage: "Hlavní pódium",
      title: "Koncert",
      text: "Večerní koncert hlavních hostů.",
      placeholder: true,
    },
    {
      stage: "Debaty",
      title: "Absolventi vyprávějí",
      text: "Lidé, kteří s Erasmem vyjeli, mluví o tom, co jim cesta dala.",
      placeholder: true,
    },
    {
      stage: "Stánky",
      title: "Kam vyjet",
      text: "Školy, organizace a Dům zahraniční spolupráce radí, jak se zapojit.",
      placeholder: true,
    },
    {
      stage: "Příběhy živě",
      title: "Vaše cesta na mapě",
      text: "Přidejte svůj Erasmus a podívejte se, kam vedly cesty ostatních.",
      placeholder: true,
    },
  ] as ProgramItem[],
  faq: [
    {
      q: "Kolik stojí vstup?",
      a: "Podmínky vstupu zveřejníme spolu s datem. Registrovaným dáme vědět jako prvním.",
    },
    {
      q: "Musím být absolvent Erasmu?",
      a: "Ne. Oslava je pro všechny, kdo s Erasmem vyjeli, chystají se vyjet, nebo je program jen zajímá.",
    },
    {
      q: "Je místo bezbariérové?",
      a: "Informace o přístupnosti doplníme s místem konání.",
    },
    {
      q: "Jak se mohu zapojit jako škola nebo partner?",
      a: "Napište nám přes formulář pro školy a organizace na stránce Zapojte se.",
    },
  ],
};

export const eventConfirmed = () => Boolean(event.start && !event.venue.placeholder);
