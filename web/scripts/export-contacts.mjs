#!/usr/bin/env node
// From web/: npm run kontakty:export  ->  data/kontakty-export.csv (UTF-8 with BOM for Excel)
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "data");
let raw = "";
try {
  raw = await readFile(join(dir, "kontakty.ndjson"), "utf8");
} catch {
  console.log("Zatím žádné kontakty (data/kontakty.ndjson neexistuje).");
  process.exit(0);
}
const rows = raw.split("\n").filter(Boolean).map((line) => JSON.parse(line));
const columns = [
  "receivedAt", "path", "name", "email", "guests", "newsletter", "from", "to", "year",
  "mobility", "publishConsent", "story", "audience", "destination",
  "organisation", "role", "phone", "message", "privacyVersion", "id",
];
const cell = (v) => {
  if (v === undefined || v === null) return "";
  const s = String(v);
  return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = [columns.join(";"), ...rows.map((r) => columns.map((c) => cell(r[c])).join(";"))].join("\r\n");
const out = join(dir, "kontakty-export.csv");
await writeFile(out, "﻿" + csv, "utf8");
const byPath = rows.reduce((acc, r) => ((acc[r.path] = (acc[r.path] || 0) + 1), acc), {});
console.log(`Exportováno ${rows.length} kontaktů do ${out}`, byPath);
