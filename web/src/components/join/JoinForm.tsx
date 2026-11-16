"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  audienceOptions,
  contactPaths,
  mobilityOptions,
  validateContact,
  type ContactPath,
} from "@/lib/contacts/schema";
import s from "./JoinForm.module.css";

/*
 * One form, three paths. The visitor first says who they are; the fields,
 * the side panel and the thank-you change with it. Former participants see a
 * live summary of their journey, and every path ends with a summary of what
 * was sent.
 */
type Values = Record<string, string | boolean>;
type Status = "idle" | "sending" | "sent" | "error";

const empty: Values = {
  name: "",
  email: "",
  from: "",
  to: "",
  year: "",
  mobility: "",
  story: "",
  audience: "",
  destination: "",
  organisation: "",
  role: "",
  phone: "",
  message: "",
  website: "",
  publishConsent: false,
  newsletter: false,
  privacyConsent: false,
};

const nextSteps: Record<ContactPath, string[]> = {
  // Blueprint v0.2 copy C7–C9: this preview stores records locally only
  // (lib/contacts/store.ts). It promises no reading, reply or deadline until
  // the publisher sets up a real process (Blueprint §13).
  pribeh: [
    "Příběh byl uložen v\u00a0tomto náhledu. Automaticky se nikam neodesílá.",
    "V\u00a0tomto náhledu se nic nezveřejňuje.",
  ],
  vyjet: [
    "Kontakt byl uložen v\u00a0tomto náhledu. Automaticky se nikam neodesílá.",
    "Souhlas můžeš kdykoli odvolat, viz Ochrana osobních údajů.",
  ],
  organizace: [
    "Zpráva byla uložena v\u00a0tomto náhledu. Automaticky se nikam neodesílá.",
  ],
};

// The same promise before sending, in the future tense (side panel).
const plannedSteps: Record<ContactPath, string[]> = {
  pribeh: [
    "Po odeslání se příběh uloží v\u00a0tomto náhledu. Automaticky se nikam neodesílá.",
    "V\u00a0tomto náhledu se nic nezveřejňuje.",
  ],
  vyjet: [
    "Po odeslání se kontakt uloží v\u00a0tomto náhledu. Automaticky se nikam neodesílá.",
    "Souhlas můžeš kdykoli odvolat, viz Ochrana osobních údajů.",
  ],
  organizace: [
    "Po odeslání se zpráva uloží v\u00a0tomto náhledu. Automaticky se nikam neodesílá.",
  ],
};

const doneTitle: Record<ContactPath, string> = {
  pribeh: "Děkujeme za příběh.",
  vyjet: "Děkujeme za kontakt.",
  organizace: "Děkujeme za zprávu.",
};

const value = (values: Values, key: string) => String(values[key] ?? "").trim();

