"""CRUD functions for properties, deeds, and encumbrances."""

from collections.abc import Sequence

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.deed import Deed
from app.models.encumbrance import Encumbrance
from app.models.property import Property
from app.schemas.deed import DeedCreate
from app.schemas.encumbrance import EncumbranceCreate
from app.schemas.property import PropertyCreate, PropertyUpdate


def create_property(db: Session, payload: PropertyCreate) -> Property:
    """Insert and return a new property record."""
    prop = Property(**payload.model_dump())
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop


def update_property(db: Session, prop: Property, payload: PropertyUpdate) -> Property:
    """Apply partial updates to a property record."""
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(prop, field, value)

    db.commit()
    db.refresh(prop)
    return prop


def get_property_by_id(db: Session, property_id: int) -> Property | None:
    """Fetch one property by primary key."""
    result = db.execute(select(Property).where(Property.id == property_id))
    return result.scalar_one_or_none()


def search_properties(
    db: Session,
    page: int,
    limit: int,
    survey_number: str | None = None,
    village: str | None = None,
    taluka: str | None = None,
    district: str | None = None,
    owner_name: str | None = None,
) -> tuple[Sequence[Property], int]:
    """Search properties with optional filters and pagination."""
    filters = []
    if survey_number:
        filters.append(Property.survey_number.ilike(f"%{survey_number}%"))
    if village:
        filters.append(Property.village.ilike(f"%{village}%"))
    if taluka:
        filters.append(Property.taluka.ilike(f"%{taluka}%"))
    if district:
        filters.append(Property.district.ilike(f"%{district}%"))
    if owner_name:
        filters.append(Property.current_owner.ilike(f"%{owner_name}%"))

    base_query = select(Property)
    count_query = select(func.count(Property.id))

    if filters:
        base_query = base_query.where(*filters)
        count_query = count_query.where(*filters)

    total_result = db.execute(count_query)
    total = total_result.scalar_one()

    offset = (page - 1) * limit
    data_result = db.execute(
        base_query.order_by(Property.created_at.desc()).offset(offset).limit(limit)
    )
    items = data_result.scalars().all()

    return items, total


def list_deeds_by_property(db: Session, property_id: int) -> Sequence[Deed]:
    """Return all deeds linked to a property."""
    result = db.execute(
        select(Deed)
        .where(Deed.property_id == property_id)
        .order_by(Deed.execution_date.desc(), Deed.id.desc())
    )
    return result.scalars().all()


def create_deed(db: Session, property_id: int, payload: DeedCreate) -> Deed:
    """Create a deed for a specific property."""
    deed = Deed(property_id=property_id, **payload.model_dump())
    db.add(deed)
    db.commit()
    db.refresh(deed)
    return deed


def list_encumbrances_by_property(db: Session, property_id: int) -> Sequence[Encumbrance]:
    """Return all encumbrances linked to a property."""
    result = db.execute(
        select(Encumbrance)
        .where(Encumbrance.property_id == property_id)
        .order_by(Encumbrance.id.desc())
    )
    return result.scalars().all()


def create_encumbrance(
    db: Session,
    property_id: int,
    payload: EncumbranceCreate,
) -> Encumbrance:
    """Create an encumbrance for a specific property."""
    encumbrance = Encumbrance(property_id=property_id, **payload.model_dump())
    db.add(encumbrance)
    db.commit()
    db.refresh(encumbrance)
    return encumbrance
