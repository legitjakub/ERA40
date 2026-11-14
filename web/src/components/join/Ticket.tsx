import s from "./Ticket.module.css";

export type TicketData = {
  name?: string;
  from?: string;
  to?: string;
  year?: string;
};

/**
 * The personal "jízdenka": a ticket for the journey someone actually made.
 * Rendered live while the story form is filled in, and again after sending.
 */
export function Ticket({ data, id }: { data: TicketData; id?: string }) {
  const from = data.from?.trim() || "Odkud";
  const to = data.to?.trim() || "Kam";
  return (
    <div className={s.ticket} id={id} role="img" aria-label={`Jízdenka: ${from} – ${to}${data.year ? ", " + data.year : ""}`}>
      <div className={s.main}>
        <p className={s.top}>
          <span>Jízdenka Erasmus</span>
          <span>1987–2027</span>
        </p>
        <div className={s.route}>
          <p>
            <small>Odkud</small>
            <strong data-empty={!data.from?.trim()}>{from}</strong>
          </p>
          <svg viewBox="0 0 120 20" aria-hidden="true">
            <path d="M4 10H116" />
            <circle cx="4" cy="10" r="4" />
            <circle cx="116" cy="10" r="4" />
          </svg>
          <p>
            <small>Kam</small>
            <strong data-empty={!data.to?.trim()}>{to}</strong>
          </p>
        </div>
        <p className={s.bottom}>
          <span>
            <small>Cestující</small>
            {data.name?.trim() || "Vaše jméno"}
          </span>
          <span>
            <small>Rok</small>
            {data.year?.trim() || "—"}
          </span>
          <span>
            <small>Platnost</small>
            celý život
          </span>
        </p>
      </div>
      <div className={s.stub} aria-hidden="true">
        <span>40</span>
        <small>let Erasmu</small>
      </div>
    </div>
  );
}
