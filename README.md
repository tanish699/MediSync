# Fullstack Starter — React + Express + MySQL

A fullstack boilerplate with:
- **Frontend**: React (Vite)
- **Backend**: Express.js + MySQL2
- **Concurrency**: Both run together via `npm run dev`

## Project Structure
```
FSE_Project/
├── backend/
│   ├── src/
│   │   ├── index.js       # Express server
│   │   ├── db.js          # MySQL connection pool
│   │   └── routes/
│   │       └── example.js # Sample API routes
│   ├── .env               # Local env vars (gitignored)
│   ├── .env.example       # Template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── package.json           # Root — runs both
└── .gitignore
```

## Getting Started

### 1. Configure environment
```bash
# Edit backend/.env with your MySQL credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mydb
```

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Run development servers
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/example` | Test route |
| GET | `/api/example/db` | Test MySQL connection |
