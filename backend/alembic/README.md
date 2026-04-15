# Alembic Migration Setup

1. Install dependencies from `requirements.txt`.
2. Ensure `.env` is configured with a valid `DATABASE_URL`.
3. Create migration:
   - `alembic revision --autogenerate -m "init"`
4. Apply migration:
   - `alembic upgrade head`
