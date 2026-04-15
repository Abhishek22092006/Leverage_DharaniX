"""Deed schemas."""

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class DeedCreate(BaseModel):
    """Schema for creating deed entries for a property."""

    deed_type: str = Field(min_length=2, max_length=50)
    execution_date: date
    registration_number: str = Field(min_length=2, max_length=150)
    parties: list[dict] = Field(default_factory=list)
    document_url: HttpUrl | None = None


class DeedRead(BaseModel):
    """Schema for deed output."""

    id: int
    property_id: int
    deed_type: str
    execution_date: date
    registration_number: str
    parties: list[dict]
    document_url: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
