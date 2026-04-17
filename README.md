# 🧠 My Archive - Backend-First Full Stack Archive Platform

## 📌 Overview

My Archive is a full-stack application designed to explore and organize lesser-known historical archives such as ships, buildings, and other overlooked subjects.

Built with a backend-first approach, the project focuses on API design, database-driven workflows, and secure authentication while integrating a responsive frontend interface.

---

## 🏗️ Architecture Overview

The application follows a backend-first full-stack structure:

- **backend/** → Handles API routes, controllers, authentication, and database logic  
- **admin/** → Protected dashboard for managing archive entries  
- **frontend/** → Public interface for browsing and exploring archives  

### 🔄 Request Flow
1. User/Admin interacts with frontend or admin UI  
2. React sends request to Express API  
3. Routes forward requests to controllers  
4. Controllers validate input and interact with MongoDB via Mongoose  
5. API returns structured JSON response  
6. UI renders archive listings, details, or admin results  

---

## 🧠 Key Engineering Decisions

- Adopted a **backend-first approach** to prioritize API design, data modeling, and scalability  
- Used **MongoDB with Mongoose** for flexible schema design for varied archive entities  
- Implemented **JWT-based authentication** to secure admin workflows  
- Designed **pagination, filtering, and search at query level** for efficient data handling  
- Separated **public archive views and admin workflows** for cleaner system structure  

---

## 🚀 Features

- RESTful API design with full CRUD operations and protected routes  
- Secure authentication using JWT and bcrypt  
- Protected admin dashboard for archive management  
- Image upload handling using Multer  
- MongoDB integration with Mongoose for persistent data storage  
- Server-side pagination, filtering, and search  
- Categorized frontend interface (Ships, Buildings, Others)  
- Public archive views with live backend data integration  
- Scalable backend structure for future extensions  

---

## 🧩 Challenges Solved

- Migrated backend from mock data to **MongoDB with real query-based filtering and pagination**
- Resolved **image upload issues** by aligning Multer configuration with form-data inputs
- Refactored backend into **modular structure (routes, controllers, models)**
- Integrated **live backend APIs with frontend archive views**
- Implemented **secure protected routes** for admin workflows
- Refactored an initial e-commerce-style codebase into a domain-specific archive platform

---

## 🧪 Testing

- Tested CRUD API endpoints, pagination, filtering, and search using Postman  
- Verified authenticated admin archive creation with image upload and persistence  
- Performed end-to-end testing of frontend integration with backend APIs

## 🌐 Default Ports

- Backend API → http://localhost:3000  
- Frontend → http://localhost:3001 (auto-assigned if 3000 is in use)  
- Admin Dashboard → http://localhost:5173 (Vite default)

Note: The frontend may run on port 3000 or 3001 depending on availability if the backend server is already running.

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

