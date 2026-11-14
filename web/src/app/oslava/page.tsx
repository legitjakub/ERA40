import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageIntro";
import { AddToCalendar } from "@/components/event/AddToCalendar";
import { Countdown } from "@/components/event/Countdown";
import { event, eventConfirmed } from "@/content/event";
import s from "./oslava.module.css";

export const metadata: Metadata = {
  title: "Oslava 40 let Erasmu — Erasmus v Česku",
  description: event.lead,
};

const soon = <span className={s.soon}>Jméno oznámíme</span>;

export default function EventPage() {
  const headliners = event.performers.filter((p) => p.headliner);
  const guests = event.performers.filter((p) => !p.headliner);
  const jsonLd = eventConfirmed()
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate: event.start,
        endDate: event.end ?? undefined,
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: event.venue.name,
          address: event.venue.address ?? undefined,
        },
        description: event.lead,
      }
    : null;

  return (
    <main id="main" className={s.page}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PageIntro kicker={event.title} title={event.claim} lead={event.lead}>
        <dl className={s.facts}>
          <div>
            <dt>Kdy</dt>
            <dd>
              <Countdown className={s.factValue} />
            </dd>
          </div>
          <div>
            <dt>Kde</dt>
            <dd className={s.factValue}>{event.venue.name}</dd>
          </div>
          <div>
            <dt>Vstup</dt>
            <dd className={s.factValue}>{event.entry.label}</dd>
          </div>
        </dl>
        {!event.confirmed && (
          <p className={s.proposal}>
            <strong>Návrh.</strong> Termín, místo a program jsou zatím
            návrhem pro pořadatele a mohou se změnit. Registrovaným dáme
            vědět jako prvním.
          </p>
        )}
        <p className={s.actions}>
          <Link className={s.primary} href="/zapojte-se#oslava">
            Chci přijít <span aria-hidden="true">↗</span>
          </Link>
          <a className={s.secondary} href="#program">
            Program a účinkující
          </a>
          <AddToCalendar className={s.secondary} />
        </p>
      </PageIntro>

      <section className={s.poster} aria-labelledby="lineup-title">
        <div className={s.inner}>
          <h2 id="lineup-title" className={s.kicker}>
            Účinkující
          </h2>
          <ul className={s.headliners}>
            {headliners.map((p) => (
              <li key={p.id}>
                <span className={s.name}>
                  {p.name}
                  {p.placeholder && soon}
                </span>
                <span className={s.meta}>
                  {[p.time, p.genre].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
          <ul className={s.guests}>
            {guests.map((p) => (
              <li key={p.id}>
                <span className={s.name}>{p.name}</span>
                <span className={s.meta}>
                  {[p.time, p.genre].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
          <p className={s.posterNote}>
            Navržená dramaturgie. Konkrétní jména zveřejníme po podpisu
            smluv s účinkujícími.
          </p>
        </div>
      </section>

      <section id="program" className={s.section} aria-labelledby="program-title">
        <div className={s.inner}>
          <header className={s.head}>
            <h2 id="program-title">Program</h2>
            <p>
              {event.confirmed
                ? event.dateLabel
                : "Návrh podoby dne. Finální program zveřejníme s účinkujícími."}
            </p>
          </header>
          <ol className={s.program}>
            {event.program.map((item) => (
              <li key={item.title}>
                <span className={s.time}>{item.time ?? "Čas upřesníme"}</span>
                <span className={s.stage}>{item.stage}</span>
                <span className={s.programTitle}>{item.title}</span>
                <span className={s.programText}>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.section} data-tone="sky" aria-labelledby="place-title">
        <div className={s.inner}>
          <div className={s.split}>
            <div>
              <h2 id="place-title">Místo a doprava</h2>
              <p className={s.big}>{event.venue.name}</p>
              {event.venue.address && <p>{event.venue.address}</p>}
              <ul className={s.list}>
                {event.venue.transport.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p>
                <strong>Přístupnost.</strong> {event.venue.access}
              </p>
              <p>
                <strong>S sebou.</strong> {event.venue.bring}
              </p>
            </div>
            <div>
              <h2>Vstup</h2>
              <p className={s.big}>{event.entry.label}</p>
              <p>{event.entry.text}</p>
              <p>
                <Link className={s.primary} href="/zapojte-se#oslava">
                  Chci přijít <span aria-hidden="true">↗</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.section} data-tone="ink" aria-labelledby="facts-title">
        <div className={s.inner}>
          <header className={s.head}>
            <h2 id="facts-title">Proč slavíme</h2>
            <p>Ověřená čísla z Domu zahraniční spolupráce a Evropské komise.</p>
          </header>
          <dl className={s.numbers}>
            {event.facts.map((f) => (
              <div key={f.value}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={s.section} aria-labelledby="faq-title">
        <div className={s.inner}>
          <header className={s.head}>
            <h2 id="faq-title">Časté otázky</h2>
          </header>
          <div className={s.faq}>
            {event.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section} data-tone="blue" aria-labelledby="media-title">
        <div className={s.inner}>
          <div className={s.split}>
            <div>
              <h2 id="media-title">Pro média a partnery</h2>
              <p>
                Tiskové materiály, fotografie a loga partnerů zveřejníme s
                programem. Kontakt pro média doplní pořadatel.
              </p>
            </div>
            <div>
              <p>
                <Link className={s.secondaryLight} href="/zapojte-se#organizace">
                  Zapojit školu nebo organizaci
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
