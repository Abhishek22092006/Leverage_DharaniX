"""Encumbrance schemas."""

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class EncumbranceCreate(BaseModel):
    """Schema for creating encumbrance entries for a property."""

    enc_type: str = Field(min_length=2, max_length=50)
    amount: float | None = Field(default=None, ge=0)
    status: str = Field(min_length=2, max_length=50)
    from_date: date | None = None
    to_date: date | None = None
    description: str | None = Field(default=None, max_length=2000)


class EncumbranceRead(BaseModel):
    """Schema for encumbrance output."""

    id: int
    property_id: int
    enc_type: str
    amount: float | None
    status: str
    from_date: date | None
    to_date: date | None
    description: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
