"""Unified API response builders and global exception handlers."""

from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


def success_response(data: object, message: str = "Success", status_code: int = 200) -> JSONResponse:
    """Return a standard success envelope for all successful API responses."""
    return JSONResponse(
        status_code=status_code,
        content={
            "success": True,
            "data": data,
            "message": message,
            "error": None,
        },
    )


def error_response(
    message: str = "Error",
    error: str | object = "Unexpected error",
    status_code: int = 400,
) -> JSONResponse:
    """Return a standard error envelope for all failure API responses."""
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "data": None,
            "message": message,
            "error": str(error),
        },
    )


async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    """Convert HTTPException into the unified error response schema."""
    return error_response(
        message="Request failed",
        error=exc.detail,
        status_code=exc.status_code,
    )


async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    """Convert Pydantic/FastAPI validation errors into unified schema."""
    return error_response(
        message="Validation error",
        error=exc.errors(),
        status_code=422,
    )


async def generic_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected uncaught exceptions gracefully."""
    return error_response(
        message="Internal server error",
        error=str(exc),
        status_code=500,
    )
