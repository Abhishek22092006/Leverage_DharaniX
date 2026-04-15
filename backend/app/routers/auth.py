"""Authentication routes for user registration and login."""

from fastapi import APIRouter, Body, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.exceptions import success_response
from app.models.user import User, UserRole
from app.schemas.user import LoginRequest, TokenData, UserCreate, UserRead

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    summary="Register user",
    description="Create a new user account and return profile details.",
)
def register_user(
    payload: UserCreate = Body(
        ...,
        example={
            "email": "demo.user@example.com",
            "password": "StrongPass123",
            "full_name": "Demo User",
            "role": "admin",
        },
    ),
    db: Session = Depends(get_db),
):
    """Register a new user and return profile details."""
    existing_user_result = db.execute(select(User).where(User.email == payload.email))
    existing_user = existing_user_result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role=UserRole(payload.role.value),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    data = UserRead.model_validate(user).model_dump(mode="json")
    return success_response(data=data, message="User registered successfully", status_code=201)


@router.post(
    "/login",
    summary="Login user",
    description="Authenticate with email and password and receive a bearer token.",
)
def login_user(
    payload: LoginRequest = Body(
        ...,
        example={
            "email": "demo.user@example.com",
            "password": "StrongPass123",
        },
    ),
    db: Session = Depends(get_db),
):
    """Authenticate user and issue JWT access token."""
    result = db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(subject=user.email)
    token_data = TokenData(access_token=token).model_dump(mode="json")
    return success_response(data=token_data, message="Login successful")
