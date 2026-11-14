/*
 * The anniversary celebration.
 *
 * Everything here is a PROPOSAL (docs/PLAN-OSLAVA.md, "Návrh akce"):
 * date, place and programme are worked out from public facts, but the
 * organiser has not confirmed them. While `confirmed` is false the site
 * labels them as a proposal and keeps the calendar file and schema.org
 * Event switched off. Performer names stay formats, never real artists,
 * until bookings are signed.
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
  /** Flip to true once the organiser confirms date, place and entry. */
  confirmed: false,
  claim: "40 let Erasmu. Slavíme v Česku.",
  title: "Oslava 40 let Erasmu",
  lead: "Odpoledne a večer pod širým nebem na pražské náplavce: koncerty, příběhy absolventů a rady, jak vyjet. Evropský program slaví 40 let a Česko je u toho od roku 1998.",
  /** Saturday closest to the programme's birthday, 15 June 1987. */
  start: "2027-06-12T14:00:00+02:00" as string | null,
  end: "2027-06-12T22:00:00+02:00" as string | null,
  dateLabel: "Sobota 12. června 2027, 14–22 h",
  dateNote: "Nejbližší sobota ke 40. narozeninám programu (15. 6. 1987).",
  venue: {
    name: "Náplavka, Rašínovo nábřeží",
    address: "Rašínovo nábřeží, Praha 2",
    transport: [
      "Tramvaj: zastávka Výtoň, přímo u náplavky.",
      "Metro B: Karlovo náměstí, asi 10 minut pěšky.",
      "Na kole: po břehu vede páteřní cyklotrasa A2.",
    ],
    access:
      "Bezbariérový přístup na náplavku, toalety a místo u pódia ověříme se správcem náplavek a zveřejníme s finálním programem.",
    bring: "Dobrou náladu, láhev na vodu a klidně fotku nebo předmět ze svého Erasmu do Příběhů živě.",
    placeholder: true,
  },
  entry: {
    label: "Zdarma, s registrací",
    text: "Vstup je volný. Registrace nám pomůže odhadnout počet lidí a pošleme vám program jako prvním.",
    placeholder: true,
  },
  performers: [
    { id: "headliner-1", name: "Hlavní host večera", genre: "Česká kapela, pop a indie", time: "20:30", headliner: true, placeholder: true },
    { id: "headliner-2", name: "Evropský host", genre: "Kapela ze země partnera Erasmu", time: "19:15", headliner: true, placeholder: true },
    { id: "guest-1", name: "Kapela absolventů", genre: "Muzikanti, které spojil Erasmus", time: "18:00", placeholder: true },
    { id: "guest-2", name: "Studentské kapely", genre: "Vítězové výzvy pro školy", time: "16:30", placeholder: true },
    { id: "guest-3", name: "Mezinárodní sbor", genre: "Studenti z celé Evropy", time: "15:30", placeholder: true },
    { id: "guest-4", name: "DJ set 1987–2027", genre: "Čtyřicet let hudby", time: "21:30", placeholder: true },
  ] as Performer[],
  /** A proposed shape of the day; names follow once bookings are signed. */
  program: [
    { time: "14:00", stage: "Celá náplavka", title: "Otevíráme", text: "Stánky škol, Domu zahraniční spolupráce a studentských spolků radí, kam a jak vyjet.", placeholder: true },
    { time: "15:00", stage: "Debaty", title: "Odjezd 1998", text: "První čeští účastníci Erasmu vyprávějí, jaké bylo vyjet před vstupem do EU.", placeholder: true },
    { time: "15:30", stage: "Hlavní pódium", title: "Mezinárodní sbor", text: "Zahraniční studenti, kteří jsou v Česku na Erasmu, zpívají ve svých jazycích.", placeholder: true },
    { time: "16:00", stage: "Příběhy živě", title: "Vaše cesta na mapě", text: "Přineste fotku nebo vzpomínku, zapíšeme ji a ukážeme na velké mapě cest.", placeholder: true },
    { time: "16:30", stage: "Hlavní pódium", title: "Studentské kapely", text: "Kapely ze škol zapojených do Erasmu+, vybrané ve výzvě před oslavou.", placeholder: true },
    { time: "17:00", stage: "Debaty", title: "Nejen pro vysokoškoláky", text: "Učni, učitelé, sportovci a pracovníci s mládeží o tom, kam s Erasmem+ vyjeli od roku 2014.", placeholder: true },
    { time: "18:00", stage: "Hlavní pódium", title: "Kapela absolventů", text: "Muzikanti, kteří se potkali na Erasmu, hrají spolu znovu.", placeholder: true },
    { time: "19:15", stage: "Hlavní pódium", title: "Evropský host", text: "Koncert kapely z jiné země programu Erasmus+.", placeholder: true },
    { time: "20:15", stage: "Hlavní pódium", title: "Společná fotka 40 let", text: "Všichni, kdo kdy vyjeli, na jedné fotce. Vezměte si vlajku své destinace.", placeholder: true },
    { time: "20:30", stage: "Hlavní pódium", title: "Hlavní host večera", text: "Večerní koncert.", placeholder: true },
    { time: "21:30", stage: "Hlavní pódium", title: "DJ set 1987–2027", text: "Hity ze všech čtyřiceti let do konce večera ve 22:00.", placeholder: true },
  ] as ProgramItem[],
  /** Verified public figures; see docs/CONTENT-FACTS.md for sources. */
  facts: [
    { value: "15. 6. 1987", label: "Evropská komise spouští program Erasmus" },
    { value: "1998", label: "Česko se zapojuje do evropských vzdělávacích programů" },
    { value: "446 200", label: "účastníků z Česka ve výzvách 1998–2024 (DZS, únor 2025)" },
    { value: "2014", label: "vzniká Erasmus+ pro všechny obory vzdělávání a sport" },
  ],
  faq: [
    { q: "Kolik stojí vstup?", a: "Navrhujeme vstup zdarma s nepovinnou registrací. Podmínky potvrdí pořadatel spolu s termínem." },
    { q: "Musím být absolvent Erasmu?", a: "Ne. Oslava je pro všechny, kdo s Erasmem vyjeli, chystají se vyjet, nebo je program jen zajímá." },
    { q: "Můžu přijít s dětmi nebo se psem?", a: "Ano, náplavka je veřejné prostranství. U pódia bývá hlučno, pro děti doporučujeme chrániče sluchu." },
    { q: "Co když bude pršet?", a: "Akce proběhne za každého počasí. Při bouřce může pořadatel program z bezpečnostních důvodů přerušit." },
    { q: "Je místo bezbariérové?", a: "Přístup ověříme se správcem náplavek a podrobnosti zveřejníme s finálním programem." },
    { q: "Jak se mohu zapojit jako škola, kapela nebo partner?", a: "Napište nám přes formulář pro školy a organizace na stránce Zapojte se. Studentské kapely vybereme ve výzvě před oslavou." },
  ],
};

export const eventConfirmed = () =>
  Boolean(event.confirmed && event.start && !event.venue.placeholder);
