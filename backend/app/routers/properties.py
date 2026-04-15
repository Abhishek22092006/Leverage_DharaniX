"""Routes for property, deed, and encumbrance operations."""

from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud.property import (
    create_deed,
    create_encumbrance,
    create_property,
    get_property_by_id,
    list_deeds_by_property,
    list_encumbrances_by_property,
    search_properties,
    update_property,
)
from app.exceptions import success_response
from app.schemas.deed import DeedCreate, DeedRead
from app.schemas.encumbrance import EncumbranceCreate, EncumbranceRead
from app.schemas.property import (
    PropertyCreate,
    PropertyRead,
    PropertySearchResponse,
    PropertyUpdate,
)
from app.utils.dependencies import get_current_admin, get_current_user

router = APIRouter(prefix="/properties", tags=["Properties"])


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
    summary="Search properties",
    description="Search properties with partial matching on survey number, village, and owner name.",
)
def search_properties_endpoint(
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
    _: object = Depends(get_current_user),
):
    """Search properties by optional geographic/owner filters with pagination."""
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
    return success_response(data=data, message="Properties fetched successfully")


@router.get(
    "/{property_id}",
    summary="Get property detail",
    description="Return property info along with deeds and encumbrances.",
)
def get_property_endpoint(
    property_id: int = Path(
        ...,
        description="Property ID",
        examples={"default": {"summary": "Property ID", "value": 11}},
    ),
    db: Session = Depends(get_db),
    _: object = Depends(get_current_user),
):
    """Get combined details of a single property by ID."""
    data = _build_property_detail_response(db, property_id)
    return success_response(data=data, message="Property fetched successfully")


@router.post("", status_code=status.HTTP_201_CREATED)
def create_property_endpoint(
    payload: PropertyCreate,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin),
):
    """Create a new property record (admin only)."""
    prop = create_property(db, payload)
    data = PropertyRead.model_validate(prop).model_dump(mode="json")
    return success_response(data=data, message="Property created successfully", status_code=201)


@router.put("/{property_id}")
def update_property_endpoint(
    property_id: int,
    payload: PropertyUpdate,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin),
):
    """Update an existing property record (admin only)."""
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    updated = update_property(db, prop, payload)
    data = PropertyRead.model_validate(updated).model_dump(mode="json")
    return success_response(data=data, message="Property updated successfully")


@router.get("/{property_id}/deeds")
def get_deeds_for_property(
    property_id: int,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_user),
):
    """List all deeds associated with a property."""
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    deeds = list_deeds_by_property(db, property_id)
    data = [DeedRead.model_validate(item).model_dump(mode="json") for item in deeds]
    return success_response(data=data, message="Deeds fetched successfully")


@router.post("/{property_id}/deeds", status_code=status.HTTP_201_CREATED)
def create_deed_for_property(
    property_id: int,
    payload: DeedCreate,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin),
):
    """Create deed entry for a property (admin only)."""
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    deed = create_deed(db, property_id, payload)
    data = DeedRead.model_validate(deed).model_dump(mode="json")
    return success_response(data=data, message="Deed created successfully", status_code=201)


@router.get("/{property_id}/encumbrances")
def get_encumbrances_for_property(
    property_id: int,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_user),
):
    """List all encumbrances associated with a property."""
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    encumbrances = list_encumbrances_by_property(db, property_id)
    data = [
        EncumbranceRead.model_validate(item).model_dump(mode="json")
        for item in encumbrances
    ]
    return success_response(data=data, message="Encumbrances fetched successfully")


@router.post("/{property_id}/encumbrances", status_code=status.HTTP_201_CREATED)
def create_encumbrance_for_property(
    property_id: int,
    payload: EncumbranceCreate,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin),
):
    """Create encumbrance entry for a property (admin only)."""
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    encumbrance = create_encumbrance(db, property_id, payload)
    data = EncumbranceRead.model_validate(encumbrance).model_dump(mode="json")
    return success_response(
        data=data,
        message="Encumbrance created successfully",
        status_code=201,
    )
