"""Deed model representing registered legal documents for a property."""

from datetime import date, datetime

from sqlalchemy import JSON, Date, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Deed(Base):
    """Executed deed entity."""

    __tablename__ = "deeds"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    property_id: Mapped[int] = mapped_column(
        ForeignKey("properties.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    deed_type: Mapped[str] = mapped_column(String(50), nullable=False)
    execution_date: Mapped[date] = mapped_column(Date, nullable=False)
    registration_number: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)
    parties: Mapped[list[dict]] = mapped_column(JSON, nullable=False)
    document_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    property = relationship("Property", back_populates="deeds")
