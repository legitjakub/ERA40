"use client";

import { event, eventConfirmed } from "@/content/event";

const stamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Downloads an .ics file built in the browser; hidden until the date is confirmed. */
export function AddToCalendar({ className }: { className?: string }) {
  if (!eventConfirmed() || !event.start) return null;
  function download() {
    const start = event.start!;
    const end = event.end ?? new Date(Date.parse(start) + 8 * 3600_000).toISOString();
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ERA40//Oslava//CS",
      "BEGIN:VEVENT",
      `UID:oslava-40-let-erasmu@era40`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${[event.venue.name, event.venue.address].filter(Boolean).join(", ")}`,
      `DESCRIPTION:${event.claim}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    const url = URL.createObjectURL(
      new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "oslava-40-let-erasmu.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button type="button" className={className} onClick={download}>
      Přidat do kalendáře
    </button>
  );
}
