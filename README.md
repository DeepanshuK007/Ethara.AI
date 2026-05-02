# Ethara Tasks 🚀 (Full-Stack Team Task Manager)

A high-fidelity, production-ready full-stack MERN application inspired by the **Ethara.AI** premium aesthetic.

## 🌟 Key Features & USPs

- **Gamified Performance System**: Complete tasks to automatically earn XP points directly saved to your profile.
- **Advanced Focus Mode**: Deep work Pomodoro timer integrated directly into the task board.
- **Optimistic Drag & Drop Kanban**: Experience near-zero latency with interactive Kanban status updates powered by `@hello-pangea/dnd`.
- **Role-Based Access (Admin/Member)**: Granular access control for project owners and participants.
- **Seamless Local Testing**: Includes fallback in-memory MongoDB seeding on server boot for instant preview.

---

## ⚙️ Tech Stack
- **Frontend**: React, React Router, `@hello-pangea/dnd`, Vanilla CSS
- **Backend**: Node.js, Express, Mongoose, JWT (Stateless Authentication)
- **Database**: MongoDB

---

## 🛠️ Installation & Setup

### 1. Prerequisite
Ensure you have **Node.js** (v18+) installed.

### 2. Running Locally

#### Option A: One command start
Navigate to the root directory and start both instances:

**Backend Setup**
```bash
cd server
npm install
node index.js
```
*Note: If no local MongoDB is detected, it automatically falls back to an In-Memory Database and seeds it with demo projects and tasks for frictionless testing.*

**Frontend Setup**
```bash
cd client
npm install
npm run dev
```

---

## 🌐 API Overview

### Auth Routes (`/api/auth`)
- `POST /register`: Registers user and auto-seeds sample project data.
- `POST /login`: Authenticates user and generates stateless JWT.

### Project Routes (`/api/projects`)
- `GET /`: Lists user assigned projects.
- `POST /`: Creates a new project (Admin restricted).

### Task Routes (`/api/tasks`)
- `GET /project/:id`: Gets tasks for a specific project.
- `POST /`: Creates a new task.
- `PUT /:id`: Updates task status or details.
