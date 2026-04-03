# 🧠 My Archive — Backend-Driven Historical Data Platform

## 📌 Overview
My Archive is a full-stack application designed to explore and organize lesser-known historical archives such as ships, buildings, and other overlooked subjects.

The system focuses on structuring historical data sourced from research-based materials and presenting it through a clean, scalable web interface.

---

## 🛠️ Tech Stack
- Backend: Node.js, Express.js  
- Frontend: React.js  
- Database: MongoDB (planned integration), currently using mock dataset for API validation  
- Authentication: JWT  
- File Handling: Multer  

---

## 🚀 Features
- Structured data modeling for historical entities (ships, buildings, etc.)  
- RESTful API design for backend operations  
- Image upload handling using Multer  
- Admin dashboard for managing entries  
- Categorized frontend interface (Ships, Buildings, Others)  
- Scalable architecture for future extensions  

---

## 🧠 Backend Highlights
- JWT-based authentication flow
- Express-based REST API structure
- Multer image upload handling
- Modular full-stack structure with frontend, backend, and admin separation
- Refactored an existing e-commerce codebase into a domain-specific archive platform, improving structure, API design, and scalability.
- Ongoing transition from inherited e-commerce data flow to archive-specific modeling

🔌 API Example (Mock Data)

📥 Example Request

GET /api/items?page=1&limit=2

📤 Example Response

[
  {
    "id": 1,
    "title": "Ancient Ship 1",
    "image": "/images/image_1709830385461.jpg",
    "category": "ships",
    "description": "A historical ship archive entry"
  },
  {
    "id": 2,
    "title": "Historic Building Record",
    "image": "/images/sample2.jpg",
    "category": "buildings",
    "description": "A historical building archive entry"
  }
]

⚙️ Description

This demonstrates pagination and structured data retrieval using a mock dataset. The API supports filtering, search, and pagination through query parameters.

🔎 Additional Examples

GET /api/items?category=ships
GET /api/items?search=ship
GET /api/items?page=2&limit=2


## 📁 Project Structure Highlights
- `frontend/` → User-facing interface  
- `backend/` → API, routes, and server-side logic  
- `admin/` → Dashboard for managing content  

---

## 🧪 How to Run Locally

**Requirements: Node.js and project dependencies installed locally**


### Backend
```bash
cd backend
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Admin
```bash
cd admin
npm install
npm start
```

## 📸 Screenshots
### Homepage
<img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/89501bb7-5056-4347-808b-da78502f938f" />

### 🔌 API Response Preview

<img width="1052" height="335" alt="Screenshot 2026-04-03 130844" src="https://github.com/user-attachments/assets/62eb4957-b378-4229-9d3e-999e3fa07c22" />


## ⚙️ Project Direction

This project began from an older e-commerce codebase and is being refactored into a historical archive platform. The current focus is on backend structure, authentication flow, data modeling, and scalable organization of archive entities.

## 💭 Reflection

This project is designed to strengthen my backend development skills, focusing on system design and real-world application flow and also to strengthen my understanding of full-stack architecture, debugging across different environments to build systems grounded in meaningful data.
