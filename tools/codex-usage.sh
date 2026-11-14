#!/usr/bin/env bash
# Latest Codex rate-limit usage from local session logs (no network).
# Prints: primary=<5h %> secondary=<weekly %> resets_primary=<local time>
f=$(ls -t ~/.codex/sessions/*/*/*/*.jsonl 2>/dev/null | head -20 | while read -r x; do grep -q '"rate_limits"' "$x" && echo "$x" && break; done)
[ -n "$f" ] || { echo "no-usage-data"; exit 1; }
python3 - "$f" <<'PY'
import json, sys, datetime
last = None
for line in open(sys.argv[1]):
    if '"rate_limits"' in line:
        last = line
d = json.loads(last)
def find(o):
    if isinstance(o, dict):
        if "rate_limits" in o: return o["rate_limits"]
        for v in o.values():
            r = find(v)
            if r: return r
rl = find(d)
p, s = rl["primary"], rl["secondary"]
reset = datetime.datetime.fromtimestamp(p["resets_at"]).strftime("%H:%M")
print(f"primary={p['used_percent']:.0f} secondary={s['used_percent']:.0f} resets_primary={reset}")
PY
