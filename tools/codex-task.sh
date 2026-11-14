#!/usr/bin/env bash
# Run one Codex task from a brief. See docs/orchestration/ORCHESTRATION.md (§2, §3, §8).
#   tools/codex-task.sh docs/agent-briefs/CDX-001-slug.md [read-only|workspace-write|worktree]
# Never uses --dangerously-bypass-approvals-and-sandbox, --approve-for-me or danger-full-access.
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRIEF="${1:?brief path required}"
MODE="${2:-read-only}"
CODEX="${CODEX_BIN:-$(command -v codex || true)}"
[ -n "$CODEX" ] || CODEX="/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex"
[ -x "$CODEX" ] || { echo "Codex CLI not found (set CODEX_BIN)" >&2; exit 2; }
[ -f "$BRIEF" ] || { echo "Brief not found: $BRIEF" >&2; exit 2; }

BASE_ID="$(basename "$BRIEF" .md)"
LOGS="$ROOT/docs/agent-reports/logs"
mkdir -p "$LOGS"
# Never overwrite evidence: a repeated run gets an attempt suffix (-a2, -a3 …).
ID="$BASE_ID"
n=1
while [ -e "$ROOT/docs/agent-reports/$ID.md" ] || [ -e "$LOGS/$ID.jsonl" ]; do
  n=$((n + 1))
  ID="$BASE_ID-a$n"
done
REPORT="$ROOT/docs/agent-reports/$ID.md"
LOG="$LOGS/$ID.jsonl"
BASELINE="$LOGS/$ID.baseline"

# Baseline snapshot so the review can tell this run's increment from other agents' work.
{
  echo "id: $ID"
  echo "mode: $MODE"
  echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "head: $(git -C "$ROOT" rev-parse HEAD)"
  echo "--- git status --porcelain"
  git -C "$ROOT" status --porcelain
} > "$BASELINE"

ARGS=(exec --cd "$ROOT" --output-last-message "$REPORT" --json)
# NETWORK=1 lets a workspace-write task fetch documentation (research briefs only).
if [ "${NETWORK:-0}" = "1" ]; then ARGS+=(-c sandbox_workspace_write.network_access=true); fi
case "$MODE" in
  read-only) ARGS+=(--sandbox read-only) ;;
  workspace-write) ARGS+=(--sandbox workspace-write) ;;
  worktree) ARGS+=(--sandbox workspace-write --worktree) ;;
  *) echo "Unknown mode: $MODE" >&2; exit 2 ;;
esac

{
  cat "$BRIEF"
  printf '\n\n---\nTask run ID: %s (mode %s, base %s).\n' "$ID" "$MODE" "$(git -C "$ROOT" rev-parse --short HEAD)"
  printf 'Final message = the report, in Czech, following docs/agent-reports/_TEMPLATE.md. It is saved to docs/agent-reports/%s.md.\n' "$ID"
} | "$CODEX" "${ARGS[@]}" - > "$LOG"
STATUS=$?

echo "Run:      $ID (exit $STATUS)"
echo "Report:   $REPORT"
echo "Log:      $LOG"
echo "Baseline: $BASELINE"
if [ "$STATUS" -ne 0 ]; then
  echo "Codex exec failed. Last log lines:" >&2
  tail -n 20 "$LOG" >&2
fi
exit "$STATUS"
