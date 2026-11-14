import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { ContactRecord } from "./schema";

/**
 * Prototype storage: one JSON line per submission in web/data/ (git-ignored).
 * Before launch, replace this function with the publisher's approved storage
 * (CRM or database) — the form and API do not need to change.
 */
const FILE = join(process.cwd(), "data", "kontakty.ndjson");

export async function saveContact(record: ContactRecord) {
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await appendFile(FILE, JSON.stringify(record) + "\n", "utf8");
}
