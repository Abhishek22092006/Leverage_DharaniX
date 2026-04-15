"""Shared dependency functions for authenticated access control."""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Return currently authenticated user based on bearer token."""
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    payload = decode_access_token(token)
    if not payload:
        raise credentials_error

    email: str | None = payload.get("sub")
    if not email:
        raise credentials_error

    result = db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        raise credentials_error

    return user


def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """Ensure currently authenticated user has admin privileges."""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user
