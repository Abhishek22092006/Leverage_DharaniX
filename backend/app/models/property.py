"""Property model containing land ownership details."""

from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Property(Base):
    """Land property entity."""

    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    survey_number: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    gat_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    village: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    taluka: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    district: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    area_sqft: Mapped[float] = mapped_column(Float, nullable=False)
    current_owner: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    owner_contact: Mapped[str | None] = mapped_column(String(20), nullable=True)
    pincode: Mapped[str | None] = mapped_column(String(10), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    deeds = relationship(
        "Deed",
        back_populates="property",
        cascade="all, delete-orphan",
    )
    encumbrances = relationship(
        "Encumbrance",
        back_populates="property",
        cascade="all, delete-orphan",
    )
