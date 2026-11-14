import { randomUUID } from "node:crypto";
import { validateContact } from "@/lib/contacts/schema";
import { saveContact } from "@/lib/contacts/store";

// Runs on the default Node.js runtime (file system access for the prototype store).
// Small in-memory throttle per client address; enough for a local prototype.
const recent = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 8;

function throttled(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > MAX;
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 20_000)
      return Response.json({ ok: false, error: "too-large" }, { status: 413 });
    input = JSON.parse(body);
    if (!input || typeof input !== "object" || Array.isArray(input))
      return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  // Honeypot: people never see this field, simple bots fill it.
  if (typeof input.website === "string" && input.website.trim())
    return Response.json({ ok: true, id: randomUUID() });

  const client =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (throttled(client))
    return Response.json({ ok: false, error: "rate" }, { status: 429 });

  const result = validateContact(input);
  if (!result.ok)
    return Response.json(
      { ok: false, error: "validation", errors: result.errors },
      { status: 422 },
    );
  const record = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ...result.record,
  };
  try {
    await saveContact(record);
  } catch {
    return Response.json({ ok: false, error: "storage" }, { status: 500 });
  }
  return Response.json({ ok: true, id: record.id });
}
