"""FastAPI application entrypoint."""

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import settings
from app.core.database import Base, SessionLocal, engine
from app.exceptions import (
    generic_exception_handler,
    success_response,
    http_exception_handler,
    validation_exception_handler,
)
from app.models import deed, encumbrance, property, user  # noqa: F401
from app.routers import auth, properties, public_properties


def create_application() -> FastAPI:
    """Build and configure the FastAPI application instance."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description="Secure API for land ownership, deeds, and encumbrance data.",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS is configured for local frontend development and production domain.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register global exception handlers for consistent API response envelopes.
    app.add_exception_handler(Exception, generic_exception_handler)
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)

    app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
    app.include_router(properties.router, prefix=settings.API_V1_PREFIX)
    app.include_router(public_properties.router, prefix=settings.API_V1_PREFIX)

    @app.on_event("startup")
    def startup_create_tables() -> None:
        """Create tables at app startup for hackathon-speed setup."""
        Base.metadata.create_all(bind=engine)

    @app.get("/", tags=["Health"])
    async def health_check() -> dict[str, str]:
        """Basic health check endpoint."""
        return {"status": "ok", "service": settings.PROJECT_NAME}

    @app.get(f"{settings.API_V1_PREFIX}/health", tags=["Health"])
    def api_health_check():
        """Verify API and database connectivity."""
        with SessionLocal() as session:
            session.execute(text("SELECT 1"))

        return success_response(
            data={"status": "ok", "database": "connected"},
            message="Health check successful",
        )

    return app


app = create_application()
