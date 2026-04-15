"""Property schemas for create/update/read/search operations."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PropertyBase(BaseModel):
    """Common property fields shared by create/update schemas."""

    survey_number: str = Field(min_length=1, max_length=100)
    gat_number: str | None = Field(default=None, max_length=100)
    village: str = Field(min_length=1, max_length=120)
    taluka: str = Field(min_length=1, max_length=120)
    district: str = Field(min_length=1, max_length=120)
    area_sqft: float = Field(gt=0)
    current_owner: str = Field(min_length=1, max_length=255)
    owner_contact: str | None = Field(default=None, max_length=20)
    pincode: str | None = Field(default=None, min_length=6, max_length=10)


class PropertyCreate(PropertyBase):
    """Schema for creating a property record."""


class PropertyUpdate(BaseModel):
    """Schema for updating selected property fields."""

    survey_number: str | None = Field(default=None, min_length=1, max_length=100)
    gat_number: str | None = Field(default=None, max_length=100)
    village: str | None = Field(default=None, min_length=1, max_length=120)
    taluka: str | None = Field(default=None, min_length=1, max_length=120)
    district: str | None = Field(default=None, min_length=1, max_length=120)
    area_sqft: float | None = Field(default=None, gt=0)
    current_owner: str | None = Field(default=None, min_length=1, max_length=255)
    owner_contact: str | None = Field(default=None, max_length=20)
    pincode: str | None = Field(default=None, min_length=6, max_length=10)


class PropertyRead(PropertyBase):
    """Schema for returning full property details."""

    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PropertySearchResponse(BaseModel):
    """Schema for paginated property search response payload."""

    items: list[PropertyRead]
    page: int
    limit: int
    total: int
