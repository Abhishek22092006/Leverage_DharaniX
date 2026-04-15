"""Seed script for realistic Nashik land records data."""

from datetime import date

from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.deed import Deed
from app.models.encumbrance import Encumbrance
from app.models.property import Property


def _property_payloads() -> list[dict]:
    """Return 12 realistic property records from Nashik district."""
    return [
        {
            "survey_number": "NSK/123/2025",
            "gat_number": "Gat No. 456",
            "village": "Ozar",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 18750.0,
            "current_owner": "Sachin Bhalchandra Patil",
            "owner_contact": "+91-9822341123",
            "pincode": "422206",
        },
        {
            "survey_number": "NSK/124/2025",
            "gat_number": "Gat No. 462",
            "village": "Sinnar",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 24200.0,
            "current_owner": "Sunita Rajendra More",
            "owner_contact": "+91-9764512234",
            "pincode": "422103",
        },
        {
            "survey_number": "NSK/125/2025",
            "gat_number": "Gat No. 318",
            "village": "Igatpuri",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 16000.0,
            "current_owner": "Vijay Shankar Gawali",
            "owner_contact": "+91-9870011456",
            "pincode": "422403",
        },
        {
            "survey_number": "NSK/126/2025",
            "gat_number": "Gat No. 271",
            "village": "Dindori",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 29100.0,
            "current_owner": "Pradnya Mohan Kulkarni",
            "owner_contact": "+91-9890894512",
            "pincode": "422202",
        },
        {
            "survey_number": "NSK/127/2025",
            "gat_number": "Gat No. 502",
            "village": "Nashik",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 13500.0,
            "current_owner": "Anil Nivrutti Jadhav",
            "owner_contact": "+91-9922553321",
            "pincode": "422001",
        },
        {
            "survey_number": "NSK/128/2025",
            "gat_number": "Gat No. 441",
            "village": "Ozar",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 20800.0,
            "current_owner": "Rohini Vaibhav Ahire",
            "owner_contact": "+91-9823011772",
            "pincode": "422207",
        },
        {
            "survey_number": "NSK/129/2025",
            "gat_number": "Gat No. 355",
            "village": "Sinnar",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 19860.0,
            "current_owner": "Mahesh Bapurao Pawar",
            "owner_contact": "+91-9860054410",
            "pincode": "422104",
        },
        {
            "survey_number": "NSK/130/2025",
            "gat_number": "Gat No. 287",
            "village": "Igatpuri",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 22640.0,
            "current_owner": "Pooja Vinod Sonawane",
            "owner_contact": "+91-9767445081",
            "pincode": "422404",
        },
        {
            "survey_number": "NSK/131/2025",
            "gat_number": "Gat No. 190",
            "village": "Dindori",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 31200.0,
            "current_owner": "Hemant Ravindra Chavan",
            "owner_contact": "+91-9834661209",
            "pincode": "422205",
        },
        {
            "survey_number": "NSK/132/2025",
            "gat_number": "Gat No. 522",
            "village": "Nashik",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 14920.0,
            "current_owner": "Kiran Sharad Dhatrak",
            "owner_contact": "+91-9850067811",
            "pincode": "422002",
        },
        {
            "survey_number": "NSK/133/2025",
            "gat_number": "Gat No. 611",
            "village": "Ozar",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 27450.0,
            "current_owner": "Ramesh Dattatraya Shinde",
            "owner_contact": "+91-9766112345",
            "pincode": "422206",
        },
        {
            "survey_number": "NSK/134/2025",
            "gat_number": "Gat No. 677",
            "village": "Sinnar",
            "taluka": "Nashik",
            "district": "Nashik",
            "area_sqft": 22110.0,
            "current_owner": "Vaishali Jagannath Boraste",
            "owner_contact": "+91-9011023344",
            "pincode": "422103",
        },
    ]


def _deed_templates() -> list[dict]:
    """Base deed templates mapped per property."""
    return [
        {
            "deed_type": "Sale Deed",
            "execution_date": date(2021, 7, 14),
            "parties": [
                {"name": "Original Holder", "role": "Seller"},
                {"name": "Current Owner", "role": "Buyer"},
            ],
        },
        {
            "deed_type": "Mortgage Deed",
            "execution_date": date(2023, 11, 3),
            "parties": [
                {"name": "Current Owner", "role": "Mortgagor"},
                {"name": "State Bank of India", "role": "Mortgagee"},
            ],
        },
        {
            "deed_type": "Gift Deed",
            "execution_date": date(2024, 5, 21),
            "parties": [
                {"name": "Family Member", "role": "Donor"},
                {"name": "Current Owner", "role": "Donee"},
            ],
        },
    ]


def _encumbrance_templates() -> list[dict]:
    """Base encumbrance templates mapped per property."""
    return [
        {
            "enc_type": "Bank Loan",
            "amount": 1850000.0,
            "status": "active",
            "from_date": date(2023, 11, 3),
            "to_date": date(2038, 11, 3),
            "description": "Housing and land development term loan, entry reflected in 7/12 extract.",
        },
        {
            "enc_type": "Pending Dispute",
            "amount": None,
            "status": "active",
            "from_date": date(2024, 8, 18),
            "to_date": None,
            "description": "Civil boundary dispute recorded in revenue remarks column.",
        },
        {
            "enc_type": "Easement",
            "amount": None,
            "status": "active",
            "from_date": date(2022, 2, 10),
            "to_date": None,
            "description": "Registered right-of-way access for adjacent agricultural holding.",
        },
    ]


def seed_data() -> None:
    """Insert realistic hackathon seed data into PostgreSQL."""
    created_properties = 0
    created_deeds = 0
    created_encumbrances = 0

    with SessionLocal() as db:
        properties = _property_payloads()
        deed_templates = _deed_templates()
        enc_templates = _encumbrance_templates()

        for idx, payload in enumerate(properties, start=1):
            existing = db.execute(
                select(Property).where(Property.survey_number == payload["survey_number"])
            ).scalar_one_or_none()
            if existing:
                continue

            prop = Property(**payload)
            db.add(prop)
            db.flush()
            created_properties += 1

            deed_count = 2 if idx % 2 == 0 else 3
            for deed_idx in range(deed_count):
                base_deed = deed_templates[deed_idx]
                deed = Deed(
                    property_id=prop.id,
                    deed_type=base_deed["deed_type"],
                    execution_date=base_deed["execution_date"],
                    registration_number=f"NSK-REG-{2020 + deed_idx}-{idx:03d}",
                    parties=[
                        {
                            "name": party["name"].replace("Current Owner", payload["current_owner"]),
                            "role": party["role"],
                        }
                        for party in base_deed["parties"]
                    ],
                    document_url=f"https://records.nashik.gov.in/deeds/{payload['survey_number'].replace('/', '-')}-{deed_idx + 1}.pdf",
                )
                db.add(deed)
                created_deeds += 1

            enc_count = 1 if idx % 3 == 0 else 2
            for enc_idx in range(enc_count):
                base_enc = enc_templates[enc_idx]
                enc = Encumbrance(
                    property_id=prop.id,
                    enc_type=base_enc["enc_type"],
                    amount=base_enc["amount"],
                    status=base_enc["status"],
                    from_date=base_enc["from_date"],
                    to_date=base_enc["to_date"],
                    description=base_enc["description"],
                )
                db.add(enc)
                created_encumbrances += 1

        db.commit()

    print(
        "Seeding complete: "
        f"properties={created_properties}, deeds={created_deeds}, encumbrances={created_encumbrances}."
    )


if __name__ == "__main__":
    seed_data()
