# roadmap-builder

Monorepo for the Roadmap Builder web application.

```
roadmap-builder/
├── frontend/   # React + Vite + TypeScript (multipage SPA via React Router)
└── backend/    # FastAPI (Python 3.11+) service
```

## Quick start

### Backend
```bash
cd backend
uv sync                      # or: pip install -e ".[dev]"
uv run uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
pnpm install
pnpm dev                     # http://localhost:5173
```

The frontend dev server proxies `/api/*` to the backend on port 8000.
