#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
if ! command -v node >/dev/null 2>&1; then echo "❌ Node.js v18+ required"; exit 1; fi
PORT=4640
echo "🛰  JSON-OS runtime @ http://localhost:$PORT"
open_url () {
  URL="$1"
  if command -v cmd.exe >/dev/null 2>&1; then cmd.exe /c start "" "$URL" >/dev/null 2>&1 || true
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then open "$URL" >/dev/null 2>&1 || true
  fi
}
node server/server.js "$PORT" &
PID=$!
sleep 0.7
open_url "http://localhost:$PORT"
wait "$PID"
