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
import { downloadTicket } from "./downloadTicket";
import { Ticket } from "./Ticket";
import { AddToCalendar } from "@/components/event/AddToCalendar";
import s from "./JoinForm.module.css";

/*
 * One form, three paths. The visitor first says who they are; the fields,
 * the side panel and the thank-you change with it. Former participants get a
 * live preview of their personal "jízdenka" and can download it after sending.
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
  guests: "1",
  website: "",
  publishConsent: false,
  newsletter: false,
  privacyConsent: false,
};

const nextSteps: Record<ContactPath, string[]> = {
  oslava: [
    "Registraci jsme uložili.",
    "Jakmile zveřejníme datum, místo a program, pošleme vám je e-mailem.",
    "Pokud se nebudete moci zúčastnit, stačí nám odepsat.",
  ],
  pribeh: [
    "Příběh si přečte redakce výročí.",
    "Pokud ho budeme chtít zveřejnit, ozveme se a pošleme vám upravený text ke schválení.",
    "Bez vašeho souhlasu nic nezveřejníme.",
  ],
  vyjet: [
    "Pošleme vám přehled, kdo a kam může s Erasmem+ vyjet.",
    "Upozorníme vás na výzvy a akce k výročí, pokud o to stojíte.",
    "Odhlásit se můžete jedním odkazem v každém e-mailu.",
  ],
  organizace: [
    "Ozveme se vám do dvou týdnů.",
    "Domluvíme, jak vaši akci nebo projekt propojit s výročím.",
    "Kontakt použijeme jen pro tuto spolupráci.",
  ],
};

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
          ? "Za chvíli to prosím zkuste znovu. Vaše vyplněné údaje zůstávají tady."
          : "Odeslání se nepovedlo. Vaše údaje zůstávají vyplněné, zkuste to prosím znovu.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setSendError("Připojení se přerušilo. Vaše údaje zůstávají vyplněné, zkuste to prosím znovu.");
      setStatus("error");
    }
  }

  const ticket = {
    name: String(values.name),
    from: String(values.from),
    to: String(values.to),
    year: String(values.year),
  };

  if (status === "sent" && path) {
    return (
      <div
        className={s.done}
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <p className={s.doneKicker}>Odesláno</p>
        <h2 className={s.doneTitle}>
          {path === "oslava"
            ? "Děkujeme. Počítáme s vámi."
            : path === "pribeh"
            ? "Děkujeme. Vaše cesta je na trase."
            : path === "vyjet"
              ? "Děkujeme. Ozveme se s první zastávkou."
              : "Děkujeme. Brzy se ozveme."}
        </h2>
        {path === "oslava" && (
          <p className={s.doneLinks}>
            <AddToCalendar className={s.secondary} />
            <Link href="/oslava">Program oslavy</Link>
          </p>
        )}
        {path === "pribeh" && (
          <div className={s.doneTicket}>
            <Ticket data={ticket} />
            <button
              type="button"
              className={s.secondary}
              onClick={() => downloadTicket(ticket)}
            >
              Stáhnout jízdenku jako obrázek
            </button>
          </div>
        )}
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
            <span className={s.stepNo}>1</span> Co je vám nejblíž?
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
              {path === "oslava"
                ? "Vaše registrace"
                : path === "pribeh"
                ? "Vaše cesta"
                : path === "vyjet"
                  ? "Kam vám máme psát"
                  : "Vaše škola nebo organizace"}
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
                  Vaše role <span className={s.optional}>nepovinné</span></label>
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
                      <option value="">Vyberte</option>
                      {mobilityOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={s.label}>
                  <label htmlFor={`${uid}-story`}>
                  Co vám z cesty zůstalo?</label>
                  <textarea
                    {...field("story")}
                    rows={7}
                    maxLength={6000}
                    required
                    placeholder="Okamžik, člověk, věta, kterou si pamatujete. Pár řádků stačí."
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
                    Příběh můžete po redakční úpravě a mém schválení zveřejnit.
                  </span>
                </label>
              </>
            )}

            {path === "oslava" && (
              <div className={s.row}>
                <div className={s.label}>
                  <label htmlFor={`${uid}-guests`}>Počet osob</label>
                  <select {...field("guests")}>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {error("guests")}
                </div>
              </div>
            )}

            {path === "vyjet" && (
              <div className={s.row}>
                <div className={s.label}>
                  <label htmlFor={`${uid}-audience`}>
                  Kdo jste <span className={s.optional}>nepovinné</span></label>
                  <select {...field("audience")}>
                    <option value="">Vyberte</option>
                    {audienceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className={s.label}>
                  <label htmlFor={`${uid}-destination`}>
                  Kam by vás to táhlo?{" "}
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
                  Co chystáte? <span className={s.optional}>nepovinné</span></label>
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
                <span>Chci dostávat novinky k 40 letům Erasmu.</span>
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
                    informací o ochraně údajů
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
        {path === "pribeh" ? (
          <>
            <p className={s.sideTitle}>Vaše jízdenka</p>
            <Ticket data={ticket} />
            <p className={s.sideNote}>
              Po odeslání si ji můžete stáhnout a sdílet.
            </p>
          </>
        ) : (
          <>
            <p className={s.sideTitle}>Co se stane dál</p>
            <ol className={s.steps}>
              {(path ? nextSteps[path] : [
                "Vyberte, co je vám nejblíž.",
                "Vyplňte pár údajů. Zabere to dvě minuty.",
                "Ozveme se, nebo vám pošleme, co potřebujete.",
              ]).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </>
        )}
      </aside>
    </div>
  );
}
