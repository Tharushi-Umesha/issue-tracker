# Issue Tracker - Full Stack Application

A comprehensive issue tracking system built with React (TypeScript), Express.js, and MySQL. Features user authentication, CRUD operations, search/filter functionality, and real-time issue management.

## 🚀 Live Demo

- **Frontend:** [Your Vercel URL]
- **Backend API:** [Your Vercel URL]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## ✨ Features

### Core Features
- ✅ User authentication (Register/Login) with JWT
- ✅ Create, Read, Update, Delete (CRUD) operations for issues
- ✅ Issue status tracking (Open, In Progress, Resolved, Closed)
- ✅ Priority levels (Low, Medium, High, Critical)
- ✅ Severity levels (Minor, Major, Critical)
- ✅ Search and filter functionality with optimized API requests
- ✅ Pagination for issue lists
- ✅ Dashboard with issue statistics
- ✅ Responsive design

### Bonus Features
- ✅ TypeScript in frontend
- ✅ Export to CSV/JSON
- ✅ Visual indicators (badges, colors, icons)
- ✅ Confirmation prompts for destructive actions
- ✅ Clean and modern UI/UX
- ✅ Reusable component architecture

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** Context API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

## 📁 Project Structure

```
issue-tracker/
├── frontend/                  # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Reusable components (Button, Input, Modal, etc.)
│   │   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   │   ├── auth/         # Authentication components (Login, Register)
│   │   │   └── issues/       # Issue-specific components
│   │   ├── context/          # React Context (Auth)
│   │   ├── services/         # API service layer
│   │   ├── utils/            # Utility functions
│   │   ├── pages/            # Page components
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                   # Express.js backend
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Authentication middleware
│   │   └── server.js         # Main server file
│   ├── .env                  # Environment variables (not in git)
│   └── package.json
│
└── README.md                 # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/issue-tracker.git
cd issue-tracker
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🔐 Environment Variables

### Backend (.env)
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=issue_tracker
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 💾 Database Setup

### 1. Create Database
```sql
CREATE DATABASE issue_tracker;
USE issue_tracker;
```

### 2. Create Tables
```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Issues table
CREATE TABLE issues (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    severity ENUM('Minor', 'Major', 'Critical') DEFAULT 'Major',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    FULLTEXT INDEX idx_search (title, description)
);
```

## 🏃 Running Locally

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173` or `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:5173`

## 🚀 Deployment

This project can be deployed to **Vercel** (both frontend and backend).

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Push your code to GitHub

### Deploy Backend to Vercel

1. **Create `vercel.json` in backend folder:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

2. **Update `backend/src/server.js`** - Add at the end:
```javascript
// Export for Vercel
module.exports = app;
```

3. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set Root Directory: `backend`
   - Add Environment Variables (from your .env file)
   - Click Deploy
   - Copy the deployment URL

### Deploy Frontend to Vercel

1. **Create `vercel.json` in frontend folder:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

2. **Update `.env.production`:**
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

3. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set Root Directory: `frontend`
   - Add Environment Variable: `VITE_API_URL`
   - Click Deploy

### Update Backend CORS

After deploying frontend, update backend environment variable:
```
FRONTEND_URL=https://your-frontend.vercel.app
```

### Database for Production

**Option 1: Use free MySQL hosting**
- [Aiven](https://aiven.io/) - Free MySQL hosting
- [PlanetScale](https://planetscale.com/) - Serverless MySQL
- [Clever Cloud](https://www.clever-cloud.com/) - Free tier MySQL

**Option 2: Use your own MySQL server**
- Update backend environment variables with production database credentials

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Issues
```
GET    /api/issues           - Get all issues with filters (Protected)
GET    /api/issues/stats     - Get issue statistics (Protected)
GET    /api/issues/:id       - Get single issue (Protected)
POST   /api/issues           - Create new issue (Protected)
PUT    /api/issues/:id       - Update issue (Protected)
DELETE /api/issues/:id       - Delete issue (Protected)
```

### Query Parameters for GET /api/issues
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (Open, In Progress, Resolved, Closed)
- `priority` - Filter by priority (Low, Medium, High, Critical)
- `search` - Search in title and description

## 📸 Screenshots

[Add your screenshots here after deployment]

## 🧪 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Test Frontend
```bash
cd frontend
npm run build
```

## 🎨 Color Scheme

- **Primary (Buttons):** `#980404` (Dark Red)
- **Secondary (Cancel Buttons):** `#E6E6E6` (Light Gray)
- **Forms Background:** `#F3F4F4` (Off White)

## 👤 Default User (for Testing)

After deployment, register a new user:
- Email: `admin@example.com`
- Password: `admin123`

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built as part of a technical assignment
- Uses modern React and Express.js best practices
- Implements secure authentication with JWT
- Follows REST API design principles

## 📞 Support

For support, email your.email@example.com or create an issue in the repository.

---

**Note:** Remember to add your actual deployment URLs and screenshots after deploying the application.
