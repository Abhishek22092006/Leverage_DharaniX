"""Schema package exports."""

from app.schemas.deed import DeedCreate, DeedRead
from app.schemas.encumbrance import EncumbranceCreate, EncumbranceRead
from app.schemas.property import PropertyCreate, PropertyRead, PropertySearchResponse, PropertyUpdate
from app.schemas.user import LoginRequest, TokenData, UserCreate, UserRead

__all__ = [
    "UserCreate",
    "UserRead",
    "LoginRequest",
    "TokenData",
    "PropertyCreate",
    "PropertyRead",
    "PropertyUpdate",
    "PropertySearchResponse",
    "DeedCreate",
    "DeedRead",
    "EncumbranceCreate",
    "EncumbranceRead",
]