/** What the visitor filled in, on EU blue: live while writing a story, and after sending. */
function Summary({ path, values, live }: { path: ContactPath; values: Values; live?: boolean }) {
  const rows: [string, string][] =
    path === "pribeh"
      ? [["Jméno", value(values, "name")], ["Rok", value(values, "year")], ["Typ pobytu", value(values, "mobility")]]
      : path === "vyjet"
        ? [["Jméno", value(values, "name")], ["Kdo jsi", value(values, "audience")], ["Kam by tě to táhlo", value(values, "destination")]]
        : [["Organizace", value(values, "organisation")], ["Jméno", value(values, "name")], ["Role", value(values, "role")]];
  if (!live) rows.push(["E-mail", value(values, "email")]);
  const from = value(values, "from");
  const to = value(values, "to");
  return (
    <div className={s.summary} role="group" aria-label={live ? "Shrnutí tvé cesty" : "Shrnutí odeslaných údajů"}>
      <p className={s.summaryTop}>{live ? "Tvoje cesta" : "Odeslané údaje"}</p>
      {path === "pribeh" && (
        <p className={s.summaryRoute}>
          <span data-empty={!from || undefined}>{from || "Odkud"}</span>
          <svg aria-hidden="true">
            <line x1="0" y1="6" x2="100%" y2="6" />
            <circle cx="0" cy="6" r="4" />
            <circle cx="100%" cy="6" r="4" />
          </svg>
          <span data-empty={!to || undefined}>{to || "Kam"}</span>
        </p>
      )}
      <dl className={s.summaryFacts}>
        {rows.map(([label, text]) => (
          <div key={label} data-wide={label === "E-mail" || undefined}>
            <dt>{label}</dt>
            <dd>{text || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function JoinForm() {
  const [path, setPath] = useState<ContactPath | null>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sendError, setSendError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Links such as /zapojte-se#pribeh preselect a path.
  useEffect(() => {
    const pick = () => {
      const hash = window.location.hash.slice(1);
      if (contactPaths.some((p) => p.id === hash)) {
        setPath(hash as ContactPath);
        setStatus((current) => (current === "sent" ? "idle" : current));
      }
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  useEffect(() => {
    if (status !== "sent") return;
    const el = resultRef.current;
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [status]);

  const set = (key: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key])
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
  };

  const field = (key: string) => ({
    id: `${uid}-${key}`,
    name: key,
    value: String(values[key] ?? ""),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => set(key, e.target.value),
  });

  const error = (key: string) =>
    errors[key] ? (
      <span id={`${uid}-${key}-error`} className={s.error}>
        {errors[key]}
      </span>
    ) : null;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    const payload = { ...values, path };
    const result = validateContact(payload);
    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }
    setStatus("sending");
    setSendError("");
    try {
      const response = await fetch("/api/kontakty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        const first = Object.keys(data.errors)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }
      if (!response.ok) {
        setSendError(response.status === 429
          ? "Za chvíli to prosím zkus znovu. Tvoje vyplněné údaje zůstávají tady."
          : "Odeslání se nepovedlo. Tvoje údaje zůstávají vyplněné, zkus to prosím znovu.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setSendError("Připojení se přerušilo. Tvoje údaje zůstávají vyplněné, zkus to prosím znovu.");
      setStatus("error");
    }
  }

  if (status === "sent" && path) {
    return (
      <div
        className={s.done}
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <p className={s.doneKicker}>Odesláno</p>
        <h2 className={s.doneTitle}>{doneTitle[path]}</h2>
        <div className={s.doneSummary}>
          <Summary path={path} values={values} />
        </div>
        <p className={s.sideTitle}>Co se stane dál</p>
        <ol className={s.steps}>
          {nextSteps[path].map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className={s.doneLinks}>
          <Link href="/pribehy">Projít příběhy</Link>
          <button
            type="button"
            onClick={() => {
              setValues(empty);
              setStatus("idle");
            }}
          >
            Odeslat další
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className={s.layout}>
      <form id="zapojeni" ref={formRef} className={s.form} onSubmit={submit} noValidate aria-busy={status === "sending"}>
        <fieldset className={s.paths} disabled={status === "sending"}>
          <legend className={s.legend}>
            <span className={s.stepNo}>1</span> Co je ti nejblíž?
          </legend>
          {contactPaths.map((option) => (
            <label
              key={option.id}
              id={option.id}
              className={s.path}
              data-active={path === option.id}
            >
              <input
                type="radio"
                name="path"
                value={option.id}
                checked={path === option.id}
                onChange={() => {
                  setPath(option.id);
                  history.replaceState(null, "", "#" + option.id);
                  setErrors({});
                  setStatus("idle");
                }}
              />
              <span className={s.pathLabel}>{option.label}</span>
              <span className={s.pathLead}>{option.lead}</span>
            </label>
          ))}
          {errors.path && <span className={s.error}>{errors.path}</span>}
        </fieldset>

        {path && (
          <fieldset className={s.fields} key={path} disabled={status === "sending"}>
            <legend className={s.legend}>
              <span className={s.stepNo}>2</span>
              {path === "pribeh"
                ? "Tvoje cesta"
                : path === "vyjet"
                  ? "Kam ti máme psát"
                  : "Tvoje škola nebo organizace"}
            </legend>

            {path === "organizace" && (
              <div className={s.row}>
                <div className={s.label}>
                  <label htmlFor={`${uid}-organisation`}>
                  Název školy nebo organizace</label>
                  <input {...field("organisation")} autoComplete="organization" required maxLength={200} />
                  {error("organisation")}
                </div>
                <div className={s.label}>
                  <label htmlFor={`${uid}-role`}>
                  Tvoje role <span className={s.optional}>nepovinné</span></label>
                  <input
                    {...field("role")}
                    autoComplete="organization-title"
                    placeholder="Třeba koordinátorka mobilit"
                  />
                </div>
              </div>
            )}

            <div className={s.row}>
              <div className={s.label}>
                <label htmlFor={`${uid}-name`}>
                Jméno</label>
                <input {...field("name")} autoComplete="name" required maxLength={120} />
                {error("name")}
              </div>
              <div className={s.label}>
                <label htmlFor={`${uid}-email`}>
                E-mail</label>
                <input
                  {...field("email")}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={200}
                />
                {error("email")}
              </div>
            </div>

            {path === "pribeh" && (
              <>
                <div className={s.row}>
                  <div className={s.label}>
                    <label htmlFor={`${uid}-from`}>
                    Odkud <span className={s.optional}>město nebo škola</span></label>
                    <input {...field("from")} placeholder="Třeba Olomouc" maxLength={120} />
                  </div>
                  <div className={s.label}>
                    <label htmlFor={`${uid}-to`}>
                    Kam</label>
                    <input {...field("to")} placeholder="Třeba Valencie" required maxLength={120} />
                    {error("to")}
                  </div>
                </div>
                <div className={s.row}>
                  <div className={s.label}>
                    <label htmlFor={`${uid}-year`}>
                    Rok <span className={s.optional}>nepovinné</span></label>
                    <input
                      {...field("year")}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="2019"
                    />
                    {error("year")}
                  </div>
                  <div className={s.label}>
                    <label htmlFor={`${uid}-mobility`}>
                    Typ pobytu <span className={s.optional}>nepovinné</span></label>
                    <select {...field("mobility")}>
                      <option value="">Vyber</option>
                      {mobilityOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={s.label}>
                  <label htmlFor={`${uid}-story`}>
                  Co ti z&nbsp;cesty zůstalo?</label>
                  <textarea
                    {...field("story")}
                    rows={7}
                    maxLength={6000}
                    required
                    placeholder="Okamžik, člověk, věta, kterou si pamatuješ. Pár řádků stačí."
                  />
                  <span className={s.counter} aria-hidden="true">
                    {String(values.story).length} / 6000
                  </span>
                  {error("story")}
                </div>
                <label className={s.check}>
                  <input
                    type="checkbox"
                    name="publishConsent"
                    checked={Boolean(values.publishConsent)}
                    onChange={(e) => set("publishConsent", e.target.checked)}
                  />
                  <span>
                    Souhlasím se zveřejněním příběhu po redakční úpravě a&nbsp;mém schválení.
                  </span>
                </label>
              </>
            )}

            {path === "vyjet" && (
              <div className={s.row}>
                <div className={s.label}>
                  <label htmlFor={`${uid}-audience`}>
                  Kdo jsi <span className={s.optional}>nepovinné</span></label>
                  <select {...field("audience")}>
                    <option value="">Vyber</option>
                    {audienceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className={s.label}>
                  <label htmlFor={`${uid}-destination`}>
                  Kam by tě to táhlo?{" "}
                  <span className={s.optional}>nepovinné</span></label>
                  <input {...field("destination")} placeholder="Země, město nebo obor" />
                </div>
              </div>
            )}

            {path === "organizace" && (
              <>
                <div className={s.label}>
                  <label htmlFor={`${uid}-phone`}>
                  Telefon <span className={s.optional}>nepovinné</span></label>
                  <input {...field("phone")} type="tel" autoComplete="tel" />
                </div>
                <div className={s.label}>
                  <label htmlFor={`${uid}-message`}>
                  Co chystáš? <span className={s.optional}>nepovinné</span></label>
                  <textarea
                    {...field("message")}
                    rows={5}
                    maxLength={3000}
                    placeholder="Akce, setkání absolventů, výstava, projekt..."
                  />
                </div>
              </>
            )}

            {/* Honeypot for bots, hidden from people and assistive tech. */}
            <div className={s.trap} aria-hidden="true">
              <label>
                Web
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  value={String(values.website)}
                  onChange={(e) => set("website", e.target.value)}
                />
              </label>
            </div>

            <div className={s.consents}>
              <label className={s.check}>
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={Boolean(values.newsletter)}
                  onChange={(e) => set("newsletter", e.target.checked)}
                />
                <span>Chci dostávat novinky k&nbsp;40 letům Erasmu.</span>
              </label>
              <label className={s.check}>
                <input
                  type="checkbox"
                  name="privacyConsent"
                  required
                  checked={Boolean(values.privacyConsent)}
                  aria-invalid={errors.privacyConsent ? true : undefined}
                  aria-describedby={
                    errors.privacyConsent
                      ? `${uid}-privacyConsent-error`
                      : undefined
                  }
                  onChange={(e) => set("privacyConsent", e.target.checked)}
                />
                <span>
                  Souhlasím se zpracováním osobních údajů pro tento účel podle{" "}
                  <Link href="/ochrana-osobnich-udaju">
                    informací o&nbsp;ochraně údajů
                  </Link>
                  .
                </span>
              </label>
              {error("privacyConsent")}
            </div>

            <div className={s.submitRow}>
              <button
                type="submit"
                className={s.primary}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Odesílám…" : "Odeslat"}
                <span aria-hidden="true">↗</span>
              </button>
              {status === "error" && (
                <p className={s.error} role="alert">
                  {sendError}
                </p>
              )}
            </div>
            <p className={s.prototype}>
              Prototyp: odpovědi se zatím ukládají jen na tomto počítači. Před
              spuštěním je napojíme na schválené úložiště vydavatele.
            </p>
          </fieldset>
        )}
      </form>

      <aside className={s.side} aria-label="Co se stane dál">
        {path === "pribeh" && <Summary path={path} values={values} live />}
        <p className={s.sideTitle}>Co se stane dál</p>
        <ol className={s.steps}>
          {(path ? plannedSteps[path] : [
            "Vyber, co je ti nejblíž.",
            "Vyplň pár údajů. Zabere to dvě minuty.",
            "V\u00a0tomto náhledu se údaje jen uloží. Automaticky se nikam neodesílají.",
          ]).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
