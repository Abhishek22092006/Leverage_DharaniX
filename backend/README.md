# Land Ownership Information System Backend (FastAPI)

Hackathon-optimized FastAPI backend for land ownership details, deeds, and encumbrances, now configured for PostgreSQL (Supabase).

## Tech Stack

- Python 3.11+
- FastAPI
- SQLAlchemy 2.0 (sync)
- PostgreSQL (Supabase)
- Pydantic v2
- JWT auth (`python-jose`) + bcrypt hashing (`passlib[bcrypt]`)
- Alembic (optional)

## Quick Setup (Supabase)

1. Create and activate a virtual environment.

PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
```

2. Install dependencies.

```powershell
pip install -r requirements.txt
```

3. Copy environment template.

```powershell
Copy-Item .env.example .env
```

4. Update `.env` with your Supabase DB URL.

```env
DATABASE_URL="postgresql+psycopg2://postgres:[YOUR_DB_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

5. Start server.

```powershell
uvicorn app.main:app --reload
```

On startup, tables are created automatically via `Base.metadata.create_all(bind=engine)`.

## Seeding Data

Seed realistic Nashik district records (12 properties, deeds, encumbrances):

```powershell
python -m app.seed
```

You will see a completion message with inserted counts.

## Optional Alembic

Alembic is kept optional for webathon speed.

If needed:

```powershell
alembic revision --autogenerate -m "schema update"
alembic upgrade head
```

## API Base

- Base URL: `http://127.0.0.1:8000`
- API prefix: `/api`
- Swagger UI: `/docs`
- ReDoc: `/redoc`

## Health Endpoint

- `GET /api/health`

Returns a success envelope with:

```json
{
   "success": true,
   "data": {
      "status": "ok",
      "database": "connected"
   },
   "message": "Health check successful",
   "error": null
}
```

## Main Endpoints to Test

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/properties/search?survey_number=NSK&village=Ozar&taluka=Nashik`
- `GET /api/properties/{property_id}`
- `GET /api/properties/{property_id}/deeds`
- `GET /api/properties/{property_id}/encumbrances`

## Response Format

All endpoints use:

```json
{
   "success": true,
   "data": {},
   "message": "...",
   "error": null
}
```

Error responses use:

```json
{
   "success": false,
   "data": null,
   "message": "...",
   "error": "..."
}
```

## CORS

Allowed origins:

- `http://localhost:3000`
- `http://localhost:3001`

Configured via `CORS_ORIGINS` in `.env`.

## Webathon Run Flow

1. Set Supabase `DATABASE_URL` in `.env`.
2. Start backend: `uvicorn app.main:app --reload`.
3. Seed demo records: `python -m app.seed`.
4. Open Swagger: `http://127.0.0.1:8000/docs`.
5. Test auth first, then property/deed/encumbrance APIs.
