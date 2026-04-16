# 🧠 My Archive - Backend-First Full Stack Archive Platform

## 📌 Overview

My Archive is a full-stack application designed to explore and organize lesser-known historical archives such as ships, buildings, and other overlooked subjects.

🚀 Built as a backend-focused system demonstrating secure full CRUD operations, authentication, scalable API design, and database-driven architecture using MongoDB.

---

## 🛠️ Tech Stack
- Backend: Node.js, Express.js  
- Frontend: React.js  
- Database: MongoDB with Mongoose (implemented)
- Authentication: JWT + bcrypt
- File Handling: Multer  

---

## 🚀 Features
- Structured data modeling for historical entities such as ships, buildings, and other archive subjects  
- RESTful API design for backend operations  
- Image upload handling using Multer  
- Authenticated admin dashboard for managing archive entries  
- Archive entry creation flow through admin form with MongoDB persistence  
- Categorized frontend interface (Ships, Buildings, Others)  
- Scalable architecture for future extensions  
- MongoDB integration with Mongoose for persistent data storage  
- Server-side pagination, filtering, and search using database queries  
- Seed script for initializing archive data  
- API support for full CRUD operations (POST, GET, PUT, DELETE) with validation  
- Secure authentication using JWT and bcrypt  
- Protected API routes for creating, updating, and deleting archive items
- Public archive views load live backend data for category browsing, archive detail pages, and related archive entries

---

## 🧪 Testing

- Verified CRUD API endpoints, pagination, filtering, and search using Postman
- Tested authenticated admin archive creation with image upload and MongoDB persistence
- Tested public category browsing, archive detail pages, and related archive entries using live backend data

## 🔌 API Example (MongoDB)

📥 Example Request

```bash
GET /api/items?page=1&limit=2
```

📤 Example Response

```json
{
  "items": [
    {
      "_id": "69e093a05f622b539d58b122",
      "title": "Ship from the Atlas Miller (c. 1519)",
      "slug": "ship-from-the-atlas-miller-1519",
      "summary": "A ship illustration from the Atlas Miller, reflecting early European views of Asian maritime networks and seafaring.",
      "category": "ships",
      "status": "published"
    }
  ],
  "totalResults": 4,
  "currentPage": 1,
  "totalPages": 2
}
```

Protected routes:
- `POST /api/items`
- `PUT /api/items/:slug`
- `DELETE /api/items/:slug`

Authentication:
- `POST /api/auth/signup`
- `POST /api/auth/login`

🔎 Additional Examples

```bash
GET /api/items?category=ships
GET /api/items?search=ship
GET /api/items?page=2&limit=2
```


## 📁 Project Structure Highlights
- `frontend/` → User-facing interface  
- `backend/` → API, routes, and server-side logic
- `admin/` → Dashboard for managing content  

---

## 🧪 How to Run Locally

### Requirements
- Node.js installed locally
- MongoDB Community Server installed locally
- MongoDB Compass installed (optional, for viewing database records visually)
- Project dependencies installed

### Backend
```bash
cd backend

# Step 1: Start MongoDB locally

# Step 2: Seed database (optional but recommended)
node seed.js

# Step 3: Start backend server
node index.js
```

## 🗄️ Database Setup

This project uses MongoDB for data persistence.

### Setup
1. Install MongoDB Community Server locally (MongoDB Compass is optional for GUI access)
2. Create a `.env` file inside the `backend/` directory:
3. Ensure the MONGO_URI in your .env points to your MongoDB instance

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/myarchive
JWT_SECRET=your_jwt_secret
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
npm run dev
```

## 📸 Screenshots

### 🏛️ Archive Detail View

<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/d44edb9f-e18f-433c-9aab-5ab66f44a6ab" />


## 🔜 Next Steps

- Add admin delete and edit workflows for archive entries
- Improve validation and input sanitization
- Add role-based access control (admin vs user)
- Refine remaining inherited e-commerce UI sections into archive-specific presentation

