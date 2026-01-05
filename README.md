# 🐛 Issue Tracker - Full Stack Application

A comprehensive issue tracking system built with React (TypeScript), Express.js, and MySQL. Features user authentication, full CRUD operations, advanced search/filter functionality, and real-time issue management with a modern, responsive UI.

## 🚀 Live Demo

**Frontend:** [https://issue-tracker-frontend-orcin.vercel.app](https://issue-tracker-frontend-orcin.vercel.app)

**Test Credentials:** Register a new account or use the demo

## ✨ Features

### Core Functionality ✅
- **User Authentication** - Secure registration and login with JWT tokens
- **Full CRUD Operations** - Create, Read, Update, Delete issues with validation
- **Issue Management System**
  - Track issues with title, description, status, priority, and severity
  - Status workflow: Open → In Progress → Resolved → Closed
  - Priority levels: Low, Medium, High, Critical
  - Severity levels: Minor, Major, Critical
- **Advanced Search & Filtering** - Real-time search with optimized debounced API calls
- **Pagination** - Efficient handling of large datasets
- **Dashboard with Statistics** - Visual overview with issue counts and completion rates
- **Visual Indicators** - Color-coded badges and icons for quick identification
- **Confirmation Prompts** - Safe deletion and status changes with user confirmation

### Bonus Features 🎯
- **TypeScript Implementation** - Type-safe development with interfaces and type checking
- **Export Functionality** - Download issues as CSV or JSON format
- **Responsive Design** - Mobile-first approach, works on all devices
- **Modern UI/UX** - Clean interface with Tailwind CSS and custom icons
- **Reusable Component Architecture** - Modular, maintainable codebase
- **Multi-Cloud Deployment** - AWS RDS + Render + Vercel
- **Optimized Performance** - Debounced search, efficient pagination
- **Error Handling** - Comprehensive error messages and validation

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Styling |
| React Router v6 | Client-side Routing |
| Axios | HTTP Client |
| Context API | State Management |

**Deployment:** Vercel

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MySQL | Relational Database |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| express-validator | Input Validation |

**Deployment:** Render

### Database
- **AWS RDS MySQL** - Cloud-hosted relational database
- Optimized queries with indexes
- Foreign key constraints for data integrity

## 📁 Project Structure

```
issue-tracker/
├── frontend/                     # React TypeScript application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   └── ...
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── auth/            # Authentication
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   └── issues/          # Issue management
│   │   │       ├── IssueList.tsx
│   │   │       ├── IssueCard.tsx
│   │   │       ├── IssueForm.tsx
│   │   │       ├── IssueDetails.tsx
│   │   │       └── IssueFilters.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Global auth state
│   │   ├── services/
│   │   │   └── api.ts           # API integration
│   │   ├── utils/
│   │   │   └── helpers.ts       # Utility functions
│   │   ├── pages/               # Route pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── IssuesPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── ...
│   │   ├── assets/              # Images & icons
│   │   └── types/               # TypeScript definitions
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                      # Express.js API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # MySQL connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── issueController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Issue.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── issueRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT verification
│   │   └── server.js
│   ├── .env
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL (v8.0 or higher)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Tharushi-Umesha/issue-tracker.git
cd issue-tracker
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup Database**
```sql
CREATE DATABASE issue_tracker;
USE issue_tracker;

-- Run the SQL schema (provided in /backend/schema.sql)
```

4. **Setup Frontend**
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Add backend API URL
```

5. **Run the Application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## 🌐 Deployment

### Current Deployment Architecture
- **Frontend:** Vercel (https://issue-tracker-frontend-orcin.vercel.app)
- **Backend:** Render (Node.js environment)
- **Database:** AWS RDS MySQL (Free Tier)

### Environment Variables

**Backend (.env)**
```env
PORT=5000
DB_HOST=your_rds_endpoint
DB_USER=admin
DB_PASSWORD=your_password
DB_NAME=issue_tracker
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-url/api
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Issues
```
GET    /api/issues           - Get all issues (with filters & pagination)
GET    /api/issues/stats     - Get issue statistics
GET    /api/issues/:id       - Get single issue
POST   /api/issues           - Create new issue
PUT    /api/issues/:id       - Update issue
DELETE /api/issues/:id       - Delete issue
```

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status
- `priority` - Filter by priority
- `search` - Search in title/description

## 🎨 Features Showcase

### Dashboard
- Real-time statistics with visual cards
- Issue distribution by status
- Progress bar showing completion rate
- Quick navigation to different status views

### Issue Management
- Comprehensive form with validation
- Inline editing capabilities
- Bulk export to CSV/JSON
- Advanced filtering and search

### User Experience
- Smooth animations and transitions
- Loading indicators
- Error handling with user-friendly messages
- Confirmation dialogs for destructive actions

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT-based authentication
- Protected routes and endpoints
- Input validation and sanitization
- SQL injection prevention
- XSS protection

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Modular architecture** for maintainability
- **Reusable components** for consistency

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Tharushi Umesha Mahipala**

- GitHub: [@Tharushi-Umesha](https://github.com/Tharushi-Umesha)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/tharushi-umesha-mahipala-4b4b84280/)
- Email: umemahee@gmail.com

## 🙏 Acknowledgments

- Built as a technical assignment demonstrating full-stack development skills
- Implements modern web development best practices
- Uses industry-standard tools and technologies
- Showcases problem-solving and system design capabilities

## 📞 Support

For questions or support, please create an issue in the GitHub repository or contact via email.

---

**⭐ If you find this project useful, please consider giving it a star!**
