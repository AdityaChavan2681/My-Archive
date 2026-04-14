# 🧠 My Archive - Backend-Driven Historical Data Platform

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

---

## 🧠 Backend Highlights
- JWT-based authentication flow
- Password hashing using bcrypt for secure credential storage
- Middleware-based route protection for restricted operations
- Express-based REST API structure
- Multer image upload handling
- Modular full-stack structure with frontend, backend, and admin separation
- Refactored an existing e-commerce codebase into a domain-specific archive platform, improving structure, API design, and scalability.
- Successfully transitioned from e-commerce data flow to archive-specific data modeling
- MongoDB integration using Mongoose models
- Database-driven filtering, search, and pagination
- Migration from mock data to persistent storage
- Archive item creation endpoint with validation and duplicate slug protection
- Proper HTTP status code handling (200, 201, 400, 404, 500)
- Error handling for invalid input and missing resources

## 🧪 API Testing

Core API endpoints were tested using Postman:

- POST → returns 201 Created
- GET → returns paginated results
- PUT → successfully updates items (200 OK)
- DELETE → successfully removes items (200 OK)
- GET by deleted slug → returns 404 Not Found

The admin archive creation flow was also tested end to end by:

- creating an authenticated user
- logging into the admin portal
- submitting archive form data with image upload
- verifying the saved record through `GET /api/items?page=1&limit=10`


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
      "_id": "69d48bca3817900069dc680c",
      "title": "Old Naval Vessel",
      "slug": "old-naval-vessel",
      "summary": "Another archive record",
      "category": "ships",
      "status": "published",
      "createdAt": "2026-04-07T04:44:58.279Z"
    }
  ],
  "totalResults": 3,
  "currentPage": 1,
  "totalPages": 2
}
```


### ⚙️ Description

This API supports full CRUD operations, search, filtering, and pagination using MongoDB and Mongoose.

## 🔧 Additional API Endpoints

### Get Single Item

```bash
GET /api/items/:slug
```

### Create Item

```bash
POST /api/items
```

```json
{
  "title": "Ancient Harbor Map",
  "slug": "ancient-harbor-map",
  "category": "maps"
}
```

### Update Item


```bash
PUT /api/items/:slug
```

```json
{
  "title": "Updated Ship Record",
  "summary": "Updated summary",
  "content": "Updated content",
  "category": "ships",
  "status": "published"
}
```

### Delete Item

```bash
DELETE /api/items/:slug
```

```bash
DELETE /api/items/old-naval-vessel
```

## 🔐 Authentication Endpoints

### Signup

```bash
POST /api/auth/signup
```

### Login

```bash
POST /api/auth/login
```

Protected routes (POST, PUT, DELETE) require a valid JWT in the `auth-token` header.

### 🔐 Using Protected Routes

To access protected endpoints (create, update, delete), include your JWT token in the request headers.

To use protected routes:

1. Signup → `/api/auth/signup`
2. Login → `/api/auth/login` (get JWT)
3. Use token in request headers

#### Example: Create Item with Authentication

```bash
POST /api/items
```

Headers:
```http
auth-token: <your_jwt_token>
```

Body:
```json
{
  "title": "Authenticated Item",
  "slug": "authenticated-item",
  "category": "maps"
}
```

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
### 🏠 Homepage
<img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/89501bb7-5056-4347-808b-da78502f938f" />

### 🔌 API Response Preview

<img width="764" height="976" alt="image" src="https://github.com/user-attachments/assets/da013e04-a66c-4c30-b150-ad384cd30179" />

## 📊 Current Status

- ✅ MongoDB integration completed
- ✅ Backend API migrated from mock data to database
- ✅ Filtering, search, and pagination implemented at database level
- ✅ Full CRUD operations implemented
- ✅ Authentication system implemented (JWT + bcrypt)
- ✅ Protected routes for secure data operations
- ✅ Admin archive entry creation integrated with protected backend API
- ✅ Manual end-to-end testing completed for admin login, form submission, image upload, and MongoDB persistence

## 🔄 CRUD Progress

- ✅ Create (POST /api/items)
- ✅ Read (GET /api/items, GET /api/items/:slug)
- ✅ Update (PUT /api/items/:slug)
- ✅ Delete (DELETE /api/items/:slug)

## 🔜 Next Steps

- Add admin delete and edit workflows for archive entries
- Move remaining mock-data-based endpoints to MongoDB-backed queries
- Improve validation and input sanitization
- Add role-based access control (admin vs user)
- Continue integrating public frontend views with live archive data

## ⚙️ Project Direction

The project has evolved from an initial mock-data-based backend to a fully database-driven system using MongoDB and Mongoose. The current focus is on strengthening protected backend workflows and incrementally integrating the admin and frontend interfaces with the archive API in a clear, explainable way.

## 💭 Reflection

This project is designed to strengthen my backend development skills, focusing on system design and real-world application flow and also to strengthen my understanding of full-stack architecture, debugging across different environments to build systems grounded in meaningful data.
