# 🧠 My Archive — Backend-Driven Historical Data Platform

## 📌 Overview
My Archive is a full-stack application designed to explore and organize lesser-known historical archives such as ships, buildings, and other overlooked subjects.

The system focuses on structuring historical data sourced from research-based materials and presenting it through a clean, scalable web interface.

---

## 🛠️ Tech Stack
- Backend: Node.js, Express.js  
- Frontend: React.js  
- Database: MongoDB with Mongoose (implemented)
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
- MongoDB integration with Mongoose for persistent data storage
- Server-side pagination, filtering, and search using database queries
- Seed script for initializing archive data
- API support for creating and updating archive items (POST and PUT endpoints with validation)

---

## 🧠 Backend Highlights
- JWT-based authentication flow
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

All endpoints have been tested using Postman:

- POST → returns 201 Created
- GET → returns paginated results
- PUT → successfully updates items (200 OK)


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

This API supports archive item retrieval, search, pagination, and creation using MongoDB and Mongoose.

## 🔧 Additional API Endpoints

### Get Single Item
```bash
GET /api/items/:slug
```

### Create Item
```bash
POST /api/items


{
  "title": "Ancient Harbor Map",
  "slug": "ancient-harbor-map",
  "category": "maps"
}
```

### Update Item


```bash
PUT /api/items/:slug

{
  "title": "Updated Ship Record",
  "summary": "Updated summary",
  "content": "Updated content",
  "category": "ships",
  "status": "published"
}
```

✔ Tested using Postman with successful 200 OK response


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

**Requirements: Node.js and project dependencies installed locally**


### Backend
```bash
cd backend
node seed.js   # (optional) populate database
node index.js  # start server
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
npm start
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

## 🔄 CRUD Progress

- ✅ Create (POST /api/items)
- ✅ Read (GET /api/items, GET /api/items/:slug)
- ✅ Update (PUT /api/items/:slug)
- 🔄 Delete (planned)

## 🔜 Next Steps

- Implement delete endpoint to complete CRUD functionality
- Add route protection using JWT

## ⚙️ Project Direction

The project has evolved from an initial mock-data-based backend to a fully database-driven system using MongoDB and Mongoose. The current focus is on expanding backend capabilities, implementing full CRUD operations, and strengthening authentication and data management workflows.

## 💭 Reflection

This project is designed to strengthen my backend development skills, focusing on system design and real-world application flow and also to strengthen my understanding of full-stack architecture, debugging across different environments to build systems grounded in meaningful data.
