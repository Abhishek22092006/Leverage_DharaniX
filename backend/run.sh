#!/usr/bin/env bash
set -euo pipefail

# Starts FastAPI app with auto-reload for local development.
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
