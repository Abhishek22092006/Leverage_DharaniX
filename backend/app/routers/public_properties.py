"""Public property routes for frontend demo/testing without authentication."""

from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud.property import (
    get_property_by_id,
    list_deeds_by_property,
    list_encumbrances_by_property,
    search_properties,
)
from app.exceptions import success_response
from app.schemas.deed import DeedRead
from app.schemas.encumbrance import EncumbranceRead
from app.schemas.property import PropertyRead, PropertySearchResponse

router = APIRouter(prefix="/public/properties", tags=["Public Properties"])


def _build_property_detail_response(db: Session, property_id: int) -> dict:
    """Build combined property payload with deeds and encumbrances."""
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    deeds = list_deeds_by_property(db, property_id)
    encumbrances = list_encumbrances_by_property(db, property_id)

    return {
        "property": PropertyRead.model_validate(prop).model_dump(mode="json"),
        "deeds": [DeedRead.model_validate(item).model_dump(mode="json") for item in deeds],
        "encumbrances": [
            EncumbranceRead.model_validate(item).model_dump(mode="json")
            for item in encumbrances
        ],
        "encumbrance_status": "Encumbered" if encumbrances else "Clear",
    }


@router.get(
    "/search",
    summary="Public search properties",
    description="Public search with partial matching and pagination for frontend testing.",
)
def search_properties_public_endpoint(
    survey_number: str | None = Query(
        default=None,
        description="Partial survey number search (case-insensitive).",
        examples={"default": {"summary": "Survey prefix", "value": "NSK/12"}},
    ),
    village: str | None = Query(
        default=None,
        description="Partial village name search (case-insensitive).",
        examples={"default": {"summary": "Village", "value": "Ozar"}},
    ),
    taluka: str | None = Query(
        default=None,
        description="Taluka name.",
        examples={"default": {"summary": "Taluka", "value": "Nashik"}},
    ),
    district: str | None = Query(
        default=None,
        description="District name.",
        examples={"default": {"summary": "District", "value": "Nashik"}},
    ),
    owner_name: str | None = Query(
        default=None,
        description="Partial owner name search (case-insensitive).",
        examples={"default": {"summary": "Owner name", "value": "Patil"}},
    ),
    page: int = Query(
        default=1,
        ge=1,
        description="Page number.",
        examples={"default": {"summary": "Page", "value": 1}},
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100,
        description="Rows per page.",
        examples={"default": {"summary": "Limit", "value": 10}},
    ),
    db: Session = Depends(get_db),
):
    """Public property search endpoint."""
    items, total = search_properties(
        db=db,
        survey_number=survey_number,
        village=village,
        taluka=taluka,
        district=district,
        owner_name=owner_name,
        page=page,
        limit=limit,
    )

    data = PropertySearchResponse(
        items=[PropertyRead.model_validate(item) for item in items],
        page=page,
        limit=limit,
        total=total,
    ).model_dump(mode="json")
    return success_response(data=data, message="Public properties fetched successfully")


@router.get(
    "/{property_id}",
    summary="Public property detail",
    description="Return public property detail with deeds and encumbrances.",
)
def get_property_public_endpoint(
    property_id: int = Path(
        ...,
        description="Property ID",
        examples={"default": {"summary": "Property ID", "value": 11}},
    ),
    db: Session = Depends(get_db),
):
    """Public combined property detail endpoint."""
    data = _build_property_detail_response(db, property_id)
    return success_response(data=data, message="Public property fetched successfully")
