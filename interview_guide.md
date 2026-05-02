# Full-Stack Team Task Manager: Technical Interview Guide

This guide breaks down every step taken to build the Team Task Manager application. It is structured to help you answer technical interview questions regarding the architecture, code flow, and design choices.

## 1. Project Architecture (MERN Stack)

We are using the **MERN** stack because it is highly efficient for JavaScript-heavy full-stack web applications.
- **M**ongoDB: NoSQL database for flexible data storage.
- **E**xpress.js: Fast, unopinionated web framework for Node.js.
- **R**eact: Library for building our dynamic UI (bootstrapped with Vite).
- **N**ode.js: JavaScript runtime for the backend server.

### Why this stack?
- **Single Language**: JavaScript/TypeScript is used across the entire stack.
- **JSON Everywhere**: MongoDB stores JSON-like documents (BSON), the API sends/receives JSON, and React consumes JSON, making serialization/deserialization seamless.
- **Scalability**: Express and Node are non-blocking, making them excellent for handling many concurrent API requests.

---

## 2. Step 1: Initializing the Project

### The Backend (`server/`)
We initialized a Node.js project using `npm init -y`. 
We will install dependencies:
- `express`: For handling HTTP requests and routing.
- `mongoose`: An Object Data Modeling (ODM) library to enforce schemas on our MongoDB database.
- `dotenv`: To securely load environment variables (like Database connection strings and JWT secrets).
- `cors`: Cross-Origin Resource Sharing. Allows our React frontend (running on a different port) to securely communicate with the Express backend.
- `bcryptjs`: For hashing user passwords before saving them to the database.
- `jsonwebtoken`: To generate secure auth tokens (JWT) upon successful login.

### The Frontend (`client/`)
We used **Vite** instead of Create React App (CRA). 
**Why Vite?** Vite uses native ES modules, making the development server startup incredibly fast and providing near-instant Hot Module Replacement (HMR).

---

## 3. Phase 3: Frontend Architecture & Design

### UI/UX & Styling
To ensure maximum performance and absolute control over the design, we opted for **Vanilla CSS with CSS Variables** (`index.css`) rather than a heavy component library. We extracted the core "Glassmorphism" aesthetics and custom Cyan/Teal color palette directly from the Ethara.AI mockups. 

### React Router Setup (`App.jsx`)
We implemented client-side routing using `react-router-dom`:
- `/`: **LandingPage** (Public facing, Ethara branding)
- `/auth`: **AuthPage** (Handles both Login and Registration)
- `/dashboard`: **Dashboard** (Protected route, fetches User XP and Projects)
- `/projects/:id`: **ProjectBoard** (Protected route, interactive Kanban board)

### State Management & Drag-and-Drop
For the Kanban Board, we integrated `@hello-pangea/dnd` (a robust, maintained fork of `react-beautiful-dnd`).
- **DragDropContext**: Wraps the board and listens for `onDragEnd`.
- **Optimistic UI Updates**: When a user drops a task into a new column, we immediately update the React State (`setTasks`) so the UI feels instantaneous, *then* we send the asynchronous `PUT` request to our backend to persist the status change (and award XP if they moved it to "DONE").
> **Interview Tip**: If asked about latency or UX, mention "Optimistic UI Updates." Explain that waiting for the server to respond before moving the card on the screen feels laggy, so updating the state first provides a native, seamless feel.

## 3. Step 2: Setting up the Express Server

### `server/index.js` Explained
We created the entry point for our backend API.
1. **Express & Middleware**: We instantiate `express()` and apply `cors()` to allow our React app to fetch data. We use `express.json()` to automatically parse incoming JSON payloads.
2. **MongoDB Connection**: We use `mongoose.connect()` to connect to our NoSQL database. We default to a local connection string (`mongodb://127.0.0.1:27017`) but allow it to be overridden by environment variables (useful for Railway/Atlas deployment).
3. **Why this architecture?**: By separating the server initialization and the routing (which we will add next), we maintain a clean, modular codebase that is easy to scale and test.

---

