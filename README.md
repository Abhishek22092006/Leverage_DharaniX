 # 🏠 DharaniX – Property Intelligence & Land Verification System

DharaniX is a full-stack web application that enables users to **verify land ownership instantly**, uncover **hidden risks (loans, disputes)**, and access **complete property history** using a parcel ID or address.

Built during a **6-hour Webathon**, DharaniX focuses on solving real-world problems in land verification with speed, transparency, and accessibility.

---

## ✨ Key Features

### 🔍 Smart Property Search
- Search using **parcel ID / property ID / address**
- Instant property lookup via API

### 📄 Property Intelligence Report
- Ownership details
- Transaction (deeds) history
- Encumbrances (loans, disputes)
- Risk indicators (Clear / Encumbered)

### 🔐 Authentication
- User registration & login
- JWT-based authentication

### 🧾 Deeds Management
- View ownership history
- Add new property transactions

### ⚠️ Encumbrance Tracking
- View legal liabilities
- Add loans/disputes

### 📥 Report Download
- Download property report for verification

---

## 🧠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- FastAPI (Python)
- PostgreSQL (Supabase)
- SQLAlchemy ORM
- Alembic (migrations)
- JWT Authentication

---

## 📁 Project Structure


DharaniX/
│
├── frontend/ # Next.js frontend
│ ├── app/
│ ├── components/
│ └── styles/
│
├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── core/ # config, security
│ │ ├── models/ # DB models
│ │ ├── routers/ # API routes
│ │ ├── schemas/ # request/response schemas
│ │ └── main.py
│ ├── alembic/
│ └── requirements.txt
│
└── README.md


---

## ⚙️ Backend Setup (FastAPI)

### 1. Navigate to backend
```bash
cd backend
2. Install dependencies
pip install -r requirements.txt
3. Environment Variables (.env)

Create a .env file:

DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

👉 Supabase PostgreSQL connection string can be used here.

4. Run database migrations
alembic upgrade head
5. Start backend server
uvicorn app.main:app --reload

🌐 Backend URLs
API: http://127.0.0.1:8000
Swagger Docs: http://127.0.0.1:8000/docs

🌐 Frontend Setup (Next.js)
1. Navigate to frontend
cd frontend
2. Install dependencies
npm install
3. Run frontend
npm run dev

🌐 Frontend URL
http://localhost:3000

🔗 API Overview
🔍 Public APIs
GET /api/public/properties/search
GET /api/public/properties/{property_id}
🔐 Auth APIs
POST /api/auth/register
POST /api/auth/login
🏠 Property APIs
GET    /api/properties
GET    /api/properties/{property_id}
PUT    /api/properties/{property_id}
🧾 Deeds APIs
GET  /api/properties/{property_id}/deeds
POST /api/properties/{property_id}/deeds
⚠️ Encumbrance APIs
GET  /api/properties/{property_id}/encumbrances
POST /api/properties/{property_id}/encumbrances

🔄 Application Flow
User Input (Parcel ID)
→ Search API
→ Get property ID
→ Navigate to property detail page
→ Fetch full report (ownership + deeds + encumbrances)

🧪 Testing
Use Swagger UI for backend testing
Test full frontend flow:
Search → Property → Report
Register/Login
Add deeds & encumbrances
Update property
Download report

⚠️ Common Issues
422 Validation Error
Incorrect request body
Missing required fields
401 Unauthorized
Missing JWT token in headers
CORS Issue
Ensure backend allows frontend origin

🚀 Future Improvements
PDF report generation
Role-based dashboards (Admin/User)
AI-based fraud detection
Integration with government land records
Map-based visualization

👨‍💻 Team
Abhishek Rohokale – Backend, Database, API Development
Antriksh Lakde – Frontend, UI/UX, API Integration

🏆 Hackathon Context
Built during a 6-hour Webathon
Developed by a 2-member team
Achieved Top 7 out of 50 teams

⭐ Conclusion
DharaniX simplifies land verification by transforming complex property data into a fast, transparent, and actionable report, helping reduce fraud and improve trust in property transactions.
---
