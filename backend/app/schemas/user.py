"""User-related request and response schemas."""

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserRoleSchema(str, Enum):
    """Supported role values for API input/output."""

    user = "user"
    admin = "admin"


class UserCreate(BaseModel):
    """Schema for user registration."""

    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str = Field(min_length=2, max_length=255)
    role: UserRoleSchema = UserRoleSchema.user


class UserRead(BaseModel):
    """Schema for exposing user details."""

    id: int
    email: EmailStr
    full_name: str
    role: UserRoleSchema
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    """Schema for login credentials."""

    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class TokenData(BaseModel):
    """Token payload response."""

    access_token: str
    token_type: str = "bearer"