## 4. Step 3: Database Schemas (Mongoose Models)

To make this project stand out (as requested by the user), we implemented Gamification and Focus USPs directly into our data models.

### `User` Model (`server/models/User.js`)
- Standard fields: `name`, `email`, `password` (hashed).
- `role`: Enforces RBAC (Role-Based Access Control) using an enum `['ADMIN', 'MEMBER']`.
- **USP Field**: `xpPoints` (Number). We will award users XP for completing tasks, adding a gamification layer.

### `Project` Model (`server/models/Project.js`)
- `ownerId`: A reference to the `User` who created it.
- `members`: An array of `User` references. This creates a Many-to-Many relationship where a project has multiple members.
- **USP Field**: `themeColor`. Allows customized aesthetics for different projects to match the premium Ethara.AI UI design.

### `Task` Model (`server/models/Task.js`)
- `status`: Enum (`TODO`, `IN_PROGRESS`, `DONE`) which powers our Drag-and-Drop Kanban board.
- `projectId` and `assigneeId`: References to link the task to a specific project and user.
- **USP Field**: `checklist`. A sub-document array allowing users to break down complex tasks into smaller, manageable sub-tasks.

**Interview Tip**: If asked why we use `mongoose.Schema.Types.ObjectId` for `ownerId`, explain that NoSQL databases don't have traditional foreign keys, so we use ObjectIds and Mongoose's `.populate()` method to simulate relational JOINs.

---

## 5. Step 4: Authentication & Role-Based Access Control (RBAC)

We implemented a robust, stateless authentication system using **JSON Web Tokens (JWT)**.

### Why JWT over Session Cookies?
- **Statelessness**: The server doesn't need to store session data in the database or memory. The token itself contains all necessary information (e.g., user ID).
- **Scalability**: Because it's stateless, the backend can easily be scaled horizontally.
- **Cross-Domain**: JWTs are easily passed in the HTTP Authorization header (`Bearer <token>`), making it easy to host the frontend and backend on different domains.

### How we implemented it:
1. **Registration/Login APIs (`server/routes/auth.js`)**: 
   - We use `bcryptjs` to salt and hash the user's password *before* saving it to the database. NEVER store plain-text passwords.
   - On successful login, we generate a JWT using `jsonwebtoken.sign()` containing the user's unique `_id`.
2. **Middleware (`server/middleware/authMiddleware.js`)**:
   - `protect`: This function extracts the JWT from the `Authorization` header, verifies its signature using our secret key, and attaches the `User` object to the `req` (request) object for downstream routes to use.
   - `adminOnly`: This function checks `req.user.role`. If it's not `ADMIN`, it rejects the request with a `403 Forbidden` status. This fulfills the assignment's Role-Based Access Control requirement.

---

## 6. Step 5: Project & Task REST APIs (CRUD Operations)

With Auth in place, we built the core business logic endpoints in `server/routes/projects.js` and `server/routes/tasks.js`.

### Access Control Logic (`hasProjectAccess`)
To ensure a user cannot access or modify a project they don't belong to, we created a helper function:
- It checks if `req.user.role === 'ADMIN'`. Admins have universal access.
- If not an admin, it queries the project and checks if the user's ID matches the `ownerId` OR exists in the `members` array.
- This is a common pattern for **Multi-Tenant Authorization**.

### Gamification Implementation (The USP)
In `server/routes/tasks.js`, within the `PUT /api/tasks/:id` route (which is hit when a user drags a task or updates its status):
```javascript
if (req.body.status === 'DONE' && task.status !== 'DONE') {
  const user = await User.findById(req.user._id);
  user.xpPoints += 10; // Award 10 XP
  await user.save();
}
```
**Interview Tip**: If they ask how you made the app stand out, point directly to this block of code. Explain how you integrated gamification directly into the state-change logic of the Kanban board, meaning every time a user drags a task to "Done", a backend transaction securely awards them XP points, preventing client-side tampering/cheating.

---

*(Phase 2 is Complete. Next we build the Frontend React UI...)*
